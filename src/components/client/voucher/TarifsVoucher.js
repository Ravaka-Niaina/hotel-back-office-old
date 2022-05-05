import { useState } from 'react';
import Button from '@mui/material/Button';

import {Champs, ChampsImportant, line} from '../../common/commonAssets.js';


import {setValue} from '../../../../src/utility2.js';
import {getDiffDays,dateToFullString} from '../../client/utility.js';

import Box from '@mui/material/Box';
import ConfirmAnnulChambre from '../applyReservation/ConfirmAnnulChambre.js';
import Politiques from '../applyReservation/Politiques.js';
import PolitiquesVoucher from './PolitiquesVoucher.js';

function TarifsVoucher(props){
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
    let hotelItineraire=null;
    for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves.length; i++){
        let object = {idReservation : props.reservation._id , indexItineraire : props.indexItineraire ,indexTarifsReserve : i}
        let infoEtat = props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoEtat;

        const u = i;
        const tarif = props.reservation.itineraires[props.indexItineraire].tarifReserves[i];
        if(i==0){
            hotelItineraire = tarif.infoTypeChambre.infoHotel;
        }
        const datedebut = new Date(tarif.dateSejour.debut);
        const datefin = new Date(tarif.dateSejour.fin);
        const months = ['jan','fev','mar', 'av','mai','juin','juil','août','sept','oct','nov','déc'];
        const nbAdults =tarif.infoTypeChambre.nbAdulte;
        const nbEnfant =tarif.infoTypeChambre.nbEnfant;
        tarifs.push(
            <div>
            <h2 class="voucher_title">Détails de la chambre</h2>
            <div class="voucher_hotel">
                <strong>{tarif.infoTypeChambre.infoHotel.nom}</strong>
                <div>{tarif.infoTypeChambre.infoHotel.adresse}</div>
                <div>{tarif.infoTypeChambre.infoHotel.tel}</div>
                <div>{tarif.infoTypeChambre.infoHotel.email}</div>
            </div>
            <hr style={{marginLeft:'0.8em'}}></hr>
            </div>
        )
        tarifs.push(
            <div class="voucher_details_tarifs">
                
                <div class="image_tarifs">
                        <img style={{width:'90%',marginTop:'0.8rem'}}  src={process.env.REACT_APP_BACK_URL+"/"+tarif.infoTypeChambre.photo[0]}/>
                </div>
                <div class="voucher_info_tarifs">
                    <div style={{display:'flex',flexDirection:'row',marginTop:'0.8rem'}}>
                        <h3 class="voucher_title2"> Chambre {i+1} </h3>
                        <span class="voucher_title2" style={{marginLeft:'1.5rem'}}>CONFIRMER #{props.reservation.itineraires[props.indexItineraire].tarifReserves[i].numeroConfirmation}</span>
                        {infoEtat === null ? null : <p><strong>Statut tarif: {infoEtat.label} le {infoEtat.date}</strong></p>}
                    </div>
                    <div class="flex_voucher_tarif" style={{marginTop:'0.8rem'}}><strong class="voucher_bold">{tarif.nomTypeChambre}</strong>
                        <div class="booking-summary-reservations_roomTotal">
                            <span class="sr-only"><span>Prix de la chambre</span> 
                            </span><span class="voucher_bold">{tarif.toPayDevise.afterProm.toFixed(2)}&nbsp; {props.devise}</span>
                        </div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row'}}>
                        <div >{tarif.nomTarif}</div> <span  style={{marginLeft:'0.8rem',fontSize:12}}>{getDiffDays(datedebut,datefin)} nuit(s)</span>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',marginTop:'0.8rem'}}>
                        <div>
                            <strong class="voucher_bold">Dates</strong>
                            <div>{dateToFullString(datedebut)}</div>
                            <div>{dateToFullString(datefin)}</div>
                        </div>
                        <div style={{marginLeft:'1.5rem'}}>
                            <strong class="voucher_bold">Client</strong>
                            {
                                nbAdults >0 ?
                                <div>{nbAdults} adulte(s)</div> :null
                            }
                                {
                                nbEnfant >0 ?
                                <div>{nbEnfant} enfant(s)</div> :null
                            }
                            
                        </div>
                        
                    </div>
                    <div style={{marginTop:'0.8rem'}}>
                        <strong class="voucher_bold">Informations du client</strong>
                        <div>{props.reservation.itineraires[props.indexItineraire].tarifReserves[i].reservateurWithEmail.prenom}  {props.reservation.itineraires[props.indexItineraire].tarifReserves[i].reservateurWithEmail.nom} </div>
                        <div> {props.reservation.itineraires[props.indexItineraire].tarifReserves[i].reservateurWithEmail.email} </div>
                        <div> {props.reservation.itineraires[props.indexItineraire].tarifReserves[i].reservateurWithEmail.tel} </div>
                    </div>
                    <div style={{marginTop:'0.8rem'}}>
                        <strong class="voucher_bold">Détails et préférences supplémentaires</strong>
                        <div>{props.reservation.itineraires[props.indexItineraire].tarifReserves[i].reservateurWithEmail.messageParticulier} </div>
                        
                    </div>
                    <button  style={{marginTop:'0.8rem'}} class="voucher_link" datatest="Button"  
                        onClick={(e) => props.ShowModalAnnulation(false , object)}><span style={{fontSize : "12px"}}>annuler la réservation de la chambre</span></button>
                    <hr style={{marginTop:-2}}></hr>
                    <div style={{textAlign:'right',fontWeight:700,marginTop:'0.8rem'}}><span>Total de la réservation&nbsp;:</span> 
                        <span class="booking-summary-reservations_amount"><span>{tarif.toPayDevise.afterProm.toFixed(2)}&nbsp; {props.devise} </span></span></div>
                    
                </div>
                
            </div>
            
        );
        tarifs.push(<hr style={{marginLeft:'0.8rem'}}></hr>);
        tarifs.push(
            <div class="politiques_voucher">
                <h2 class="voucher_title">Politiques</h2>
                <PolitiquesVoucher  tarif={tarif} />
            </div>
            
        
        );
        tarifs.push(<hr ></hr>);
    }
  
    tarifs.push(<ConfirmAnnulChambre annulChambre={annulChambre} setAnnulChambre={setAnnulChambre} key={annulChambre} openLoad={props.openLoad} setOpenLoad={props.setOpenLoad} />);
    
    return (<div>
                {tarifs}
            </div>);
}

export default TarifsVoucher;