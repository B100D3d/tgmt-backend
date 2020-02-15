import { Schema, Document } from "mongoose";

export interface TokenInfo {
    uniqueId: string;
}

export interface UserRegData {
    name: string;
    login: string;
    password: string;
    role: string;
    email: string;
}

export interface UserCreatingData {
    name: string;
    role?: string;
    email: string;
}

export interface AdminCreatingData {
    name: string;
}

export interface StudentCreatingData {
    name: string;
}

export interface TeacherCreatingData {
    name: string;
}

export interface User {
    login: string;
    hash?: string;
    name: string;
    role: string;
    email: string;
    fingerprints: Array<string>;
    data?: Schema.Types.Mixed;
}

export interface UserModel extends User, Document {
    setPassword(pass: string): Promise<void>;
    isPasswordValid(pass: string): Promise<boolean>;
    generateJWT(): string;
}

export interface StudentModel extends Document {
    name: string;
    grades: Schema.Types.ObjectId[];
    absences: Schema.Types.ObjectId[];
    group: Schema.Types.ObjectId;
}


export interface TeacherModel extends Document {
    name: string;
    groups: Schema.Types.ObjectId[];
}

export interface SubjectModel extends Document {
    name: string;
    teacher: Schema.Types.ObjectId;
}

export interface ResourceModel extends Document {
    img: string;
    text: string;
    url: string;
}

export interface AbsenceModel extends Document {
    date: Date;
    absence: Array<number>;
}

export interface GradesModel extends Document {
    subject: Schema.Types.ObjectId;
    date: Date;
    grades: [number];
}

export interface GroupModel extends Document {
    name: string;
    students: Schema.Types.ObjectId[];
    subjects: Schema.Types.ObjectId[];
    schedule: Schema.Types.ObjectId[];
    year: number;
}

export interface ScheduleModule extends Document {
    classNumber: number;
    weekday: number;
    subject: Schema.Types.ObjectId;
}

export interface Admin {
    name: string;
    role: string;
    groups: Group[];
    teachers: Teacher[];
}

export interface Teacher {
    name: string;
    role: string;
    groups: Group[];
}

export interface Student {
    name: string;
    role: string;
    grades: Grade[];
    absences: Absence[];
    group: Group;
}

export interface Group {
    name: string;
    students: Student[];
    subjects: Subject[];
    schedule: Schedule[];
    year: number;
}

export interface Schedule {
    subject: Subject;
    classNumber: number;
    weekDay: number;
}

export interface Subject {
    name: string;
    teacher: Teacher;
}

export interface Absence {
    classNumber: number;
    date: Date;
    absence: boolean;
}

export interface Grade {
    subject: Subject;
    date: Date;
    grade: number;
}

export interface Login {
    login: string;
}

export interface LoginInfo extends Login {
    password: string;
}

export interface PasswordsInfo {
    oldPassword: string;
    newPassword: string;
}

export interface Week {
    date: string;
    even: string;
    weekNum: number;
}

export interface Res {
    img: string;
    text: string;
    url: string;
}

export interface Email {
    email: string;
}