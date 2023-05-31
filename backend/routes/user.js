const User = require("../models/userModel")
const crypto = require("crypto");
const express = require('express');
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/verifyToken");
const Admin = require("../models/adminModel");

const router = express.Router();

/*
    Return JWT for session?
    Update response message schema??
*/

router.post('/login', async function(req, res) {
  if (!req.body.email ||
    !req.body.password) {
    return res.status(400).json({
      message: "Invalid Request"
    });
  };

  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  };

  const hashedPassword = crypto.scryptSync(req.body.password, user.salt, 64).toString("hex");

  if (hashedPassword !== user.password) {
    return res.status(401).json({
      message: "Invalid password"
    });
  };

  const userID = user._id.toString();

  const token = jwt.sign({
      userID: userID,
    },
    process.env.JWT_SECRET, {
      expiresIn: "30d",
    }
  );

  console.log(user.storeID)

  let response = {
    message: "Success",
    firstName: user.firstName,
    lastName: user.lastName,
    token: token,
    userID: userID
  };

  if (user.storeID) response.storeID = user.storeID.toString();

  res.status(201).json(response);
});

router.post('/signup', async function(req, res) {
  if (!req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password) {
    return res.status(400).json({
      message: "Invalid request"
    });
  };

  const doesExists = await User.exists({
    email: req.body.email
  });

  if (doesExists) {
    return res.status(409).json({
      message: "email exists"
    });
  };

  const salt = crypto.randomBytes(16).toString("hex");

  const hashedPassword = crypto.scryptSync(req.body.password, salt, 64).toString("hex");

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    salt: salt,
    password: hashedPassword
  });
  await newUser.save();

  const userID = newUser._id.toString();

  const token = jwt.sign({
      userID: userID,
    },
    process.env.JWT_SECRET, {
      expiresIn: "30d",
    }
  );

  res.status(201).json({
    message: "Success",
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    token: token,
    userID: userID
  });
});

router.post('/status', async function(req, res) {
  if (!req.body.token || !req.body.userID) {
    return res.status(400).json({
      message: "Invalid Request"
    });
  };

  try {
    const userID = verifyToken(req.body.token);
    if (userID !== req.body.userID) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }
    const user = await User.findOne({
      _id: userID
    });

    let response = {
      message: "Success",
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
      userID: userID
    };
  
    if (user.storeID) response.storeID = user.storeID.toString();

    return res.status(200).json(response);
  } catch (e) {
    console.log(e)
    return res.status(401).json({
      message: "Invalid Session",
    });
  }
});

module.exports = router;