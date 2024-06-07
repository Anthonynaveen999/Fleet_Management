const mongoose = require("mongoose");
const Vehicle = require("../models/vehicle.js");

// Get all vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new vehicle
const createVehicle = async (req, res) => {
  const vehicle = new Vehicle({
    serial_number: req.body.serial_number,
    type: req.body.type,
    capacity: req.body.capacity,
    driver_id: req.body.driver_id,
  });

  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a vehicle
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle == null) {
      return res.status(404).json({ message: 'Cannot find vehicle' });
    }

    await vehicle.remove();
    res.status(200).json({ message: 'Vehicle deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a vehicle
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle == null) {
      return res.status(404).json({ message: 'Cannot find vehicle' });
    }

    if (req.body.serial_number != null) {
      vehicle.serial_number = req.body.serial_number;
    }
    if (req.body.type != null) {
      vehicle.type = req.body.type;
    }
    if (req.body.capacity != null) {
      vehicle.capacity = req.body.capacity;
    }
    if (req.body.driver_id != null) {
      vehicle.driver_id = req.body.driver_id;
    }
    if (req.body.maintenance_history != null) {
      vehicle.maintenance_history = req.body.maintenance_history;
    }

    const updatedVehicle = await vehicle.save();
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getVehicles,
  createVehicle,
  deleteVehicle,
  updateVehicle
};