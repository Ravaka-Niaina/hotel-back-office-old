import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from './detailsTypeChambre.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const DetailsTypeChambre = (props) => {
    console.log(props.typeChambre.photo[0]);
    return(
        <Modal
            open={props.context.state.showDetailsTypeChambre}
            onClose={(e) => props.context.closeDetailsTC()}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 850 }}>
                <div className="row">
                    <div className="col">
                    <img className={styles.photoTC} src={process.env.REACT_APP_BACK_URL + "/" + props.typeChambre.photo[0]} />
                    </div>
                    <div className="col">
                        <h3>Royal room</h3>
                    </div>
                </div>
                <p>Chunchunmaru</p>
            </Box>
      </Modal>
    );
};

export default DetailsTypeChambre;