import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setAdmin, setStoreId } from '../../redux/action/User';
import Warning from './../Warning/Warning';

import "./Register.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register(props) {

    const [loading, setLoading] = useState(false);
    const [fnameError, setfnameError] = useState(false);
    const [lnameError, setlnameError] = useState(false);
    const [emailError, setemailError] = useState(0);
    const [passwordError, setpasswordError] = useState(false);

    const [snameError, setsnameError] = useState(false);
    const [addressError, setaddressError] = useState(false);
    const [pcodeError, setpcodeError] = useState(false);
    const [cityError, setcityError] = useState(false);
    const [provinceError, setprovinceError] = useState(false);
    const [countryError, setcountryError] = useState(false);

    const [generalError, setGeneralError] = useState(false);
    const [errorMessages, setErrorMessages] = useState(["", ""]);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const storeNameRef = useRef(null);

    const addressRef = useRef(null);
    const postalRef = useRef(null);
    const cityRef = useRef(null);
    const provinceRef = useRef(null);
    const countryRef = useRef(null);
    const coverRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user);
    
    
    useEffect(() => {
        // Redirect if user is already a store owner and trying to land on this page
        // really crude rn
        if(localStorage.getItem("storeId")) {
            navigate("/inventory/" + localStorage.getItem("storeId"));
        }
    }, []);

    return( <>
        <div className="reg-parent">
            <div className="reg-bgRow"/>

            <div className="reg-textArea">
                <div style={{display: "inline-block"}}>
                    <h3 className="reg-text">Register your store!</h3>
                    <h4 className="reg-text">inventory managing</h4>
                    <h4 className="reg-text">made easy</h4>

                    <p className="reg-text">If you have an account already</p>
                    <p className="reg-text">You can <Link to="/login?redirect=register"><u>Login here!</u></Link> </p>  
                </div>
            </div>

            <div className="reg-formArea">

                {userState.userId ? null : <>
                <div>
                    <h3>Personal Information</h3>
                </div>

                <div className="reg-formRow">
                    <div className={"reg-input-container " + (fnameError ? "reg-input-container-text-gap" : "reg-input-container-gap")}>
                        <input onChange={() => errorClear("firstName")} placeholder="First name" className="reg-input" ref={firstNameRef}/>
                        <div hidden={!fnameError} className="reg-error">Please enter your first name</div>
                    </div>

                    <div className={"reg-input-container reg-formRowGap " + (lnameError ? "reg-input-container-text-gap" : "reg-input-container-gap")}>
                        <input onChange={() => errorClear("lastName")} placeholder="Last name" className="reg-input" ref={lastNameRef}/> 
                        <div hidden={!lnameError} className="reg-error">Please enter your last name</div>
                    </div>
                </div>

                <div className="reg-formRow">
                    <div className={"reg-input-container " + (emailError ? "reg-input-container-text-gap" : "reg-input-container-gap")}>
                        <input type="email" onChange={() => errorClear("email")} placeholder="Email" className="reg-input" ref={emailRef}/>
                        <div hidden={!(emailError === 1)} className="reg-error">Please enter a valid email address</div>
                        <div hidden={!(emailError === 2)} className="reg-error">Email is already in use</div>
                    </div>

                    <div className={"reg-input-container reg-formRowGap " + (passwordError ? "reg-input-container-text-gap" : "reg-input-container-gap")}>
                        <input type="password" onChange={() => errorClear("password")} placeholder="Password" className="reg-input" ref={passwordRef}/>
                        <div hidden={!passwordError} className="reg-error">Please enter a password</div>
                    </div>
                </div>
                </>}
                <div>
                    <h3>Store Information</h3>
                </div>

                <div className="reg-formRow">
                    <div className={"reg-input-container " + (snameError ? "reg-input-container-text-gap" : "reg-input-container-gap")}>
                        <input placeholder="Store name" onChange={() => errorClear("storeName")} className="reg-input" ref={storeNameRef}/>
                        <div hidden={!snameError} className="reg-error">Please enter a store name</div> 
                    </div>
                    
                    <div className="reg-input-container reg-formRowGap">
                        <input type="file" placeholder="Store name" ref={coverRef}/> 
                    
                        <div>
                            <b>Store Cover Image</b>
                        </div> 
                    </div>
                </div>

                <div>
                    <h4>Store Location</h4>
                </div>

                <div className="reg-formRow">
                    <div className={"reg-input-container " + (addressError ? "reg-input-container-text-gap" : "reg-input-container-gap")}>
                        <input placeholder="Street name" onChange={() => errorClear("address")} className="reg-input" ref={addressRef}/> 
                        <div hidden={!addressError} className="reg-error">Please enter a street address</div>
                    </div>

                    <div className={"reg-input-container reg-formRowGap " + (pcodeError ? "reg-input-container-text-gap" : "reg-input-container-gap")}>
                        <input placeholder="Postal Code" onChange={() => errorClear("postal")} className="reg-input" ref={postalRef} maxLength={7}/>
                        <div hidden={!pcodeError} className="reg-error">Please enter a postal code</div>
                    </div>
                </div>

                <div className="reg-formRow">
                    <div className={"reg-input-container " + (cityError ? "reg-input-container-text-gap" : "reg-input-container-gap")}>
                        <input placeholder="City" onChange={() => errorClear("city")} className="reg-input" ref={cityRef}/>
                        <div hidden={!cityError} className="reg-error">Please enter a city</div>
                    </div>

                    <div className={"reg-input-container reg-formRowGap " + (provinceError ? "reg-input-container-text-gap" : "reg-input-container-gap")}>
                        <input placeholder="Province" onChange={() => errorClear("province")} className="reg-input reg-formRowGap" ref={provinceRef}/>
                        <div hidden={!provinceError} className="reg-error">Please enter a province</div>
                    </div>
                    <div className={"reg-input-container reg-formRowGap reg-last3Row " + (countryError ? "reg-input-container-text-gap" : "reg-input-container-gap")}>
                        <input placeholder="Country" onChange={() => errorClear("country")} className="reg-input" ref={countryRef}/>
                        <div hidden={!countryError} className="reg-error">Please enter a country</div>
                    </div>
                </div>
                
                <div>
                    <h4>Store Times</h4>
                </div>

                <div className="reg-selectRow">
                    <h6 style={{marginRight: "calc(2em)"}}>Monday: </h6> 

                    <select className="reg-selectGap">
                        {times()}
                    </select>
                    
                    <h7 className="reg-TO">To</h7>
                    <select className="reg-selectGap">
                        {times()}
                    </select>
                </div>
                
                <div className="reg-selectRow">
                    <h6 style={{marginRight: "calc(1.9em)"}}>Tuesday: </h6> 

                    <select className="reg-selectGap">
                        {times()}
                    </select>
                    
                    <h7 className="reg-TO">To</h7>
                    <select className="reg-selectGap">
                        {times()}
                    </select>
                </div>

                <div className="reg-selectRow">
                    <h6 style={{marginRight: "5px"}}>Wednesday: </h6> 

                    <select className="reg-selectGap">
                        {times()}
                    </select>
                    
                    <h7 className="reg-TO">To</h7>
                    <select className="reg-selectGap">
                        {times()}
                    </select>
                </div>

                <div className="reg-selectRow">
                    <h6 style={{marginRight: "calc(1em + 5px)"}}>Thursday: </h6> 

                    <select className="reg-selectGap">
                        {times()}
                    </select>
                    
                    <h7 className="reg-TO">To</h7>
                    <select className="reg-selectGap">
                        {times()}
                    </select>
                </div>

                <div className="reg-selectRow">
                    <h6 style={{marginRight: "calc(2em + 10px)"}}>Friday: </h6> 

                    <select className="reg-selectGap">
                        {times()}
                    </select>
                    
                    <h7 className="reg-TO">To</h7>
                    <select className="reg-selectGap">
                        {times()}
                    </select>
                </div>

                <div className="reg-selectRow">
                    <h6 style={{marginRight: "calc(1em + 5px)"}}>Saturday: </h6> 

                    <select className="reg-selectGap">
                        {times()}
                    </select>
                    
                    <h7 className="reg-TO">To</h7>
                    <select className="reg-selectGap">
                        {times()}
                    </select>
                </div>

                <div className="reg-selectRow">
                    <h6 style={{marginRight: "calc(2em)"}}>Sunday: </h6> 

                    <select className="reg-selectGap">
                        {times()}
                    </select>
                    
                    <h7 className="reg-TO">To</h7>
                    <select className="reg-selectGap">
                        {times()}
                    </select>
                </div>
                <div>*Please select operating hours for atleast one day</div>

                <button onClick={() => {handleSubmit()}} className="reg-submit">Submit</button>
            </div>

        </div>

        <div class="spinner-border reg-loader" hidden={!loading}>
            <span class="sr-only">Loading...</span>
        </div>
        
        <Warning hidden={!generalError} onClick={() => {setErrorMessages(["",""]); setGeneralError(false)}} lineOne={errorMessages[0]} lineTwo={errorMessages[1]}/>
        <ToastContainer />
        
        </>);

        // To handle final submission of details
        async function handleSubmit() {
            console.log(1);
            let firstName, lastName, email, password;
            console.log(2);
            if(!userState.userId) {
                firstName = firstNameRef.current.value;
                lastName = lastNameRef.current.value;
        
                email = emailRef.current.value;
                password = passwordRef.current.value;
            }
            console.log(3);
            const storeName = storeNameRef.current.value;
    
            const address = addressRef.current.value;
            const city = cityRef.current.value;
            const province = provinceRef.current.value;
            const country = countryRef.current.value;
    
            const postalCode = postalRef.current.value;
            console.log(4);
            const imgData = await readImageAsync();
            let validSubmission = true;
            console.log(5);
            
            // TODO
            if (!userState.userId) {
                if (firstName === "") {
                    firstNameRef.current.className += " reg-invalid";
                    setfnameError(true);
                    validSubmission = false;
                }
        
                if (lastName === "") {
                    lastNameRef.current.className += " reg-invalid";
                    setlnameError(true);
                    validSubmission = false;
                }
        
                if (email === "") {
                    emailRef.current.className += " reg-invalid";
                    setemailError(1);
                    validSubmission = false;
                }
        
                if (password === "") {
                    passwordRef.current.className += " reg-invalid";
                    setpasswordError(true);
                    validSubmission = false;
                }
                console.log("hello3");
            }

            if (storeName === "") {
                storeNameRef.current.className += " reg-invalid";
                setsnameError(true);
                validSubmission = false;
            }
    
            if (address === "") {
                addressRef.current.className += " reg-invalid";
                setaddressError(true);
                validSubmission = false;
            }
    
            if (city === "") {
                cityRef.current.className += " reg-invalid";
                setcityError(true);
                validSubmission = false;
            }
    
            if (province === "") {
                provinceRef.current.className += " reg-invalid";
                setprovinceError(true);
                validSubmission = false;
            }
    
            if (country === "") {
                countryRef.current.className += " reg-invalid";
                setcountryError(true);
                validSubmission = false;
            }
    
            if (postalCode === "") {
                postalRef.current.className += " reg-invalid";
                setpcodeError(true);
                validSubmission = false;
            }
    
            if (validSubmission) {
                
                let bodyJSON = userState.userId ? {
                    storeName: storeName,
                    storeAddress: address + ", " + city + ", " + province + ", " + postalCode.toUpperCase(),
                    storeHours: "10 AM - 9 PM", // Hours arent being used rn
                    storeImage: imgData,
                    token: userState.userToken
                } 
                : {
                    firstName: firstName,
                    lastName: lastName,
    
                    email: email,
                    password: password,
    
                    storeName: storeName,
                    storeAddress: address + ", " + city + ", " + province + ", " + postalCode.toUpperCase(),
                    storeHours: "10 AM - 9 PM", // Hours arent being used rn
                    storeImage: imgData
                };
                setLoading(true);
                console.log(6);
                
                const url = userState.userId ? "https://grocery-pickup-backend.onrender.com/admin/createstore" : "https://grocery-pickup-backend.onrender.com/admin/signup";
                
                fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(bodyJSON)
                })
                .then((response) => {
    
                    if(!response.ok) {
                        console.log("welp: " + response.status);
                    }
    
                    return response.json();
                })
                .then(data => {
    
                    // Garbage data
                    if (!data) {
                        console.log("dead");
                        return;
                    } 
                    
                    console.log(data);
                    if(data.message === "Success") {
                        console.log("hello");
                        if(userState.userId) {
                            dispatch(setStoreId(data.storeID));

                            localStorage.setItem("storeId", data.storeID);
                        }
                        else {
                            dispatch(setAdmin({
                                firstName: data.firstName,
                                lastName: data.lastName,
                                userToken: data.token,
                                userId: data.userID,
                                storeId: data.storeID
                            }));

                            localStorage.setItem("firstName", data.firstName);
                            localStorage.setItem("lastName", data.lastName);
                            localStorage.setItem("userToken", data.token);
                            localStorage.setItem("userId", data.userID);
                            localStorage.setItem("storeId", data.storeID);
                        }

                        setLoading(false);

                        // Potential problem?
                        const address = "/inventory/" + data.storeID;
                        navigate(address);     
                    }
                    else if(data.message === "Invalid request") {
                        console.log("Invalid request");
                        setGeneralError(true);
                        setLoading(false);
                    }
                    else if(data.message === "Invalid Credentials" || data.message === "User doesnt exist") {
                        setErrorMessages(["We're having difficulties authenticating.", "Please login again."]);
                        console.log("Invalid credentials, user doesnt exist");
                        setGeneralError(true);
                        setLoading(false);
                    }
                    else if(data.message === "error getting address info") {
                        setErrorMessages(["We're having difficulties getting your address.", "Please enter a different address."]);
                        console.log("address difficulties");
                        setGeneralError(true);
                        setLoading(false);
                    }
                });
                toast.success("Store registered successfully", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
           
        }

        function errorClear(eventName) {
            switch (eventName) {
                case "firstName":
                    if (firstNameRef.current.value) {
                        firstNameRef.current.className = "reg-input";
                        setfnameError(false);
                    }
                break;

                case "lastName":
                    if (lastNameRef.current.value) {
                        lastNameRef.current.className = "reg-input";
                        setlnameError(false);
                    }
                break;

                case "email":
                    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value))) {
                        emailRef.current.className = "reg-input";
                        setemailError(0);
                    }
                break;

                case "password":
                    if (passwordRef.current.value) {
                        passwordRef.current.className = "reg-input";
                        setpasswordError(false);
                    }
                break;

                case "storeName":
                    if (storeNameRef.current.value) {
                        storeNameRef.current.className = "reg-input";
                        setsnameError(false);
                    }
                break;

                case "address":
                    if (addressRef.current.value) {
                        addressRef.current.className = "reg-input";
                        setaddressError(false);
                    }
                break;

                case "postal":
                    if (postalRef.current.value) {
                        postalRef.current.className = "reg-input";
                        setpcodeError(false);
                    }
                break;

                case "city":
                    if (cityRef.current.value) {
                        cityRef.current.className = "reg-input";
                        setcityError(false);
                    }
                break;

                case "province":
                    if (provinceRef.current.value) {
                        provinceRef.current.className = "reg-input";
                        setprovinceError(false);
                    }
                break;

                case "country":
                    if (countryRef.current.value) {
                        countryRef.current.className = "reg-input";
                        setcountryError(false);
                    }
                break;

                
                default:
                break;
            }
        }

        function readImageAsync() {

            if (coverRef.current.files[0]) {
                return new Promise((resolve, reject) => {
                    let reader = new FileReader();

                    reader.onloadend = () => {
                        resolve(reader.result);
                    }

                    reader.onerror = reject;
                    
                    reader.readAsDataURL(coverRef.current.files[0]);
                }); 
            }
            else {
                return "";
            }
        }
}

function times() {
    let time = [<option value=""/>];

    for (let i = 0; i < 2; i++) {
        for (let j = 1; j <= 12; j++) {
            let value = i === 0 ? j + " PM" : j + " AM"
            time.push(<option value={value}>{value}</option>);
        }
    }

    return time;
}

