import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { videogamesReducer } from "../reducer/rootReducer.js";

const initialState = {};
const reducer = combineReducers({
  videogamesReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)) //IMPORTANTE: El "thunk" me permite trabajar con acciones asincronicas
);
export default store;
