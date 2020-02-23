import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from "graphql"

import Group from "./types/group"

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "GroupQuery",
        fields: () => ({
            need: {
                type: GraphQLString
            }
        })
    }),
    mutation: new GraphQLObjectType({
        name: "GroupMutation",
        fields: () => ({
            createGroup: {
                type: Group,
                args: {
                    name: {
                        type: GraphQLString
                    },
                    year: {
                        type: GraphQLInt
                    }
                }
            }
        })
    })
})