import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'

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
            }
            if(this.props.context.state.email != ""){
                emailVide = false;
            }
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
            this.props.context.setReservationEnCours(res.data)})
        .catch(err => console.log(err));
    }

    annulerReservation(_id, idTarif){
        console.log("Annulation en cours");
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + '/reservation/delete',
            withCredentials: true,
            data: { _id: _id, idTarif: idTarif }
        })
        .then(res => {                                                  
            this.props.context.setReservationEnCours(res.data)})
        .catch(err => console.log(err));
    }

    render(){
        let reservation = [];
        try{
            if(this.props.context.state.reservationEnCours){
                reservation = this.props.context.state.reservationEnCours.tarifReserves.map(tarif => {
                    return (
                        <p> 
                            {tarif.nomTarif} : {tarif.idRooms.length} 
                            <button onClick={(e) => 
                            this.annulerReservation(this.props.context.state.reservationEnCours._id, tarif.idTarif)}>
                                Annuler
                            </button>
                        </p>
                        );
                    }
                )
            }
        }catch(err){}
        if(reservation.length > 0){
            reservation.push(<p><button onClick={(e) => this.props.context.validerReservation()}>Valider</button></p>);
        }
        
        return(
            <div>
                <div class="row" style={{textAlign:'center'}}>
                    <h1>Your Stay</h1>
                    <div class="row mb-4">
                        <div class="col">
                            <strong> Check in :  </strong>
                        {reservation}
                            </div>
                        
                        <div class="col" id="locA">
                            <strong>Check out :</strong>
                            
                        </div>
                    </div>
                    <p>TOTAL :</p>    
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
            </div>
        );
    }
}

export default Fact