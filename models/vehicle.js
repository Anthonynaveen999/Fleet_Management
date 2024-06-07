const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  serial_number: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  driver_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Driver" 
},
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
