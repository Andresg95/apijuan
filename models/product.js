module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define(
      "product",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: "id"
        },
        name: {
          type: DataTypes.STRING,
          field: "name"
        },
        photo: {
            type: DataTypes.TEXT('LONG'),
            field: "photo"
        },
        date: {
            type: DataTypes.DATEONLY,
            field: "creation_date"
        },
        description: {
            type: DataTypes.STRING,
            field: "description"
        },
        available: {
            type: DataTypes.BOOLEAN,
            field: "available"
        },
        partnerId: {
            type: DataTypes.INTEGER,
            field:"partner_id"
        },
        price: {
            type: DataTypes.FLOAT,
            field:"price"
        }
      },
      {
        timestamps: false,
        tableName: "products",
        freezeTableName: true
      }
    );

    product.associate = function(models){
        product.belongsTo(models.partner, {
            foreignKey: "partnerId",
            as: "Partnerproducts"
        })
        // product.hasMany(models.order, {
        //     foreignKey: "product_id",
        //     as: "includedOrders"
        // })

    }
  
    return product;
  };
  