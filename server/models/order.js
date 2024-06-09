const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  contact: { type: String, required: true },
  pick_up: { type: String, required: true },
  destination: { type: String, required: true },
  cargo_weight: { type: Number, required: true },
  assigned_driver: { type: String },
  assigned_vehicle: { type: String },
  status: { type: String, default: "Pending" },
  created_at: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Order", orderSchema);
