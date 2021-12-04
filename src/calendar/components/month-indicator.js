import React from 'react';
import { getMonth } from '../utils/moment-utils';
import { getMonthSet } from '../utils/date-utils';
import './month-indicator.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { monthsFull } from '../constants/dates';

const MonthIndicator = ({ selectDate, setSelectDate, monthLater, setMonthLater }) => {
  const changeDate = (date) => {
    console.log("azo = " + date);
    const firstMonth = new Date(date);
    const secondMonth = new Date(firstMonth.getFullYear(), firstMonth.getMonth() + 1, 1);
    setSelectDate(firstMonth);
    setMonthLater(secondMonth);
  };

  const monthSet = getMonthSet(selectDate);
  
  return (
    <div className="bae-month-indicator">
      <ArrowBackIosNewIcon onClick={(e) => changeDate(monthSet.prev)}/>
      <ArrowForwardIosIcon onClick={(e) => changeDate(monthSet.next)}/>
    </div>
  );
};

export default MonthIndicator;