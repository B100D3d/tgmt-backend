import { Router } from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../graphql/schema.js';
import resolver from '../graphql/resolver.js';

const weekRouter = Router();

weekRouter.use('/week', graphqlHTTP(
    {
        schema: schema.mainPageInfo,
        rootValue: resolver.mainPageResolver,
        graphiql: true
    }
));

export default weekRouter;