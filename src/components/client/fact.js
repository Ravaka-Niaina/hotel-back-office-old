import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class Fact extends React.Component{
    constructor(props){
        super(props);
        //this.annulerReservation = this.annulerReservation.bind(this);
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
        console.log(this.props.context.state.reservationEnCours);
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
        );
    }
}

export default Fact