export const setUserToken = (userToken) => {
    return {
        type: "user/tokenSet",
        payload: userToken
    };
}

export const setUserId = (userId) => {
    return {
        type: "user/userIdSet",
        payload: userId
    };
}

// Kind of a lazy way to store the store owner/admin 1 user per store.
export const setStoreId = (storeId) => {
    return {
        type: "user/storeIdSet",
        payload: storeId
    };
}

export const setClear = () => {
    return {
        type: "user/cleared"
    };
}

// user => {userId, userToken, firstName, lastName}
export const setUser = (user) => {
    return {
        type: "user/userSet",
        payload: user
    };
}

// admin => {userId, userToken, storeId, firstName, lastName}
export const setAdmin = (admin) => {
    return {
        type: "user/adminSet",
        payload: admin
    };
}