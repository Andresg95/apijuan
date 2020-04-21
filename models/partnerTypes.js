module.exports = (sequelize, DataTypes) => {
    const partnerType = sequelize.define(
      "partnerType",
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
        description: {
            type: DataTypes.STRING,
            field: "description"
        },
      },
      {
        timestamps: false,
        tableName: "partnerTypes",
        freezeTableName: true
      }
    );
  
    return partnerType;
  };
  