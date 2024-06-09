const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

/**
 *  Order Routes
 */
router.get("/", orderController.homepage);
router.get("/add", orderController.addOrder);
router.post("/add", orderController.postOrder);
router.get("/view/:id", orderController.view);
router.get("/edit/:id", orderController.edit);
router.post("/edit/:id", orderController.editPost);
router.delete("/edit/:id", orderController.deleteOrder);

router.post("/search", orderController.searchOrders);

module.exports = router;
