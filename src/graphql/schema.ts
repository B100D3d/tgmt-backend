import { buildSchema } from "graphql";

export default class Schema {
    public static mainPageInfo = buildSchema(`

        type Query {
            week: Week,
            resources: [Resource]
        },

        type Week {
            date: String,
            weekNum: Int,
            even: String
        }

        type Resource {
            img: String,
            text: String,
            url: String
        }
    `);
}
