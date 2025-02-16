import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingGIF from "../Images/loading-loading-forever.gif";

import { useParams, useNavigate } from "react-router-dom";
import {
  AddProductAsync,
  DeleteProductAsync,
  getProductsAsync,
} from "../redux/slices/fetchData";
import { editProfileAsync } from "../redux/slices/userUsage";
import "./dropDown_Styles/adminP.css";

const AdminP = () => {
  const { category, userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productData, setProductData] = useState({
    Name: "",
    src: "",
    Amount: "",
    Price: "",
  });
  const [profileData, setProfileData] = useState({
    firstName: "",
    email: "",
    address: "",
    profileImage: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const { Products } = useSelector((state) => state.Products);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(getProductsAsync(selectedCategory));
      navigate(`/adminP/${userId}/${selectedCategory}`);
    }
    if (selectedProduct) {
      navigate(`/adminP/${userId}/${selectedCategory}/${selectedProduct}`);
    }
  }, [selectedCategory, selectedProduct, dispatch, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const { Name, src, Amount, Price } = productData;

    if (!Name || !Price || !selectedCategory) {
      setError("Name, Price, and Category are required fields");
      return;
    }

    setLoading(true); 

    dispatch(AddProductAsync({ category: selectedCategory, productData, userId }))
      .unwrap()
      .then(() => {
        alert("Product added successfully!");
        setProductData({ Name: "", src: "", Amount: "", Price: "" });
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message || "Failed to add product");
        setLoading(false); 
      });
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) {
      setError("Please select a product to delete.");
      return;
    }

    if (!selectedCategory) {
      setError("Please select a category.");
      return;
    }

    setLoading(true); 

    dispatch(
      DeleteProductAsync({
        category: selectedCategory,
        productId: selectedProduct,
        userId,
      })
    )
      .unwrap()
      .then(() => {
        alert("Product deleted successfully!");
        setSelectedProduct("");
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message || "Failed to delete product");
        setLoading(false); 
      });
  };

  const handleEditProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setLoading(true); 

    dispatch(editProfileAsync({ userId, formData }))
      .unwrap()
      .then(() => {
        alert("Profile updated successfully!");
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message || "Failed to update profile");
        setLoading(false); 
      });
  };

  return (
    <div className="admin-panel">
      {loading && (
         <div>
         <div className="loading-container">
           <img  className="Loading" src={LoadingGIF} alt="Loading" />
           <p>Loading Products...</p>
         </div>
       </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <div className="editProfileSection">
        <h2>Edit Profile</h2>
        <form onSubmit={handleEditProfile}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={profileData.firstName}
            onChange={handleProfileChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            required
          />

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={profileData.address}
            onChange={handleProfileChange}
          />

          <label htmlFor="profileImage">Profile Image:</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleProfileImageChange}
          />

          <button type="submit">Update Profile</button>
        </form>
      </div>

      <br />
      <br />

      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Electronics">Electronics</option>
          <option value="Grocery">Grocery</option>
          <option value="Snacks">Snacks</option>
          <option value="Cleaning-materials">Cleaning materials</option>
        </select>

        <label htmlFor="Name">Product Name:</label>
        <input
          type="text"
          id="Name"
          name="Name"
          value={productData.Name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="src">Image URL:</label>
        <input
          type="text"
          id="src"
          name="src"
          value={productData.src}
          onChange={handleInputChange}
        />

        <label htmlFor="Amount">Amount:</label>
        <input
          type="text"
          id="Amount"
          name="Amount"
          value={productData.Amount}
          onChange={handleInputChange}
        />

        <label htmlFor="Price">Price:</label>
        <input
          type="number"
          id="Price"
          name="Price"
          value={productData.Price}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>

      <br />
      <br />

      <div className="deleteSection">
        <h2>Delete Product</h2>
        <select
          id="product"
          value={selectedProduct}
          onChange={handleProductChange}
          required
        >
          <option value="" disabled>
            Choose product if you want to delete:
          </option>
          {Products?.map((product) => (
            <option key={product._id} value={product._id}>
              {product.Name}
            </option>
          ))}
        </select>

        <button onClick={handleDeleteProduct}>Delete</button>
      </div>
    </div>
  );
};

export default AdminP;
