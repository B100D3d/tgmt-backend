
import { getDate, getWeekNum, isEven } from '../Utils/DateUtils.js';

const mainPageResolver = {
    week: () => {
        return { date: getDate(), weekNum: getWeekNum(), even: isEven()};
    },
};


export default {mainPageResolver};
