module.exports = (sequelize, DataTypes) => {
    const code = sequelize.define(
      "code",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: "id"
        },
        partnerId: {
          type: DataTypes.INTEGER,
          field: "partner_id"
        },
        userId: {
            type: DataTypes.INTEGER,
            field: "user_id"
        },
        date: {
            type: DataTypes.DATEONLY,
            field: "date"
        },
        status: {
            type: DataTypes.CHAR,
            field: "status"
        },
        value: {
            type: DataTypes.STRING,
            field:"value"
        },
        type: {
          type: DataTypes.CHAR,
          field: "type"
        },
        payMethod: {
          type: DataTypes.CHAR,
          field: "payment-method"
        }
      },
      {
        timestamps: false,
        tableName: "codes",
        freezeTableName: true
      }
    );

    code.associate = function(models){
      code.hasMany(models.order, {
        foreignKey: "code_id",
        as: "codeOrders"
      })

      code.belongsTo(models.user, {
        foreignKey :"user_id",
        as : "clientOrder"
      })
    }
  
    return code;
  };
  