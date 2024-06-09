// const mongoose = require("mongoose");
// const Vehicle = require("../models/vehicle.js");

// // Get all vehicles
// const getVehicles = async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find();
//     res.status(200).json(vehicles);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new vehicle
// const createVehicle = async (req, res) => {
//   const vehicle = new Vehicle({
//     serial_number: req.body.serial_number,
//     type: req.body.type,
//     capacity: req.body.capacity,
//     driver_id: req.body.driver_id,
//   });

//   try {
//     const newVehicle = await vehicle.save();
//     res.status(201).json(newVehicle);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a vehicle
// const deleteVehicle = async (req, res) => {
//   try {
//     const vehicle = await Vehicle.findById(req.params.id);
//     if (vehicle == null) {
//       return res.status(404).json({ message: 'Cannot find vehicle' });
//     }

//     await vehicle.remove();
//     res.status(200).json({ message: 'Vehicle deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a vehicle
// const updateVehicle = async (req, res) => {
//   try {
//     const vehicle = await Vehicle.findById(req.params.id);
//     if (vehicle == null) {
//       return res.status(404).json({ message: 'Cannot find vehicle' });
//     }

//     if (req.body.serial_number != null) {
//       vehicle.serial_number = req.body.serial_number;
//     }
//     if (req.body.type != null) {
//       vehicle.type = req.body.type;
//     }
//     if (req.body.capacity != null) {
//       vehicle.capacity = req.body.capacity;
//     }

//     const updatedVehicle = await vehicle.save();
//     res.status(200).json(updatedVehicle);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = {
//   getVehicles,
//   createVehicle,
//   deleteVehicle,
//   updateVehicle
// };

const Vehicle = require("../models/vehicle");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const messages = await req.flash("info");

  const locals = {
    title: "Vehicle Management",
    description: "Vehicle Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const vehicles = await Vehicle.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Vehicle.countDocuments({});

    res.render("vehicle", {
      locals,
      vehicles,
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
 * New Vehicle Form
 */
exports.addVehicle = async (req, res) => {
  const locals = {
    title: "Add New Vehicle",
    description: "Vehicle Management System",
  };

  res.render("vehicle/add", locals);
};

/**
 * POST /
 * Create New Vehicle
 */
exports.postVehicle = async (req, res) => {
  console.log(req.body);

  const newVehicle = new Vehicle({
    type: req.body.type,
    capacity: req.body.capacity,
    serial_number: req.body.serial_number,
    status: "available",
  });

  try {
    await Vehicle.create(newVehicle);
    await req.flash("info", "New vehicle has been added.");

    res.redirect("/vehicles");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Vehicle Data
 */
exports.view = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id });

    const locals = {
      title: "View Vehicle Data",
      description: "Vehicle Management System",
    };

    res.render("vehicle/view", {
      locals,
      vehicle,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Edit Vehicle Data
 */
exports.edit = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Vehicle Data",
      description: "Vehicle Management System",
    };

    res.render("vehicle/edit", {
      locals,
      vehicle,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST /
 * Update Vehicle Data
 */
exports.editPost = async (req, res) => {
  try {
    await Vehicle.findByIdAndUpdate(req.params.id, {
      type: req.body.type,
      capacity: req.body.capacity,
      serial_number: req.body.serial_number,
      status: req.body.status,
      updatedAt: Date.now(),
    });
    await res.redirect("/vehicles");

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Vehicle Data
 */
exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.deleteOne({ _id: req.params.id });
    res.redirect("/vehicles");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Vehicle Data
 */
exports.searchVehicles = async (req, res) => {
  const locals = {
    title: "Search Vehicle Data",
    description: "Vehicle Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const vehicles = await Vehicle.find({
      $or: [
        { type: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { serial_number: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      vehicles,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
