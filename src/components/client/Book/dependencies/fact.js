import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import BedIcon from '@mui/icons-material/Bed';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PolicyIcon from '@mui/icons-material/Policy';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

import {Card, CardContent, Typography, CardActions, Button, Box, Modal, TextField, IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import callAPI from '../../../../utility';
import {setValue} from '../../../../utility2.js';
import SkeletonFacture from './skeletons/skeletonFacture.js';
import InfoPolitiqueAnnul from './infoPolitiqueAnnul.js';
import { useCookies,Cookies,withCookies } from "react-cookie";
import { instanceOf } from 'prop-types';
import './filtre.css';
import styles from '../Book.module.css';

import {getDiffDays} from '../../../../utility/utilityDate.js';
import { useTranslation } from "react-i18next";
import ButtonLoad from '../../../partenaire/buttonLoading.js';

// const { t, i18n } = useTranslation();

const name_cookies="reservation-real";
function PrintDateSejour(props){
    // itineraire, borne, handleChange, label
    let retour = [];
    if(props.context.state.itineraires[props.index].edit){
        retour.push(
            <TextField 
                id="standard-basic" 
                type="date"
                value={props.context.state.itineraires[props.index].dateSejour[props.borne]} 
                onChange={(e) => 
                    props.context.setState(
                        setValue(
                            props.context.state, 
                            ["itineraires", props.index, "dateSejour", props.borne], 
                            e.target.value
                        )
                    )
                }
                variant="standard"
                style={{marginTop: "-2px"}} />
        );
    }else{
        retour.push(
            <span style={{fontSize :"12px"}}>
                {props.context.state.itineraires[props.index].dateSejour[props.borne]}
            </span>
        );  
    }
    return retour;
}

function Reservations(props){
    const { t, i18n } = useTranslation();
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
    let reservation = [];
    try{
        let i = -1;
        reservation = props.context.state.itineraires[props.indexItineraire].tarifReserves.map(tarif => {
            i++;
            const u = i;
            const nbNuit = getDiffDays(new Date(tarif.dateSejour.debut), new Date(tarif.dateSejour.fin));
            // 
            console.log(tarif);
            if(tarif.etat == 1 || tarif.etat == undefined){
                return (
                        <Card className={styles.stay}>
                        <CardContent>
                            <div>
                                <span><BedIcon/>{props.context.state.traduction ? tarif.TypeChambreName : tarif.nomTypeChambre }</span>
                                <span><ModeNightIcon/>{nbNuit + t('night')}</span>
                                <span><LocalOfferIcon/>{props.context.state.traduction ? tarif.TarifName : tarif.nomTarif}</span>
                            </div>
                            <div>
                                <span><PersonOutlineIcon/>x {tarif.nbPers} {t('person')}</span>
                                {tarif.politiqueAnnulAtrb && tarif.politiqueAnnulAtrb.length !== 0 ?
                                    <>
                                        <HtmlTooltip
                                            title={
                                                <InfoPolitiqueAnnul 
                                                    checkIn={tarif.dateSejour.debut}
                                                    politique={tarif.politiqueAnnulAtrb[0]}
                                            />}
                                            placement="left-start"
                                        >
                                            {/* <span><PolicyIcon/>{tarif.politiqueAnnulAtrb.nom}</span> */}
                                            <span><PolicyIcon/>{tarif.politiqueAnnulAtrb[0].nom}</span>
                                        </HtmlTooltip>
                                    </> 
                                : null }
                                <span></span>
                            </div>
                        </CardContent>
                        <div><span>Prix : {tarif.toPayDevise.afterProm.toFixed(2) +" "+props.context.state.devise} </span></div>
                        <CardActions>
                            <Button size="small">{t('Modify')}</Button>
                            <Button size="small" onClick={(e) => props.annulerReservation(props.context, props.context.state.reservationEnCours._id, props.indexItineraire, u)}>
                            {t('Cancel')}
                            </Button>
                        </CardActions>
                        </Card>
                    );
                }
            }
            
        )
    }catch(err){}
    return reservation;
}

function Itineraires(props){
    const { t, i18n } = useTranslation();
    let itineraires = [];
    for(let i = 0; i < props.context.state.itineraires.length; i++){
        let itineraire=props.context.state.itineraires[i];
        let toPay=0;
        for(let u = 0; u < itineraire.tarifReserves.length; u++){
            toPay += itineraire.tarifReserves[u].toPayDevise.afterProm;
        }
        itineraires.push(
            <Box className={styles.sidetitle}>
                <Card><p>
                   {t('Check-in')} : <span>{props.context.state.itineraires[i].dateSejour.debut}</span>
                    </p>
                    <p>
                   {t('Check-out')} : <span>{props.context.state.itineraires[i].dateSejour.fin}</span>
                    </p>
                </Card>
                <Reservations context={props.context} indexItineraire={i} annulerReservation={props.annulerReservation} />
                <Card>
                    <p>
                    Total : <span>{toPay.toFixed(2) +" " +props.context.state.devise} </span>
                    </p>
                </Card>
            </Box>
        );
    }
    return itineraires;
}

class Fact extends React.Component{
   

    constructor(props){
        super(props);
        const cookies= props;
        
        this.style = {
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
        this.state = {load:true}

    }
    
    
    reservationValide(res){
        if(res.status === 200){
            console.log("validation reservation");
            console.log(res.reservation);
        }else{
            console.log(res);
        }
     
        
    }
    validerReservation(){
        this.setState({load:false});
        localStorage.setItem('access', 2);
        this.props.context.handleChange("err", null);
        this.props.context.handleChange("resultApplyReservation", null);
        try{
            let idVide = true;
            let emailVide = true;
            if(this.props.context.state.reservationEnCours._id != ""){
                idVide = false;
                const itineraires =  this.props.context.state.itineraires;
                
                const data = {itineraires: itineraires, dateCreationPanier: this.props.context.state.reservationEnCours.dateCreationPanier};
                console.log(data);
                callAPI("post" , "/reservation/insertReservationPanier" , data , (res)=>{
                    if(res.status==200){
                        this.props.context.clearCookies();
                        this.props.context.props.history.push("/reservation/" + res.reservation._id + "/apply")
                    }
                });
            }
            if(this.props.context.state.email != ""){
                emailVide = false;
            }
            
        }catch(err2){console.log(err2)}
    }

    componentDidMount(){
        this.props.context.setReservationEnCours(null, true,false);
    }

    annulerReservation(context, idReservation, indexItineraire, indexTarifReserve){
        let reservation = context.state.reservationEnCours;
        try{
            reservation.itineraires[indexItineraire].tarifReserves.splice(indexTarifReserve, 1); 
            if(reservation.itineraires[indexItineraire].tarifReserves.length ==0){
                reservation.itineraires.splice(indexItineraire,1);
            }
            
        }catch(e){

        }
        context.setReservationEnCours(reservation);
    }

    printFacture(){

        let valider = null;
        
        let toPay = 0;
        for(let i = 0; i < this.props.context.state.itineraires.length; i++){
         
            for(let u = 0; u < this.props.context.state.itineraires[i].tarifReserves.length; u++){
                if(this.props.context.state.itineraires[i].tarifReserves[u].etat == undefined
                    || this.props.context.state.itineraires[i].tarifReserves[u].etat == 1){
                    valider = (<p style={{textAlign:'center',paddingBottom:'12px'}}>
                        {
                            this.state.load 
                            ? <Button size='medium' variant="contained"  onClick={(e) => this.validerReservation()} endIcon={<CallMissedOutgoingIcon/>}>
                                {this.props.context.state.traduction ? "Validate" : "Valider réservation" }
                            </Button>
                            : <ButtonLoad/>
                        }
                        </p>);
                    break;
                }
            }
        }
        for(let i = 0; i < this.props.context.state.itineraires.length; i++){
            let toPayItineraire =0;
            for(let u = 0; u < this.props.context.state.itineraires[i].tarifReserves.length; u++){
                toPayItineraire += this.props.context.state.itineraires[i].tarifReserves[u].toPayDevise.afterProm;
              
            }
           
            
            toPay += toPayItineraire;
            
        }

        return(
            <div className={styles.printFacture}>
                <div style={{textAlign:'center'}}>
                    <Itineraires context={this.props.context} annulerReservation={this.annulerReservation} />
                    <p id='bigLabel'>TOTAL : {toPay.toFixed(2) +' '+this.props.context.state.devise}</p>
                    <p><Button size='small' variant="contained" onClick={(e) => this.props.context.addNewItineraire()} 
                        endIcon={<CallMissedOutgoingIcon/>}>{this.props.context.state.traduction ? "Add itinerary" : "Ajouter itinéraire" }</Button></p>
                </div>
                <Modal
                    open={this.props.context.state.open}
                    onClose={(e) => this.props.context.handleChange("open", false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={this.style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                            Veuillez vous identifier pour finaliser la réservation
                        </Typography>
                        {
                        this.props.context.state.err != null ?
                        <p style={{backgroundColor: "red"}}>{this.props.context.state.err}</p>
                        : null
                        }
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField id="standard-basic" className="form-control" label="Email" variant="standard" style={{width:"300px"}}
                            type="email" 
                            name="Email" 
                            value={this.props.context.state.email}
                            onChange={(e) => this.props.context.handleChange("email", e.target.value)}/>
                            <br/>
                            <div style={{margin:'0 auto', width:'fit-content', marginTop:'20px'}}>
                            <Button variant="contained" onClick={(e) => (this.validerReservation())} >Appliquer réservation</Button>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
                
                <Modal
                    open={this.props.context.state.resultApplyReservation != null ? true : false}
                    onClose={(e) => this.props.context.handleChange("resultApplyReservation", null)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={this.style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                            {this.props.context.state.resultApplyReservation}
                        </Typography>
                    </Box>
                </Modal>

                {valider}
            </div>
        );
    }
        
    render(){
        
        return(
            <div>
                {this.props.context.state.isFactureReceived ? this.printFacture() : <SkeletonFacture />}
            </div>
        );
    }
}

export default Fact