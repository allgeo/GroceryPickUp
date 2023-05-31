const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    salt: String,
    password: String,
    storeID: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("User", userSchema);
