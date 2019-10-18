const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../graphql/schema.js');
const resolver = require('../graphql/resolver.js');

const router = express.Router();

router.use('/week', graphqlHTTP(
    {
        schema: schema.mainPageInfo,
        rootValue: resolver.mainPageResolver,
        graphiql: true
    }
));

module.exports = router;