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
          type: DataTypes.INTEGER,
          field: "partner_id"
        },
        userId: {
            type: DataTypes.INTEGER,
            field: "user_id"
        },
        date: {
            type: DataTypes.DATE,
            field: "date"
        },
        status: {
            type: DataTypes.CHAR,
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
  