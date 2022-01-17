import associationsGenerator from "../../helpers/associationsGenerator";

export default (sequelize, DataTypes) => {
  const widget = sequelize.define(
    "widget",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4
      },
      companyId: DataTypes.UUID,
      widgetLauncherIconColor:{type:DataTypes.STRING,defaultValue:'#047bd3'},
      widgetLauncherBackgroundColor:{type:DataTypes.STRING,defaultValue:'#047bd3'},
      widgetNavbarColor2:{type:DataTypes.STRING,defaultValue:'#047bd3'},
      widgetNavbarColor1:{type:DataTypes.STRING,defaultValue:'#047bd3'},
      widgetPrimaryColor:{type:DataTypes.STRING,defaultValue:'#047bd3'}
    },
    {}
  );
  widget.associate = (models) => {
    widget.belongsTo(
      models.company,
      ...associationsGenerator("companyId", "id")
    );
    }
  return widget;
};
