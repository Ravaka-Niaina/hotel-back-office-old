import React from 'react';
import { getMonth } from '../utils/moment-utils';
import { getMonthSet } from '../utils/date-utils';
import './month-indicator.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { monthsFull } from '../constants/dates';

const MonthIndicator = ({ selectDate, setSelectDate, monthLater, setMonthLater, getPrix }) => {
  const changeDate = (date) => {
    let firstMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const secondMonth = new Date(firstMonth.getFullYear(), firstMonth.getMonth() + 2, 0);
    setSelectDate(firstMonth);
    setMonthLater(secondMonth);
    getPrix(firstMonth, secondMonth);
  };

  const monthSet = getMonthSet(selectDate);
  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), 1);
  return (
    <div className="bae-month-indicator">
      {today < selectDate ? <ArrowBackIosNewIcon onClick={(e) => changeDate(monthSet.prev)} /> : 
      <ArrowBackIosNewIcon style={{opacity: "0.5"}} />}
      <ArrowForwardIosIcon onClick={(e) => changeDate(monthSet.next)}/>
    </div>
  );
};

export default MonthIndicator;