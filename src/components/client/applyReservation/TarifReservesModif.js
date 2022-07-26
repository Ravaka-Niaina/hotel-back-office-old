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
import InputContact from './InputContactModif.js';

function TarifReserves(props){
    console.log(props.indiceI);
    const [annulChambre, setAnnulChambre] = useState(
        {
            open: false, 
            idReservation: props.reservation._id, 
            indexItineraire: props.indexItineraire,
            indexTarif: null
        });


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
        let object = null;
        if(props.indiceI != null){
            object = {idReservation : props.reservation._id , indexItineraire : props.indiceI ,indexTarifsReserve : i}
        }else{
            object = {idReservation : props.reservation._id , indexItineraire : props.indexItineraire ,indexTarifsReserve : i}
        }
        const u = i;
        // console.log("u = " + u);
        const tarif = props.reservation.itineraires[props.indexItineraire].tarifReserves[i];
        const datedebut = new Date(tarif.dateSejour.debut);
        const datefin = new Date(tarif.dateSejour.fin);
        const months = ['jan','fev','mar', 'av','mai','juin','juil','août','sept','oct','nov','déc'];

        const infoEtat = props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoEtat;
        tarifs.push(
            <div class="box_reservation">
                
                <div class="infos_chambre">
                    <img  src={process.env.REACT_APP_BACK_URL+"/"+tarif.infoTypeChambre.photo[0]}/>
                    {infoEtat === null ? null : <p><strong>Statut tarif: {infoEtat.label} le {infoEtat.date}</strong></p>}
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
                            indiceTarifReserver = {i} setisVariableUpdate={props.setisVariableUpdate}/>

                </div>
                
                <div class="politique_annulation">
                    <hr style={{marginLeft:'0.8em'}}></hr>    
                    <h2 class="infos_heading">Politiques d'annulation et paiement:</h2>
                    <Politiques politiques={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTarif.infoPolitique} tarif={tarif} />
                    <div class="prix_tarif">
                        <p class="prix">Prix:</p>
                        <p class="prix">{tarif.toPayDevise.afterProm.toFixed(2) +"  "+ props.devise}  </p>
                    </div>
                    <button style={{marginLeft:'0.8em'}} class="btn button_btn button_secondary button_sm" datatest="Button" onClick={(e) => props.ShowModalAnnulation(false , object)}><span>Annuler</span></button>
                    
                    <hr style={{marginLeft:'0.6em'}}></hr> 
                    
                    
                </div>

            </div>
        );
    }
    tarifs.push(<ConfirmAnnulChambre annulChambre={annulChambre} setAnnulChambre={setAnnulChambre} key={annulChambre} openLoad={props.openLoad} setOpenLoad={props.setOpenLoad} />);
    return tarifs;
}

export default TarifReserves;