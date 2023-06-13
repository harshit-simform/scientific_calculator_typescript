exports.getAllData = (Model) => async (req, res, next) => {
  console.log("in get");
  try {
    console.log(Model);
    console.log("in catch");
    const data = await Model.findAll();
    console.log(data);
    res.status(200).json({
      status: "success",
      [`${Model}s`]: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
