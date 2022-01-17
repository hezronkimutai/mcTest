import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const like = sequelize.define(
    "like",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      articleId: DataTypes.UUID,
      like: DataTypes.BOOLEAN,
    },
    {}
  );
  like.associate = (models) => {
    like.belongsTo(
      models.article,
      ...associationsGenerator("articleId", "id")
    );
  };
  return like;
};
