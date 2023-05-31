const express = require('express');
const user = require('./routes/user');

const app = express();
app.use(express.json());

const port = 3000;

const mongoose = require("mongoose");

const CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost/CPS731";

mongoose.connect(CONNECTION_URI, (err) => {
  if (err) {
      console.log(err)
  };
});

app.use('/user', user);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})