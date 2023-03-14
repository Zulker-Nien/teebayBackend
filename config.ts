import dotenv from "dotenv";

dotenv.config();

export const db = process.env.DB;
export const host = process.env.HOST;
export const userName = process.env.USER_NAME;
export const password = process.env.PASSWORD;
