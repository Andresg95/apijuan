module.exports = (sequelize, DataTypes) => {
    const partner = sequelize.define(
      "partner",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
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
          type: DataTypes.DATE,
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
            type: DataTypes.STRING,
            field: "schedule"
          },
       
      },
      {
        timestamps: false,
        tableName: "partners",
        freezeTableName: true
      }
    );
  
    return partner;
  };
  