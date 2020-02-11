import getWeek from "../Model/Date";
import { getResources } from "../Model/Resources";
import { auth, createUser, login } from "../Model/User";

export default class Resolver {
    public static mainPageResolver = {
        week: getWeek,
        resources: getResources,
    };

    public static createUsersResolver = {
        createUser
    };

    public static loginResolver = {
        login
    }

    public static authResolver = {
        auth
    }
}

