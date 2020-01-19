import { Router } from "express";
import graphqlHTTP from "express-graphql";
import resolver from "../graphql/resolver.js";
import schema from "../graphql/schema.js";

const apiRouter = Router();

apiRouter.use("/mainPage", graphqlHTTP(
    {
        schema: schema.mainPageInfo,
        rootValue: resolver.mainPageResolver,
        graphiql: true
    }
));

export default apiRouter;
