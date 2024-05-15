import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import mainReducer from "./redux/reducers/mainReducers";
import selectedReducer from "./redux/reducers/selectedReducer";
import needHostelReducer from "./redux/reducers/needHostelReducer"

let reducers = combineReducers({
  mainPage: mainReducer,
  additional:selectedReducer,
  need:needHostelReducer
});

let store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)));
export default store;
