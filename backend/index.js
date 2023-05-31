
const express = require("express");
const user = require("./routes/user");
const admin = require("./routes/admin");
const cart = require("./routes/cart");
const store = require('./routes/store');
const storeInfo = require("./routes/storeInfo");
const checkout = require('./routes/checkout');
const cors = require("cors");

const app = express();
app.use(express.json({
  limit: "500MB"
}));
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}));

const env = process.env.NODE_ENV || "development";

if (env == "development") require("dotenv").config();

const port = process.env.PORT || 3000;

const mongoose = require("mongoose");

const CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost/CPS731";

mongoose.connect(CONNECTION_URI, (err) => {
  if (err) {
      console.log(err)
  };
});

const Pusher = require("pusher");
const PusherAppKey = "abe185cdca80fe92b3cb";

global.pusher = new Pusher({
    appId: "1486742",
    key: PusherAppKey,
    secret: process.env.PUSHER_SECRET,
    cluster: "us2",
});


app.use("/user", user);
app.use("/admin", admin);
app.use("/cart", cart);
app.use("/storeInfo", storeInfo);
app.use('/store', store);
app.use('/checkout', checkout)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
