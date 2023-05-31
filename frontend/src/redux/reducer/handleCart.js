const handleCart = (state = [], action) => {
    const product = action.payload;
    switch (action.type) {
        case "ADDITEM":
            return [
                ...state,
                {
                    ...product
                }
            ]

        case "DELITEM":
            return state.filter((x) => x.id !== product.id)

        case "MINITEM":
            const index = state.findIndex(item => item.id === product.id);
            return state.filter((_, i) => i !== index);

        case "EMPTYITEM":
            state = [];
            return state;

        default:
            return state;
    }
}

export default handleCart;