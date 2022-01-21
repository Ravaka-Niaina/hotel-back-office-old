// import React from 'react';
// const WeekdayIndicator = () => {
//   return (
//     <div className="bae-weekday-indicators">
//       <div className="weekday-indicator-icon">
//         Sun
//       </div>
//       <div className="weekday-indicator-icon">
//         Mon
//       </div>
//       <div className="weekday-indicator-icon">
//         Tue
//       </div>
//       <div className="weekday-indicator-icon">
//         Wed
//       </div>
//       <div className="weekday-indicator-icon">
//         Thu
//       </div>
//       <div className="weekday-indicator-icon">
//         Fri
//       </div>
//       <div className="weekday-indicator-icon">
//         Sat
//       </div>
//     </div>
//   )
// };
// export default WeekdayIndicator;

import React from 'react';
import { weekdays } from '../constants/dates';

const WeekdayIndicator = () => {
  const weekdayIcons = weekdays.map((day, key) => {
    return (
      <div className="weekday-indicator-icon" key={key}>
        {day}
      </div>
    );
  });
  return <div className="bae-weekday-indicators">{weekdayIcons}</div>;
};

export default WeekdayIndicator;