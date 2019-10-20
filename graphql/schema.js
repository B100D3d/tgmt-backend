import { buildSchema } from 'graphql';


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

export default {mainPageInfo};

