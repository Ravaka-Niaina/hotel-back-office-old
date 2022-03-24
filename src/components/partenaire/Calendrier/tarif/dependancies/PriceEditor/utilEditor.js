export const days = [
    {
        "value": 1,
        "checked": true,
        "label": "Mon"
    },
    {
        "value": 2,
        "checked": true,
        "label": "Tue"
    },
    {
        "value": 3,
        "checked": true,
        "label": "Wed"
    },
    {
        "value": 4,
        "checked": true,
        "label": "Thu"
    },
    {
        "value": 5,
        "checked": true,
        "label": "Fri"
    },
    {
        "value": 6,
        "checked": true,
        "label": "Sat"
    },
    {
        "value": 7,
        "checked": true,
        "label": "Sun"
    }
];

export const getDateYYYYMMDD = (dateString) => {
    let tmp = dateString.split("/");
    return tmp[2] + "-" + tmp[0] + "-" + tmp[1];
};