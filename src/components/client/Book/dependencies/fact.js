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

import {setValue} from '../../../../utility2.js';

import SkeletonFacture from './skeletons/skeletonFacture.js';


import './filtre.css';

import styles from '../Book.module.css';

import {Card, CardContent, Typography, CardActions, Button, Box, Modal, TextField, IconButton} from '@mui/material';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

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
            console.log(tarif);
            if(tarif.etat == 1 || tarif.etat == undefined){
                return (
                        <Card className={styles.stay}>
                        <CardContent>
                            <div>
                                <span><BedIcon/>{tarif.nomTypeChambre}</span>
                                <span><ModeNightIcon/>{tarif.nbNuits + " nuit(s)"}</span>
                                <span><LocalOfferIcon/>{tarif.nomTarif}</span>
                            </div>
                            <div>
                                <span><PersonOutlineIcon/>x {tarif.nbPers} personnes</span>
                                <HtmlTooltip
                                    title={
                                        <React.Fragment>
                                            <h3>Politique d'annulation</h3>
                                            <div>
                                                <p>Votre carte sera débité du montant total de la réservation le jour de votre arrivée le JJ/MM/AN</p>
                                                <p>En cas d’annulation après le JJ/MM/AN à Midi, les frais d’annulation s’élèveront à X%</p>
                                                <p>En cas d’annulation après le JJ/MM/AN à Midi, votre carte sera débité de X%</p>
                                                <p>En cas d’annulation, les frais d’annulation s’élèveront à X%</p>
                                            </div>
                                        </React.Fragment>
                                    }
                                    placement="left-start"
                                >
                                    <span><PolicyIcon/>Politique d'annulation</span>
                                </HtmlTooltip>
                                <span></span>
                            </div>
                        </CardContent>
                        <div><span>Prix : {tarif.toPay.afterProm.toFixed(2)} EUR</span></div>
                        <CardActions>
                            <Button size="small">Modifier</Button>
                            <Button size="small" onClick={(e) => props.annulerReservation(props.context, props.context.state.reservationEnCours._id, props.indexItineraire, u)}>
                                Annuler
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
    let itineraires = [];
    for(let i = 0; i < props.context.state.itineraires.length; i++){
        itineraires.push(
            <Box className={styles.sidetitle}>
                <Card><p>
                    Check in : <span>{props.context.state.itineraires[i].dateSejour.debut}</span>
                    </p>
                    <p>
                    Check out : <span>{props.context.state.itineraires[i].dateSejour.fin}</span>
                    </p>
                </Card>
                <Reservations context={props.context} indexItineraire={i} annulerReservation={props.annulerReservation} />
                <Card>
                    <p>
                    Total : <span>{props.context.state.itineraires[i].toPay ? props.context.state.itineraires[i].toPay.toFixed(2) : ""} EUR</span>
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
    }

    validerReservation(){
        this.props.context.handleChange("err", null);
        this.props.context.handleChange("resultApplyReservation", null);
        try{
            let idVide = true;
            let emailVide = true;
            if(this.props.context.state.reservationEnCours._id != ""){
                idVide = false;
                this.props.context.props.history.push("/reservation/" + this.props.context.state.reservationEnCours._id + "/apply");
            }
            if(this.props.context.state.email != ""){
                emailVide = false;
            }
            
        }catch(err2){console.log(err2)}
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + '/reservation/',
            withCredentials: true,
            data: {}
        })
        .then(res => {
            let reserv = res.data.reservation === null ? null : res.data.reservation[0];
            console.log(reserv);
            this.props.context.setReservationEnCours(reserv, true);
        }).catch(err => console.log(err));
    }

    annulerReservation(context, idReservation, indexItineraire, indexTarifReserve){
        const data = { _id: idReservation, indexItineraire: indexItineraire, indexTarifReserve: indexTarifReserve };
        console.log(data);
        console.log(context.state.itineraires);
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + '/reservation/delete',
            withCredentials: true,
            data: data
        })
        .then(res => { 
            console.log(res);                                               
            context.setReservationEnCours(res.data.reservation)})
        .catch(err => console.log(err));
    }

    printFacture(){
        let valider = null;
        for(let i = 0; i < this.props.context.state.itineraires.length; i++){
            for(let u = 0; u < this.props.context.state.itineraires[i].tarifReserves.length; u++){
                if(this.props.context.state.itineraires[i].tarifReserves[u].etat == undefined
                    || this.props.context.state.itineraires[i].tarifReserves[u].etat == 1){
                    valider = (<p style={{textAlign:'center',paddingBottom:'12px'}}><Button size='medium' variant="contained"  onClick={(e) => this.validerReservation()}>Valider réservation</Button></p>);
                    break;
                }
            }
            if(valider != null){
                break;
            }
        }
        return(
            <div>
                <div style={{textAlign:'center'}}>
                    <Itineraires context={this.props.context} annulerReservation={this.annulerReservation} />
                    <p id='bigLabel'>TOTAL : </p>
                    <p><Button size='small' variant="contained" onClick={(e) => this.props.context.addNewItineraire()}>Ajouter itinéraire</Button></p>
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
                            <Button variant="contained" onClick={(e) => (this.validerReservation())}>Appliquer réservation</Button>
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