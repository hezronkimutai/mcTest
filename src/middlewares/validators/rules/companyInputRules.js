import {
  supportEmail,
  brandColor,
  companyName,
  websiteUrl,
  socialMedia,
  customDomain,
  subDomain,
  widgetLauncherIconColor,
  widgetLauncherBackgroundColor,
  widgetNavbarColor2,
  widgetNavbarColor1,
  widgetPrimaryColor,
  email,
  message,
  term,
  success,
} from "./index";
export const createCompanyRules = () => [supportEmail, brandColor, companyName];
export const editCompanyRules = () => [
  supportEmail,
  brandColor,
  companyName,
  websiteUrl,
  ...socialMedia,
  subDomain,
  customDomain,
  widgetLauncherIconColor,
  widgetLauncherBackgroundColor,
  widgetNavbarColor2,
  widgetNavbarColor1,
  widgetPrimaryColor,
];
export const inviteUserRules = () => [email];
export const sendMessageRules = () => [message,email];
export const postSearchRules = () => [term];
