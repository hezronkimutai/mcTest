import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const search = sequelize.define(
    "search",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      companyId: DataTypes.UUID,
      term: DataTypes.STRING,
      success: DataTypes.BOOLEAN,
      count:DataTypes.INTEGER
    },
    {}
  );
  search.associate = (models) => {
    search.belongsTo(
      models.company,
      ...associationsGenerator("companyId", "id")
    );
  };
  return search;
};
