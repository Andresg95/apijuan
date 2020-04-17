module.exports = (sequelize, DataTypes) => {
    const code = sequelize.define(
      "code",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          field: "id"
        },
        partnerId: {
          type: DataTypes.STRING,
          field: "partner_id"
        },
        userId: {
            type: DataTypes.STRING,
            field: "user_id"
        },
        date: {
            type: DataTypes.DATE,
            field: "date"
        },
        status: {
            type: DataTypes.STRING,
            field: "status"
        },
      },
      {
        timestamps: false,
        tableName: "code",
        freezeTableName: true
      }
    );
  
    return code;
  };
  