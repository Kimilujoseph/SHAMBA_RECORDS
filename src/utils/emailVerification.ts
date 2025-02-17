import { Resend } from "resend";
import configToken from "../config/index";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailtemplates";
import { STATUS_CODE, APIError } from "./app-error";
const { RESEND_API } = configToken;
const resend = new Resend(RESEND_API);

const emailVerification = async (
  email: string,
  verificationCode: string,
  name: string
) => {
  try {
    const verficationLink = `http://localhost:5000/api/user/verifcation?token=${verificationCode}`;
    const response = await resend.emails.send({
      from: "EgerDrive <onboarding@resend.dev>",
      to: email,
      subject: "Verification Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{your name}", name).replace(
        "{verificationLink}",
        verficationLink
      ),
    });
    console.log("#$#", response.error);
    if (!response.data) {
      throw new APIError(
        "email verifcation error",
        STATUS_CODE.BAD_REQUEST,
        "failed to send email"
      );
    }
    return { success: true, message: "confirm your email for verification" };
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
