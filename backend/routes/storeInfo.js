const Store = require("../models/storeModel");
const { Product } = require("../models/productModel");
const express = require("express");
const defaultProductImage = require("../images/defaultProductImage");

const app = express();
app.use(express.json());

const router = express.Router();

//ADD STORE
router.post("/addstore", async (req, res) => {
    const newStore = new Store(req.body);

    try {
        const savedStore = await newStore.save();
        res.status(200).send(savedStore);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//ADD PRODUCT
router.post("/addproduct", async (req, res) => {
    if (!req.body.image) req.body.image = defaultProductImage;
    const newProduct = new Product(req.body);

    try {
        const storeExists = await Store.findOne({ _id: req.body.store });
        if (!storeExists) {
            return res.status(404).send("store with ID not found");
        }
        if (storeExists) {
            const savedProduct = await newProduct.save();
            res.status(200).send(savedProduct);
        }
    } catch (err) {
        // console.log(err);
        res.status(500).send(err);
    }
});

//UPDATE PRODUCT
router.put("/update/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).send(updatedProduct);
        // console.log(updatedProduct);
    } catch (err) {
        res.status(500).send(err);
    }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).send("Product deleted...");
    } catch (err) {
        res.status(500).send(err);
    }
});

//FIND SINGLE PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).send(product);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//GET ALL PRODUCTS IN A STORE
router.get("/all/:storeId", async (req, res) => {
    try {
        const storeExists = await Store.findOne({ _id: req.params.storeId });
        if (!storeExists) {
            return res.status(404).send("store with ID not found");
        }

        if (storeExists) {
            const allProducts = await Product.find({
                store: req.params.storeId,
            });

            if (allProducts.length === 0) {
                return res.status(404).send("Products not available in store");
            }
            res.status(200).send(allProducts);
            //  allProducts = await Product.find();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// get all products in a store
//add products in a store
//find one product in a store
//update one product in a store
//delete one product in a store

module.exports = router;
