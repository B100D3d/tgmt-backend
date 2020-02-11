import { 
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList
} from "graphql";


export default new GraphQLObjectType({
    name: "Grade",
    fields: () => ({
        subject: {
            type: new GraphQLObjectType({
                name: "StudentSubject",
                fields: () => ({
                    name: {
                        type: GraphQLString
                    },
                    teacher: {
                        type: GraphQLString
                    }
                })
            })
        },
        grades: {
            type: new GraphQLList(GraphQLInt)
        }
    })
})