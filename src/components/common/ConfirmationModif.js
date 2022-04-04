import  React, {useState} from 'react';
import {Button, Box, Modal} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonLoad from '../partenaire/buttonLoading.js';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };
 

const annulerReservation = (props) => {
    return (
        <Modal
            open={props.showConfirmationModif}
            onClose={(e) => props.showConfModif(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            
                <div>
                    <div><WarningIcon style={{color : "yellow"}} /></div>
                    {   
                            props.load ? <strong>en cours ...</strong> :
                            <>
                                <strong>enregistrer votre modification ?</strong>
                               
                            </>
                    }
                    <br/><br/>
                    <div style={{width: "fit-content", margin: "0 auto"}}>
                        {   
                            props.load ? <ButtonLoad/> :
                             <div class="bouton-aligne">
                                 <Button variant ="contained" sx={{marginRight: 5}} color="warning" onClick = {(e) =>props.ModifierReservation() }>Oui</Button>
                                 <Button variant ="contained" color="success" onClick = {(e) => props.showConfModif(true)}>Non</Button>
                            </div>
                        }
                    </div>
                </div>
                
            </Box>
        </Modal>
    );
}
export default annulerReservation;