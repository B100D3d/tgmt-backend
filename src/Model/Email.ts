import nodemailer from "nodemailer"
import { UserRegData } from "../types"

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    socketTimeout: 5000,
    logger: true,
    auth: {
        user: "info.tuapsegmt@gmail.com",
        pass: "fSociety00"
    }
})


export const sendCreatingEmail = async (userData: UserRegData) => {
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
        console.log(info)
    } catch (err) {
        console.log(err)
    }
    
}

export const sendLoginEmail = async (name: string, email: string, req: any) => {
    const text = `В аккаунт "${name}" был произведён вход\n
    IP: ${req.connection.remoteAddress}\n
    ${req.headers["user-agent"]}`
    const mailOptions = {
        from: "info.tuapsegmt@gmail.com",
        to: email,
        subject: "Выполнен вход в аккаунт",
        text
    }

    try{
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (err) {
        console.log(err)
    }
    
}