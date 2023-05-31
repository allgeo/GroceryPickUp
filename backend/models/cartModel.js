const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
    {
        cart: {
            products: [],
            totalPrice: Number,
            //totalPrice = quantity * price (for the font-end)
        },

        cartID: mongoose.Schema.Types.ObjectId,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
