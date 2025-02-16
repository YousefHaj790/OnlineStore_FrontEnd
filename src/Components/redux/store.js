import { configureStore } from "@reduxjs/toolkit";
import fetchDataReducer from "./slices/fetchData";
import userUsage from "./slices/userUsage";


const store = configureStore({
  reducer: {
    Products: fetchDataReducer, 
  Items:userUsage
  },
});

export default store;
