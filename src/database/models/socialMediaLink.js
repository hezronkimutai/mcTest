import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const socialMediaLink = sequelize.define(
    "socialMediaLink",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4
      },
      companyId: DataTypes.UUID,
      userId: DataTypes.UUID,
      type: DataTypes.STRING,
      link: DataTypes.STRING,
    },
    {}
  );
  socialMediaLink.associate = (models) => {
    socialMediaLink.belongsTo(
      models.company,
      ...associationsGenerator("companyId", "id")
    );
    socialMediaLink.belongsTo(
      models.user,
      ...associationsGenerator("userId", "id")
    );
  };
  return socialMediaLink;
};
