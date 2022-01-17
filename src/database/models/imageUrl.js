import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const imageUrl = sequelize.define(
    "imageUrl",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      companyId: DataTypes.UUID,
      userId: DataTypes.UUID,
      type: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {}
  );
  imageUrl.associate = (models) => {
    imageUrl.belongsTo(
      models.company,
      ...associationsGenerator("companyId", "id")
    );

    imageUrl.belongsTo(models.user, ...associationsGenerator("userId", "id"));
  };
  return imageUrl;
};
