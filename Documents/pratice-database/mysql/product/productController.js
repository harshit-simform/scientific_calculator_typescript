import express from "express";
import {
  getAllProduct,
  getProduct,
  deleteProduct,
  createProduct,
} from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("her");
    const productData = await getAllProduct();
    console.log(productData[0]);
    res.status(200).json({
      status: "success",
      products: productData[0],
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
    const data = await getProduct(req.params.id);
    res.status(200).json({
      staus: "success",
      productData: data[0],
    });
  } catch (err) {}
});

router.post("/", async (req, res, next) => {
  try {
    const data = await createProduct(req, res);
    const productData = await getProduct(data[0].insertId);
    res.status(200).json({
      status: "success",
      product: productData[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await deleteProduct(req.params.id);
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

// module.exports = router;
export default router;
