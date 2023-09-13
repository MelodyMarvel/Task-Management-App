import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import todoReducer from './TodoSlice'; // Import your Todo reducer

const rootReducer = combineReducers({
  user: userReducer,
  todo: todoReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
