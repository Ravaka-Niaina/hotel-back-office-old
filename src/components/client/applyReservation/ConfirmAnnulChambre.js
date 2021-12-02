import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import callAPI from '../../../utility';

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

export default function ConfirmAnnulChambre(props) {
    const handleClose = () => {
        let temp = JSON.parse(JSON.stringify(props.annulChambre));
        temp.open = false;
        props.setAnnulChambre(temp);
    };

    const handleResponse = () => {
        props.setOpenLoad(false);
        window.location.reload();
    }

    const annulerTarif = () => {
        const data = {
            idReservation : props.annulChambre.idReservation,
            indexItineraire: props.annulChambre.indexItineraire,
            indexTarif: props.annulChambre.indexTarif
        };
        // console.log(data);
        callAPI('post', '/reservation/annuler/tarif', data, handleResponse );
    }

    return (
        <Modal
            keepMounted
            open={props.annulChambre.open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning">
                        <AlertTitle>Voulez-vous vraiment annuler cette chambre?</AlertTitle>
                        <div direction="row" spacing={2} style={{width: "fit-content", margin: "0 55px"}}>
                            <Button variant="contained" color="success"onClick={(e) => annulerTarif()}>Oui</Button>
                            <Button variant="contained" color="warning" style={{marginLeft: "5px"}} onClick={(e) => handleClose()}>Non</Button>
                        </div>
                    </Alert>
                </Stack>
            </Box>
        </Modal>
    );
}