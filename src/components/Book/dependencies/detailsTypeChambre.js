import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from './detailsTypeChambre.module.css';
import {Font} from '../../../partenaire/utilityTypeChambre.js';
import {PersonOutline} from '@mui/icons-material';


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
    position:'absolute',
    overflow:'scroll',
    overflowX: 'hidden',
    height: 500,
    display:'block'
};

const PhotoTC = (props) => {
    const [prev, setPrev] = React.useState(1);
    const [next, setNext] = React.useState(props.photos.length > 1 ? 2 : 1);

    let photos = [];
    let btnChangePhoto = [];

    const viewPrevious = () => {
        console.log("prev = " + prev);
            const p = Number.parseInt(prev) - 1;
            const n = Number.parseInt(next) - 1;
            setPrev(p);
            setNext(n);
    };

    const viewNext = () => {
        console.log("next = " + next);
            const p = Number.parseInt(prev) + 1;
            const n = Number.parseInt(next) + 1;
            setPrev(p);
            setNext(n);
    };
    for(let i = 0; i < props.photos.length; i++){
        btnChangePhoto.push(<a href={"#TC" + (i + 1)}><button>{i + 1}</button></a>);
        photos.push(<section id={"TC" + (i + 1)}><img className={styles.photoTC} src={process.env.REACT_APP_BACK_URL + "/" + props.photos[i]} /></section>);
    }
    
    btnChangePhoto.push(<a href={"#TC" + prev}><button onClick={(e) => viewPrevious()}>Prev</button></a>);
    btnChangePhoto.push(<a href={"#TC" + next}><button onClick={(e) => viewNext()}>Next</button></a>);
    
    return(
        <div className={styles.photos}>
            <div>
                {btnChangePhoto}
            </div>
            <div>
                {photos}
            </div>
        </div>
    );
};

const DetailsTypeChambre = (props) => {
    console.log(props.typeChambre);
    return(
        <Modal
            open={props.typeChambre.show}
            onClose={(e) => props.context.switchShowDetailsTC(props.indexTypeChambre)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 850 }}>
                <div className="row">
                    <div className="col">
                        <PhotoTC photos={props.typeChambre.photo}/>
                    </div>
                    <div className="col">
                        <h3>{props.typeChambre.nom}</h3>
                        <div>
                            <span><PersonOutline/> max : 
                                {props.typeChambre.nbAdulte} Adultes +
                                {props.typeChambre.nbEnfant} enfants
                            </span>
                        </div>
                        <div>
                            <span>{props.typeChambre.chambreTotal} chambres | {props.typeChambre.etage}è étage | {props.typeChambre.superficie} m<sup>2</sup></span>
                        </div>
                        <p>{props.typeChambre.description}</p>
                        <div>
                            <h4>Equipements:</h4>
                            <ul>
                                {props.typeChambre.equipements.map(equipement => {
                                    return(
                                        <li><Font font={equipement.font} /><span>{equipement.nom}</span></li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div>
                            <h4>Tarifs:</h4>
                            <ul>
                                {props.typeChambre.tarifs.map( tarif => {
                                    return(
                                        <li>{tarif.nom}</li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </Box>
      </Modal>
    );
};

export default DetailsTypeChambre;