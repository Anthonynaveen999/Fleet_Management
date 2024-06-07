const express = require("express");
const { getDrivers, createDriver,deleteDriver,updateDriver } = require("../controllers/driver.js");
const router = express.Router();

router.get("/", getDrivers);
router.post("/", createDriver);
router.delete("/:id", deleteDriver);
router.put("/:id", updateDriver);


module.exports = router;
