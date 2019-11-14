import * as Date from '../Model/Date';

export default class Resolver {
    static mainPageResolver = {
        week: () => ({
            date: Date.getDate(), 
            weekNum: Date.getWeekNum(), 
            even: Date.isEven()
        }),

        resources: () => [{img: 'img', text: 'text', url: 'url'}],
    };
}
