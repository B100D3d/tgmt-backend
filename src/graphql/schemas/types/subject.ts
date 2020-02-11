import {
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import Teacher from "./teacher"


export default new GraphQLObjectType({
    name: "Subject",
    fields: () => ({
        name: {
            type: GraphQLString
        },
        teacher: {
            type: Teacher
        }
    })
})
