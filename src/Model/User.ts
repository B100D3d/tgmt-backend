import userModel from "./MongoModels/userModel"
import groupModel from "./MongoModels/groupModel"
import studentModel from "./MongoModels/studentModel"
import {
    generateLogin,
    generatePassword,
    generateGroupID,
    generateStudentID,
    generateTeacherID,
    generateSubjectID
} from "./Utils"
import {
    AdminCreatingData,
    UserRegData,
    UserModel,
    Admin,
    LoginInfo,
    Email,
    GroupModel,
    PasswordsInfo,
    GroupCreatingData,
    CreatedGroup,
    StudentCreatingData,
    StudentRegData,
    Student,
    ScheduleModel,
    UserCreatingData,
    SubjectCreatingData,
    CreatedSubject
} from "../types"
import { sendUserCreatingEmail, sendLoginEmail, sendPassChangedEmail } from "../Model/Email"
import teacherModel from "./MongoModels/teacherModel"
import subjectModel from "./MongoModels/subjectModel"

const DEFAULT_OPTIONS = { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }

const getAdminData = async (user: UserModel): Promise<Admin> => {
    const { name, role, email } = user

    const dbGroups = await groupModel
                    .find()
                    .exec()
    

    const groups = dbGroups.map(({name, id, year}: GroupModel) => ({name, id, year}))

    const admin: Admin = {
        name,
        role,
        email,
        groups
    }

    return admin;
}

const getStudentData = async (user: UserModel): Promise<Student> => {
    const { name, role, email } = user

    const studentDB = await user.populate({
        path: "student",
        populate: {
            path: "group"
            // populate: {
            //     path: "schedule",
            //     populate: {
            //         path: "subject",
            //         populate: {
            //             path: "teacher"
            //         }
            //     }
            // }
        }
    }).execPopulate()

    const schedule = studentDB.student.group.schedule.map(
        ({subject: {name, teacher}, classNumber, weekday}: ScheduleModel) => 
        ({subject: {name, teacher: teacher.name}, classNumber, weekday})
    )

    const group = {
        name: studentDB.student.group.name,
        year: studentDB.student.group.year
    }

    const student: Student = 
    {
        name,
        role,
        email,
        group,
        schedule
    }

    return student
}

const getUserData = (user: UserModel): Promise<Student | Admin> => { // Дописать типы промисов
    const USER_DATA_FUNC: {[key: string]: Function} = {
        "Admin": getAdminData,
        "Student": getStudentData
    }

    return USER_DATA_FUNC[user.role](user)
}


export const getStudents = async (_: any, { res }: any): Promise<Array<Student>> => {

    const studentsDB = await userModel
                        .find({role: "Student"})
                        .populate({ path: "student", populate: { path: "group" }})
                        .exec()

    const students = studentsDB.map(
        ({ name, email, student: { id, group: { year, id: groupId, name: groupName }}}: UserModel) => 
        ({ name, email, id, group: { year, id: groupId, name: groupName }})
    )

    return students
}


export const createAdmin = async (args: AdminCreatingData, { res }: any): Promise<UserRegData | null> => {

    const { name, email } = args
    let { login, password } = args

    password = password || generatePassword()
    login = login || generateLogin(name)

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

        if (email) {
            sendUserCreatingEmail(userRegData)
        }

        return userRegData

    } catch (err) {
        console.log(`Admin didn't saved: \n ${err}`)
        res.status(500)
        return
    }

}

export const createStudent = async (args: StudentCreatingData, { res }: any): Promise<StudentRegData | null> => {

    const { name, email, groupName } = args
    const password = generatePassword()
    const login = generateLogin(name)
    const id = generateStudentID(name, groupName)
    const role = "Student"

    try {
        const group = await groupModel.findOne({ name: groupName }).exec()

        if (!group) {
            console.log("Group not found")
            res.status(404)
            return
        }

        const student = new studentModel({
            id,
            name,
            group: group._id
        })

        const user = new userModel({
            name,
            login,
            email,
            role,
            student: student._id
        })

        group.students.addToSet(student._id)

        await user.setPassword(password)

        await student.save()
        await group.save()
        await user.save()

        const studentRegData: StudentRegData = {
            name,
            login,
            password,
            email,
            role,
            groupName
        }

        if (email) {
            sendUserCreatingEmail(studentRegData)
        }

        return studentRegData

    } catch (err) {
        console.log(`Student didn't saved: \n${err}`)
        res.status(500)
        return
    }

}

export const createTeacher = async (args: UserCreatingData, { res }: any): Promise<UserRegData | null> => {
    
    const { name, email } = args
    const password = generatePassword()
    const login = generateLogin(name)
    const id = generateTeacherID(name)
    const role = "Teacher"

    const teacher = new teacherModel({
        id,
        name
    })

    const user = new userModel({
        name,
        login,
        role,
        email,
        teacher: teacher._id
    })

    await user.setPassword(password)

    try {
        await teacher.save()
        await user.save()

        const teacherRegData: UserRegData = {
            name,
            login,
            password,
            role,
            email
        }

        return teacherRegData

    } catch(err) {
        console.log(`Teacher didn't saved: \n${err}`)
        res.status(500)
        return
    }
}

export const createSubject = async (args: SubjectCreatingData, { res }: any): Promise<CreatedSubject> => {

    const { name, teacher: teacherName } = args
    const id = generateSubjectID(name)

    const teacher = await teacherModel.findOne({ name: teacherName }).exec()

    const subject = new subjectModel({
        id,
        name,
        teacher: teacher._id
    })

    teacher.subjects.addToSet(subject._id)

    try {

        await subject.save()
        await teacher.save()

        return {
            id,
            name,
            teacher: teacherName
        }

    } catch(err) {
        console.log(`Subject didn't saved: \n${err}`)
        res.status(500)
        return
    }
}


export const createGroup = async ({ name, year }: GroupCreatingData, { req, res }: any): Promise<CreatedGroup | null> => {
    const id = generateGroupID(name)

    const groupData = { id, name, year }
    const group = new groupModel(groupData)

    try {
        await group.save()

        return groupData

    } catch (err) {
        console.log(`Group didn't saved: \n ${err}`)
        res.status(500)
        return
    }
}

export const auth = async (_: any, { req, res }: any) => {

    const { uniqueId } = req.user;

    try {
        const user = await userModel.findById(uniqueId).exec()

        if (!user) {
            res.status(401)
            return
        }

        const options = +process.env.PROD ? { ...DEFAULT_OPTIONS, secure: true } : DEFAULT_OPTIONS
        const token = user.generateJWT()
        res.cookie("token", token, options)

        if (user.email) {
            sendLoginEmail(user.name, user.email, user.role, req)
        }


        return getUserData(user);

    } catch (err) {
        console.log(err)
        res.status(500)
        return
    }
}

export const login = async ({ login, password }: LoginInfo, { req, res }: any) => {

    try {

        const user = await userModel.findOne({ login }).exec()

        if (!user) {
            res.status(403)
            return
        }

        const isPasswordValid = await user.isPasswordValid(password)

        if (!isPasswordValid) {
            res.status(403)
            return
        }

        const options = +process.env.PROD ? { ...DEFAULT_OPTIONS, secure: true } : DEFAULT_OPTIONS
        const token = user.generateJWT()
        res.cookie("token", token, options)

        if (user.email) {
            sendLoginEmail(user.name, user.email, user.role, req)
        }


        return getUserData(user)

    } catch (err) {
        console.log(err)
        res.status(500)
        return
    }
}

export const setEmail = async ({ email }: Email, { req, res }: any): Promise<Email | null> => {

    const { uniqueId } = req.user;

    try {
        const user = await userModel.findByIdAndUpdate(uniqueId, { email }, { new: true }).exec()

        if (!user) {
            res.status(401)
            return
        }

        return { email: user.email }

    } catch (err) {
        console.log(err)
        res.status(500)
        return
    }
}

export const changePassword = async ({ oldPassword, newPassword }: PasswordsInfo, { req, res }: any): Promise<boolean> => {

    const { uniqueId } = req.user;

    try {
        const user = await userModel.findById(uniqueId).exec()

        if (!user) {
            res.status(401)
            return
        }

        const isPasswordValid = await user.isPasswordValid(oldPassword)

        if (!isPasswordValid) {
            res.status(403)
            return
        }

        await user.setPassword(newPassword)
        await user.save()

        if (user.email) {
            sendPassChangedEmail(user.name, user.email, newPassword)
        }

        return true

    } catch (err) {
        console.log(err)
        res.status(500)
        return
    }
}
