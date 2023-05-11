import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer.jsx';

const store = configureStore({
  reducer,
});

export default store;
