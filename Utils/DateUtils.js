const months = {
    0: "Января",
    1: "Февраля",
    2: "Марта",
    3: "Апреля",
    4: "Мая",
    5: "Июня",
    6: "Июля",
    7: "Августа",
    8: "Сентября",
    9: "Октября",
    10: "Ноября",
    11: "Декабря"
}


const getDate = () => {
    const date = new Date()
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};


const getWeekNum = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const yearOfStart = (currentDate.getMonth() >= 8) 
                        ? currentDate.getUTCFullYear()
                        : (currentDate.getUTCFullYear() - 1);
    const firstDayOfSchoolYear = new Date(Date.UTC(yearOfStart, 8, 2));
    firstDayOfSchoolYear.setHours(0, 0, 0, 0);
    const pastDaysOfSchoolYear = ((currentDate - firstDayOfSchoolYear) / 86400000) + 1;
    return Math.ceil((pastDaysOfSchoolYear + firstDayOfSchoolYear.getDay() - 1) / 7);
};

const isEven = () => (getWeekNum() % 2) ? "нечетная" : "четная";


export {getDate, getWeekNum, isEven};