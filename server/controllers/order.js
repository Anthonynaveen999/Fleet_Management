

const Order = require("../models/Order");
const Driver = require("../models/driver");
const Vehicle = require("../models/vehicle");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const messages = await req.flash("info");

  const locals = {
    title: "Orders",
    description: "Order Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const orders = await Order.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Order.countDocuments({});

    res.render("order", {
      locals,
      orders,
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
 * New Order Form
 */
exports.addOrder = async (req, res) => {
  const locals = {
    title: "Add New Order - NodeJs",
    description: "Order Management System",
  };

  res.render("order/add", locals);
};

/**
 * POST /
 * Create New Order
 */
exports.postOrder = async (req, res) => {
  console.log(req.body);

  try {
    const availableDriver = await Driver.findOne({
      status: "available"
    });
    const availableVehicle = await Vehicle.findOne({
      status: "available",
      capacity: { $gte: req.body.cargo_weight },
    });

    if (!availableDriver || !availableVehicle) {
      await req.flash("info", "No available driver or vehicle.");
      return res.redirect("/orders");
    }

    const newOrder = new Order({
      customer_name: req.body.customer_name,
      contact: req.body.contact,
      pick_up: req.body.pick_up,
      destination: req.body.destination,
      cargo_weight: req.body.cargo_weight,
      assigned_driver: availableDriver.name,
      assigned_vehicle: availableVehicle.serial_number,
      status: "pending",
    });

    await newOrder.save();

    // Update driver and vehicle status
    availableDriver.status = "unavailable";
    availableVehicle.status = "unavailable";

    await availableDriver.save();
    await availableVehicle.save();

    await req.flash("info", "New order has been added.");
    res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
};


/**
 * GET /
 * Order Data
 */
exports.view = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id })
      .populate("assigned_driver")
      .populate("assigned_vehicle");

    const locals = {
      title: "View Order Data",
      description: "Order Management System",
    };

    res.render("order/view", {
      locals,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Edit Order Data
 */
exports.edit = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Order Data",
      description: "Order Management System",
    };

    res.render("order/edit", {
      locals,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Order Data
 */
exports.editPost = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      customer_name: req.body.customer_name,
      contact: req.body.contact,
      pick_up: req.body.pick_up,
      destination: req.body.destination,
      cargo_weight: req.body.cargo_weight,
      updatedAt: Date.now(),
    });

    res.redirect(`/orders`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Order Data
 */
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    // Update driver and vehicle status if the order is deleted
    const driver = await Driver.findById(order.assigned_driver);
    const vehicle = await Vehicle.findById(order.assigned_vehicle);

    if (driver) {
      driver.status = "available";
      await driver.save();
    }

    if (vehicle) {
      vehicle.status = "available";
      await vehicle.save();
    }

    res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Order Data
 */
exports.searchOrders = async (req, res) => {
  const locals = {
    title: "Search Order Data",
    description: "Order Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const orders = await Order.find({
      $or: [
        { customer_name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { destination: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      orders,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
