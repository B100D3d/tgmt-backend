import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from "graphql";
import Group from "./group"
import Teacher from "./teacher"


export default new GraphQLObjectType({
    name: "Admin",
    fields: () => ({
        name: {
            type: GraphQLString
        },
        role: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        groups: {
            type: new GraphQLList(Group)
        },
        teachers: {
            type: new GraphQLList(Teacher)
        }

    })
})
