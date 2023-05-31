import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delCart, addCart, minusCart } from '../../redux/action/index';
import { NavLink, useSearchParams } from 'react-router-dom';

const Confirm = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get("email")
    return(
        <>
        <h1 style={{padding: "20px"}}>Reservation Confirmed!</h1>
        {/* <a href={email}>Click here for details</a> */}
        </>
    );
};


export default Confirm;