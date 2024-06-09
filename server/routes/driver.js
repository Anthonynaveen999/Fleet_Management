const express = require("express");
const router = express.Router();
const driver = require("../controllers/driver.js");

/**
 *  Driver Routes
 */
router.get("/", driver.homepage);
router.get("/add", driver.addDriver);
router.post("/add", driver.postDriver);
router.get("/view/:id", driver.view);
router.get("/edit/:id", driver.edit);
router.post("/edit/:id", driver.editPost);
router.delete("/edit/:id", driver.deleteDriver);

router.post("/search", driver.searchDrivers);

module.exports = router;
