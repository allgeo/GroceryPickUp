import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo_svg from "../../assets/logo_svg.svg";

import { setClear } from '../../redux/action/User';

import "./Navbar.scss";

export default function Navbar() {
    
    const state = useSelector((state) => state.handleCart);
    const userState = useSelector((state) => state.user);
    
    const [open, setOpen] = useState(false);
    const [runOnce, setRunOnce] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // On first run attach window resizer listener (it's to reset open state of the dropdown
    // funky CSS happens due to bootstrap
    useEffect(() => {

        if (!runOnce) {
            window.addEventListener("resize", () => {
                setOpen(false);
            });
            setRunOnce(true);
        }

        if (redirect) {
            setRedirect(false);
            navigate("/landing");
        }
    }, [redirect]);
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="header">
            <div className="container-fluid">
                <div className="logo">
                    <NavLink to="/landing">
                        <img src={logo_svg} alt="Grocery PickUP"/>
                    </NavLink>
                </div>
                    
                <button className="navbar-toggler" onClick={() => {setOpen(true)}}>
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        { userState.storeId ? 
                        <>
                            <li className="nav-item">
                                <NavLink to={"/inventory/" + userState.storeId} className="nav-link" style={{color: "white"}}>Inventory</NavLink>
                            </li> 
                            <li className="nav-item">
                                <NavLink to={"/admin/" + userState.storeId} className="nav-link" style={{color: "white"}}>Order Confirmations</NavLink>
                            </li> 
                        </> : 
                            <li className="nav-item">
                                <NavLink to={"/register/" + userState.storeId} className="nav-link" style={{color: "white"}}>Register Store</NavLink>
                            </li> 
                        }
                    </ul>

                    <div className="button">
                        {userState.userId !== "" ? <b style={{marginRight: "8px", color: "white"}}>Logged in as {userState.firstName}</b> : null}
                            
                        {userState.userId === "" ? 
                            <NavLink to="/login" className="btn btn-outline-light">
                                <i className='fa fa-sign-in me-1'></i>
                                Login
                            </NavLink> 
                        :    
                           // Logout actions
                           <NavLink className="btn btn-outline-light" onClick={() => {logoutAction()}}>
                                <i className='fa fa-sign-in me-1'></i>
                                Logout
                            </NavLink>
                        }
                            
                        {userState.userId === "" ? 
                            
                            <NavLink to="signup" className="btn btn-outline-light ms-2">
                                <i className='fa fa-user-plus me-1'></i>
                                Sign-Up
                            </NavLink> 
                        : 
                            null
                        }
                            
                        <NavLink to="cart" className="btn btn-outline-light ms-2">
                            <i className='fa fa-cart-plus me-1'></i> ({state.length})
                        </NavLink>
                    </div>
                </div>

                {open ? compact() : null}
            </div>
        </nav>
    );

    function compact() {
        return (
            <div className={"offcanvas offcanvas-end text-bg-dark " + (open ? "show" : "")}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
                    <button type="button" className="btn-close btn-close-white" onClick={() => {setOpen(false)}}></button>
                </div>

                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/landing">Home</Link>
                        </li>
                        { userState.storeId ? 
                        <>
                            <li className="nav-item">
                                <NavLink to={"/inventory/" + userState.storeId} className="nav-link" style={{color: "white"}}>Inventory</NavLink>
                            </li> 
                            <li className="nav-item">
                                <NavLink to={"/admin/" + userState.storeId} className="nav-link" style={{color: "white"}}>Order Confirmations</NavLink>
                            </li> 
                        </> : 
                            <li className="nav-item">
                                <NavLink to={"/register/" + userState.storeId} className="nav-link" style={{color: "white"}}>Register Store</NavLink>
                            </li> 
                        }
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart: {state.length} Items</Link>
                        </li>
                        <li className="nav-item">
                            {userState.userId === "" ? 
                                <Link className="nav-link" to="/signup">Sign Up</Link> 
                            : 
                                <Link className="nav-link" onClick={() => {logoutAction()}}>Log Out</Link>
                            }
                        </li>
                        <li className="nav-item">
                        {userState.userId === "" ? 
                            <Link className="nav-link" to="/login">Log In</Link> 
                        : 
                            <b className="nav-link active">Logged in as {userState.firstName}</b>
                        }
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    function logoutAction() {
        dispatch(setClear());
        setRedirect(true);
    }
}