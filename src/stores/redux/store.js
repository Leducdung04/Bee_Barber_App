import { configureStore } from '@reduxjs/toolkit';
import barbersReducer from '../features/barbersSlice';
import categorysReducer from '../features/categorySlice';
import bannersReducer from '../features/bannerSlice';
import categoryProductsReducer from '../features/categoryProductListSlice';
import servicesReducer from '../features/servicesSline';

const store = configureStore({
  reducer: {
    barbers: barbersReducer,
    categorys: categorysReducer,
    banners:bannersReducer,
    categoryProducts: categoryProductsReducer,
    services: servicesReducer,
  },
});

export default store;
