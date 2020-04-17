module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
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
      bio: {
          type: DataTypes.STRING,
          field: "bio"
        },
      dob: {
          type: DataTypes.DATE,
          field: "dob"
      },
      country: {
          type: DataTypes.INTEGER,
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
          type: DataTypes.TEXT('long'),
          field: "photo"
      },
      gender: {
          type: DataTypes.CHAR,
          field: "gender"
      },
      nickname: {
          type: DataTypes.STRING,
          field: "nickname"
      }
     
    },
    {
      timestamps: true,
      tableName: "users",
      freezeTableName: true
    }
  );

  return user;
};
