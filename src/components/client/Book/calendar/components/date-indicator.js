import useState from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import RefreshDay from './RefreshDay.js';

import background from './cross.png'
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from '../utils/moment-utils'
import { getDatesInMonthDisplay } from '../utils/date-utils'
const utility = require('../../../../partenaire/Calendrier/tarif/utility.js')
const { getDate } = require('../../../../../utility/utilityDate.js')

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
}))

let isDebut = true;

const DateIndicator = ({
  activeDates,
  selectDate,
  setSelectDate,
  prix,
  context,
  closeOnce,
  applyFilter,
  reloadAllPrices,
  reloadSelectedDatePrices
}) => {
  const changeDate = (day) => {
    context.state.listTypeChambre = []

    setSelectDate(new Date(day))
    let temp = {...context.state};
    let dateSejour = temp.dateSejour;
    if (isDebut) {
      dateSejour.debut = day
      dateSejour.fin = ""
      isDebut = false
      context.handleChange('listTypeChambre', [])
    } else {
      dateSejour.fin = day
      isDebut = true
    }
    if (dateSejour.debut === dateSejour.fin) {
      dateSejour.fin = new Date(dateSejour.fin)
      dateSejour.fin.setTime(
        dateSejour.fin.getTime() + dateSejour.fin.getTimezoneOffset() * 60 * 1000,
      )
      dateSejour.fin.setDate(dateSejour.fin.getDate() + 1)
      dateSejour.fin = utility.getDate(dateSejour.fin)
    } else if (dateSejour.fin !== "" && new Date(dateSejour.debut) > new Date(dateSejour.fin)) {
      dateSejour.debut = dateSejour.fin
      dateSejour.fin = "";
      isDebut = false;
    }

    if(temp.itineraires.length === 1){
      if(temp.itineraires[0].dateSejour.debut === '' &&
        temp.itineraires[0].dateSejour.fin === '' ||
        temp.itineraires[0].tarifReserves.length === 0){
          temp.itineraires[0].dateSejour.debut = dateSejour.debut;
          temp.itineraires[0].dateSejour.debut = dateSejour.fin;
      }
    }
    if(temp.reservationEnCours.itineraires.length === 1){
      if(temp.reservationEnCours.itineraires[0].dateSejour.debut === '' &&
        temp.reservationEnCours.itineraires[0].dateSejour.fin === ''){
          temp.reservationEnCours.itineraires[0].dateSejour.debut = dateSejour.debut;
          temp.reservationEnCours.itineraires[0].dateSejour.fin = dateSejour.fin;
      }
    }

    context.setState(temp, () => {
      if(dateSejour.fin !== ""){
        applyFilter(undefined, true);
      }
    })
    context.haddleChangeDate([dateSejour.debut, dateSejour.fin]);
  }

  const datesInMonth = getDatesInMonthDisplay(
    getMonth(selectDate) + 1,
    getYear(selectDate),
  )

  const getHtmlPromo = (prixOriginal, promotions) => {
    let htmlProm = []
    for (let i = 0; i < promotions.length; i++) {
      htmlProm.push(
        <div>
          <div>
            Prix sans prom: <strong>{prixOriginal + ' €'}</strong>
          </div>
        </div>,
      )
      htmlProm.push(
        <div>
          <h4>{promotions[i].nom}</h4>
          <div>
            Premier jour: <strong>{promotions[i].premierJour}</strong>
          </div>
          <div>
            Remise:{' '}
            <strong>
              {promotions[i].remise} {promotions[i].isPourcentage ? '%' : ''}
            </strong>
          </div>
        </div>,
      )
    }
    return htmlProm
  }

  if (prix !== null && prix !== undefined) {
    for (let i = 0; i < prix.length; i++) {
      let temp = new Date(prix[i].month)
      temp = temp.getMonth()
      if (temp === selectDate.getMonth()) {
        let u = 0,
          v = 0
        while (v < datesInMonth.length && u < prix[i].prices.length) {
          if (datesInMonth[v].currentMonth) {
            if (prix[i].prices[u] !== null) {
              datesInMonth[v].price = prix[i].prices[u].aPayer
              datesInMonth[v].promotions = prix[i].prices[u].promotions
              datesInMonth[v].prixOriginal = prix[i].prices[u].prixOriginal
            }
            u++
          }
          v++
        }
        break
      }
    }
  }

  const debut = new Date(context.state.dateSejour.debut)
  let fin = new Date(context.state.dateSejour.fin)
  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const monthDates = datesInMonth.map((i, key) => {
    const temp = new Date(utility.getDate(i.date));
    let notValid = ''
    let price = ''
    if (today > i.date) {
      notValid = 'hier'
    } else if (i.price === undefined) {
      notValid = 'nonDispo'
    } else {
      price = '€ ' + i.price
      notValid = notValid + ' date-icon'
      if (getDate(fin) === getDate(i.date)) {
        price = '';
      }
      if (getDate(fin) === getDate(i.date) || getDate(debut) === getDate(i.date)) {
        notValid = notValid + ' active';
      }
    }

    let reloadDate = false
    if (reloadSelectedDatePrices) {
      if (debut <= temp && fin >= temp) {
        reloadDate = true;
      }
    }
    if (debut <= temp && fin >= temp) {
      notValid = notValid + ' active'
    }
    return (
      <div>
        {i.currentMonth ? (
          <div>
            {reloadAllPrices || reloadDate ? <RefreshDay />
              : <>{i.price !== undefined ? (
                <div>
                  {i.promotions !== undefined &&
                    i.promotions.length > 0 &&
                    getDate(fin) !== getDate(i.date) ? (
                    <HtmlTooltip
                      title={getHtmlPromo(i.prixOriginal, i.promotions)}
                    >
                      <div
                        className={`${notValid}`}
                        data-active-month={i.currentMonth}
                        data-date={i.date.toString()}
                        key={key}
                        onClick={(e) => changeDate(utility.getDate(i.date))}
                      >
                        <div style={{ textAlign: 'center' }}>
                          {' '}
                          {getDayOfMonth(i.date)}{' '}
                        </div>
                        <div style={{ textAlign: 'center' }}> {price} </div>
                        <div
                          style={{ height: '3px', backgroundColor: 'blue' }}
                        ></div>
                      </div>
                    </HtmlTooltip>
                  ) : (
                    <div
                      className={`${notValid}`}
                      data-active-month={i.currentMonth}
                      data-date={i.date.toString()}
                      key={key}
                      onClick={(e) => changeDate(utility.getDate(i.date))}
                    >
                      <div style={{ textAlign: 'center' }}>
                        {' '}
                        {getDayOfMonth(i.date)}{' '}
                      </div>
                      <div style={{ textAlign: 'center' }}> {price} </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ width: '45px', height: '46px' }}>
                  <div className={`${notValid}`} key={key}></div>
                  <div style={{ textAlign: 'center', paddingTop: '7px' }}>
                    {getDayOfMonth(i.date)}
                  </div>
                </div>
              )}</>}
          </div>
        ) : null}
      </div>
    )
  })

  return <div className="bae-date-indicator">{monthDates}</div>
}

export default DateIndicator