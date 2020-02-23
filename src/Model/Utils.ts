import { transliterate } from "transliteration"

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#$%*"

const generateStr = (length: number): string => {
    let str = ""
    for (let i = 0; i < length; i++){
        str += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    return str
}

export const generateLogin = (name: string): string => {
    const lastName = name.split(" ")[0]
    const tLastName = transliterate(lastName)
    const str = generateStr(4)
    return `${tLastName}_${str}`
};

export const generatePassword = (): string => {
    const length = Math.floor(12 + Math.random() * 5)
    return generateStr(length)
};

export const generateGroupID = (name: string): string => {
    return transliterate(name.split(" ").join(""))
}

export const generateSubjectID = (name: string): string => { // Дописать

     return ""
}

export const generateStudentID = (name: string, groupName: string): string => {
    const lastName = transliterate(name.split(" ")[0])
    const groupID = generateGroupID(groupName)

    return `${lastName}${groupID}`
}

export const generateTeacherID = (name: string): string => {
    const lastName = transliterate(name.split(" ")[0])

    return lastName
}
