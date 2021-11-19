import React , { useState } from 'react';
import {Container,Button,TextField,Box} from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import styles from './CalendarComponent.module.css';
import moment from 'moment';
import RateLine from './dependancies/RateLine.js';

const getDaysBetweenDates = function(startDate, endDate) {
    var now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('MM/DD/YYYY'));
        now.add(1, 'days');
    }
    return dates;
};

const CalendarComponent = () => {
    const [dates, setDates] = useState([]);
    const [value, setValue] = useState([moment('2021-11-11'), moment('2021-12-11')]);
    const alldays = getDaysBetweenDates(value[0],value[1]);
    const rates = [];
    for(var i = 0; i < 3; i++) {
        rates.push(
            <>
            <div className={styles.dividerline}></div>
            <RateLine indice={i} fromto={value} daterange={alldays} />
            </>
        );
    }
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
            {rates}
        </Container>
    );
}

export default CalendarComponent;
