module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define(
    "order_details",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      //   orderId: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //     unique: false,
      //   },
      //   productId: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //     unique: false,
      //   },
    },
    {
      //   indexes: [
      //     {
      //       unique: false,
      //       fields: ["orderId", "productId"],
      //     },
      //   ],
      timestamps: false,
    }
  );
  return OrderDetails;
};
