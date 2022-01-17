import { email, firstName, lastName, password,editUserPassword } from "./index";

export const userAccountRules = () => [email, firstName, lastName, password];
export const editUserAccountRules = () => [email, firstName, lastName, editUserPassword];

export const forgotPasswordRules = () => [email];

export const resetPasswordRules = () => [password];
