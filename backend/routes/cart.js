const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const Cart = require("../models/cartModel");
const express = require("express");

const router = express.Router();

//CREATE USER CART

router.post("/add", async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).send(savedCart);
    } catch (err) {
        res.status(500).send(err);
    }
});

//UPDATE USER CART
router.put("/update/:id", async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).send(updatedCart);
    } catch (err) {
        res.status(500).send(err);
    }
});

//DELETE USER CART
router.delete("/delete/:id", async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).send("Cart deleted...");
    } catch (err) {
        res.status(500).send(err);
    }
});

//GET USER CART
router.get("/find/:id", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).send(cart);
    } catch (err) {
        res.status(500).send(err);
    }
});

//GET ALL CART

router.get("/all", async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).send(carts);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
