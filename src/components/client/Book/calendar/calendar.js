import React, { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import './bae-calendar.scss';

import {TextField, Box, InputAdornment} from '@mui/material';
import {EventNote, ExpandMore} from '@mui/icons-material';

import CalendarHeader from './components/calendar-header';
import WeekdayIndicator from './components/weekday-indicator';
import DateIndicator from './components/date-indicator';
import MonthIndicator from './components/month-indicator';

import { presetDateTracker } from './utils/date-utils';

import callAPI from '../../../../utility.js';
import {getDate} from '../../../partenaire/Calendrier/tarif/utility.js';

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
}));

const themes = {
  salmon: 'salmon-theme',
  monochrome: 'monochrome-theme',
  rouge: 'rouge-theme',
};

const BaeCalendar = ({ theme, applyFilter, activeDates, onDateSelect, context, check }) => {
  const [open, setOpen] = React.useState(false);
  const [firstTime, setFirstTime] = React.useState(true);

  const presetActiveDates = useRef(presetDateTracker(activeDates || []));

  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth() , 1);
  const [selectDate, setSelectDate] = useState(today);

  let oneMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  const [monthLater, setMonthLater] = useState(oneMonth);

  const [bornes, setBornes] = useState({debut: null, fin: null, isDebut: true});

  let [prix, setPrix] = useState(null);

  function closeOnce(){
    setOpen(false);
    setTimeout(() => setOpen(undefined), 1000);
  }

  function populatePrix(res){
    if(res.status === 200){
      if(res.checkIn && res.checkOut){
        let checkIn = new Date(res.checkIn);
        let checkOut = new Date(res.checkOut);
        setBornes({debut: checkIn, fin: checkOut, isDebut: true});
        let firstMonth = new Date(res.result[0].month);
        let secondMonth = new Date(res.result[1].month);
        setSelectDate(firstMonth);
        setMonthLater(secondMonth);

        let temp = {...context.state};
        temp.dateSejour.debut = getDate(checkIn);
        temp.dateSejour.fin = getDate(checkOut);
        context.setState(temp);
      }
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

  useEffect(() => {
    getPrix(selectDate, monthLater);
    setOpen(true);
  }, []);

  function reload(){
    let temp = JSON.parse(JSON.stringify(context.state));
    temp.reload = true;
    context.setState(temp);
    getPrix(selectDate, monthLater);
  }

  return (
    <HtmlTooltip
      title={
        <React.Fragment>
            <MonthIndicator 
            selectDate={selectDate} setSelectDate={setSelectDate} 
            monthLater={monthLater} setMonthLater={setMonthLater} 
            getPrix={getPrix} />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap : 1 }}>
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
                  closeOnce={closeOnce}
                  applyFilter={applyFilter}
                />
              </div>
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
                  closeOnce={closeOnce}
                  applyFilter={applyFilter}
                />
              </div>
            </Box>
        </React.Fragment>
      }
      placement="bottom-start"
    >
      <div>
        {check}
      </div>
    </HtmlTooltip>
  );
};

export default BaeCalendar;