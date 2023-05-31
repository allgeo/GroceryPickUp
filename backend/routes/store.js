const Store = require("../models/storeModel")
const express = require('express');
const jwt = require("jsonwebtoken");
const queryAddress = require('../utils/queryAddress');

const router = express.Router();

router.get('/search', async function(req, res) {
  if (!req.query.address) {
    return res.status(400).json({
      message: "Invalid Request"
    });
  };
  
  const addressInfo = await queryAddress(req.query.address);

  if (!addressInfo) {
    return res.status(500).json({
      message: "error getting address info"
    });
  };

  const coordinates = [addressInfo.geometry.location.lng, addressInfo.geometry.location.lat];

  const availableStores = await Store.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: coordinates
        },
        $maxDistance: 5000 // Update this
      }
    }
  });

  res.status(201).json({
    message: "Success",
    availableStores: availableStores
  });
});

module.exports = router;