import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js/with-encryption';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Admin.css';

export default function Admin(props) {

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState(false);

    const { storeId } = useParams();

    const userState = useSelector((state) => state.user);

    useEffect(() => {
        const pusher = new Pusher("abe185cdca80fe92b3cb", {
            cluster: "us2",
            encrypted: true,
            forceTLS: true
        });

        pusher.connection.bind("connected", () => {
            console.log("Websocket Connected");
        });

        pusher.connection.bind("unavailable", () => {
            console.log("Websocket Disconnected");
        });

        const channel = pusher.subscribe(storeId); // storeId

        // Pub sub
        // The websocket is subscribed to the backend server and will add new data to the table when
        // a user reserves their cart
        channel.bind("new-order", function (data) {
            console.log("Received a new order: ");

            data.products[0].orderId = data.orderID;

            // dirty code
            items.push(data.products[0]);
            setItems(items);
        });

        fetchOrders();
    }, []);

    return (<>
        <div>
            <h3 style={{ marginLeft: "1em" }}>Order Confirmations</h3>

            <div className="inv-parent">
                <div className="inv-tableArea">
                    <table class="table table-striped">
                        <thead className="inv-tableHeader">
                            <tr>
                                <th scope="col">Order Number</th>
                                <th scope="col">Items</th>
                                <th scope="col">Total</th>
                                <th scope="col">Order Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filler()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="spinner-border inv-loader" hidden={!loading}>
            <span class="sr-only">Loading...</span>
        </div>
    </>
    );

    function filler() {
        let temp = [];

        for (let i = 0; i < items.length; i++) {
        
            temp.push(
                <tr>
                    <th scope="row">{items[i].orderId}</th>
                    <td>{items[i].name}</td>
                    <td>${items[i].price}</td>
                    <td>
                        <button className="inv-button inv-button-edit" onClick={() => {confirmOrder(items[i].orderId, "confirm")}}>Confirm</button>
                        <button className="inv-button inv-button-delete" onClick={() => {confirmOrder(items[i].orderId, "cancel")}}>Cancel</button>
                    </td>
                </tr>);
            }

        return temp;
    }

    async function fetchOrders() {
        setLoading(true);
        const result = await fetch('https://grocery-pickup-backend.onrender.com/checkout/orders', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': userState.userToken
            },
            body: JSON.stringify({storeID: storeId})
        });
        setLoading(false);
        const resultInJson = await result.json();

        resultInJson.products[0].orderId = resultInJson.orderID;

        setItems(resultInJson.products);
    }

    async function confirmOrder(orderId, type) {
        setLoading(true);

        const url = type === "confirm" ? "https://grocery-pickup-backend.onrender.com/checkout/confirm" : "https://grocery-pickup-backend.onrender.com/checkout/cancel"
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': userState.userToken
            },
            body: JSON.stringify({orderID: orderId})
        });

        const resultInJson = await result.json();

        console.log(resultInJson.message);
        setLoading(false);
    }
}