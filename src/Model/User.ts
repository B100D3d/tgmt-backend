import userModel from "./MongoModels/userModel"
import groupModel from "./MongoModels/groupModel"
import { generateLogin, generatePassword } from "./Utils"
import { UserCreatingData, UserRegData, UserModel, Admin, LoginInfo } from "../types"
import { sendCreatingEmail, sendLoginEmail } from "../Model/Email"

const getUserData = (user: UserModel) => {

    switch (user.role){
        case "Admin": {
            // const dbGroups = await groupModel
            //                 .find()
            //                 .populate("students")
            //                 .populate("subjects")
            //                 .populate("schedule")
            //                 .exec()
            // console.log(dbGroups);

            const {name, email} = user
            const admin = {
                name,
                role: "Admin",
                email,
                groups: [{name: "Lalalal"}],
                teachers: [{name: "Azazaza"}]
            }

            return admin;
        }
        default: {
            break
        }
    }
    
}



export const createAdmin = async ({name, email}: UserCreatingData, 
                                  {req, res}: any): Promise<UserRegData|null> => {

    const password = generatePassword()
    const login = generateLogin(name)
    const role = "Admin"
    const admin = new userModel({
        name,
        login,
        role,
        email
    })

    await admin.setPassword(password)

    try {
        await admin.save()
        const userRegData: UserRegData = {
            name,
            login,
            password,
            role,
            email
        }

        if(email){
           sendCreatingEmail(userRegData)
        }  

        return userRegData
    } catch (err) {
        console.log(`Admin didn't saved: \n ${err}`)
        res.status(500)
        return
    }
        
}

export const createUser = async (args: UserCreatingData, 
                                 {req, res}: any): Promise<UserRegData|null> => {

    switch (args.role) {
        case "Admin": {
            return createAdmin(args, {req, res})
        }
        default: {
            res.status(403)
            return
        }
    }
}

export const auth = async (_: any, {req, res}: any) => {

    const { uniqueId } = req.user;

    const user = await userModel.findById(uniqueId).exec()
    
    if (!user){
        res.status(401)
        return
    }

    const options = +process.env.PROD ? { httpOnly: true, secure: true } : { httpOnly: true }
    const token = user.generateJWT()
    res.cookie("token", token, options)

    if (user.email){
        sendLoginEmail(user.name, user.email, req)
    }
    

    return getUserData(user);


}

export const login = async ({login, password}: LoginInfo, {req, res}: any) => {

    const user = await userModel.findOne({ login }).exec()

    if (!user){
        res.status(403)
        return
    }

    const isPasswordValid = await user.isPasswordValid(password)

    if (!isPasswordValid){
        res.status(403)
        return
    }

    const options = +process.env.PROD ? { httpOnly: true, secure: true } : { httpOnly: true }
    const token = user.generateJWT()
    res.cookie("token", token, options)  

    if (user.email){
        sendLoginEmail(user.name, user.email, req)
    }
    

    return getUserData(user)

}
