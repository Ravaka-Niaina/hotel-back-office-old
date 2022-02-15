import React from 'react';
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import {Button} from '@mui/material';
import styles from '../Book.module.css';
import {PersonOutline} from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoPolitiqueAnnul from './infoPolitiqueAnnul.js';
import { styled } from '@mui/material/styles';
import callAPI from '../../../../utility.js';
import numeroConfirmation from './numeroConfirmation.js';
import PolicyIcon from '@mui/icons-material/Policy';
import {getDiffDays} from '../../../../utility/utilityDate.js';
import ButtonLoading from '../../../partenaire/buttonLoading.js';

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

function getDateNotEspace(date){
    date = new Date(date);
    let year = date.getFullYear()+"";
    let month = getNDigits(2, date.getMonth() + 1);
    let day = getNDigits(2, date.getDate());
    let annee = '';
    for (let i = year.length-1; i > 1 ; i--){
        annee = annee+year[i];   
    }
    date = annee  + month  + day;
    return date;
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
    const [showButton, setShowButton] = React.useState(false);
    function setReservationEnCours(res){
        if(res.status === 200){
            props.context.setReservationEnCours(res.reservation);
        }else{
            console.log(res);
        }
        setShowButton(false);
    }

    function NumeroIntineraire (random , nameHotel ,TChambre){
        let hotel = '';
        const number = 3;
        const min = 1;
        const max = 1000000;
        const nameTC = TChambre.split(" ");
        let rand = min + Math.random() * (max - min);
        rand = Number.parseInt(rand);
        let now = new Date();
        let date = getDateNotEspace(now);
        for(let i = 0; i < number ; i++){
            hotel = hotel + nameHotel[i] ;
        }
        
        try{//A revoir
            return random = date+hotel+(random + rand)+nameTC[0][0] + nameTC[1][0];
        }catch(err){
            return random = date+hotel+(random + rand)+nameTC[0][0] + nameTC[0][0];
        }
        
    }

    function addReservation(e ,id, nom, idTypeChambre, nbPers, TChambre){
        setShowButton(true);
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
            //numero itineraire
            const Random = NumeroIntineraire(props.context.state.random , props.context.state.nameHotel,TChambre);
            //numero confirmation
            const numeroConfirm = numeroConfirmation(0,props.context.state.nameHotel, TChambre);
            console.log(numeroConfirm);
            itineraires[lastItineraire].tarifReserves.push({
                idTarif: id, 
                dateSejour: dateSejour,
                dateReservation: getDate(Date.now()),
                guests: props.context.state.guests,
                idTypeChambre : idTypeChambre,
                nbPers: nbPers,
                numeroConfirmation : numeroConfirm
            });
            const data = {itineraires: itineraires , numeroIntineraire : Random };
            callAPI("post" , "/reservation/insert" , data , setReservationEnCours);
        }
    }

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 850,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        },
    }));
    
    let tarifs = props.tarifs.map(tarif => {
            const nbNuit =  getDiffDays(new Date(tarif.dateSejour.debut), new Date(tarif.dateSejour.fin));
            return (
                    <div className={styles.listTarif}>
                        <ul>
                            <li>
                                <div className="row">
                                    <span>{tarif.nom}</span>
                                </div>
                                <div class="row">
                                    {tarif.politiqueAnnulAtrb !== undefined &&  tarif.politiqueAnnulAtrb[0] !== undefined? <HtmlTooltip
                                            title={
                                                <InfoPolitiqueAnnul 
                                                    checkIn={tarif.dateSejour.debut} 
                                                    politique={tarif.politiqueAnnulAtrb[0]} 
                                            />}
                                            placement="left-start"
                                        >
                                            <span><PolicyIcon/>{tarif.politiqueAnnulAtrb[0].nom}</span>
                                        </HtmlTooltip> : ""
                                    }
                                </div>
                                {
                                    tarif.toPayStay.map(version => {
                                        return(
                                            <div className="row" style={{marginTop: "5px"}}>
                                                <div>
                                                    <span>X {version.nbPers}</span>
                                                    <span><PersonOutline/></span>
                                                    {/*<ListServiceTarif services={tarif.services} />*/}
                                                </div>
                                                <div class="col"> 
                                                    { version.prixOriginal ? <span className={styles.beforeProm}>&nbsp;{(version.prixOriginal) + " EUR "}</span> : null }
                                                    <span className={styles.afterProm}>&nbsp;{(version.prix) + " EUR "}</span>
                                                </div>
                                                <div className={styles.bookNow}>
                                                    {showButton ? <ButtonLoading />
                                                    : <Button variant="contained"
                                                        onClick = {(e) => addReservation(e,tarif._id, tarif.nom, props.idTypeChambre, version.nbPers , props.nameTC)}
                                                        endIcon={<AddIcon/>}
                                                        className="bookNow"
                                                    >
                                                        Book
                                                    </Button> }
                                                </div>
                                            </div>
                                        );
                                    })
                                }
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