import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const articleRead = sequelize.define(
    "articleRead",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      companyId: DataTypes.UUID,
      articleId: DataTypes.UUID,
    },
    {}
  );
  articleRead.associate = (models) => {
    articleRead.belongsTo(
      models.company,
      ...associationsGenerator("companyId", "id")
    );
    articleRead.belongsTo(
      models.article,
      ...associationsGenerator("articleId", "id")
    );
  };
  return articleRead;
};
