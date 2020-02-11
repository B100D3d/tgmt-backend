import { Router } from "express"
import graphqlHTTP from "express-graphql"
import resolver from "../graphql/resolver"
import schema from "../graphql/schemas/schema"
import checkToken from "../middleware/checkToken"
import checkAdmin from "../middleware/checkAdmin"

const apiRouter = Router()

apiRouter.use("/mainPage", graphqlHTTP({
    graphiql: true,
    rootValue: resolver.mainPageResolver,
    schema: schema.mainPageInfo
}
))

apiRouter.use("/createUser", checkAdmin, (req, res) => graphqlHTTP({
    graphiql: true,
    rootValue: resolver.createUsersResolver,
    schema: schema.createUsers,
    context: {req, res}
}
)(req, res))

apiRouter.use("/login", (req, res) => graphqlHTTP({
    graphiql: true,
    rootValue: resolver.loginResolver,
    schema: schema.getUsers,
    context: {req, res}
}
)(req, res))

apiRouter.use("/auth", checkToken, (req, res) => graphqlHTTP({
    graphiql: true,
    rootValue: resolver.authResolver,
    schema: schema.getUsers,
    context: {req, res}
}
)(req, res))

apiRouter.use("/logout", (req, res) => {
    if (req.cookies.token){
        res.clearCookie("token").status(200).send()
    }
    else {
        res.status(200).send()
    }
})

export default apiRouter
