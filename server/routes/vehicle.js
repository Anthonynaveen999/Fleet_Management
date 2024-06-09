const express = require("express");
const router = express.Router();
const vehicle = require("../controllers/vehicle.js");

/**
 *  Vehicle Routes
 */
router.get("/", vehicle.homepage);
router.get("/add", vehicle.addVehicle);
router.post("/add", vehicle.postVehicle);
router.get("/view/:id", vehicle.view);
router.get("/edit/:id", vehicle.edit);
router.post("/edit/:id", vehicle.editPost);
router.delete("/edit/:id", vehicle.deleteVehicle);

router.post("/search", vehicle.searchVehicles);

module.exports = router;
