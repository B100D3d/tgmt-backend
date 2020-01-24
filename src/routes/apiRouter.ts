import { Router } from "express";
import graphqlHTTP from "express-graphql";
import resolver from "../graphql/resolver.js";
import schema from "../graphql/schema.js";

const apiRouter = Router();

apiRouter.use("/mainPage", graphqlHTTP(
    {
        graphiql: true,
        rootValue: resolver.mainPageResolver,
        schema: schema.mainPageInfo
    }
));

export default apiRouter;
