import React , { useState, useEffect } from 'react';
import {Container,Button,TextField,Box} from '@mui/material';
import { DateRangePicker } from 'rsuite';
import styles from '../tarif/CalendarComponent.module.css';
import moment from 'moment';
import RateLine from './dependancies/RateLine.js';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import  Navbar  from "../../Navbar/Navbar";
import  ResponsiveDrawer  from "../../Navbar/responsive-drawer.js";
import {session} from '../../../common/utilitySession.js';
import callAPI from '../../../../utility';

import "rsuite/dist/rsuite.min.css";

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

let globalDates = [];
let alldays = [];

const CalendarComponent = () => {

    const hasARCalendar = session.getInstance().hasOneOfTheseAccessRights(["voirCalendrier", "superAdmin"]);

    let initialized = false;
    let today = new Date();
    let oneMonth = new Date(today);
    oneMonth.setDate(oneMonth.getDate() + 30);
    const [value, setValue] = useState([moment(today), moment(oneMonth)]);
    const [openLoad, setOpenLoad] = useState(false);
    const [dateMin, setDateMin] = useState(null);
    const [typeChambres, setTypeChambres] = useState([]);
    
    function getPrix(dates, startLoad, endLoad){
        startLoad ? startLoad() : setOpenLoad(true);
        globalDates = dates;
        let data = {};
        
        try{
            data = {dateDebut: getDate(dates[0].format()), dateFin: getDate(dates[1].format())}
        }catch(err){
            data = {dateDebut: dates, dateFin: dates};
        }

        callAPI(
            'post', 
            '/TCTarif/prix', 
            data, 
            (res) => {
                setTypeChambres(res.typeChambre);
                alldays = getDaysBetweenDates(dates[0],dates[1]);
                endLoad ? endLoad() : setOpenLoad(false);
            },
            (err) => {
                console.log(err);
                endLoad ? endLoad() : setOpenLoad(false);
            }
        );
    }

    console.log(typeChambres);

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
                <DateRangePicker
                    value={[value[0].toDate(), value[1].toDate()]}
                    onChange={(val) => {
                        let newValue = JSON.parse(JSON.stringify(val));
                        for(let i = 0; i < newValue.length; i++){
                            newValue[i] = moment(new Date(newValue[i]));
                        }
                        setValue(newValue);
                        if(newValue != undefined && newValue[0] != null && newValue[1] != null){
                            getPrix(newValue);
                        }
                    }}
                />
                {
                  typeChambres.map((typeChambre, i) => <>
                    <div className={styles.dividerline}></div>
                    <RateLine
                      typeChambres={typeChambres}
                      setTypeChambres={setTypeChambres}
                      typechambre={typeChambre}
                      indice={i}
                      fromto={globalDates}
                      daterange={alldays}
                      getPrix={getPrix}
                      dateMin={dateMin}
                      openLoad={openLoad}
                      setOpenLoad={setOpenLoad}
                      value={value}
                      setValue={setValue}
                      alldays={alldays}
                      customize={hasARCalendar}
                    />
                  </> )
                }
                
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
