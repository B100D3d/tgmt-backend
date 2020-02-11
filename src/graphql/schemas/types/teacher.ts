import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from "graphql";

import Absence from "./absence"
import Grade from "./grade"

export default new GraphQLObjectType({
    name: "Teacher",
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
            type: new GraphQLList(new GraphQLObjectType({
                name: "TeacherGroup",
                fields: () => ({
                    name: {
                        type: GraphQLString
                    },
                    students: {
                        type: GraphQLList(new GraphQLObjectType({
                            name: "TeacherGroupsStudent",
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
                    schedule: {
                        type: new GraphQLList(new GraphQLObjectType({
                            name: "TeacherSchedule",
                            fields: () => ({
                                subject: {
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
            }))
        }
    })
})
