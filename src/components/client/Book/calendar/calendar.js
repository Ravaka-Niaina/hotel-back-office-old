import React, { useEffect, useState, useRef } from 'react'
import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import './bae-calendar.scss'

import { TextField, Box, InputAdornment } from '@mui/material'
import { EventNote, ExpandMore } from '@mui/icons-material'

import CalendarHeader from './components/calendar-header'
import WeekdayIndicator from './components/weekday-indicator'
import DateIndicator from './components/date-indicator'
import MonthIndicator from './components/month-indicator'

import { presetDateTracker } from './utils/date-utils'

import callAPI from '../../../../utility.js'
import { getDate } from '../../../partenaire/Calendrier/tarif/utility.js'
import moment from 'moment';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 850,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))

const themes = {
  salmon: 'salmon-theme',
  monochrome: 'monochrome-theme',
  rouge: 'rouge-theme',
}

const BaeCalendar = ({
  theme,
  applyFilter,
  activeDates,
  onDateSelect,
  context,
  priceCheapestRate,
  check,
  reloadSelectedDatePrices
}) => {
  const [open, setOpen] = React.useState(false)
  const [firstTime, setFirstTime] = React.useState(true)

  const presetActiveDates = useRef(presetDateTracker(activeDates || []))

  let today = new Date()
  today = new Date(today.getFullYear(), today.getMonth(), 1)
  const [selectDate, setSelectDate] = useState(today)

  let oneMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0)
  const [monthLater, setMonthLater] = useState(oneMonth)
  const [reloadAllPrices, setReloadAllPrices] = useState(false);

  let [prix, setPrix] = useState(null)
  let [isFirstRender, setIsFirstRender] = useState(true);

  function closeOnce() {
    setOpen(false)
    setTimeout(() => setOpen(undefined), 1000)
  }

  function setDefaultItineraire(dateDebut, dateFin){
    dateDebut = moment(dateDebut).format("YYYY/MM/DD");
    dateFin = moment(dateFin).format("YYYY/MM/DD");
    let current = JSON.parse(JSON.stringify(context.state));
    current.dateSejour.debut = dateDebut; 
    current.dateSejour.fin = dateFin;
    if(current.itineraires.length ==0){
      current.itineraires.push({ 
        edit: false,
        dateSejour: JSON.parse(JSON.stringify(current.dateSejour)),
        tarifReserves: []
      });
    }
  
    context.setState(current);   
  }

  function populatePrix(res) {
    if (res.status === 200) {
      if (res.checkIn && res.checkOut) {
        if(isFirstRender){
          setDefaultItineraire(res.checkIn, res.checkOut);
          setIsFirstRender(false);
        }
        let checkIn = new Date(res.checkIn)
        let checkOut = new Date(res.checkOut)
        let tmp = {...context.state, bornes: { debut: checkIn, fin: checkOut, isDebut: true }}
        context.setState(tmp);
        let firstMonth = new Date(res.result[0].month)
        let secondMonth = new Date(res.result[1].month)
        setSelectDate(firstMonth)
        setMonthLater(secondMonth)

        let temp = { ...context.state }
        const debut = getDate(checkIn);
        const fin = getDate(checkOut);
        temp.dateSejour.debut = debut;
        temp.dateSejour.fin = fin;
        if(temp.itineraires.length == 1 && 
          temp.itineraires[0].dateSejour.debut == "" &&
          temp.itineraires[0].dateSejour.fin == ""){
            temp.itineraires[0].dateSejour.debut = debut;
            temp.itineraires[0].dateSejour.fin = fin;
        }

        context.setState(temp)
      }
      setPrix(res.result);
      setReloadAllPrices(false);
      applyFilter(undefined, true);
    }
  }

  function getPrix(dateDebut, dateFin) {
    setReloadAllPrices(true);
    let debut = new Date(dateDebut)
    debut.setDate(1)
    let fin = new Date(dateFin)
    fin.setDate(1)

    const data = { dateDebut: getDate(debut), dateFin: getDate(fin) }
    callAPI('post', '/TCTarif/disponibiliteTarif', data, populatePrix)
  }

  useEffect(() => {
    getPrix(selectDate, monthLater);
    setReloadAllPrices(true);
    setOpen(true);
  }, [])
  
  let prixFinal = JSON.parse(JSON.stringify(prix));

  if(prixFinal !== null && priceCheapestRate !== null && priceCheapestRate !== undefined){
    for(let i = 0; i < prixFinal.length; i++){
      let tmp = new Date(prixFinal[i].month);
      tmp.setTime( tmp.getTime() + tmp.getTimezoneOffset() * 60 * 1000 );
      for(let u = 0; u < prixFinal[i].prices.length; u++){
        for(let v = 0; v < priceCheapestRate.length; v++){
          if(getDate(tmp) === priceCheapestRate[v].date){
            prixFinal[i].prices[u] = {
              aPayer: priceCheapestRate[v].aPayer, 
              prixOriginal: priceCheapestRate[v].prixOriginal,
              promotions: priceCheapestRate[v].promotions};
            break;
          }
        }
        tmp.setDate(tmp.getDate() + 1);
      }
    }
  }
  
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <MonthIndicator
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            monthLater={monthLater}
            setMonthLater={setMonthLater}
            getPrix={getPrix}
          />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <div className={`bae-calendar-container ${themes[theme]}`}>
              <CalendarHeader selectDate={selectDate} />
              <WeekdayIndicator />
              <DateIndicator
                activeDates={presetActiveDates.current}
                selectDate={selectDate}
                setSelectDate={setSelectDate}
                prix={prixFinal}
                context={context}
                closeOnce={closeOnce}
                applyFilter={applyFilter}
                reloadAllPrices={reloadAllPrices}
                reloadSelectedDatePrices={reloadSelectedDatePrices}
              />
            </div>
            <div className={`bae-calendar-container ${themes[theme]}`}>
              <CalendarHeader selectDate={monthLater} />
              <WeekdayIndicator />
              <DateIndicator
                activeDates={presetActiveDates.current}
                selectDate={monthLater}
                setSelectDate={setMonthLater}
                prix={prixFinal}
                context={context}
                closeOnce={closeOnce}
                applyFilter={applyFilter}
                reloadAllPrices={reloadAllPrices}
                reloadSelectedDatePrices={reloadSelectedDatePrices}
              />
            </div>
          </Box>
        </React.Fragment>
      }
      placement="bottom-start"
    >
      <div>{check}</div>
    </HtmlTooltip>
  )
}

export default BaeCalendar
