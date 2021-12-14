import React, { useEffect, useState, useRef } from 'react';
import { getToday } from './utils/moment-utils';
import './bae-calendar.scss';

import CalendarHeader from './components/calendar-header';
import WeekdayIndicator from './components/weekday-indicator';
import DateIndicator from './components/date-indicator';
import MonthIndicator from './components/month-indicator';
// https://uicookies.com/html-calendar/

import { presetDateTracker } from './utils/date-utils';

import {data} from './utils/data.js';
import callAPI from '../utility.js';
import {getDate} from '../tarif/utility.js';

const themes = {
  salmon: 'salmon-theme',
  monochrome: 'monochrome-theme',
  rouge: 'rouge-theme',
};

const BaeCalendar = ({ theme, activeDates, onDateSelect, context }) => {
  const presetActiveDates = useRef(presetDateTracker(activeDates || []));

  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth() , 1);
  const [selectDate, setSelectDate] = useState(today);

  let oneMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  const [monthLater, setMonthLater] = useState(oneMonth);

  const [bornes, setBornes] = useState({debut: null, fin: null, isDebut: true});

  let [prix, setPrix] = useState(null);

  function populatePrix(res){
    if(res.status === 200){
      console.log(res);
      setPrix(res.result);
    }
  }

  function getPrix(dateDebut, dateFin){
    let debut = new Date(dateDebut);
    debut.setDate(1);
    let fin = new Date(dateFin);
    fin.setDate(1);

    const data = {dateDebut: getDate(debut), dateFin: getDate(fin)};
    callAPI('post', '/TCTarif/disponibiliteTarif', data, populatePrix);
  }

  function stopReload(){
    let temp = JSON.parse(JSON.stringify(context.state));
    temp.reload = false;
    context.setState(temp);
  }

  useEffect(() => {
    if(context.state.reload){
      getPrix(selectDate, monthLater);
      stopReload();
      //setPrix(data);
      if (onDateSelect) {
        onDateSelect(selectDate);
      }
      console.log("reload calendar...");
    }
    
  });

  function reload(){
    let temp = JSON.parse(JSON.stringify(context.state));
    temp.reload = true;
    context.setState(temp);
    getPrix(selectDate, monthLater);
  }

  return (
    <div style={{width: "fit-content", margin: "0 auto"}}>
      <MonthIndicator 
        selectDate={selectDate} setSelectDate={setSelectDate} 
        monthLater={monthLater} setMonthLater={setMonthLater} 
        getPrix={getPrix} />
      <div className={`bae-calendar-container ${themes[theme]}`}>
        <CalendarHeader selectDate={selectDate} />
        <WeekdayIndicator />
        <DateIndicator
          activeDates={presetActiveDates.current}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          bornes={bornes}
          setBornes={setBornes}
          prix={prix}
          context={context}
        />
      </div>
      <div style={{width: "20px", height: "20px", display: "inline-block"}}></div>
      <div className={`bae-calendar-container ${themes[theme]}`}>
        <CalendarHeader selectDate={monthLater} />
        <WeekdayIndicator />
        <DateIndicator
          activeDates={presetActiveDates.current}
          selectDate={monthLater}
          setSelectDate={setMonthLater}
          bornes={bornes}
          setBornes={setBornes}
          prix={prix}
          context={context}
        />
      </div>
    </div>
  );
};

export default BaeCalendar;