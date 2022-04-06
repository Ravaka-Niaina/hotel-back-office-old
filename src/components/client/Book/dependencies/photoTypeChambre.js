import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SimpleImageSlider from "react-simple-image-slider";
import styles from "./photoTypeChambre.module.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid #E9E9E9 ',
    borderRadius: '5px',
    boxShadow: 24
};
  
  const PhotoTypeChambre = (props) => {
    let images = [];
    let photo = props.photoProfil;
    const [open, setOpen] = React.useState(false);
    if (props.photos && props.photos.length){
        // photo = props.photos[0];
        for(let i = 0; i < props.photos.length; i++){
            images.push({ url: process.env.REACT_APP_BACK_URL + "/" + props.photos[i].replace("\\","/") });
        }
    }
    return (
        <>
            <div style={{ backgroundImage: 'url(' + process.env.REACT_APP_BACK_URL + "/" + photo.replace("\\","/") + ")" }} onClick={(e) => setOpen(!open)}></div>
            <Modal
                open={open}
                onClose={(e) => setOpen(!open)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.close}><button onClick={(e) => setOpen(!open)}><span>X</span></button></div>
                    <SimpleImageSlider
                        width={850}
                        height={504}
                        images={images}
                        showBullets={true}
                        showNavs={true}
                    />
                </Box>
            </Modal>
        </>
    );
  }

  export default PhotoTypeChambre;