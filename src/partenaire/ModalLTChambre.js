import ModalUnstyled from '@mui/core/ModalUnstyled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled, Box } from '@mui/system';

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
  width : "fit-content",
  margin : '0 auto'
};



function ModaLTChambre(props){
  
    return(
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open = {props.open}
        BackdropComponent={Backdrop}
      >
        <Box sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}>
            <Button variant="contained" color="success" >modifier</Button> 
            <Button variant="contained" color="secondary">supprimer</Button> 
            <Button variant="contained" color="primary" onClick={props.setO}>annuler</Button>      
        </Box>
      </StyledModal>
    );
}
export default ModaLTChambre;