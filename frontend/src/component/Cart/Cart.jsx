import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delCart, addCart, minusCart, emptyCart } from '../../redux/action/index';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const state = useSelector((state) => state.handleCart);
    const state2 = useSelector(state => state.user);

    const navigate = useNavigate();

    var total = 0;
    const itemList = (item) => {
        total = total + item.price;
        total = Math.round((total + Number.EPSILON) * 100) / 100
        return (
            <li className='list-group-item d-flex justify-content-between 1h-sm'>
                <div>
                    <h6 className='my-0'>{item.title}</h6>
                </div>
                <span className='text-muted'>{state.filter(x => x.title === item.title).length} × ${item.price} = ${state.filter(x => x.title === item.title).length * item.price}</span>
            </li>
        );
    }


    const allUnique = [
        ...new Map(state.map((item) => [item["title"], item])).values(),
    ];

    const dispatch = useDispatch()
    const handleClose = (item) => {
        dispatch(delCart(item));
        toast.success("Removed product from cart successfully", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }
    const handlePlus = (item) => {
        dispatch(addCart(item))
    }
    const handlemMinus = (item) => {
        dispatch(minusCart(item))
    }
    const handleEmpty = (item) => {
        dispatch(emptyCart(item))
    }
    

    const submitOrder = async () => {
        let storeId = "";

        // Take the store id of the first product
        // realistically the user pickup orders should only contain items from ONE store
        if (allUnique.length > 0) {
            storeId = allUnique[0].store;
        }

        console.log("length: " + storeId + ", " + allUnique[0].store);
        const postBody = {
            products: allUnique,
            token: state2.userToken,
            userID: state2.userId,
            storeID: storeId
        }
        const response = await fetch('https://grocery-pickup-backend.onrender.com/checkout/order', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody)
          });

        const responseBody = await response.json();
          console.log(responseBody);
        if (responseBody.message === "Success") navigate(`/Confirm?email=${responseBody.emailURL}`)
        
    }

    const cartItems = (cartItems) => {
        return (
            <div className='px-4 my-5 bg-light rounded-3'>
                <div className='container py-4'>
                    <button onClick={() => handleClose(cartItems)} className='btn-close float-end' aria-label='Close'></button>
                    <div className='row justify-content-center'>
                        <div className='col-md-4'>
                            <img src={cartItems.image} alt={cartItems.title} height='200px' width='180px' />
                        </div>
                        <div className='col-md-4'>
                            <h3>{cartItems.title}</h3>
                            <p className='lead fw-bold'>
                                {state.filter(x => x.title === cartItems.title).length} × ${cartItems.price} = ${state.filter(x => x.title === cartItems.title).length * cartItems.price}
                            </p>
                            <button className="btn btn-outline-dark me-4" onClick={() => handlemMinus(cartItems)}><i className='fa fa-minus'></i></button>
                            <button className="btn btn-outline-dark me-4" onClick={() => handlePlus(cartItems)}><i className='fa fa-plus'></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    const orderButton = () => {
        return (
            <div className='container'>
                <div className='row'>
                    <NavLink to="/confirm" className="btn btn-success" onClick={submitOrder}>Place Order</NavLink>
                </div>
            </div>

        );
    }
    const cancelButton = () => {
        return (
            <div className='container'>
                <div className='row'>
                    <NavLink to="/product" className="btn btn-dark">Cancel</NavLink>
                </div>
            </div>

        );
    }

    return (
        <>
        
        <div class="row">
        <div className='col-md-6 order-md-1' id="cartContent">
                {state.length !== 0 && allUnique.map(cartItems)}
            </div>
            
            <div className="col-md-6 order-md-1" id="checkContent">
                <ul className="list-group mb-3">
                    
                {state.length !== 0 && orderButton()}
                    {allUnique.map(itemList)}
                    
                    <li className='list-group-item d-flex justify-content-between'>
                        <span>Total (USD)</span>
                        <strong>${total}</strong>
                    </li>
                </ul>

                    {state.length !== 0 && cancelButton()}

            </div>

        </div>
        <ToastContainer />
        </>
    );
}

export default Cart;