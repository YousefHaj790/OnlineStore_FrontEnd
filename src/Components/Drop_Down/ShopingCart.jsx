import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdersAsync, deleteOrderAsync } from '../redux/slices/userUsage';
import { getInCart } from '../redux/slices/fetchData';
import { useParams } from 'react-router-dom';
import LoadingGIF from '../Images/loading-loading-forever.gif';
import './dropDown_Styles/ShoppingCart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  // Selectors
  const { orders, status } = useSelector((state) => state.Items);
  const { status2 } = useSelector((state) => state.Products);
  const address = sessionStorage.getItem('address');
  const isLoading = status === status2 === 'loading';

  useEffect(() => {
    if (userId) {
      dispatch(getOrdersAsync(userId));
      dispatch(getInCart());
    }
  }, [dispatch, userId]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrderAsync(orderId));
    window.location.reload();
  };

  const handleDeleteProduct = async (ProductId) => {
    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(
        `http://localhost:3005/profile/products/inCart/${ProductId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ inCart: false }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove from cart');
      }

      const result = await response.json();
      console.log(result);
      dispatch(getInCart());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const P = JSON.parse(sessionStorage.getItem('AddedToCart')) || [];

  if (isLoading) {
    return (
      <div className="loading-container">
        <img className="Loading" src={LoadingGIF} alt="Loading" />
        <p style={{ textAlign: 'center' }}>Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Orders Section */}
      <section className="orders-section">
        <h2>Your Orders</h2>
        {orders?.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-item">
              <h3>Order ID: {order._id}</h3>
              <p style={{ fontSize: '2rem' }}>{order.productName}</p>
              <p style={{ color: 'green', fontSize: '1rem' }}>
                {order.Price} $
              </p>
              <p>You have ordered {order.quantity} from this product</p>
              <p>On the way to {address}.</p>
              <br />
              <p>Ordered: {order.purchaseDate}</p>
              <button onClick={() => handleDeleteOrder(order._id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </section>

      <br />
      <br />

      {/* Cart Section */}
      <section className="cart-section">
        <h2>Items in Cart</h2>
        {P?.length > 0 ? (
          P.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.src} alt={item.Name} className="cart-item-image" />
              <div className="cart-item-details">
                <p>{item.Name}</p>
                <p>Price: ${item.Price}</p>
                <p>Amount: {item.Amount}</p>
                <br />
                <br />
                <button onClick={() => handleDeleteProduct(item._id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in your cart.</p>
        )}
      </section>
    </div>
  );
};

export default Cart;
