import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from "graphql"

import Subject from "./types/subject"

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
            createSubject: {
                type: Subject,
                args: {
                    name: {
                        type: GraphQLString
                    },
                    teacher: {
                        type: GraphQLString
                    }
                }
            }
        })
    })
})