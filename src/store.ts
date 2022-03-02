import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const storeFactory = () =>
  createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )

export default storeFactory
