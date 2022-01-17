import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      companyId: DataTypes.UUID,
      categoryName: DataTypes.UUID,
      categoryDescription: DataTypes.STRING,
    },
    {}
  );
  category.associate = (models) => {
    category.hasMany(
      models.article,
      ...associationsGenerator("id", "categoryId")
    );
    category.belongsTo(
      models.company,
      ...associationsGenerator("companyId", "id")
    );
  };
  return category;
};
