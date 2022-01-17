import React , { useState, useEffect } from 'react';
import {Container,Button,TextField,Box} from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import styles from './CalendarComponent.module.css';
import moment from 'moment';
import RateLine from './dependancies/RateLine.js';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import  Navbar  from "../../Navbar/Navbar";

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
    const [rateLine, setRateLine] = useState([]);
    const [openLoad, setOpenLoad] = useState(false);
    const [dateMin, setDateMin] = useState(null);
    const [isFirst, setIsFirst] = useState(true);

    function getPrix(){
        setOpenLoad(true);
        try{
            axios({
                method: 'post',
                url: process.env.REACT_APP_BACK_URL + "/TCTarif/prix",
                withCredentials: true,
                data: {dateDebut: getDate(value[0].format()), dateFin: getDate(value[1].format())}
            })
            .then(res => {
                console.log(res.data);
                //setDateMin(new Date(res.data.dateMin));
                let tmp = [];
                for(var i = 0; i < res.data.typeChambre.length; i++) {
                    tmp.push(
                        <>
                        <div className={styles.dividerline}></div>
                        <RateLine 
                            typechambre={res.data.typeChambre[i]} 
                            indice={i} fromto={value} daterange={alldays} 
                            dateRange={value}
                            getPrix={getPrix}
                            dateMin={dateMin}
                            setOpenLoad={setOpenLoad} />
                        </>
                    );
                }
                setRateLine(tmp);
                setOpenLoad(false);
            })
            .catch(err => {console.log(err); setOpenLoad(false);});
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getPrix();
    }, []);

    return(
        <>
            <Navbar currentPage={1}/>
            <Container class="container" className={styles.container} style={{filter: "blur(" + (openLoad ? "2" : "0") + "px)"}}>
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoad}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default CalendarComponent;
