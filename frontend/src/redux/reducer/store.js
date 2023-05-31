import { legacy_createStore } from "redux";
import rootReducers from "./index";

const store = legacy_createStore(
    rootReducers,
    // Initial States
    {
        handleCart: [],
        
        user: {
            userId: "",
            userToken: "",
            storeId: "",
            firstName: "",
            lastName: ""
        }
    }
    );

export default store;