module.exports = (sequelize, DataTypes) => {
    const device = sequelize.define(
      "user",
      {
        serialNumber: {
          type: DataTypes.STRING,
          primaryKey: true,
          field: "serial_number"
        },
        address: {
          type: DataTypes.STRING,
          field: "address"
        },
        region: {
          type: DataTypes.STRING,
          field: "region"
        },
        city: {
          type: DataTypes.STRING,
          field: "city"
        },
        postalCode: {
          type: DataTypes.INTEGER,
          field: "postal_code"
        },
        placeName: {
          type: DataTypes.STRING,
          field: "place_name"
        }
      },
      {
        timestamps: true,
        tableName: "devices",
        freezeTableName: true
      }
    );
  
    return device;
  };
  