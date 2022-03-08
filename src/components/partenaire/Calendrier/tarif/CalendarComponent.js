import React , { useState, useEffect } from 'react';
import {Container,Button,TextField,Box} from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import styles from '../tarif/CalendarComponent.module.css';
import moment from 'moment';
import RateLine from './dependancies/RateLine.js';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import  Navbar  from "../../Navbar/Navbar";
import  ResponsiveDrawer  from "../../Navbar/responsive-drawer.js";
import {session} from '../../../common/utilitySession.js';

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

    const hasARCalendar = session.getInstance().hasOneOfTheseAccessRights(["voirCalendrier", "superAdmin"]);

    let initialized = false;
    let today = new Date();
    let oneMonth = new Date(today);
    oneMonth.setDate(oneMonth.getDate() + 30);
    const [value, setValue] = useState([moment(today), moment(oneMonth)]);
    const [rateLine, setRateLine] = useState([]);
    const [openLoad, setOpenLoad] = useState(false);
    const [dateMin, setDateMin] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [isFirst, setIsFirst] = useState(true);
    const [isAccept, setIsAccept] = React.useState(false);
    const [isTextField, setIsTextField] = React.useState(false);
    function getPrix(dates){
        setOpenLoad(true);
        try{
            axios({
                method: 'post',
                url: process.env.REACT_APP_BACK_URL + "/TCTarif/prix",
                withCredentials: true,
                data: {dateDebut: getDate(dates[0].format()), dateFin: getDate(dates[1].format())}
            })
            .then(res => {
                const alldays = getDaysBetweenDates(dates[0],dates[1]);
                let tmp = [];
                for(var i = 0; i < res.data.typeChambre.length; i++) {
                    tmp.push(
                        <>
                        <div className={styles.dividerline}></div>
                        <RateLine 
                            typechambre={res.data.typeChambre[i]} 
                            indice={i} 
                            fromto={dates} 
                            daterange={alldays}
                            getPrix={getPrix}
                            dateMin={dateMin}
                            openLoad={openLoad}
                            setOpenLoad={setOpenLoad}
                            value={value}
                            setValue={setValue}
                            alldays={alldays}
                            customize={hasARCalendar} />
                        </>
                    );
                }
                setRateLine(tmp);
                setOpenLoad(false);
            })
            .catch(err => {console.log(err); setOpenLoad(false);});
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        if(!initialized){
            initialized = true;
            getPrix(value);
        }
    }, []);

    return(
        <>
            {/* <Navbar currentPage={1}/> */}
            <Container className={styles.container} style={{filter: "blur(" + (openLoad ? "2" : "0") + "px)"}}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateRangePicker
                    open={open}
                    onAccept={() => {
                        setIsAccept(true);
                    }}
                    onClose={() => {
                        setIsAccept(false);
                        if (!isTextField) {
                            setOpen(false);
                            setIsTextField(false);
                        }
                    }}
                    onOpen={() => {
                        if (!isAccept) {
                            setOpen(true);
                        }
                    }}
                    startText="Depuis"
                    endText="Jusqu'à"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        if(newValue != undefined && newValue[0] != null && newValue[1] != null){
                            getPrix(newValue);
                        }
                    }}
                    renderInput={(startProps, endProps) => (
                    <React.Fragment>
                        <TextField
                        {...startProps}
                        onFocus={() => {
                            setIsTextField(true);
                        }}
                        onBlur={() => {
                            setIsTextField(false);
                        }}
                        onClick={() => {
                            setOpen(true);
                        }}
                        />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField
                        {...endProps}
                        onFocus={() => {
                            setIsTextField(true);
                        }}
                        onBlur={() => {
                            setIsTextField(false);
                        }}
                        onClick={() => {
                            setOpen(true);
                        }}
                        />
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
            <canvas></canvas>
        </>
    );
}

export default function Calendrier_(){
    return(
        <ResponsiveDrawer 
            title = "Calendrier"
            getContent = {CalendarComponent}
        />
    );
};
