import associationsGenerator from '../../helpers/associationsGenerator'
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
  user.associate = (models) => {
    user.hasMany(
      models.imageUrl,
      ...associationsGenerator('id','userId')
    );
    user.hasMany(
      models.team,
      ...associationsGenerator('id','userId')
    );
    user.hasMany(
      models.subscription,
      ...associationsGenerator('id','userId')
    );
  };
  return user;
};
