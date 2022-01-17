import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const article = sequelize.define(
    "article",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      companyId: DataTypes.UUID,
      userId: DataTypes.UUID,
      categoryId: DataTypes.UUID,
      articleTitle: DataTypes.STRING,
      articleBody: require("sequelize").TEXT,
      articleStatus: DataTypes.STRING,
    },
    {}
  );
  article.associate = (models) => {
    article.belongsTo(
      models.company,
      ...associationsGenerator("companyId", "id")
    );
    article.belongsTo(models.user, ...associationsGenerator("userId", "id"));
    article.belongsTo(
      models.category,
      ...associationsGenerator("categoryId", "id")
    );
    article.hasMany(
      models.like,
      ...associationsGenerator("id", "articleId")
    );
    article.hasMany(
      models.articleRead,
      ...associationsGenerator("id", "articleId")
    );
  };
  return article;
};
