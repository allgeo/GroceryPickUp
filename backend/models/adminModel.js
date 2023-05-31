const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    salt: String,
    password: String,
    adminID: mongoose.Schema.Types.ObjectId,
    storeID: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Admin", adminSchema);
