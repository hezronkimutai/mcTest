export default (req) => {
  const { companyId } = req.params;
  const {
    widgetPrimaryColor,
    widgetNavbarColor1,
    widgetNavbarColor2,
    widgetLauncherBackgroundColor,
    widgetLauncherIconColor,
  } = req.body;
  const updateWidgetQuery = [
    {
      widgetPrimaryColor,
      widgetNavbarColor1,
      widgetNavbarColor2,
      widgetLauncherBackgroundColor,
      widgetLauncherIconColor,
    },
    { where: { companyId } },
  ];
  return {
    updateWidgetQuery,
  };
};
