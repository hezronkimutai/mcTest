import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const portfolioDetail = sequelize.define(
    "portfolioDetail",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      portfolioId: DataTypes.UUID,
      type: DataTypes.STRING,
      quote: DataTypes.STRING,
      name: DataTypes.STRING,
      salutation: DataTypes.STRING,
      resumeLink: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      title: DataTypes.STRING,
      body: require("sequelize").TEXT,
    },
    {}
  );
  portfolioDetail.associate = (models) => {
    portfolioDetail.belongsTo(
      models.portfolio,
      ...associationsGenerator("portfolioId", "id")
    );
  };
  return portfolioDetail;
};
