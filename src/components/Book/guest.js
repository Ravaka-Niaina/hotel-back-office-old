
import React , {useState} from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {FormControl,FormControlLabel} from '@mui/material';

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
}));

const style = {
  marginTop: 10,
  marginBottom: 5
};

const Guest = ({context, applyFilter, occupancy}) => {

  function changeNbGuests(categ, value){
    let temp = {...context.state};
    temp.listTypeChambre = [];
    temp.guests[categ] = Number.parseInt(value);
    if(temp.guests[categ] < 0){
      temp.guests[categ] = 0;
    }
    temp.listTypeChambre = [];
    context.setState(temp);
    applyFilter();
  }

  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <FormControl component="fieldset" style={style}>
            <TextField
              fullwidth={false}
              size="small"
              id="outlined-number"
              label="Adulte" 
              value={context.state.guests.nbAdulte}
              type="number"
              InputLabelProps={{
                shrink: true,
            }}
              onChangeCapture={(e) => changeNbGuests("nbAdulte", e.target.value)}
            />
            <br/>
            <TextField
              fullwidth={false}
              size="small"
              id="outlined-number"
              label="Enfant" 
              value={context.state.guests.nbEnfant}
              type="number"
              InputLabelProps={{
                shrink: true,
            }}
              onChangeCapture={(e) => changeNbGuests("nbEnfant", e.target.value)}
            />
          </FormControl>
        </React.Fragment>
      }
      placement="bottom-start"
        >
          {occupancy}  
    </HtmlTooltip>
  );
}
export default Guest;