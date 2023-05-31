export const addCart = (product) => {
    return{
        type:"ADDITEM",
        payload:product
    }
}

export const minusCart = (product) => {
    return{
        type:"MINITEM",
        payload:product
    }
}

export const delCart = (product) => {
    return{
        type:"DELITEM",
        payload:product
    }
}

export const emptyCart = (product) => {
    return{
        type:"EMPTYITEM",
        payload:product
    }
}
