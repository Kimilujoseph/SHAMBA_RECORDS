import configToken from "../config/index";
import nodemailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailtemplates";
import { STATUS_CODE, APIError } from "./app-error";
const { EMAIL_PASSWORD, GMAIL_USED } = configToken;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USED,
    pass: EMAIL_PASSWORD,
  },
});
const emailVerification = async (
  email: string,
  verificationCode: string,
  name: string
) => {
  try {
    const verificationLink = `http://localhost:5000/api/v1/user/verification?token=${verificationCode}`;

    const emailTemplate = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{your name}",
      name
    ).replace("{verificationLink}", verificationLink);

    // Send email
    const response = await transporter.sendMail({
      from: '"EgerDrive" <onboarding@gmail.com>',
      to: email,
      subject: "Verification Email",
      html: emailTemplate,
    });

    console.log("Email sent: ", response.messageId);

    return { success: true, message: "Confirm your email for verification" };
  } catch (err) {
    console.log("err", err);
    if (err instanceof APIError) {
      throw err;
    }
    throw new APIError(
      "email verifcation error",
      STATUS_CODE.INTERNAL_ERROR,
      "internal server error"
    );
  }
};

export { emailVerification };
