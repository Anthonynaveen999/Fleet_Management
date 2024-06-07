const express = require("express");
const { getVehicles,createVehicle,deleteVehicle,updateVehicle } = require("../controllers/vehicle.js");
const router = express.Router();

router.get("/", getVehicles);
router.post("/", createVehicle);
router.delete("/:id", deleteVehicle);
router.put("/:id", updateVehicle);

module.exports = router;
