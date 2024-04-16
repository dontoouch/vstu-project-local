import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import mainReducer from "./redux/reducers/mainReducers";
import selectedReducer from "./redux/reducers/selectedReducer";

let reducers = combineReducers({
  mainPage: mainReducer,
  additional:selectedReducer,
});

let store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)));
export default store;
