import { 
    buildSchema,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

import User from "./types/user"

export default class Schema {
    public static mainPageInfo = buildSchema(`

        type Query {
            week: Week,
            resources: [Resource]
        }

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
    `)

    public static createUsers = buildSchema(`

        type Query {
            need: String
        }

        type Mutation {
            createUser(name: String, role: String, email: String = ""): UserReg
        }

        type UserReg {
            name: String,
            login: String,
            password: String,
            role: String,
            email: String
        }
    `)

    public static getUsers = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "Query",
            fields: () => ({
                login: {
                    type: User,
                    args: {
                        login: {
                            type: GraphQLString
                        },
                        password: {
                            type: GraphQLString
                        }
                    }
                },
                auth: {
                    type: User
                }
            })
        })
    })
}
