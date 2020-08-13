module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
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
      bio: {
          type: DataTypes.STRING,
          field: "bio"
        },
      dob: {
          type: DataTypes.DATEONLY,
          field: "dob"
      },
      country: {
          type: DataTypes.STRING,
          field: "country"
      },
      email: {
          type: DataTypes.STRING,
          field: "email"
        },
      points: {
          type: DataTypes.INTEGER,
          field: "points"
      },
      photo: {
          type: DataTypes.TEXT('LONG'),
          field: "photo"
      },
      gender: {
          type: DataTypes.CHAR,
          field: "gender"
      },
      nickname: {
          type: DataTypes.STRING,
          field: "nickname"
      },
      phone: {
        type: DataTypes.STRING,
        field: "phone"
      },
      address: {
        type: DataTypes.STRING,
        field: "address"
      },
      address2: {
        type: DataTypes.STRING,
        field: "address2"
      },
      token: {
        type: DataTypes.STRING,
        field: "token"
      },
      password: {
        type: DataTypes.STRING,
        field: "password"
      },
     
    },
    {
      timestamps: true,
      tableName: "users",
      freezeTableName: true
    }
  );

  user.associate = function(models) {

    user.hasMany(models.transaction, {
      foreignKey: 'user_id'
    })

    user.hasMany(models.code, {
      foreignKey: 'user_id'
    })

    user.belongsToMany(models.partner, {
        through: "code",
        as: "userCodes",
        foreignKey: "user_id",
        otherKey: "id"
      })

    user.belongsToMany(models.partner, {
      through: "transaction",
      as: "unique",
      foreignKey: "user_id",
      otherKey: "id"
    })


  }

  return user;
};
