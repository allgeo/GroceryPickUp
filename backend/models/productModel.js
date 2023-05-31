const mongoose = require("mongoose");

const productScheme = new mongoose.Schema(
    {
        name: String,
        image: String,
        description: String,
        price: Number,
        quantity: Number,
        store: mongoose.Schema.Types.ObjectId,
        inStock: { type: Boolean, default: true },
    },

    { timestamps: true }
);

const Product = mongoose.model("Product", productScheme);

module.exports = { Product };
