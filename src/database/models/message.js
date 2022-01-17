import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const message = sequelize.define(
    "message",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      companyId: DataTypes.UUID,
      message: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {}
  );
  message.associate = (models) => {
    message.belongsTo(
      models.company,
      ...associationsGenerator("companyId", "id")
    );
  };
  return message;
};
