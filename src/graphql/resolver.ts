import * as Date from "../Model/Date";
import { getResources } from "../Model/Resources";

export default class Resolver {
    public static mainPageResolver = {
        week: () => ({
            date: Date.getDate(),
            even: Date.isEven(),
            weekNum: Date.getWeekNum()
        }),

        resources: () => getResources(),
    };
}
