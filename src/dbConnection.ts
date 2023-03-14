import { DataSource } from "typeorm";
import { UserInfo } from "./entities/User";
import { ProductInfo } from "./entities/Product";

const connection = new DataSource({
  type: "postgres",
  database: "Teebay",
  entities: [UserInfo, ProductInfo],
  logging: true,
  synchronize: true,
  host: "localhost",
  port: 6000,
  username: "postgres",
  password: "1470",
});
export default connection;
