import { DataSource } from "typeorm";
import { UserInfo } from "./entities/User";
import { ProductInfo } from "./entities/Product";
import { db, host, userName, password } from "../config";
const connection = new DataSource({
  type: "postgres",
  database: db,
  entities: [UserInfo, ProductInfo],
  logging: true,
  synchronize: true,
  host: host,
  port: 6000,
  username: userName,
  password: password,
});
export default connection;
