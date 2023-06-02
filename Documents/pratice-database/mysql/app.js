import express from "express";
import { getAllUser, createUser, getUser, deleteUser } from "./database.js";
const app = express();
import productRouter from "./product/productController.js";
import orderRouter from "./orders/orderController.js";
app.use(express.json());

// app.use(productRouter);
app.get("/users", async (req, res, next) => {
  try {
    const userData = await getAllUser();
    console.log(userData[0]);
    res.status(200).json({
      status: "success",
      users: userData[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

app.get("/user/:id", async (req, res, next) => {
  try {
    const data = await getUser(req.params.id);
    res.status(200).json({
      staus: "success",
      userData: data[0],
    });
  } catch (err) {}
});

app.post("/user", async (req, res, next) => {
  try {
    const data = await createUser(req, res);
    const userData = await getUser(data[0].insertId);
    res.status(200).json({
      status: "success",
      user: userData[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

app.delete("/user/:id", async (req, res, next) => {
  try {
    const result = await deleteUser(req.params.id);
    res.status(204).json({
      status: "success",
      message: "User deleted successfully!",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

app.use(/^\/products?/, productRouter);
app.use(/^\/orders?/, orderRouter);

export default app;
