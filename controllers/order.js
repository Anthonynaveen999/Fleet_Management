const mongoose = require("mongoose");
const Order = require("../models/order.js");

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const order = new Order({
    customer_name: req.body.customer_name,
    contact: req.body.contact,
    pick_up: req.body.pick_up,
    destination: req.body.destination,
    cargo_weight: req.body.cargo_weight,
    assigned_driver: req.body.assigned_driver,
    assigned_vehicle: req.body.assigned_vehicle,
    status: req.body.status,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }

    await order.remove();
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }

    if (req.body.customer_name != null) {
      order.customer_name = req.body.customer_name;
    }
    if (req.body.contact != null) {
      order.contact = req.body.contact;
    }
    if (req.body.pick_up != null) {
      order.pick_up = req.body.pick_up;
    }
    if (req.body.destination != null) {
      order.destination = req.body.destination;
    }
    if (req.body.cargo_weight != null) {
      order.cargo_weight = req.body.cargo_weight;
    }
    if (req.body.assigned_driver != null) {
      order.assigned_driver = req.body.assigned_driver;
    }
    if (req.body.assigned_vehicle != null) {
      order.assigned_vehicle = req.body.assigned_vehicle;
    }
    if (req.body.status != null) {
      order.status = req.body.status;
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  createOrder,
  deleteOrder,
  updateOrder,
};

