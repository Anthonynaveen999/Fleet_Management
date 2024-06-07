const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: String,
  aadharNumber: String,
  licenseNumber: String,
  currentLocation: String,
  contact: Number,
  preferredDestinations: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Driver", driverSchema);
