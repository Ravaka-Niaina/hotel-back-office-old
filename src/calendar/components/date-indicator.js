import React from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from '../utils/moment-utils';
import { getDatesInMonthDisplay } from '../utils/date-utils';
const utility = require('../../tarif/utility.js');

const DateIndicator = ({ activeDates, selectDate, setSelectDate, bornes, setBornes, prix }) => {
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
    setBornes(temp);
  };

  const datesInMonth = getDatesInMonthDisplay(
    getMonth(selectDate) + 1,
    getYear(selectDate)
  );
  
  if(prix !== null){
    for(let i = 0; i < prix.length; i++){
      let temp = new Date(prix[i].month);
      temp = temp.getMonth();
      if(temp === selectDate.getMonth()){
        let u = 0, v = 0;
        while(v < datesInMonth.length && u < prix[i].prices.length){
          if(datesInMonth[v].currentMonth){
            if(prix[i].prices[u] !== null){
              datesInMonth[v].price = prix[i].prices[u].aPayer;
              datesInMonth[v].promotions = prix[i].prices[u].promotions;
            }
            u++;
          }
          v++;
        }
        break;
      }
    }
  }

  const debut = new Date(bornes.debut);
  const fin = new Date(bornes.fin);
  const monthDates = datesInMonth.map((i, key) => {
    const selected = '';
    const temp = new Date(utility.getDate(i.date));
    const active = debut <= temp && fin >= temp ? 'active' : '';
    return (
      <div>
        {i.currentMonth ? 
          <div>
          {i.price !== undefined ? 
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
              {"€ "+i.price}
              </div>
              {i.promotions !== undefined && i.promotions.length > 0 ? <div style={{height: "3px", backgroundColor: "blue"}}></div> : null}
            </div> : 
            <div
              key={key}
              style={{backgroundImage: "nonDispo.png"}}
            > 
              <div style={{textAlign: "center"}}>
              {getDayOfMonth(i.date)}
              </div>
            </div>
          }
          </div>
           : 
          null
        }
      </div>
    );
  });

  return <div className="bae-date-indicator">{monthDates}</div>;
};

export default DateIndicator;