import React, { useEffect, useState, useRef } from 'react';
import { getToday } from './utils/moment-utils';
import './bae-calendar.scss';

import CalendarHeader from './components/calendar-header';
import WeekdayIndicator from './components/weekday-indicator';
import DateIndicator from './components/date-indicator';
import MonthIndicator from './components/month-indicator';
// https://uicookies.com/html-calendar/

import { presetDateTracker } from './utils/date-utils';

const themes = {
  salmon: 'salmon-theme',
  monochrome: 'monochrome-theme',
  rouge: 'rouge-theme',
};

const BaeCalendar = ({ theme, activeDates, onDateSelect }) => {
  const presetActiveDates = useRef(presetDateTracker(activeDates || []));

  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [selectDate, setSelectDate] = useState(today);

  let oneMonth = new Date(selectDate);
  oneMonth.setMonth(oneMonth.getMonth() + 2);
  oneMonth.setDate(0);
  const [monthLater, setMonthLater] = useState(oneMonth);

  const [bornes, setBornes] = useState({debut: null, fin: null, isDebut: true});

  useEffect(() => {
    if (onDateSelect) {
      onDateSelect(selectDate);
    }
  }, [selectDate]);

  return (
    <div style={{width: "fit-content", margin: "0 auto"}}>
      <MonthIndicator selectDate={selectDate} setSelectDate={setSelectDate} monthLater={monthLater} setMonthLater={setMonthLater} />
      <div className={`bae-calendar-container ${themes[theme]}`}>
        <CalendarHeader selectDate={selectDate} />
        <WeekdayIndicator />
        <DateIndicator
          activeDates={presetActiveDates.current}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          bornes={bornes}
          setBornes={setBornes}
        />
      </div>
      <div style={{width: "20px", display: "inline-block"}}></div>
      <div className={`bae-calendar-container ${themes[theme]}`}>
        <CalendarHeader selectDate={monthLater} />
        <WeekdayIndicator />
        <DateIndicator
          activeDates={presetActiveDates.current}
          selectDate={monthLater}
          setSelectDate={setMonthLater}
          bornes={bornes}
          setBornes={setBornes}
        />
      </div>
    </div>
  );
};

export default BaeCalendar;