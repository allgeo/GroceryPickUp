import handleCart from "./handleCart";
import { combineReducers } from "redux";
import userReducer from "./User";

const rootReducers = combineReducers({
    handleCart: handleCart, 
    user: userReducer
})

export default rootReducers;