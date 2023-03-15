import "reflect-metadata";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import connection from "./dbConnection";
import cors from "cors";
import { ProductResolver } from "./resolvers/product";

const main = async () => {
  const dbConnection = connection;
  dbConnection
    .initialize()
    .then(() => {
      console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
      console.error(`Data Source initialization error`, err);
    });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ProductResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();
  const app: Express = express();
  app.use(cors());
  apolloServer.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

main().catch((err) => {
  console.error(err);
});
