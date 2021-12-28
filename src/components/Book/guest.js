
import React , {useState} from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function incrementGuests(context, categ, i){
  let temp = {...context.state};
  temp.guests[categ] = temp.guests[categ] + i;
  if(temp.guests[categ] < 0){
    temp.guests[categ] = 0;
  }
  console.log(temp.guests);
  context.setState(temp);
}

function changeManuallyGuests(context, value, categ){
  let temp = {...context.state};
  temp.guests[categ] = value;
  if(temp.guests[categ] < 0){
    temp.guests[categ] = 0;
  }
  context.setState(temp);
}

const Guest = ({context, changeOpenChangeNbGuest}) => {
  return (
    <Modal
      open={context.openChangeNbGuest}
      onClose={changeOpenChangeNbGuest}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <span id="adultes">Adultes</span><div class='guest1' id='adulte1' onClick={(e) => incrementGuests(context, "nbAdulte", -1)}><p id='moins'>-</p></div>
        <div class='guest1'>
          <TextField  
            type="number"
            value={context.state.guests.nbAdulte}
            onChange={(e) => changeManuallyGuests(context,e.target.value, "nbAdulte")}
            className='adulte'
          />
        </div>
        <div class='guest1' id='adulte11' onClick={(e) => incrementGuests(context, "nbAdulte", 1)}><p id='add'>+</p></div>
        <br/>
        <span id="enfants">Enfants</span><div class='guest2' id='enfant1' onClick={(e) => incrementGuests(context, "nbEnfant", -1)}><p id='moins'>-</p></div>
        <div class='guest2'>
          <TextField 
            type="number"
            value={context.state.guests.nbEnfant}
            onChange={(e) => changeManuallyGuests(context,e.target.value, "nbEnfant")}
            className='enfant'
          />
        </div>
        <div class='guest2' id='enfant11' onClick={(e) => incrementGuests(context, "nbEnfant", 1)}>
            <p id='add'>+</p>
        </div>
      </Box>
    </Modal>
  );
}
export default Guest;