import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 600,
  bgcolor: 'white',
  border: '1px solid black',
  p: 2,
  px: 4,
  pb: 3,
};

function changeDateSejour(e,context, fieldName)
    {
      let currentState = JSON.parse(JSON.stringify(context.state));
      currentState.dateSejour[fieldName] = e.target.value;
      context.setState(currentState);
    } 

function DateSejour(props) {

  function handleOpen(){
    if(props.context.state.changeDateSejour === true){
      props.context.handleChange("openChangeDateSejour", true);
    }
  }
  function handleClose(){
    if(props.context.state.dateSejour.debut !== "" 
      && props.context.state.dateSejour.fin !== ""){
      let currentState = JSON.parse(JSON.stringify(props.context.state));
      currentState.openChangeDateSejour = false;
      currentState.changeDateSejour = false;
      currentState.itineraires.push({
        edit: false,
        dateSejour: JSON.parse(JSON.stringify(props.context.state.dateSejour)),
        tarifReserves: []
      });
      props.context.setState(currentState);
    }
  }

  return (
    <div>
      Date Sejour : 
        <Button variant="contained">
          <span style ={{color :"white"}}> 
              Date Debut : {props.context.state.dateSejour.debut} &nbsp;&nbsp; - &nbsp;&nbsp;
              Date Fin : {props.context.state.dateSejour.fin}
          </span>
        </Button>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={props.context.state.openChangeDateSejour}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
        <h1>Sejour :</h1>
            Debut :&nbsp;<TextField id="standard-basic" label="" variant="standard" type="date"
                style={{width:''}} value={props.context.state.dateSejour.debut} 
                onChange={(e) => changeDateSejour(e,props.context , "debut")}/>&nbsp;&nbsp;
            Fin : <TextField id="standard-basic" label="" variant="standard" type="date"
                style={{marginLeft:'15px'}} value={props.context.state.dateSejour.fin} 
                onChange={(e) => changeDateSejour(e, props.context ,"fin")}/>
        </Box>
      </StyledModal>
    </div>
  );
}

export default  DateSejour;