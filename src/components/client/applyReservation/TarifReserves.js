import { useState } from 'react';
import Button from '@mui/material/Button';

import {Champs, ChampsImportant, line} from '../../common/commonAssets.js';
import InputUtilisateur from './InputUtilisateur.js';
import Politiques from './Politiques.js';
import ConfirmAnnulChambre from './ConfirmAnnulChambre.js';
import {setValue} from '../../../../src/utility2.js';
import {getDiffDays} from '../../client/utility.js';
import './Itineraires.css';
import Box from '@mui/material/Box';
import InputContact from './InputContact.js';
import InfoPolitiqueAnnul from '../Book/dependencies/infoPolitiqueAnnul.js';

function TarifReserves(props){
    const [annulChambre, setAnnulChambre] = useState(
        {
            open: false, 
            idReservation: props.reservation._id, 
            indexItineraire: props.indexItineraire,
            indexTarif: null
        });
    const [reservateur, setReservateur] = useState({prenom:"",nom: "", email: "", tel: "", messageParticulier: ""});
    const [errorEmpty, setErrorEmpty] = useState({prenom:false,nom: false, email: false, tel: false, messageParticulier: false});
    const [isEditEnabled, setIsEditEnabled] = useState(props.isEditEnabled);
    const [isClientPrincipal, setIsClientPrincipal] = useState(false);


    function showAnnulModal(indexTarif){
        console.log("Annulation en cours...");
        let temp = JSON.parse(JSON.stringify(annulChambre));
        temp.open = true;
        temp.indexTarif = indexTarif;
        console.log(temp);
        setAnnulChambre(temp);
    }
   
    
    let tarifs = [];
    for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves.length; i++){
        let object = {idReservation : props.reservation._id , indexItineraire : props.indexItineraire ,indexTarifsReserve : i}

        if(props.reservation.itineraires[props.indexItineraire].tarifReserves[i].etat !== 0 ){
            const u = i;
           // console.log("u = " + u);
            const tarif = props.reservation.itineraires[props.indexItineraire].tarifReserves[i];
             console.log("tarifs");
             console.log(tarif);
            const datedebut = new Date(tarif.dateSejour.debut);
            const datefin = new Date(tarif.dateSejour.fin);
            const months = ['jan','fev','mar', 'av','mai','juin','juil','août','sept','oct','nov','déc'];
            tarifs.push(
                <div class="box_reservation">
                    
                    <div class="infos_chambre">
                        <img  src={process.env.REACT_APP_BACK_URL+"/"+tarif.infoTypeChambre.photo[0]}/>
                        <div class="details_chambre">
                            <p class="title_hotel">Chambre {(i+1)}</p>
                            <p class="chambre"> {tarif.nomTypeChambre} </p>
                            <p class="tarifs"> {tarif.nomTarif} </p>
                            <p class="nuites"> {getDiffDays(new Date(tarif.dateSejour.debut),new Date(tarif.dateSejour.fin))} nuités </p>
                            <p class="hotel"> {datedebut.getDate()} {months[datedebut.getMonth()]} { datedebut.getYear()!=datefin.getYear() ? datedebut.getYear()+1900 : ""} -  {datefin.getDate()} {months[datefin.getMonth()]} {datefin.getYear()+1900} </p>
                            
                            
                        </div>

                    </div> 
                    <div class="input_utilisateur">
                        <InputContact isEditEnabled={props.isEditEnabled} reservateur={props.reservateur} 
                                reservation ={props.reservation} setReservation = {props.setReservation} 
                                indiceItineraire = {props.indexItineraire} 
                                indiceTarifReserver = {i}/>

                    </div>
                    
                    <div class="politique_annulation">
                        <hr style={{marginLeft:'0.8em'}}></hr>    
                        <h2 class="infos_heading">Politiques d'annulation et paiement:</h2>
                        <InfoPolitiqueAnnul
                            checkIn={tarif.dateSejour.debut}
                            politique={tarif.politiqueAnnulAtrb}
                        />
                        {/* <Politiques politique={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTarif.infoPolitique} tarif={tarif} /> */}
                        <div class="prix_tarif">
                            <p class="prix">Prix:</p>
                            <p class="prix">{tarif.toPay.afterProm} € </p>
                        </div>
                        <button style={{marginLeft:'0.8em'}} class="btn button_btn button_secondary button_sm" datatest="Button" onClick={(e) => props.ShowModalAnnulation(false , object)}><span>Annuler</span></button>
                        
                        <hr style={{marginLeft:'0.6em'}}></hr> 
                        
                        
                    </div>

                </div>
            );
        }
    }
    tarifs.push(<ConfirmAnnulChambre annulChambre={annulChambre} setAnnulChambre={setAnnulChambre} key={annulChambre} openLoad={props.openLoad} setOpenLoad={props.setOpenLoad} />);
    return tarifs;
}

export default TarifReserves;