import {
    GraphQLUnionType,
    GraphQLObjectType
} from "graphql";
import Admin from "./admin"
import Teacher from "./teacher"
import Student from "./student"

export default new GraphQLUnionType({
    name: "User",
    types: [Admin, Teacher, Student],
    resolveType(value): GraphQLObjectType {
        if (value.groups) {
            return Admin
        }
        if (value.subjects) {
            return Teacher
        }
        if (value.grades || value.absences || value.group) {
            return Student
        }
    }
})