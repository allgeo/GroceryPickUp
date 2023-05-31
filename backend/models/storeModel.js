const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
  name: String,
  address: String,
  image: String,
  location: {
    type: {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
  hours: String,
});
storeSchema.index({ location: '2dsphere' });


module.exports = mongoose.model("Store", storeSchema);
