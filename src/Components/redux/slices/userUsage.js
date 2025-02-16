import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const editProfileAsync = createAsyncThunk(
  'profile/editProfile',
  async ({ userId, formData }, { rejectWithValue }) => {
    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3005/profile/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      sessionStorage.removeItem('token')
      window.location.replace('/')
      return data.user; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);





export const getOrdersAsync = createAsyncThunk(
  'orders/fetchOrders',
  async (userId, { rejectWithValue }) => {
const token=sessionStorage.getItem('token')
    try {
      const response = await fetch(`http://localhost:3005/profile/Products/${userId}/orders`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch orders');
      }

      const data = await response.json();
      console.log(data)
      return data; 
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch orders');
    }
  }
);







export const deleteOrderAsync = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    const token = sessionStorage.getItem('token'); 

    try {
      const response = await fetch(`http://localhost:3005/profile/Products/${orderId}/orders`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete the order');
      }
      

      return orderId; 
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to delete the order');
    }
  }
);







const userUsage = createSlice({
  name: 'Order',

  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(getOrdersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }).addCase(deleteOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.payload || 'Failed to delete the order'; 
      });
  },
});

export default userUsage.reducer;

