import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import postReducer from "./reducers/postReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

const store = createStore(rootReducer);

export default store;
