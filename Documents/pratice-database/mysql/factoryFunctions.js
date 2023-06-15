const dbConfig = require("./databaseConfig");

exports.getAllData = (Model, title) => async (req, res, next) => {
  console.log("in get");
  try {
    const data = await Model.findAll();
    console.log(data);
    res.status(200).json({
      status: "success",
      [`Total ${title}`]: data.length,
      [title]: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getData = (Model, title) => async (req, res, next) => {
  console.log("in get");
  try {
    const { id } = req.params;
    console.log(id);
    const data = await Model.findAll({ where: { id } });
    console.log(data);
    res.status(200).json({
      status: "success",
      [`Total ${title}`]: data.length,
      [title]: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createData = (Model, title, fileds) => async (req, res, next) => {
  try {
    const data = await Model.create(req.body, {
      fileds: fileds,
    });
    if (title === "Order") {
      await dbConfig.OrderDetails.create({
        orderId: data.id,
        productId: req.body.productId,
      });
    }
    res.status(201).json({
      status: "success",
      [title]: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateData = (Model, title, fileds) => async (req, res, next) => {
  try {
    const { id } = req.params;
    await Model.update(
      req.body,
      {
        where: { id },
      },
      {
        fileds,
      }
    );
    res.status(200).json({
      status: "success",
      message: `${title} updated successfully!`,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteData = (Model, title) => async (req, res, next) => {
  try {
    const { id } = req.params;
    await Model.destroy({
      where: { id },
    });
    res.status(204).json({
      status: "success",
      message: `${title} deleted successfully!`,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
