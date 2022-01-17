import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const team = sequelize.define(
    "team",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4
      },
      companyId: DataTypes.UUID,
      userId: DataTypes.UUID,
      role: DataTypes.STRING,
    },
    {}
  );
  team.associate = (models) => {
    team.belongsTo(
      models.company,
      ...associationsGenerator("companyId", "id")
    );
    team.belongsTo(
      models.user,
      ...associationsGenerator("userId", "id")
    );
  };
  return team;
};
