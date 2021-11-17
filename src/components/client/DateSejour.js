import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import TextField from '@mui/material/TextField';

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
        if(currentState.dateSejour.debut != "" && currentState.dateSejour.fin != ""){
          currentState.showFiltre = true;
        }else{
          currentState.showFiltre = false;
        }
        
        context.setState(currentState);
    } 

function DateSejour(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
     <h3 onClick={handleOpen} style ={{backgroundColor : "gainsboro"}}> Date Debut : {props.context.state.dateSejour.debut}
         et date_Fin : {props.context.state.dateSejour.fin}</h3>
         
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
        <h1>Sejour :</h1>
            Debut :<TextField id="standard-basic" label="" variant="standard" type="date"
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