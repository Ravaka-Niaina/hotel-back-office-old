// import React , { useState, useEffect } from 'react';
// import {Container,Button,TextField,Box} from '@mui/material';
// import DateRangePicker from '@mui/lab/DateRangePicker';
// import AdapterMoment from '@mui/lab/AdapterMoment';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import styles from '../../tarif/CalendarComponent.module.css';
// import moment from 'moment';
// import axios from "axios";

// const getDaysBetweenDates = function(startDate, endDate) {
//   var now = startDate.clone(), dates = [];

//   while (now.isSameOrBefore(endDate)) {
//       dates.push(now.format('MM/DD/YYYY'));
//       now.add(1, 'days');
//   }
//   return dates;
// console.log(startDate,endDate);
// };

// const BasicDateRangePicker = () =>{
//   const alldays = getDaysBetweenDates(value[0],value[1]);
//   const [value, setValue] = useState([moment('2021-11-11'), moment('2021-12-11')]);
//   // return (
//   //   <LocalizationProvider dateAdapter={DateFnsUtils}>
//   //     <DateRangePicker
//   //       startText="Check-in"
//   //       endText="Check-out"
//   //       value={selectedDate}
//   //       onChange={date => handleDateChange(date)}
//   //       renderInput={(startProps, endProps) => (
//   //         <>
//   //           <TextField {...startProps} />
//   //           <DateRangeDelimiter> to </DateRangeDelimiter>
//   //           <TextField {...endProps} />
//   //         </>
//   //       )}
//   //     />
//   //   </LocalizationProvider>
//   // );
//   return(
//     <div>
//     <Container className={styles.container}>
//         <LocalizationProvider dateAdapter={AdapterMoment}>
//         <DateRangePicker
//             startText="Check-in"
//             endText="Check-out"
//             value={value}
//             onChange={(newValue) => {
//               setValue(newValue);
//               if(newValue != undefined && newValue[0] != null && newValue[1] != null){
//                   const allday = getDaysBetweenDates(newValue[0],newValue[1]);
//               }
//           }}
//             renderInput={(startProps, endProps) => (
//             <React.Fragment>
//                 <TextField {...startProps} />
//                 <Box sx={{ mx: 2 }}> to </Box>
//                 <TextField {...endProps} />
//             </React.Fragment>
//             )}
//         />
//         </LocalizationProvider>
//     </Container>
//     </div>
// );
// }
// export default BasicDateRangePicker;