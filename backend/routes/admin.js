// const Admin = require("../models/adminModel");
const Store = require("../models/storeModel");
const crypto = require("crypto");
const express = require("express");
const jwt = require("jsonwebtoken");
const queryAddress = require("../utils/queryAddress");
const defaultStoreImage = require("../images/defaultStoreImage");
const verifyToken = require("../utils/verifyToken");
const userModel = require("../models/userModel");

const router = express.Router();

/*
    Return JWT for session?
    Update response message schema??
*/

// router.post("/login", async function(req, res) {
//   if (!req.body.email || !req.body.password) {
//     return res.status(400).json({
//       message: "Invalid Request",
//     });
//   }

//   const admin = await Admin.findOne({
//     email: req.body.email,
//   });

//   if (!admin) {
//     return res.status(404).json({
//       message: "Admin not found",
//     });
//   }

//   const hashedPassword = crypto
//     .scryptSync(req.body.password, admin.salt, 64)
//     .toString("hex");

//   if (hashedPassword !== admin.password) {
//     return res.status(401).json({
//       message: "Invalid password",
//     });
//   }

//   const adminID = admin._id.toString();

//   const token = jwt.sign({
//       adminID: adminID,
//     },
//     process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     }
//   );

//   res.status(201).json({
//     message: "Success",
//     firstName: admin.firstName,
//     lastName: admin.lastName,
//     token: token,
//     adminID: adminID,
//     storeID: admin.storeID
//   });
// });

router.post("/signup", async function(req, res) {
  if (!req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.storeName ||
    !req.body.storeAddress ||
    !req.body.storeHours) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }

  const doesExists = await userModel.exists({
    email: req.body.email,
  });

  if (doesExists) {
    return res.status(409).json({
      message: "email exists",
    });
  }

  const addressInfo = await queryAddress(req.body.storeAddress);

  if (!addressInfo) {
    return res.status(500).json({
      message: "error getting address info",
    });
  }

  const formattedAddress = addressInfo.formatted_address;
  const coordinates = [
    addressInfo.geometry.location.lng,
    addressInfo.geometry.location.lat,
  ];

  const salt = crypto.randomBytes(16).toString("hex");

  const hashedPassword = crypto
    .scryptSync(req.body.password, salt, 64)
    .toString("hex");

  const newStore = new Store({
    name: req.body.storeName,
    address: formattedAddress,
    image: req.body.storeImage || defaultStoreImage,
    location: {
      type: "Point",
      coordinates: coordinates,
    },
    hours: req.body.storeHours,
  });
  await newStore.save();

  const storeID = newStore._id;

  const newAdmin = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    salt: salt,
    password: hashedPassword,
    storeID: newStore._id,
  });
  await newAdmin.save();

  const userID = newAdmin._id.toString();

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
    userID: userID,
    storeID: storeID
  });
});

router.post("/createstore", async function(req, res) {
  if (!req.body.storeName ||
    !req.body.storeAddress ||
    !req.body.storeHours ||
    !req.body.token
  ) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }

  const userID = verifyToken(req.body.token);

  if (!userID) {
    return res.status(440).json({
      message: "Invalid Credentials",
    });
  }

  const user = await userModel.exists({
    userID: userID,
  });

  if (!user) {
    return res.status(409).json({
      message: "User doesnt exist",
    });
  }

  const addressInfo = await queryAddress(req.body.storeAddress);

  if (!addressInfo) {
    return res.status(500).json({
      message: "error getting address info",
    });
  }

  const formattedAddress = addressInfo.formatted_address;
  const coordinates = [
    addressInfo.geometry.location.lng,
    addressInfo.geometry.location.lat,
  ];

  const newStore = new Store({
    name: req.body.storeName,
    address: formattedAddress,
    image: req.body.storeImage || defaultStoreImage,
    location: {
      type: "Point",
      coordinates: coordinates,
    },
    hours: req.body.storeHours,
  });
  await newStore.save();

  const storeID = newStore._id;

  await userModel.updateOne({
      userID: userID
  }, {
      $set: {
          storeID: storeID
      }
  });

  res.status(201).json({
    message: "Success",
    storeID: storeID
  });
});

module.exports = router;