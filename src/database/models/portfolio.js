import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const portfolio = sequelize.define(
    "portfolio",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      companyId: DataTypes.UUID,
    },
    {}
  );
  portfolio.associate = (models) => {
    portfolio.belongsTo(
      models.company,
      ...associationsGenerator("companyId", "id")
    );
    portfolio.hasMany(
      models.portfolioDetail,
      ...associationsGenerator("id", "portfolioId")
    );
  };
  return portfolio;
};
