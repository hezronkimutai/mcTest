export default (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  return user;
};
