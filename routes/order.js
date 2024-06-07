const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.js");

router.get("/", orderController.getOrders);
router.post("/", orderController.createOrder);
router.delete("/:id", orderController.deleteOrder);
router.put("/:id", orderController.updateOrder);

module.exports = router;
