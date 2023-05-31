import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import './Inventory.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Inventory(props) {
    
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const state = useSelector(state => state.user);

    const productName = useRef(null);
    const productDesc = useRef(null);
    const productPrice = useRef(null);
    const productCount = useRef(null);
    const productImage = useRef(null);

    const [editing, setEditing] = useState(-1);
    const [items, setItems] = useState ([]);
    const { storeId } = useParams();

    useEffect(() => {
        fetchDetails();
    }, [modal, editing])

    return (
    <>
        <div className={modal ? "inv-blured" : ""}>
            <h3 style={{marginLeft: "1em"}}>Inventory Management</h3>
            
            <div className="inv-parent">
                <div className="inv-tableArea">
                    <table class="table table-striped">
                        <thead className="inv-tableHeader">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Count</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filler()}
                        </tbody>
                    </table> 
                </div>
                <div style={{position: "sticky", top: "0px"}}>
                    <button className="inv-newButton" onClick={() => setModal(true)}>
                        <h5>Add a new Product</h5>
                    </button> 
                </div>
            </div>
        </div>
        
        <div className="spinner-border inv-loader" hidden={!loading}>
            <span className="sr-only">Loading...</span>
        </div>

        <div className="inv-modal" hidden={!modal}>
        <div className="inv-modal-rowGap">
            <b> Product Name</b>
            <input ref={productName}></input> 
        </div>

        <div className="inv-modal-rowGap">
            <b>Product Description</b>
        </div>
        <textarea ref={productDesc}></textarea>
        <div className="inv-modal-rowGap">
            <b>Product Price</b>
            <input ref={productPrice}></input> 
        </div>

        <div className="inv-modal-rowGap">
            <b>Product Count</b> 
            <input ref={productCount}></input>
        </div>

        <div className="inv-modal-rowGap">
            <b>Product Image (Optional):</b> 
            <input ref={productImage} type="file" accept="image/*"></input>
        </div>
        <div className="inv-modal-rowGap" style={{display: "flex"}}>
            <button className="inv-modalButton" onClick={onSubmit}>
                <b>Add or Update Product</b>
            </button>
        </div>

        <div className="inv-modal-rowGap" style={{display: "flex"}}>
            <u style={{marginLeft: "auto", marginRight: "auto", cursor: "pointer", userSelect: "none"}} onClick={() => closeModal()}>Cancel</u> 
        </div>
        </div> 
        <ToastContainer />

    </>
    );


    function filler() {
        let temp = [];

        for (let i = 0; i < items.length; i++) {
        
            temp.push(
                <tr>
                    <th scope="row">{i}</th>
                    <td>{items[i].name}</td>
                    <td>{items[i].quantity}</td>
                    <td>${items[i].price}</td>
                    <td>
                        <button className="inv-button inv-button-edit" onClick={() => {
                            console.log(items[i]);
                            setEditing(i);
                            productName.current.value = items[i].name;
                            productDesc.current.value = items[i].description;
                            productPrice.current.value = items[i].price;
                            productCount.current.value = items[i].quantity;
                            setModal(true);
                        }}>Edit</button>
                        <button className="inv-button inv-button-delete" onClick={() => {onDelete(i)}}>Delete</button>
                    </td>
                </tr>);
            }

        return temp;
    }
    

    function closeModal() {
        setModal(false);
        setEditing(-1);
        productName.current.value = "";
        productDesc.current.value = "";
        productPrice.current.value = "";
        productCount.current.value = "";
    }


    async function onSubmit() {
        console.log("Name: " + productName.current.value);
        console.log("Desc: " + productDesc.current.value);
        console.log("Price: " + productPrice.current.value);
        console.log("Count: " + productCount.current.value);

        const imgData = await readImageAsync();
        let submit = true;

        // Check for valid results
        // no empty inputs, no decimal item counts
        // no negatives
        if (productName.current.value === "") {
            productName.current.style.backgroundColor = "lightpink";
            submit = false;
        } 
        else {
            productName.current.style.backgroundColor = "#efefef";
        }

        if (productDesc.current.value === "") {
            productDesc.current.style.backgroundColor = "lightpink";
            submit = false;
        } 
        else {
            productDesc.current.style.backgroundColor = "#efefef";
        }

        if (productPrice.current.value === "" || (productPrice.current.value.match(/^-?\d+$/) === null && productPrice.current.value.match(/^\d+\.\d+$/) === null)) {
            productPrice.current.style.backgroundColor = "lightpink";
            submit = false;
        } 
        else {
            productPrice.current.style.backgroundColor = "#efefef";
        }

        if (productCount.current.value === "" || (!productCount.current.value.match(/^-?\d+$/) && productPrice.current.value.match(/^\d+\.\d+$/) !== null) ||
            productCount.current.value.startsWith("-")) {
            productCount.current.style.backgroundColor = "lightpink";
            submit = false;
        } 
        else {
            productCount.current.style.backgroundColor = "#efefef";
        }

        console.log("Submit: " + submit);
        
        if (submit) {
            
            let bodyJSON = editing === -1 ? { 
                name: productName.current.value,
                price: productPrice.current.value,
                quantity: productCount.current.value,
                description: productDesc.current.value,
                store: storeId,
                image: imgData
            } : { 
                name: productName.current.value,
                price: productPrice.current.value,
                quantity: productCount.current.value,
                description: productDesc.current.value,
                _id: items[editing]._id,
                image: imgData
            }


            setLoading(true);

            const toFetch = editing === -1 ? "https://grocery-pickup-backend.onrender.com/storeInfo/addproduct" :
                ("https://grocery-pickup-backend.onrender.com/storeInfo/update/" + items[editing]._id)
            fetch(toFetch, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': state.userToken
                },
                method: editing === -1 ? "POST" : "PUT",
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
                    console.log(data);
                    return;
                } 
                else {
                    console.log(data);
                    setEditing(-1);
                }
                setLoading(true);
                closeModal();
            });

            toast.success("Stock updated successfully", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }

    function fetchDetails () {
        console.log(state);
        const url = "https://grocery-pickup-backend.onrender.com/storeInfo/all/" + storeId;
        console.log(url);
        setLoading(true);
        fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET"
            })
            .then((response) => {

                if(!response.ok) {
                    console.log("welp: " + response.status);
                    setLoading(false);
                }

                return response.json();
            })
            .then(data => {

                // Garbage data
                if (!data) {
                    setLoading(false);
                    return;
                } 
                else {
                    console.log("items retrieved");
                    setItems(data);
                }

                setLoading(false);
            });
    }

    function onDelete (i) {

        setLoading(true);
        fetch("https://grocery-pickup-backend.onrender.com/storeInfo/delete/" + items[i]._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': state.userToken
            },
            method: "DELETE"
        }).then((response) => {

            if(!response.ok) {
                console.log("welp-delete: " + response.status);
                return;
            }
            else {
                let tempArray = [];

                for (let index = 0; index < items.length; index++) {
                    if (index !== i) {
                        tempArray.push(items[index]);
                    }
                }
                setItems(tempArray);
            }

            setLoading(false);
        })       
    }

    function readImageAsync() {

        if (productImage.current.files[0]) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();

                reader.onloadend = () => {
                    resolve(reader.result);
                }

                reader.onerror = reject;
                
                reader.readAsDataURL(productImage.current.files[0]);
            }); 
        }
        else {
            return "";
        }
    }
}