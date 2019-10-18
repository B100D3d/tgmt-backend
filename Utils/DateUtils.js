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
    const date = new Date();
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 2 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 8, 2));
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
};

const isEven = () => (getWeekNum() % 2) ? "нечетная" : "четная";


module.exports =  {getDate, getWeekNum, isEven};