import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from "graphql";
import Absence from "./absence"
import Grade from "./grade"

export default new GraphQLObjectType({
    name: "Student",
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
        grades: {
            type: new GraphQLList(Grade)
        },
        absences: {
            type: new GraphQLList(Absence)
        },
        group: {
            type: new GraphQLObjectType({
                name: "StudentGroup",
                fields: () => ({
                    name: {
                        type: GraphQLString
                    },
                    subjects: {
                        type: new GraphQLList(new GraphQLObjectType({
                            name: "StudentSubjects",
                            fields: () => ({
                                name: {
                                    type: GraphQLString
                                },
                                teacher: {
                                    type: GraphQLString
                                }
                            })
                        }))
                    },
                    schedule: {
                        type: new GraphQLList(new GraphQLObjectType({
                            name: "StudentSchedule",
                            fields: () => ({
                                subjects: {
                                    type: GraphQLString
                                },
                                classNumber: {
                                    type: GraphQLInt
                                },
                                weekDay: {
                                    type: GraphQLInt
                                }
                            })
                        }))
                    },
                    year: {
                        type: GraphQLInt
                    }
                })
            })
        }

    })
})

