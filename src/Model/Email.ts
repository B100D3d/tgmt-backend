import nodemailer from "nodemailer"
import { UserRegData } from "../types"

const ROLES: {[key: string]: string} = {
    Admin: "Администратор",
    Student: "Студент",
    Teacher: "Преподаватель"
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    socketTimeout: 5000,
    logger: false,
    auth: {
        user: "info.tuapsegmt@gmail.com",
        pass: "fSociety00"
    }
})


export const sendUserCreatingEmail = async (userData: UserRegData): Promise<void> => {
    const {name, login, password, role, email} = userData
    const text = `Пользователь ${name} с ролью "${role}" был успешно создан!\n
    Данные для входа:\n
    Логин: ${login}\n
    Пароль: ${password}\n`
    const mailOptions = {
        from: "info.tuapsegmt@gmail.com",
        to: email,
        subject: "Пользователь был создан",
        text
    }

    try{
        const info = await transporter.sendMail(mailOptions)
        //console.log(info)
    } catch (err) {
        console.log(err)
    }
    
}

export const sendLoginEmail = async (name: string, email: string, role: string, req: any): Promise<void> => {
    const text = `Был выполнен вход в аккаунт "${name}" (${ROLES[role]})\n
    IP: ${req.ip}\n
    ${req.headers["user-agent"]}`
    const mailOptions = {
        from: "info.tuapsegmt@gmail.com",
        to: email,
        subject: "Выполнен вход в аккаунт",
        text
    }

    try{
        const info = await transporter.sendMail(mailOptions)
        //console.log(info)
    } catch (err) {
        console.log(err)
    }
    
}


export const sendPassChangedEmail = async (name: string, email: string, password: string): Promise<void> => {
    const text = `У аккаунта "${name}" был изменён пароль.\nНовый пароль: ${password}`
    const mailOptions = {
        from: "info.tuapsegmt@gmail.com",
        to: email,
        subject: "Изменение пароля",
        text
    }

    try{
        const info = await transporter.sendMail(mailOptions)
        //console.log(info)
    } catch (err) {
        console.log(err)
    }
    
}