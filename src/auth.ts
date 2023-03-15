import { sign } from "jsonwebtoken";
import { UserInfo } from "./entities/User";

export const createAccessToken = (user: UserInfo) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: UserInfo) => {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};
