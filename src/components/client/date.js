import {React ,useState}  from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';

const DatePick = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <StaticDateRangePicker
      displayStaticWrapperAs="desktop"
      value={[props.context.state.dateSejour.debut, props.context.state.dateSejour.fin]}
      onChange={(newValue) => props.context.haddleChangeDate(newValue)}
      renderInput={(startProps, endProps) => (
        <React.Fragment>
          <TextField {...startProps}/>
          <Box sx={{ mx: 2 }}> to </Box>
          <TextField {...endProps}/>
        </React.Fragment>
      )}
    />
          
    </LocalizationProvider>
  );
}
export default DatePick ;
