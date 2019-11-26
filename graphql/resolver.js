import * as Date from '../Model/Date';
import { getResources } from '../Model/Resources';

export default class Resolver {
    static mainPageResolver = {
        week: () => ({
            date: Date.getDate(), 
            weekNum: Date.getWeekNum(), 
            even: Date.isEven()
        }),

        resources: () => getResources(),
    };
}
