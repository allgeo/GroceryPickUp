import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAdmin } from './../../redux/action/User';
import Warning from './../Warning/Warning';

import './Signin.css'

function Signin(props) {
    
    const [loading, setLoading] = useState(false);
    const [fnameError, setfnameError] = useState(false);
    const [lnameError, setlnameError] = useState(false);
    const [emailError, setemailError] = useState(0);
    const [passwordError, setpasswordError] = useState(0);

    const [generalError, setGeneralError] = useState(false);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();

    function useQuery () {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams((search), [search]));
    }
   
    async function submitData () {
        let submit = true;

        if (firstNameRef.current.value === "") {
            firstNameRef.current.style.backgroundColor = "lightpink";
            submit = false;
            setfnameError(true);
        }
        else {
            firstNameRef.current.style.backgroundColor = "#efefef";
        }

        if (lastNameRef.current.value === "") {
            lastNameRef.current.style.backgroundColor = "lightpink";
            submit = false;
            setlnameError(true);
        }
        else {
            lastNameRef.current.style.backgroundColor = "#efefef";
        }

        if (emailRef.current.value === "" || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value))) {
            emailRef.current.style.backgroundColor = "lightpink";
            submit = false;
            setemailError(1);
        }
        else {
            emailRef.current.style.backgroundColor = "#efefef";
        }

        if (passwordRef.current.value === "") {
            passwordRef.current.style.backgroundColor = "lightpink";
            submit = false;
            setpasswordError(1);
        }
        else {
            passwordRef.current.style.backgroundColor = "#efefef";
        }
        
        const myData = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        if (submit) {
            
            setLoading(true);

            const result = await fetch('https://grocery-pickup-backend.onrender.com/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myData)
            })

            const resultInJson = await result.json()

            // Added saving user token & id
            if (resultInJson.message && resultInJson.message === "Success") {
                
                dispatch(setUser({
                    userToken: resultInJson.token, 
                    userId: resultInJson.userID,
                    firstName: resultInJson.firstName,
                    lastName: resultInJson.lastName
                }));
                
                localStorage.setItem("userToken", resultInJson.token);
                localStorage.setItem("userId", resultInJson.userID);
                localStorage.setItem("firstName", resultInJson.firstName);
                localStorage.setItem("lastName", resultInJson.lastName);
                navigate("/landing");
            }
            else if (resultInJson.message && resultInJson.message === "email exists") {
                // HTTP 409
                emailRef.current.style.backgroundColor = "lightpink"
                setemailError(2);
                console.log("Account creation failed - email exists");
            }
            else if (resultInJson.message && resultInJson.message === "Invalid request") {
                // HTTP 400
                console.log("Account creation failed - invalid request");
                setGeneralError(true);
            }
            else {
                // default case
                setGeneralError(true);
            } 
            setLoading(false);
        }
    }

    async function login () {
        let submit = true;

        if (emailRef.current.value === "" || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value))) {
            emailRef.current.style.backgroundColor = "lightpink";
            submit = false;
            setemailError(1);
        }
        else {
            emailRef.current.style.backgroundColor = "#efefef";
        }

        if (passwordRef.current.value === "") {
            passwordRef.current.style.backgroundColor = "lightpink";
            submit = false;
            setpasswordError(1);
        }
        else {
            passwordRef.current.style.backgroundColor = "#efefef";
        }

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        if (submit) {
            
            setLoading(true);

            const result = await fetch('https://grocery-pickup-backend.onrender.com/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const resultInJson = await result.json()

            // Added saving user token & id
            if (resultInJson.message && resultInJson.message === "Success") {
                
                if (resultInJson.storeID) {
                    dispatch(setAdmin({
                        userToken: resultInJson.token, 
                        userId: resultInJson.userID,
                        firstName: resultInJson.firstName,
                        lastName: resultInJson.lastName,
                        storeId: resultInJson.storeID
                    }));

                    localStorage.setItem("storeId", resultInJson.storeID);
                }
                else {
                    dispatch(setUser({
                        userToken: resultInJson.token, 
                        userId: resultInJson.userID,
                        firstName: resultInJson.firstName,
                        lastName: resultInJson.lastName
                    }));
                }

                localStorage.setItem("userToken", resultInJson.token);
                localStorage.setItem("userId", resultInJson.userID);
                localStorage.setItem("firstName", resultInJson.firstName);
                localStorage.setItem("lastName", resultInJson.lastName);

                const redirect = query.get("redirect");
                if (redirect) {    
                    // Im not trusting raw input
                    if (redirect === "register") {
                        navigate("/register");
                    }
                }
                else {
                    navigate("/landing");
                }
            }
            else if (resultInJson.message && resultInJson.message === "User not found") {
                // HTTP 404
                emailRef.current.style.backgroundColor = "lightpink";
                setemailError(3);
                console.log("Login - user not found");
            }
            else if (resultInJson.message && resultInJson.message === "Invalid password") {
                // HTTP 401
                passwordRef.current.style.backgroundColor = "lightpink";
                setpasswordError(2);
                console.log("Invalid password");
            }
            else if (resultInJson.message && resultInJson.message === "Invalid request") {
                // HTTP 400
                console.log("Login failed - invalid request");
                setGeneralError(true);
            }
            else {
                // default case
                setGeneralError(true);
            } 
            setLoading(false);
        }
    }

    useEffect(() => {
        // When on a fresh tab going directly to the /login or /signup page
        // this hook will run simultaneously or very closely with the app hook
        // loading all user details and will not redirect logged in user due to this.
        // Manually load the details
        const tempToken = localStorage.getItem("userToken");
        const tempUserId = localStorage.getItem("userId");

        // Check if userToken is valid and redirect user to landing page
        const userCheck = async () => {
      
            setLoading(true);

            const result = await fetch('https://grocery-pickup-backend.onrender.com/user/status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token: tempToken, userID: tempUserId})
            });

            const resultJSON = await result.json();
            
            if (resultJSON.message && resultJSON.message === "Success") {
                navigate("/landing");
            }
            setLoading(false);
        }
        
        if (tempUserId) {
            userCheck();
        }
    }, []);

    return ( 
    <>
        <div className="sin-outer">
            <div className="sin-textArea">
                <h1>Sign {props.login ? "in" : "up"} today! <br/></h1>
                <h5>grocery searching made easy</h5>
                <h6>If you {props.login ? "don't" : ""} have an account already</h6>
                <h6>You can <Link to={props.login ? "/signup" : "/login"}>{props.login ? "sign up" : "login"}</Link> here!</h6>
            </div>

            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                
                {props.login ? <h3 style={{textAlign: "left"}}>Sign In</h3> : <>
                <h3 style={{textAlign: "left"}}>Sign up</h3>
                <input className={fnameError ? "sin-input" : "sin-input sin-input-gap"} placeholder="First Name" ref={firstNameRef}
                    onInput={() => {
                        if (firstNameRef.current.value) {
                            firstNameRef.current.style.backgroundColor = "#efefef";
                            setfnameError(false);
                        }
                    }}/>
                <div hidden={!fnameError} className="sin-input-invalid">Please fill in a first name</div>

                <input className={lnameError ? "sin-input" : "sin-input sin-input-gap"} placeholder="Last Name" ref={lastNameRef} 
                    onInput={() => {
                        if (lastNameRef.current.value) {
                            lastNameRef.current.style.backgroundColor = "#efefef";
                            setlnameError(false);
                        }
                    }}/>
                <div hidden={!lnameError} className="sin-input-invalid">Please fill in a last name</div> </>}
                <input className={emailError ? "sin-input" : "sin-input sin-input-gap"} placeholder="Email" ref={emailRef} 
                    onInput={() => {
                        if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value))) {
                            emailRef.current.style.backgroundColor = "#efefef";
                            setemailError(0);
                        }
                    }}/>
                <div hidden={!(emailError === 1)} className="sin-input-invalid">Invalid email</div>
                <div hidden={!(emailError === 2)} className="sin-input-invalid">Email is in use</div>
                <div hidden={!(emailError === 3)} className="sin-input-invalid">Email not found</div>

                <input className={passwordError ? "sin-input" : "sin-input sin-input-gap"} placeholder="Password" type="password" ref={passwordRef} 
                    onInput={() => {
                        if (passwordRef.current.value) {
                            passwordRef.current.style.backgroundColor = "#efefef";
                            setpasswordError(0);
                        }
                    }}/>
                <div hidden={!(passwordError === 1)} className="sin-input-invalid">Please fill in a password</div>
                <div hidden={!(passwordError === 2)} className="sin-input-invalid">Invalid password</div>

                <button className="sin-submit" onClick={() => {
                    props.login ? login() : submitData()
                }}>
                    {props.login ? "Log in": "Create your account"}
                </button>
            </div>
        </div>
        
        <Warning hidden={!generalError} onClick={() => {setGeneralError(false)}}/>
        
        <div hidden={!loading} className="spinner-border sin-spinner">
            <span className="visually-hidden">Loading...</span>
        </div>
    </>
    );
}

export default Signin;