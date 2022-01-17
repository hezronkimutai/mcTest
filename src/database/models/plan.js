import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const plan = sequelize.define(
    "plan",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      planId: DataTypes.STRING,
      planName: DataTypes.STRING,
      planDescription: DataTypes.STRING,
      billingAmmount: DataTypes.STRING,
      billingFrequency: DataTypes.STRING,
      notes: DataTypes.STRING,
    },
    {}
  );
  plan.associate = (models) => {
    plan.hasMany(
      models.subscription,
      ...associationsGenerator("planId", "planId")
    );
  };
  return plan;
};
