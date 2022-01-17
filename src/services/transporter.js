import nodemailer from "nodemailer";
import pug from "pug";
import { signToken } from "../helpers/jwtAuth";

const resetPassword = pug.compileFile(
  "dist/services/emailTemplates/resetPassword.pug"
);
const forgotPassword = pug.compileFile(
  "dist/services/emailTemplates/forgotPassword.pug"
);
const inviteUser = pug.compileFile(
  "dist/services/emailTemplates/inviteUser.pug"
);
const {
  EVEN_HELP_EMAIL_ADDRESS,
  EVEN_HELP_EMAIL_PASSWORD,
  FRONT_END_BASE_URL,
} = process.env;
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EVEN_HELP_EMAIL_ADDRESS,
    pass: EVEN_HELP_EMAIL_PASSWORD,
  },
});

export const forgotPasswordService = (req) => {
  const { email } = req.body;
  const { password, ...tokenData } = req.existingRecord;
  const token = signToken(tokenData);
  transporter.sendMail({
    to: email,
    from: EVEN_HELP_EMAIL_ADDRESS,
    subject: "Forgot password",
    html: forgotPassword({
      resetPasswordLink: `${FRONT_END_BASE_URL}/reset-password/?token=${token}`,
      action: "Forgot Password",
      receiver: req.existingRecord.firstName,
    }),
  });
};

export const inviteUserService = (req) => {
  const { email } = req.body;
  const { companyName } = req.existingRecord;
  const token = signToken(req.existingRecord);

  transporter.sendMail({
    to: email,
    from: EVEN_HELP_EMAIL_ADDRESS,
    subject: "Invitation",
    html: inviteUser({
      companyName,
      inviteUserLink: `${FRONT_END_BASE_URL}${token}`,
      action: "Invitation",
      sender: req.user.firstName,
      receiver: req.existingRecord.firstName,
    }),
  });
};
export const resetPasswordService = (req) => {
  const { email } = req.user;

  transporter.sendMail({
    to: email,
    from: EVEN_HELP_EMAIL_ADDRESS,
    subject: "Reset Password",
    html: resetPassword({
      action: "Reset Password",
    }),
  });
};
