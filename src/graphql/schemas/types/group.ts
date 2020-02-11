import { 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from "graphql";
import Subject from "./subject"
import Absence from "./absence"
import Schedule from "./schedule"
import Grade from "./grade"

export default new GraphQLObjectType({
    name: "Group",
    fields: () => ({
        name: {
            type: GraphQLString
        },
        students: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "GroupStudents",
                fields: () => ({
                    name: {
                        type: GraphQLString
                    },
                    grades: {
                        type: new GraphQLList(Grade)
                    },
                    absences: {
                        type: new GraphQLList(Absence)
                    }
                })
            }))
        },
        subjects: {
            type: new GraphQLList(Subject)
        },
        schedule: {
            type: new GraphQLList(Schedule)
        },
        year: {
            type: GraphQLInt
        }
    })
})
