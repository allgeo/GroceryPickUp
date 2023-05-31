const express = require('express');
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const Order = require('../models/orderModel');
const verifyToken = require("../utils/verifyToken");
const nodemailer = require("nodemailer");

var transporter
(async function() {
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
})();


const router = express.Router();

router.post('/order', async function(req, res) {
  const userID = verifyToken(req.body.token);

  if (!userID) {
    return res.status(440).json({
      message: "Invalid Credentials",
    });
  }

  const user = await User.findOne({
    _id: userID
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  };

  const products = req.body.products;
  const orderID = (Math.random()*1000000).toFixed(0);
  
  const newOrder = new Order({
    orderID: orderID,
    userID: userID,
    storeID: req.body.storeID,
    products: products
  });
  await newOrder.save();

  let text = `Order ${orderID} Confirmation from pickUP\n\nProducts Ready for Pickup (Title - Price)\n\n`;

  for (let x = 0; x < products.length; x++) {
    text += `${products[x].name} - ${products[x].price}\n`
  }

  text += "\nPickup when Ready!";
  pusher.trigger(req.body.storeID, "new-order", {
    orderID: orderID,
    products: products
  });

  let msg;
  try {
    msg = await transporter.sendMail({
      from: '"Order Confirmation" <order@pickup.com>', // sender address
      to: user.email, // list of receivers
      subject: "Order Confirmation " + orderID, // Subject line
      text: text
    });
  } catch (e) {
    console.log(e);
    return res.send(500).json({
      message: "failed"
    })
  };
  res.status(201).json({
    message: "Success",
    emailURL: nodemailer.getTestMessageUrl(msg)
  });
});

router.post('/orders', async function(req, res) {
  try {
    const orders  = await Order.findOne({
      storeID: req.body.storeID
    });
    res.status(200).send(orders);
} catch (err) {
    res.status(500).send(err);
}
});

router.post('/confirm', async function(req, res) {
  // const adminID = verifyToken(req.body.token);

  // if (!adminID) {
  //   return res.status(440).json({
  //     message: "Invalid Credentials",
  //   });
  // }

  const orderID = req.body.orderID;
  const order = await Order.findOne({
    orderID: orderID
  })

  if (!order) {
    return res.status(404).json({
      message: "Order not found"
    });
  }

  const user = await User.findOne({
    _id: order.userID
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  };


  let text = `Order ${orderID} is Ready for Pickup\n\nProducts Ready for Pickup (Title - Price)\n\n`;

  const products = order.products;
  for (let x = 0; x < products.length; x++) {
    text += `${products[x].name} - ${products[x].price}\n`
  }

  text += "\nPickup when Ready!";


  let msg;
  try {
    msg = await transporter.sendMail({
      from: '"Order Ready for Pickup" <order@pickup.com>', // sender address
      to: user.email, // list of receivers
      subject: "Order Ready for Pickup " + orderID, // Subject line
      text: text
    });
  } catch (e) {
    console.log(e);
    return res.send(500).json({
      message: "failed"
    })
  };
  res.status(201).json({
    message: "Success",
    emailURL: nodemailer.getTestMessageUrl(msg)
  });
});

router.post('/cancel', async function(req, res) {
  // const adminID = verifyToken(req.body.token);

  // if (!adminID) {
  //   return res.status(440).json({
  //     message: "Invalid Credentials",
  //   });
  // }

  const orderID = req.body.orderID;
  const order = await Order.findOne({
    orderID: orderID
  })

  if (!order) {
    return res.status(404).json({
      message: "Order not found"
    });
  }

  const user = await User.findOne({
    _id: order.userID
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  };


  let text = `Order ${orderID} is Cancelled\n\nProducts Cancelled (Title - Price)\n\n`;

  const products = order.products;
  for (let x = 0; x < products.length; x++) {
    text += `${products[x].name} - ${products[x].price}\n`
  }

  let msg;
  try {
    msg = await transporter.sendMail({
      from: '"Order Cancelled" <order@pickup.com>', // sender address
      to: user.email, // list of receivers
      subject: "Order Cancelled " + orderID, // Subject line
      text: text
    });
  } catch (e) {
    console.log(e);
    return res.send(500).json({
      message: "failed"
    })
  };
  res.status(201).json({
    message: "Success",
    emailURL: nodemailer.getTestMessageUrl(msg)
  });
});




module.exports = router;
