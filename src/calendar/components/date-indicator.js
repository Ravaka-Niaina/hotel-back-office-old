import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import background from './cross.png';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from '../utils/moment-utils';
import { getDatesInMonthDisplay } from '../utils/date-utils';
const utility = require('../../tarif/utility.js');

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const DateIndicator = ({ activeDates, selectDate, setSelectDate, bornes, setBornes, prix, context, closeOnce }) => {
  
  const changeDate = (day) => {
    context.state.listTypeChambre = [];
    
    setSelectDate(new Date(day));
    let temp = JSON.parse(JSON.stringify(bornes));
    if(bornes.isDebut){
      temp.debut = day;
      temp.fin = day;
      temp.isDebut = false;
    }else{
      temp.fin = day;
      temp.isDebut = true;
      closeOnce();
    }
    setBornes(temp);
    const dates = [temp.debut, temp.fin];
    context.haddleChangeDate(dates);
  };

  const datesInMonth = getDatesInMonthDisplay(
    getMonth(selectDate) + 1,
    getYear(selectDate)
  );

  const getHtmlPromo = (prixOriginal, promotions) => {
    let htmlProm = [];
    for(let i = 0; i < promotions.length; i++){
      htmlProm.push(
        <div>
          <div>Prix sans prom: <strong>{prixOriginal + " €"}</strong></div>
        </div>
      );
      htmlProm.push(
        <div>
          <h4>{promotions[i].nom}</h4>
          <div>Premier jour: <strong>{promotions[i].premierJour}</strong></div>
          <div>Remise: <strong>{promotions[i].remise} {promotions[i].isPourcentage ? "%" : ""}</strong></div>
        </div>
      );
    }
    return htmlProm;
  }
  
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
              datesInMonth[v].prixOriginal = prix[i].prices[u].prixOriginal;
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
  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const monthDates = datesInMonth.map((i, key) => {
    const temp = new Date(utility.getDate(i.date));
    let notValid = "";
    let price = "";
    if(today > i.date){
      notValid = "hier";
    }else if(i.price === undefined){
      notValid = "nonDispo";
    }else{
      price = "€ " + i.price;
      notValid = notValid + " date-icon";
    }

    if(debut <= temp && fin >= temp){
      notValid = notValid + " active";
    }
    return (
      <div>
        {i.currentMonth ? 
          <div>
          {i.price !== undefined ? 
            <div>
              {i.promotions !== undefined && i.promotions.length > 0 ?
                <HtmlTooltip
                  title={ getHtmlPromo(i.prixOriginal, i.promotions) }
                >
                  <div
                    className={`${notValid}`}
                    data-active-month={i.currentMonth}
                    data-date={i.date.toString()}
                    key={key}
                    onClick={(e) => changeDate(utility.getDate(i.date))}
                  > 
                    <div style={{textAlign: "center"}}> {getDayOfMonth(i.date)} </div>
                    <div style={{textAlign: "center"}}> {price} </div>
                    <div style={{height: "3px", backgroundColor: "blue"}}></div>
                  </div>
                </HtmlTooltip> :
                <div
                  className={`${notValid}`}
                  data-active-month={i.currentMonth}
                  data-date={i.date.toString()}
                  key={key}
                  onClick={(e) => changeDate(utility.getDate(i.date))}
                > 
                  <div style={{textAlign: "center"}}> {getDayOfMonth(i.date)} </div>
                  <div style={{textAlign: "center"}}> {price} </div>                
                </div>
              }
            </div>
             : 
            <div style={{width: "45px", height: "46px"}}>
              <div className={`${notValid}`} key={key} ></div>
              <div style={{textAlign: "center", paddingTop: "7px"}}>
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