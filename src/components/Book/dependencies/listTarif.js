import React , { useState } from 'react';
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import {Button} from '@mui/material';
import styles from '../Book.module.css';
import {PersonOutline} from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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

function getNDigits(number, digit){
    digit = digit + '';
    const remain = number - digit.length;
    for(let i = 0; i < remain; i++){
        digit = "0" + digit;
    }
    return digit;
}

function getDate(date){
    date = new Date(date);
    let year = date.getFullYear();
    let month = getNDigits(2, date.getMonth() + 1);
    let day = getNDigits(2, date.getDate());
    date = year + '-' + month + '-' + day;
    return date;
}

function ListTarif(props){
    const [error, setError] = React.useState(null);
    function setReservationEnCours(res){
        if(res.status === 200){
            props.context.setReservationEnCours(res.reservation);
        }else{
            console.log(res);
        }
    }

    function addReservation(e ,id, nom, idTypeChambre){
        if(props.context.state.itineraires.length === 0){
            let temp = {...props.context.state};
            temp.err = "Veuillez d'abord choisir une date de sejour";
            props.context.setState(temp);
        }
        if(props.context.state.itineraires.length > 0){
            let itineraires = JSON.parse(JSON.stringify(props.context.state.itineraires));
            let dateSejour = props.context.state.dateSejour;
            const lastItineraire = itineraires.length - 1;
            const lastTarif = itineraires[lastItineraire].tarifReserves.length - 1;
            if(itineraires[lastItineraire].tarifReserves.length > 0){
                dateSejour = {
                    debut: itineraires[itineraires.length - 1].tarifReserves[lastTarif].dateSejour.debut,
                    fin: itineraires[itineraires.length - 1].tarifReserves[lastTarif].dateSejour.fin
                };
            }
            itineraires[lastItineraire].tarifReserves.push({
                idTarif: id, 
                dateSejour: dateSejour,
                dateReservation: getDate(Date.now()),
                guests: props.context.state.guests,
                idTypeChambre : idTypeChambre
            });
            console.log(itineraires);
            axios({
                method: 'post',
                url: process.env.REACT_APP_BACK_URL + '/reservation/insert',
                withCredentials: true,
                data: {itineraires: itineraires}
            })
            .then(res => {
                setReservationEnCours(res.data)})
            .catch(err => console.log(err));
        }
    }
    
    let tarifs = props.tarifs.map(tarif => {
             return (
                    <div className={styles.listTarif}>
                        <ul>
                            <li>
                                <div className="row">
                                    {tarif.conditionsAnnulation !== "" 
                                        ?   <span>
                                                <i class="fa fa-check" aria-hidden="true">
                                                    {/* &nbsp;&nbsp;{tarif.conditionsAnnulation}  */}
                                                </i>
                                                &nbsp;&nbsp;Refundable rates
                                            </span> : ""
                                    }
                                </div>
                                <div className="row">
                                    <strong>
                                        <u>{tarif.nom}</u>
                                    </strong>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        {
                                            tarif.minPrix.versions ? tarif.minPrix.versions.map(version => {
                                                return(
                                                    <div className="row">
                                                        <div class={styles.nbPers}>
                                                            <span>X {version.nbPers}</span>
                                                            <span><PersonOutline/></span>
                                                            {/*<ListServiceTarif services={tarif.services} />*/}
                                                        </div>
                                                        <div class="col"> 
                                                            { version.prixOriginal ? <span className={styles.beforeProm}>&nbsp;{version.prixOriginal + " EUR "}</span> : null }
                                                            <span className={styles.afterProm}>&nbsp;{version.prix + " EUR "}</span>
                                                        </div>
                                                        <div class="col">
                                                            <span>Per Night</span>
                                                            <span>including Taxes & Fees</span>
                                                        </div>
                                                    </div>
                                                );
                                            }) : null
                                        }
                                    </div>
                                    <div className={styles.bookNow}>
                                        <Button variant="contained"
                                            onClick = {(e) => addReservation(e,tarif._id, tarif.nom, props.idTypeChambre)}
                                            endIcon={<AddIcon/>}
                                            className="bookNow"
                                        >
                                            Book
                                        </Button>
                                    </div>
                                </div>
                            </li><br/>
                        </ul>
                     </div> 
        ) ;
    });
    tarifs.push(
        <Modal
            open={props.context.state.err === null ? false : true}
            onClose={(e) => props.context.removeErr()}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={style}>
                <Alert severity="warning">
                    <AlertTitle>{props.context.state.err}</AlertTitle>
                </Alert>
            </Box>
        </Modal>
    );
    return tarifs;
}

export default ListTarif;