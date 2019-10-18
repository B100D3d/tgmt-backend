
const {getDate, getWeekNum, isEven} = require('../Utils/DateUtils.js');


const mainPageResolver = {
    week: () => {
        return { date: getDate(), weekNum: getWeekNum(), even: isEven()};
    },
};


module.exports = {mainPageResolver};
