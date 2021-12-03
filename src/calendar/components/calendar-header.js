import React from 'react';
import {
  getYear,
  getReadableMonth
} from '../utils/moment-utils';

const CalendarHeader = ({ selectDate }) => {
  return (
        <h2 className="bae-calendar-header">{getReadableMonth(selectDate) + " " + getYear(selectDate)}</h2>
  );
};

export default CalendarHeader;