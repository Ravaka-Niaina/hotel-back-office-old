import  React from 'react';
import callAPI from '../../utility.js';
import {Button, Box, Modal} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './ValidationSuppression.module.css';

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

const ValidationSuppression = (props) => {
    const [isDeletePending, setIsDeletePending] = React.useState(false);
    function supprimer(){
        setIsDeletePending(true);
        const data = {tableName: props.tableName, _id: props.toDelete._id};
        callAPI("post", "/delete", data, (data) => {
            if(data.status === 300){
                window.location.href = "/back/login";
            }
            setIsDeletePending(false);
            props.setOpenModalDelete(false)
            props.setCurrentNumPage(1);
            props.rechercher(1);
        });
    }
    
    return (
        <Modal
            open={props.openModalDelete}
            onClose={(e) => props.setOpenModalDelete(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            {isDeletePending ? 
                <div className={styles.loadingDelete}>
                    <div><span>Suppression en cours...</span></div>
                    <div><CircularProgress color="inherit" style={{size: 50}} /></div>
                </div>:
                <div>
                    <div><WarningIcon style={{color : "yellow"}} /></div>
                    <strong>Voulez-vous vraiment supprimer "{props.toDelete.nom}" ?</strong><br/>
                    <br/>
                    <div style={{width: "fit-content", margin: "0 auto"}}>

                        <Button variant ="contained" sx={{marginRight: 5}} color="warning" onClick = {(e) => supprimer()}>Oui</Button>
                        <Button variant ="contained" color="success" onClick = {(e) => props.setOpenModalDelete(false)}>Non</Button>
                    </div>
                </div>
                
            }
            </Box>
        </Modal>
    );
}
export default ValidationSuppression;