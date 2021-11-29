import React , { useState, useEffect } from 'react';
import {Container,Button,TextField,Box} from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import styles from './CalendarComponent.module.css';
import moment from 'moment';
import RateLine from './dependancies/RateLine.js';
import axios from "axios";

const getDaysBetweenDates = function(startDate, endDate) {
    var now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('MM/DD/YYYY'));
        now.add(1, 'days');
    }
    return dates;
};

function getNDigits(number, digit){
    digit = digit + '';
    const remain = number - digit.length;
    for(let i = 0; i < remain; i++){
        digit = "0" + digit;
    }
    return digit;
}

function getDate(date){
    date = new Date(date);
    let year = date.getFullYear();
    let month = getNDigits(2, date.getMonth() + 1);
    let day = getNDigits(2, date.getDate());
    date = year + '-' + month + '-' + day;
    return date;
}

const CalendarComponent = () => {
    let today = new Date();
    let oneMonth = new Date(today);
    oneMonth.setDate(oneMonth.getDate() + 30);
    const [dates, setDates] = useState([]);
    const [value, setValue] = useState([moment(today), moment(oneMonth)]);
    const alldays = getDaysBetweenDates(value[0],value[1]);
    const [listTypeChambre, setListTypeChambre] = useState([]);
    const [rateLine, setRateLine] = useState([]);

    function getPrix(){
        try{
            axios({
                method: 'post',
                url: process.env.REACT_APP_BACK_URL + "/typeChambre/prix",
                withCredentials: true,
                data: {dateDebut: getDate(value[0].format()), dateFin: getDate(value[1].format())}
            })
            .then(res => {
                var tmp = [];
                setListTypeChambre(res.data.typeChambre);
                console.log(res.data.typeChambre);
                for(var i = 0; i < res.data.typeChambre.length; i++) {
                    tmp.push(
                        <>
                        <div className={styles.dividerline}></div>
                        <RateLine 
                            typechambre={res.data.typeChambre[i]} 
                            indice={i} fromto={value} daterange={alldays} 
                            listTypeChambre={listTypeChambre}
                            dateRange={value} />
                        </>
                    );
                }
                setRateLine(tmp);
            })
            .catch(err => console.log(err));
        }catch(err){
            console.log(err);
        }

    }

    useEffect(() => {
        getPrix();
    },[])

    return(
        <Container className={styles.container}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateRangePicker
                startText="Check-in"
                endText="Check-out"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    if(newValue != undefined && newValue[0] != null && newValue[1] != null){
                        const allday = getDaysBetweenDates(newValue[0],newValue[1]);
                        getPrix();
                    }
                }}
                renderInput={(startProps, endProps) => (
                <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                </React.Fragment>
                )}
            />
            </LocalizationProvider>
            {rateLine}
        </Container>
    );
}

export default CalendarComponent;
