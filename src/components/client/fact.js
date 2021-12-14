import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'

import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

import {setValue} from '../../../src/utility2.js';


import './filtre.css';

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
    let reservation = [];
    try{
        let i = -1;
        reservation = props.context.state.itineraires[props.indexItineraire].tarifReserves.map(tarif => {
            i++;
            const u = i;
            if(tarif.etat == 1 || tarif.etat == undefined){
                return (
                    <div className ="row" style = {{margin : "0 auto"}}> 
                        <div className ="col">
                            <strong >{tarif.nomTarif}</strong>
                        </div>
                        <div className ="col">
                        <EditIcon style={{color : "green"}} /><span id="edit">edit </span> &nbsp;&nbsp;
                        <CancelIcon style={{color : "red"}}/><span id="remove" onClick={(e) => 
                            props.annulerReservation(props.context, 
                                props.context.state.reservationEnCours._id, props.indexItineraire, u)}
                        >remove</span>
                        
                        </div>
                        
                    </div>
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
            <div>
                <div class="row mb-4">
                    <div class="col">
                        <span id='litleLabel'> Check in : </span>
                        <PrintDateSejour 
                            id='litleLabel'
                            label="Check in" 
                            context={props.context} 
                            index={i}
                            borne="debut" />
                    </div>
                    
                    <div class="col" id="locA">
                        <span id='litleLabel'>Check out : </span>
                        <PrintDateSejour
                            id='litleLabel'  
                            label="Check out"
                            context={props.context}
                            index={i}
                            borne="fin" />
                    </div>
                    <p>
                    <Button size='small' variant="contained" color="success" onClick={(e) => props.context.setState( setValue( props.context.state, ["itineraires", i, "edit"], true ) )}>
                        Modifier
                    </Button>
                    </p>
                </div>
                <Reservations context={props.context} indexItineraire={i} annulerReservation={props.annulerReservation} />
            </div>
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
            
            /*
            console.log("id = " + idVide + " , email = " + emailVide);
                axios({
                    method: 'post',
                    url: process.env.REACT_APP_BACK_URL + '/reservation/applyWithEmail',
                    withCredentials: true,
                    data: {_id: this.props.context.state.reservationEnCours._id, email: this.props.context.state.email}
                })
                .then(res => {       
                    console.log(res);  
                    if(res.data.status != 200){
                        try{
                            this.props.context.handleChange("resultApplyReservation", res.data.errors[0].message);
                        }catch(err){
                            this.props.context.handleChange("resultApplyReservation", res.data.errors[0]);
                        }
                    }else{
                        this.props.context.handleChange("resultApplyReservation", res.data.message);
                        this.props.context.setReservationEnCours({status: 200, reservation: null});
                        this.props.context.handleChange("open", false);
                    }
                }).catch(err => console.log(err));
            */
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
            console.log(res.data.reservation[0]); 
            this.props.context.setReservationEnCours(res.data.reservation[0]);
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

    render(){
        let valider = null;
        console.log(this.props.context.state);
        for(let i = 0; i < this.props.context.state.itineraires.length; i++){
            for(let u = 0; u < this.props.context.state.itineraires[i].tarifReserves.length; u++){
                if(this.props.context.state.itineraires[i].tarifReserves[u].etat == undefined
                    || this.props.context.state.itineraires[i].tarifReserves[u].etat == 1){
                    valider = (<p style={{textAlign:'center',paddingBottom:'12px'}}><Button size='medium' variant="outlined"  onClick={(e) => this.validerReservation()}>Valider réservation</Button></p>);
                    break;
                }
            }
            if(valider != null){
                break;
            }
        }
        return(
            <div>
                <div class="row" style={{textAlign:'center'}}>
                    <h3>Your Stay</h3>
                    <Itineraires context={this.props.context} annulerReservation={this.annulerReservation} />
                    <p id='bigLabel'>TOTAL : </p>
                    {this.props.context.state.changeDateSejour ? 
                        null 
                    : 
                    <p><Button size='small' variant="contained" onClick={(e) => this.props.context.addNewItineraire()}>Ajouter itinéraire</Button></p>}
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
}

export default Fact