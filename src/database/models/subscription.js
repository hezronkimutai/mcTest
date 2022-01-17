import associationsGenerator from "../../helpers/associationsGenerator";
export default (sequelize, DataTypes) => {
  const subscription = sequelize.define(
    "subscription",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      subscriptionId: DataTypes.STRING,
      planId: DataTypes.STRING,
      subscriptionLink: DataTypes.STRING,
      CustomerId: DataTypes.UUID,
      nextDueOn: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.UUID,
    },
    {}
  );
  subscription.associate = (models) => {
    subscription.belongsTo(
      models.plan,
      ...associationsGenerator("planId", "planId")
    );
    subscription.belongsTo(models.user, ...associationsGenerator("userId", "id"));
  };
  return subscription;
};
