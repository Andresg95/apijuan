module.exports = (sequelize, DataTypes) => {
    const partner = sequelize.define(
      "partner",
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
        country: {
            type: DataTypes.STRING,
            field: "country"
        },
        city: {
            type: DataTypes.STRING,
            field: "city"
        },
        photo: {
            type: DataTypes.TEXT('long'),
            field: "photo"
        },
        type: {
            type: DataTypes.INTEGER,
            field: "type"
        },
        creationDate: {
          type: DataTypes.DATEONLY,
          field: "creation_date"
        },
        phone: {
            type: DataTypes.STRING,
            field: "phone"
          },
        email: {
          type: DataTypes.STRING,
          field: "email"
        },
        web: {
          type: DataTypes.STRING,
          field: "web"
        },
        schedule: {
            type: DataTypes.TEXT,
            field: "schedule"
        },
        average: {
          type: DataTypes.INTEGER,
          field: "average"
      },
        code: {
          type: DataTypes.STRING,
          field: "code"
        },
       
      },
      {
        timestamps: false,
        tableName: "partners",
        freezeTableName: true
      }
    );

    partner.associate = function(models) {
      
      partner.hasMany(models.transaction, {
        foreignKey: 'partner_id',
        as: "pTransaction"
      })
  
      partner.hasMany(models.code, {
        foreignKey: 'partner_id',
        as: "pCodes"
      })

      partner.belongsToMany(models.user, {
        through: "codes",
        as: "userCodes",
        foreignKey: "partner_id",
        otherKey: "id"
      })

      partner.belongsToMany(models.user, {
        as: "userTransactions",
        through: "transactions",
        foreignKey: "partner_id",
        otherKey: "id"
      })  
  
    }
  
    return partner;
  };
  