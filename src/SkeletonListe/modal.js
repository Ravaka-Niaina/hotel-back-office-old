import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import style from './style.module.css';

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={props.modal}
        onClose={props.haddleAnnuler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1} >
            <Typography id="modal-modal-title" variant="h6" component="h2" color="error">
                Suppression
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Voulez-vous vraiment supprimer {props.nom.nom} ?
            </Typography><br/>
            <Box className={style.btn}> 
              <Button style={{ backgroundColor:"#2AC4EA"}} onClick ={props.haddleAnnuler}>non</Button>
              <Button  style={{ backgroundColor:"#FA8072", marginLeft :"5px"}} onClick ={(e) => props.suppression(e, props.nom.id , props.nom.nom)}>oui</Button>      
            </Box> 
          
        </Box>
      </Modal>
    </div>
  );
}
