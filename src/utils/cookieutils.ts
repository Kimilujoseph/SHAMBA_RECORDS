import { Response } from "express";

export const setCookies = (
  res: Response,
  name: string,
  value: string
): void => {
  res.cookie(name, value, {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};
