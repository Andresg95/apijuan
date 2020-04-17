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
        type: {
            type: DataTypes.STRING,
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
  