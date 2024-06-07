const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  contact: { type: String, required: true },
  pick_up: { type: String, required: true },
  destination: { type: String, required: true },
  cargo_weight: { type: Number, required: true },
  assigned_driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  assigned_vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  status: { type: String, default: "Pending" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
