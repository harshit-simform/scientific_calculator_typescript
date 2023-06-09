const express = require("express");

import {
  getAllOrder,
  getOrder,
  deleteOrder,
  createOrder,
} from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("her");
    const orderData = await getAllOrder();
    console.log(orderData[0]);
    res.status(200).json({
      status: "success",
      products: orderData[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await getOrder(req.params.id);
    res.status(200).json({
      staus: "success",
      orderData: data[0],
    });
  } catch (err) {}
});

router.post("/", async (req, res, next) => {
  try {
    const data = await createOrder(req, res);
    const orderData = await getOrder(data[0].insertId);
    res.status(200).json({
      status: "success",
      order: orderData[0],
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await deleteOrder(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Product deleted successfully!",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

module.exports = router;
// export default router;
