const { buildSchema } = require('graphql');


const mainPageInfo = buildSchema(`

    type Query{
        week: Week
    },

    type Week{
        date: String,
        weekNum: Int,
        even: String
    }
`);

module.exports = {mainPageInfo};

