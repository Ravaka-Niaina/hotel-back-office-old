const getNDigits = (number, digit) => {
    digit = digit + '';
    const remain = number - digit.length;
    for(let i = 0; i < remain; i++){
        digit = "0" + digit;
    }
    return digit;
}

export const getDate = (argDate) => {
    let date = new Date(argDate);
    date.setTime( date.getTime() - date.getTimezoneOffset() * 60 * 1000 );
    let year = date.getFullYear();
    let month = getNDigits(2, date.getMonth() + 1);
    let day = getNDigits(2, date.getDate());
    date = day + "/" + month + "/" + year;
    return date;
}

export const getDateTime = (date) => {
    date = new Date(date);
    
    const year = date.getFullYear();
    const month = getNDigits(2, date.getMonth() + 1);
    const day = getNDigits(2, date.getDate());

    const hour = getNDigits(2, date.getHours());
    const minute = getNDigits(2, date.getMinutes());
    const second = getNDigits(2, date.getSeconds());
    const millisecond = getNDigits(3, date.getMilliseconds());
    date = year + '-' + month + '-' + day + ' ' + hour + ":" + minute + ':' + second + "." + millisecond;
    return date;
}

export const getDiffDays = (StartDate, EndDate) => {
    var nDays = ( Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
        Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate())) / 86400000;
    return nDays;
}