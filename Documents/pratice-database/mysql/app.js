const express = require("express");
const app = express();
const dbConfig = require("./databaseConfig");
const { getAllData } = require("./factoryFunctions");
const { getAllUsers } = require("./users/userController");
// const userRouter = require("./users/userController");

app.use(express.json());

// const User = require("./users/userModel")(
//   dbConfig.sequelize,
//   dbConfig.DataTypes
// );

// const Product = require("./product/productModel")(
//   dbConfig.sequelize,
//   dbConfig.DataTypes
// );

// const Order = require("./orders/orderModel")(
//   dbConfig.sequelize,
//   dbConfig.DataTypes
// );

// const OrderDetails = require("./orderDetails/orderDetailModel")(
//   dbConfig.sequelize,
//   dbConfig.DataTypes
// );

// dbConfig.User = User;
// dbConfig.Product = Product;
// dbConfig.Order = Order;
// dbConfig.OrderDetails = OrderDetails;

dbConfig.User.hasMany(dbConfig.Order);
dbConfig.Order.belongsTo(dbConfig.User);

dbConfig.Order.belongsToMany(dbConfig.Product, {
  through: { model: dbConfig.OrderDetails, unique: false },
});
dbConfig.Product.belongsToMany(dbConfig.Order, {
  through: { model: dbConfig.OrderDetails, unique: false },
});

dbConfig.Product.hasMany(dbConfig.OrderDetails);
dbConfig.OrderDetails.belongsTo(dbConfig.Product);

dbConfig.sequelize.sync();
// dbConfig.sequelize.sync({ force: true });

app.get("/user", getAllUsers);

app.get("/undeliver-orders", async (req, res) => {
  try {
    const result = await Order.findAll({
      where: {
        order_status: "pending",
      },
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
        {
          model: Product,
          attributes: ["id", "title"],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).json({
      status: "success",
      totalOrder: result.length,
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

app.get("/most-recent-orders", async (req, res) => {
  try {
    const result = await Order.findAll({
      order: [["order_date", "DESC"]],
      attributes: {
        exclude: ["userId"],
      },
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
        {
          model: Product,
          attributes: ["title", "amount"],
          through: {
            attributes: [],
          },
        },
      ],
      limit: 5,
    });
    res.status(200).json({
      status: "success",
      totalOrder: result.length,
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});
app.get("/top-active-user", async (req, res) => {
  try {
    const result = await Order.findAll({
      group: ["userId"],
      attributes: [
        "userId",
        [
          dbConfig.sequelize.fn("COUNT", dbConfig.sequelize.col("userId")),
          "Total Orders",
        ],
      ],
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
      order: [["Total Orders", "DESC"]],
      limit: 5,
    });

    res.status(200).json({
      status: "success",
      totalUser: result.length,
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

app.get("/inactive-user", async (req, res) => {
  try {
    const result = await User.findAll({
      attributes: ["id", "name", "email", "address"],
      include: {
        model: Order,
        required: false,
      },
      where: {
        "$orders.id$": null,
      },
    });
    res.status(200).json({
      status: "success",
      totalUser: result.length,
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

app.get("/most-purchased-product", async (req, res) => {
  try {
    const result = await OrderDetails.findAll({
      group: ["productId"],
      attributes: [
        "productId",
        [
          dbConfig.sequelize.fn("COUNT", dbConfig.sequelize.col("productId")),
          "TotalPurchase",
        ],
      ],
      include: [
        {
          model: Product,
          attributes: ["title", "description", "amount"],
        },
      ],
      order: [["TotalPurchase", "DESC"]],
      limit: 5,
    });
    res.status(200).json({
      status: "success",
      totalProduct: result.length,
      products: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

app.get("/most-expensive-order", async (req, res) => {
  try {
    const result = await OrderDetails.findAll({
      group: ["orderId"],
      attributes: [
        "orderId",
        [
          dbConfig.sequelize.fn("SUM", dbConfig.sequelize.col("amount")),
          "Total Amount",
        ],
        [
          dbConfig.sequelize.literal(
            "GROUP_CONCAT(product.title SEPARATOR ', ')"
          ),
          "Product Purchased",
        ],
      ],
      include: [
        {
          model: Product,
          attributes: [],
        },
      ],
      order: [["Total Amount", "DESC"]],
      limit: 1,
    });
    res.status(200).json({
      status: "success",
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

app.get("/least-expensive-order", async (req, res) => {
  try {
    const result = await OrderDetails.findAll({
      group: ["orderId"],
      attributes: [
        "orderId",
        [
          dbConfig.sequelize.fn("SUM", dbConfig.sequelize.col("amount")),
          "Total Amount",
        ],
        [
          dbConfig.sequelize.literal(
            "GROUP_CONCAT(product.title SEPARATOR ', ')"
          ),
          "Product Purchased",
        ],
      ],
      include: [
        {
          model: Product,
          attributes: [],
        },
      ],
      order: ["Total Amount"],
      limit: 1,
    });
    res.status(200).json({
      status: "success",
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

module.exports = app;
