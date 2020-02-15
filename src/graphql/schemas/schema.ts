import { 
    buildSchema,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull
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

    public static createUser = buildSchema(`

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

    public static getUser = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "GetUserQuery",
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

    public static getUserInfo = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "GetUserInfoQuery",
            fields: () => ({

            })
        })
    })

    public static setUserInfo = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "SetUserInfoQuery",
            fields: () => ({
                need: {
                    type: GraphQLString
                }
            })
        }),
        mutation: new GraphQLObjectType({
            name: "SetUserInfoMutation",
            fields: () => ({
                setEmail: {
                    type: GraphQLString,
                    args: {
                        email: {
                            type: GraphQLString
                        }
                    }
                },
                changePassword: {
                    type: GraphQLBoolean,
                    args: {
                        oldPassword: {
                            type: new GraphQLNonNull(GraphQLString)
                        },
                        newPassword: {
                            type: new GraphQLNonNull(GraphQLString)
                        }
                    }
                }
            })
        })
    })
}
