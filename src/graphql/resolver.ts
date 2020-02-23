import getWeek from "../Model/Date";
import { getResources } from "../Model/Resources";
import {
    auth,
    createAdmin,
    createStudent,
    createTeacher,
    login,
    setEmail,
    changePassword,
    createGroup,
    createSubject,
    getStudents
} from "../Model/User";

export default class Resolver {
    public static mainPageResolver = {
        week: getWeek,
        resources: getResources,
    };

    public static createUsersResolver = {
        createAdmin,
        createStudent,
        createTeacher
    };

    public static loginResolver = {
        login
    }

    public static authResolver = {
        auth
    }

    public static setUserInfoResolver = {
        setEmail,
        changePassword
    }

    public static groupsResolver = {
        createGroup
    }

    public static studentsResolver = {
        getStudents
    }

    public static subjectsResolver = {
        createSubject
    }
}