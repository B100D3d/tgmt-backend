import { transliterate } from "transliteration"

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#$%*"

const generateStr = (length: number): string => {
    let str = ""
    for (let i = 0; i < length; i++){
        str += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    return str
}

const generateLogin = (name: string): string => {
    const lastName = name.split(" ")[0]
    const tLastName = transliterate(lastName)
    const str = generateStr(4)
    return `${tLastName}_${str}`
};

const generatePassword = (): string => {
    const length = Math.floor(12 + Math.random() * 5)
    return generateStr(length)
};

export { generateLogin, generatePassword };
