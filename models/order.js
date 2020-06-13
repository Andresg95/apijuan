module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define(
      "order",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: "id"
        },
        quantity: {
          type: DataTypes.INTEGER,
          field: "quantity"
        },
        productId: {
            type: DataTypes.INTEGER,
            field: "product_id"
        },
        codeId: {
            type: DataTypes.INTEGER,
            field: "code_id"
        }
      },
      {
        timestamps: false,
        tableName: "orders",
        freezeTableName: true
      }
    );

    order.associate = function (models){
      order.belongsTo(models.product, {
        foreignKey: "product_id",
        as: 'productDetail'
      })
    }
  
    return order;
  };
  