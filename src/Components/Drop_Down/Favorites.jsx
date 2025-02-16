import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdersAsync } from '../redux/slices/userUsage';
import { getFavorites } from '../redux/slices/fetchData';
import { useParams } from 'react-router-dom';
import LoadingGIF from "../Images/loading-loading-forever.gif";

import './dropDown_Styles/Favorites.css';



const Favorites = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { status } = useSelector((state) => state.Products);



  useEffect(() => {
    if (userId) {
      dispatch(getOrdersAsync(userId));
      dispatch(getFavorites());
    }
  }, [dispatch, userId]);





  const DeleteProduct = async (ProductId) => {
    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(
        `http://localhost:3005/profile/products/isFavorite/${ProductId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isFavorite: false,
          }),
        }
      );


      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }

      const result = await response.json();
      console.log(result);
      
      window.location.reload()
        return (
          <div>
            <div className="loading-container">
              <img  className="Loading" src={LoadingGIF} alt="Loading" />
              <p>Loading Products...</p>
            </div>
          </div>
        )
      

    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  const P = JSON.parse(sessionStorage.getItem('AddedToFavorites')) || [];

  if (status === 'loading') {
return <div>
<div className="loading-container">
  <img className="Loading" src={LoadingGIF} alt="Loading" />
  <p style={{textAlign:'center'}}>Loading Products...</p>
</div>
</div> }








  return (
    <div className="Favorites-section">
      <br />
      <br />
      <section className="Favorites-section">
        <h2>Your Favorite Products</h2>
        {P.length > 0 ? (
          P.map((item) => (
            <div key={item._id} className="favorite-item">
              <img src={item.src} alt={item.Name} className="favorite-item-image" />
              <div className="favorite-item-details">
                <p>{item.Name}</p>
                <p>Price: {item.Price} $</p>
                <br />
                <br />
                <button onClick={() => {
                  DeleteProduct(item._id); // Call DeleteProduct with the item's ID
                  console.log(item._id); // Log the product ID (optional)
                }}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in your favorites.</p>
        )}
      </section>
    </div>
  );
  
};

export default Favorites;
