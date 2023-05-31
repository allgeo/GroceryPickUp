export default function userReducer (state = {}, action) {

    switch(action.type) {

        case "user/tokenSet":
            return { 
                ...state,
                userToken: action.payload !== null ? action.payload : ""

            }

        case "user/userIdSet":
            return { 
                ...state,
                userId: action.payload !== null ? action.payload : ""

            }

        case "user/storeIdSet":
            return { 
                ...state,
                storeId: action.payload !== null ? action.payload : ""
            }

        case "user/cleared":

            localStorage.setItem("userToken", "");
            localStorage.setItem("userId", "");
            localStorage.setItem("storeId", "");
            localStorage.setItem("firstName", "");
            localStorage.setItem("lastName", "");
            
            return {
                ...state,
                storeId: "",
                userId: "",
                userToken: "",
                firstName: "",
                lastName: ""
            }
        
        case "user/userSet":
            return {
                ...state,
                userId: action.payload.userId !== null ? action.payload.userId : "",
                userToken: action.payload.userToken !== null ? action.payload.userToken : "",
                firstName: action.payload.firstName !== null ? action.payload.firstName : "",
                lastName: action.payload.lastName !== null ? action.payload.lastName : ""
            }

        case "user/adminSet":
            return {
                ...state,
                userId: action.payload.userId !== null ? action.payload.userId : "",
                userToken: action.payload.userToken !== null ? action.payload.userToken : "",
                storeId: action.payload.storeId !== null ? action.payload.storeId : "",
                firstName: action.payload.firstName !== null ? action.payload.firstName : "",
                lastName: action.payload.lastName !== null ? action.payload.lastName : ""
            }

        default:
            return state;
    }
}