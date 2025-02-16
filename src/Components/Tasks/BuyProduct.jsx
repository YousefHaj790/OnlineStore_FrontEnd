import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../Styles/BuyProduct.css';

const BuyProduct = () => {
  const navigate = useNavigate();
  const [drop, setDrop] = useState('none');
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [cart, setCart] = useState(false);

  const { Category, ProductId } = useParams();


  
  const location = useLocation();
  const product_Name = location.state?.product.Name;
  const product_Price = location.state?.product.Price;
  const product_src = location.state?.product.src;



  const userId = sessionStorage.getItem('userid');



  const quantityRef = React.useRef();
  const cardNumberRef = React.useRef();
  const cardNameRef = React.useRef();
  const expiryDateRef = React.useRef();
  const cvcRef = React.useRef();





  useEffect(() => {
    if (location.state?.product.isFavorite !== undefined) {
      setFavorite(location.state?.product.isFavorite);
    }
    if (location.state?.product.inCart !== undefined) {
      setCart(location.state?.product.inCart);
    }
  }, [location.state]);






  const handleSubmit = async (e) => {
    e.preventDefault();
    const quantity = parseInt(quantityRef.current.value, 10);
    const cardNumber = cardNumberRef.current.value;
    const cardName = cardNameRef.current.value;
    const expiryDate = expiryDateRef.current.value;
    const cvc = cvcRef.current.value;

    const token = sessionStorage.getItem('token');

    const orderData = {
      productName: product_Name,
      Price: product_Price * quantity,
      quantity,
      cardNumber,
      cardName,
      expiryDate,
      cvc,
    };

    try {
      const response = await fetch(
        `http://localhost:3005/profile/products/${Category}/${ProductId}/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process the payment');
      }

      const result = await response.json();
      console.log(result);


      navigate(`/Products/${Category}`);
    } catch (err) {
      setError(err.message);
    }
  };




  const toggleDropDown = () => {
    setDrop(drop === 'none' ? 'block' : 'none');
  };




  const handleToggle = async (key) => {
    const updatedState = key === 'favorite' ? !favorite : !cart;

    if (key === 'favorite') setFavorite(updatedState);
    else setCart(updatedState);

    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(
        `http://localhost:3005/profile/products/${Category}/${ProductId}/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isFavorite: key === 'favorite' ? updatedState : favorite,
            inCart: key === 'cart' ? updatedState : cart,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product state');
      }

      const result = await response.json();


      console.log(result);
    } catch (err) {
      setError(err.message);
    }
  };







  return (
    <div className="buyModal">
      <form className="buyForm" onSubmit={handleSubmit}>
        <img
          style={{
            width: '50px',
            height: '50px',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/Products/${Category}`)}
          src="https://img.icons8.com/fluency/50/close-window.png"
          alt="close-window"
        />
        <br />
        <img style={{ marginTop: '3rem' }} src={product_src} alt="Product" />
        <br />
        <p>{product_Name}</p>
        <p>{product_Price} $</p>
        <br />
        <label className="LABEL" htmlFor="quantity">
          Quantity:
        </label>
        <input
          type="number"
          ref={quantityRef}
          defaultValue={1}
          min="1"
          id="quantity"
          className="quantity"
          required
        />
        <br />
        <button onClick={toggleDropDown} type="button">
          Payment Information
        </button>
  
        <div className="buy_INFO" style={{ display: drop }}>
          <label htmlFor="cardNumber">Card Number:</label>
          <br />
          <input
            type="number"
            ref={cardNumberRef}
            placeholder="2323-xxxx-xxxx-xxxx"
            required
          />
          <br />
          <label htmlFor="cardName">Card Name:</label>
          <br />
          <input type="text" ref={cardNameRef} required />
          <br />
          <label htmlFor="expiryDate">Expire Date:</label>
          <br />
          <input type="month" ref={expiryDateRef} required />
          <br />
          <label htmlFor="cvc">CVC:</label>
          <br />
          <input className="cvc" type="number" ref={cvcRef} required />
          <br />
        </div>
  
        <div className="button-container">
          {error && <div className="error-message">{error}</div>}
  
          <button className="SIGNIN_BTN" type="submit">
            Submit Order
          </button>
  
          <div className="toggle-container">
            <button
              type="button"
              className={`cart-button ${cart ? 'active' : ''}`}
              onClick={() => handleToggle('cart')}
            >
              {cart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
  
            <button
              type="button"
              className={`favorite-button ${favorite ? 'active' : ''}`}
              onClick={() => handleToggle('favorite')}
            >
              {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  
};

export default BuyProduct;
