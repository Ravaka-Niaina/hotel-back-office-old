import React from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from '../utils/moment-utils';
import { getDatesInMonthDisplay } from '../utils/date-utils';
const utility = require('../../tarif/utility.js');

const DateIndicator = ({ activeDates, selectDate, setSelectDate, bornes, setBornes }) => {
  const changeDate = (day) => {
    setSelectDate(new Date(day));
    let temp = JSON.parse(JSON.stringify(bornes));
    if(bornes.isDebut){
      temp.debut = day;
      temp.fin = day;
      temp.isDebut = false;
    }else{
      temp.fin = day;
      temp.isDebut = true;
    }
    console.log(temp);
    
    /*if(temp.fin != null){
      if(new Date(temp.debut) > new Date(temp.fin)){
        const tmp = temp.debut + "";
        temp.debut = temp.fin;
        temp.fin = tmp;
      }
    }*/
    setBornes(temp);
    console.log(temp);
  };

  const datesInMonth = getDatesInMonthDisplay(
    getMonth(selectDate) + 1,
    getYear(selectDate)
  );

  for(var i=0; i<datesInMonth.length;i++){
    datesInMonth[i].price=i+1;
  }

  let removeUnwanted = true;

  const debut = new Date(bornes.debut);
  const fin = new Date(bornes.fin);
  const monthDates = datesInMonth.map((i, key) => {
    const selected = '';
    const temp = new Date(utility.getDate(i.date));
    const active = debut <= temp && fin >= temp ? 'active' : '';
    return (
      <div>
        {i.currentMonth ? 
          <div
            className={`date-icon ${selected} ${active}`}
            data-active-month={i.currentMonth}
            data-date={i.date.toString()}
            key={key}
            onClick={(e) => changeDate(utility.getDate(i.date))}
          > 
            <div style={{textAlign: "center"}}>
            {getDayOfMonth(i.date)}
            </div>
            <div style={{textAlign: "center"}}> 
            {"£"+i.price}
            </div>
          </div> : 
          null
        }
      </div>
    );
  });

  return <div className="bae-date-indicator">{monthDates}</div>;
};

export default DateIndicator;