import { buildSchema } from "graphql"

export default buildSchema(`

type Query {
    need: String
}

type Mutation {
    createUser(name: String, role: String): UserReg
}

type UserReg {
    name: String,
    login: String,
    password: String
}
`)
