import React from 'react';
import { getMonth } from '../utils/moment-utils';
import { getMonthSet } from '../utils/date-utils';
import './month-indicator.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { monthsFull } from '../constants/dates';

const MonthIndicator = ({ selectDate, setSelectDate, monthLater, setMonthLater }) => {
  const changeDate = (e) => {
    const firstMonth = new Date(e.target.getAttribute('data-date'));
    const secondMonth = new Date(firstMonth.getFullYear(), firstMonth.getMonth() + 1, 1)
    setSelectDate(firstMonth);
    setMonthLater(secondMonth);
  };

  const monthSet = getMonthSet(selectDate);

  return (
    <div className="bae-month-indicator">
      <ArrowBackIosNewIcon data-date={monthSet.prev} onClick={changeDate}/>
      <ArrowForwardIosIcon data-date={monthSet.next} onClick={changeDate}/>
    </div>
  );
};

export default MonthIndicator;