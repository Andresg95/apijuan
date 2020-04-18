module.exports = (sequelize, DataTypes) => {
    const transaction = sequelize.define(
      "transaction",
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
        type: {
            type: DataTypes.CHAR,
            field: "type"
        },
        points: {
            type: DataTypes.INTEGER,
            field: "points"
        },      
      },
      {
        timestamps: false,
        tableName: "transactions",
        freezeTableName: true
      }
    );
  
    return transaction;
  };
  