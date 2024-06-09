// const mongoose = require("mongoose");
// const Driver = require('../models/driver.js');

// // Get all drivers
// const getDrivers = async (req, res) => {
//   try {
//     const drivers = await Driver.find();
//     res.status(200).json(drivers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new driver
// const createDriver = async (req, res) => {
//   const driver = new Driver({
//     name: req.body.name,
//     aadharNumber: req.body.aadharNumber,
//     licenseNumber: req.body.licenseNumber,
//     contact: req.body.contact,
//     currentLocation: req.body.currentLocation,
//     preferredDestinations: req.body.preferredDestinations,
//   });

//   try {
//     const newDriver = await driver.save();
//     res.status(201).json(newDriver);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a driver
// const deleteDriver = async (req, res) => {
//   try {
//     const driver = await Driver.findById(req.params.id);
//     if (driver == null) {
//       return res.status(404).json({ message: "Cannot find driver" });
//     }

//     await driver.remove();
//     res.status(200).json({ message: "Driver deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a driver
// const updateDriver = async (req, res) => {
//   try {
//     const driver = await Driver.findById(req.params.id);
//     if (driver == null) {
//       return res.status(404).json({ message: "Cannot find driver" });
//     }

//     if (req.body.name != null) {
//       driver.name = req.body.name;
//     }
//     if (req.body.aadharNumber != null) {
//       driver.aadharNumber = req.body.aadharNumber;
//     }
//     if (req.body.licenseNumber != null) {
//       driver.licenseNumber = req.body.licenseNumber;
//     }
//     if (req.body.currentLocation != null) {
//       driver.currentLocation = req.body.currentLocation;
//     }
//     if (req.body.preferredDestinations != null) {
//       driver.preferredDestinations = req.body.preferredDestinations;
//     }

//     const updatedDriver = await driver.save();
//     res.status(200).json(updatedDriver);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = {
//   getDrivers,
//   createDriver,
//   deleteDriver,
//   updateDriver,
// };

const Driver = require("../models/driver.js");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const messages = await req.flash("info");

  const locals = {
    title: "Driver Management",
    description: "Driver Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const drivers = await Driver.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Driver.countDocuments({});
    console.log(drivers);
    res.render("driver", {
      locals,
      drivers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * New Driver Form
 */
exports.addDriver = async (req, res) => {
  const locals = {
    title: "Add New Driver",
    description: "Driver Management System",
  };

  res.render("driver/add", locals);
};

/**
 * POST /
 * Create New Driver
 */
exports.postDriver = async (req, res) => {
  console.log(req.body);

  const newDriver = new Driver({
    name: req.body.name,
    aadharNumber: req.body.aadharNumber,
    licenseNumber: req.body.licenseNumber,
    currentLocation: req.body.currentLocation,
    preferredDestinations: req.body.preferredDestinations,
    contact: req.body.contact,
    status: req.body.status,
  });

  try {
    await Driver.create(newDriver);
    await req.flash("info", "New driver has been added.");

    res.redirect("/drivers");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/**
 * GET /
 * Driver Data
 */
exports.view = async (req, res) => {
  try {
    const driver = await Driver.findOne({ _id: req.params.id });

    const locals = {
      title: "View Driver Data",
      description: "Driver Management System",
    };

    res.render("driver/view", {
      locals,
      driver,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Edit Driver Data
 */
exports.edit = async (req, res) => {
  try {
    const driver = await Driver.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Driver Data",
      description: "Driver Management System",
    };

    res.render("driver/edit", {
      locals,
      driver,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST /
 * Update Driver Data
 */
exports.editPost = async (req, res) => {
  try {
    await Driver.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      aadharNumber: req.body.aadharNumber,
      licenseNumber: req.body.licenseNumber,
      currentLocation: req.body.currentLocation,
      preferredDestinations: req.body.preferredDestinations,
      contact: req.body.contact,
      status: req.body.status,
      updatedAt: Date.now(),
    });
    await res.redirect("/drivers");

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Driver Data
 */
exports.deleteDriver = async (req, res) => {
  try {
    await Driver.deleteOne({ _id: req.params.id });
    res.redirect("/drivers");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Driver Data
 */
exports.searchDrivers = async (req, res) => {
  const locals = {
    title: "Search Driver Data",
    description: "Driver Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const drivers = await Driver.find({
      $or: [
        { name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { aadhar_number: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      drivers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
