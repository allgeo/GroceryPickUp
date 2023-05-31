const User = require("../models/userModel")
const crypto = require("crypto");
const express = require('express');

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

  res.status(201).json({
    message: "Success"
  });
});

router.post('/signup', async function(req, res) { 
  if (!req.body.name ||
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
    userID: crypto.randomUUID(),
    name: req.body.name,
    email: req.body.email,
    salt: salt,
    password: hashedPassword
  });
  await newUser.save();

  res.status(201).json({
    message: "Success"
  });
});

module.exports = router;