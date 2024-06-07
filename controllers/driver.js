const mongoose = require("mongoose");
const Driver = require('../models/driver.js');

// Get all drivers
const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new driver
const createDriver = async (req, res) => {
  const driver = new Driver({
    name: req.body.name,
    aadharNumber: req.body.aadharNumber,
    licenseNumber: req.body.licenseNumber,
    contact: req.body.contact,
    currentLocation: req.body.currentLocation,
    preferredDestinations: req.body.preferredDestinations,
  });

  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a driver
const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (driver == null) {
      return res.status(404).json({ message: "Cannot find driver" });
    }

    await driver.remove();
    res.status(200).json({ message: "Driver deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a driver
const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (driver == null) {
      return res.status(404).json({ message: "Cannot find driver" });
    }

    if (req.body.name != null) {
      driver.name = req.body.name;
    }
    if (req.body.aadharNumber != null) {
      driver.aadharNumber = req.body.aadharNumber;
    }
    if (req.body.licenseNumber != null) {
      driver.licenseNumber = req.body.licenseNumber;
    }
    if (req.body.currentLocation != null) {
      driver.currentLocation = req.body.currentLocation;
    }
    if (req.body.preferredDestinations != null) {
      driver.preferredDestinations = req.body.preferredDestinations;
    }

    const updatedDriver = await driver.save();
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getDrivers,
  createDriver,
  deleteDriver,
  updateDriver,
};

