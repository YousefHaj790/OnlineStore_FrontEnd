import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';




export const AddProductAsync = createAsyncThunk(
  'Product/AddProduct',
  async ({ category, productData, userId }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token'); 

      const response = await fetch(`http://localhost:3005/profile/Products/${userId}/${category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          Name: productData.Name,
          src: productData.src,
          Amount: productData.Amount,
          Price: productData.Price,
          userId, 
        }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add Product');
      }

      const data = await response.json();
      return data; // Return the saved product data if successful
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add Product');
    }
  }
);







export const DeleteProductAsync = createAsyncThunk(
  'Product/DeleteProduct',
  async ({ category, productId, userId }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(
        `http://localhost:3005/profile/Products/${userId}/${category}/${productId}`, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }

      return productId; 
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete product');
    }
  }
);









export const getProductsAsync = createAsyncThunk(
  'Product/getProducts', 
  async (Category, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch(`http://localhost:3005/profile/Products/${Category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch Products');
      }
      
      const data = await response.json();


      return data; // Return the fetched data directly to update Redux state
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }

);


export const getFavorites = createAsyncThunk(
  'Product/getFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:3005/profile/Products/Favorites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch all Products');
      }

      const data = await response.json();
      sessionStorage.setItem('AddedToFavorites',JSON.stringify(data))

      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);



export const getInCart = createAsyncThunk(
  'allProducts/getInCart',
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:3005/profile/Products/inCart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch cart products');
      }

      const data = await response.json();
      sessionStorage.setItem('AddedToCart',JSON.stringify(data))
console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch cart products');
    }
  }
);




const initialState = {
  Products: [],
  status: 'idle',
  error: null,
};

export const fetchData = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.Products = action.payload;
    },
    addProduct: (state, action) => {
      const index = state.Products.findIndex(Product => Product._id === action.payload._id);
      if (index !== -1) {
        state.Products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.Products = state.Products.filter(Product => Product._id !== action.payload);
    },
  },
  extraReducers:(builder) =>{builder.addCase(
    getProductsAsync.pending,(state) => {
        state.status = 'loading';
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Products = action.payload;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(AddProductAsync.pending, (state) => {
        state.status = 'loading';
      }).addCase(getFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Products = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(getInCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.inCart = action.payload; 
      })
      .addCase(getInCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
 

      .addCase(AddProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.Products.findIndex((Product) => Product._id === action.payload._id);
        if (index !== -1) {
          state.Products[index] = action.payload;
        }
      })
      .addCase(AddProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const { setProducts, addProduct, deleteProduct } = fetchData.actions;

export default fetchData.reducer;

export const selectStatus = (state) => state.product.status; 
export const selectProducts = (state) => state.product.products; 
export const selectError = (state) => state.product.error; 