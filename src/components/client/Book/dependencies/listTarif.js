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
import PolicyIcon from '@mui/icons-material/Policy';
import Reservation from '../../reservation';
import {getDiffDays} from '../../../../utility/utilityDate.js';
import ButtonLoading from '../../../partenaire/buttonLoading.js';
import { useTranslation } from "react-i18next";

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

function ListTarif(props){
    let devise = props.context.state.devise.toUpperCase();
    const [error, setError] = React.useState(null);
    const [showButton, setShowButton] = React.useState(false);
    const { t, i18n } = useTranslation();
    function setReservationEnCours(res){
        if(res.status === 200){
            console.log("add reservation");
            console.log(res.reservation);
            props.context.setReservationEnCours(res.reservation);
        }else{
            console.log(res);
        }
        setShowButton(false);
    }
    function typeChambre(res){
        
        if(res.status === 200){
         
        }else{
            console.log(res);
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
            const nbPers = props.context.state.guests.nbAdulte + props.context.state.guests.nbEnfant;
            // console.log("tarifs negga");
            // console.log(tarif);
            const nbNuit =  getDiffDays(new Date(tarif.dateSejour.debut), new Date(tarif.dateSejour.fin));
            return (
                    <div className={styles.listTarif}>
                        <ul>
                            <li>
                                <div className="row">
                                    
                                {props.context.state.traduction ?
                                    <div className="row">
                                        <span>{tarif.name}</span>
                                    </div>
                                :
                                    <div className="row">
                                        <span>{tarif.nom}</span>
                                    </div>
                                }

                                </div>
                                <div class="row">
                                    {tarif.politiqueAnnulAtrb !== undefined &&  tarif.politiqueAnnulAtrb[0] !== undefined? <HtmlTooltip
                                            title={
                                                <InfoPolitiqueAnnul 
                                                    checkIn={props.context.state.dateSejour.debut} 
                                                    politique={tarif.politiqueAnnulAtrb[0]} 
                                                    context={props.context}
                                            />}
                                            placement="top"
                                        >
                                            <span><PolicyIcon/> {props.context.state.traduction ? tarif.politiqueAnnulAtrb[0].name : tarif.politiqueAnnulAtrb[0].nom }</span>
                                        </HtmlTooltip> : ""
                                    }
                                </div>
                                {
                                    tarif.toPayStay.map((version , indice) => {
                                        return(
                                            <div className="row" style={{marginTop: "5px"}}>
                                                <div>
                                                    <span>X {version.nbPers}</span>
                                                    <span><PersonOutline/></span>
                                                    {/*<ListServiceTarif services={tarif.services} />*/}
                                                </div>
                                                <div class="col"> 
                                                    { version.prixOriginal ? <span className={styles.beforeProm}>&nbsp;{(version.prixOriginal).toFixed(2) + " "+ devise}</span> : null }
                                                    <span className={styles.afterProm}>&nbsp;{(version.prix).toFixed(2) + " "+ devise}</span>
                                                </div>
                                                <div className={styles.bookNow}>
                                                    <Button variant="contained"
                                                        onClick = {(e) => props.contextListChambre.addReservation(e,tarif._id, tarif.nom, props.idTypeChambre
                                                            , version.nbPers , props.nameTC,tarif,version, setShowButton, tarif.toPayStayOriginal[indice], tarif.listPrix)}
                                                        endIcon={<AddIcon/>}
                                                        className="bookNow"
                                                    >
                                                        {t('Book')}
                                                    </Button> 
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