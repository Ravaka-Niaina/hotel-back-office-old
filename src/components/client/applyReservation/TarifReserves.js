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
    function handleClientprincipal(value){
        setIsClientPrincipal(!isClientPrincipal);
        
        if(!isClientPrincipal){
           
            setReservateur(props.reservateur);
        }else{
            setReservateur({prenom:"",nom: "", email: "", tel: "", messageParticulier: ""});
        }
    }
    function handleChangeInfoReservateur(field, value){
        let current = JSON.parse(JSON.stringify(reservateur));
        let errorField = JSON.parse(JSON.stringify(errorEmpty));
        current[field] = value;
        if(value!=""){
            errorField[field] = false; 
        }
        setReservateur(current);
        setErrorEmpty(errorField);
    }
    function handleEmptyInfoReservateur(field){
        let reserv = JSON.parse(JSON.stringify(reservateur));
        let current = JSON.parse(JSON.stringify(errorEmpty));
       
        if(reserv[field]==='' ||reserv[field]===null){
            current[field] = true;
        }else{
            current[field] = false;
        }
           
        setErrorEmpty(current);
    }
    
    let tarifs = [];
    for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves.length; i++){
        if(props.reservation.itineraires[props.indexItineraire].tarifReserves[i].dateAnnulation === undefined){
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
                        <img  src='https://www.hotel-restaurant-colbert.com/wp-content/uploads/2012/06/Logo-Colbert1-Copier.jpg'/>
                        <div class="details_chambre">
                            <p class="title_hotel">{tarif.infoTypeChambre.infoHotel.nom}</p>
                            <p class="chambre"> {tarif.nomTypeChambre} </p>
                            <p class="tarifs"> {tarif.nomTarif} </p>
                            <p class="nuites"> {getDiffDays(new Date(tarif.dateSejour.debut),new Date(tarif.dateSejour.fin))} nuités </p>
                            <p class="hotel"> {datedebut.getDate()} {months[datedebut.getMonth()]} { datedebut.getYear()!=datefin.getYear() ? datedebut.getYear()+1900 : ""} -  {datefin.getDate()} {months[datefin.getMonth()]} {datefin.getYear()+1900} </p>
                            
                            
                        </div>

                    </div> 
                    <div class="input_utilisateur">
                    <div class="infos_contact" style={{border:'none'}}>
                            <div class="infos_contact_header">
                                <h2 class="infos_heading">Informations de contact</h2>
                                {props.isEditEnabled ?
                                <span class="required-field-indicator-message_container">
                                    <span><span class="required-field-indicator-message_required">*</span> Obligatoire</span>
                                </span> : null
                                }
                            </div>
                            {props.isEditEnabled ?
                            <h2 class="infos_heading" style={{fontSize:'1.1rem'}}><span>Pour qui réservez-vous ?</span></h2> : null }
                            {props.isEditEnabled ?
                            <div class="inscription_quick">
                                            <input type="checkbox" id="inscription_quick" name="scales"  checked={isClientPrincipal} onChange={handleClientprincipal}
                                                    />
                                            <label for="scales">Je suis le client principal.</label>
                            </div>
                            : null }
                             {props.isEditEnabled ?
                            <div class="inscription_quick">
                                            <input type="checkbox" id="inscription_quick" name="scales"  checked={!isClientPrincipal} onChange={handleClientprincipal}
                                                    />
                                            <label for="scales">Je réserve pour un autre client.</label>
                            </div>
                            : null }
                            <Box>
                                {props.isEditEnabled ?
                                    <div>
                                        <Box
                                            component="form"
                                            sx={{
                                                '& .MuiTextField-root': { m: 1, width: '35ch' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                            class="container_infos"
                                        >
                                            
                                                <div class="input-field">
                                                    <input type="text" value={reservateur.prenom}
                                                onChange={(e) => handleChangeInfoReservateur("prenom", e.target.value)} onBlur={(e) => handleEmptyInfoReservateur("prenom")} required />
                                                    <label>Prénom <span class="red_required">*</span></label>
                                                    {
                                                        errorEmpty.prenom ?
                                                        <div class="error_text">
                                                            Le prénom est obligatoire.
                                                        </div>
                                                        :null
                                                    }
                                                </div>
                                                <div class="input-field">
                                                    <input type="text" value={reservateur.nom} onBlur={(e) => handleEmptyInfoReservateur("nom")}
                                                             onChange={(e) => handleChangeInfoReservateur("nom", e.target.value)} required />
                                                        <label>Nom <span class="red_required">*</span></label>
                                                        {
                                                            errorEmpty.nom ?
                                                            <div class="error_text">
                                                                Le nom est obligatoire.
                                                            </div>
                                                            :null
                                                        }
                                                </div>
                                                <div class="input-field">
                                                    <input type="text" value={reservateur.tel}
                                                            onChange={(e) => handleChangeInfoReservateur("tel", e.target.value)} required />
                                                        <label>Téléphone pendant la journée</label>
                                                </div>
                                                <div class="input-field input-email">
                                                    <input type="text" value={reservateur.email} onBlur={(e) => handleEmptyInfoReservateur("email")}
                                                            onChange={(e) => handleChangeInfoReservateur("email", e.target.value)} required />
                                                        <label>Adresse e-mail <span class="red_required">*</span></label>
                                                        {
                                                            errorEmpty.email ?
                                                            <div class="error_text">
                                                                L'adresse e-mail est obligatoire.
                                                            </div>
                                                            :null
                                                        }
                                                     <p class="infos_mail">Voici l'adresse e-mail à laquelle votre confirmation sera envoyée.</p>    
                                                </div>

                                                
                                        </Box>
                                        <hr style={{marginLeft:'0.8em'}}></hr>                      
                                       
 
                                        <h2 class="infos_heading"><span>Détails et préférences supplémentaires</span></h2>
                                        <div class="details_reservation">
                                            <textarea value={reservateur.messageParticulier}
                                                onChange={(e) => handleChangeInfoReservateur("messageParticulier", e.target.value)} class="text_reservation" id="details_reservation" maxlength="200" type="textarea" name="commentArea" aria-label="Veuillez noter vos demandes ou besoins spéciaux (maximum 200 caractères)" placeholder=""></textarea>
                                            <label class="label_reservation">Veuillez indiquer vos demandes ou besoins spéciaux.</label>
                                        </div>
                                       
                                    </div>
                                    : <div class="champs">
                                        <Champs label="Nom" value={reservateur.nom.trim() !== "" ? reservateur.nom : "vide"} />
                                        <Champs label="Email" value={reservateur.email.trim() !== "" ? reservateur.email : "vide"} />
                                        <Champs label="Tel" value={reservateur.tel.trim() !== "" ? reservateur.tel : "vide"} />
                                        <Champs label="Message particulier" value={reservateur.messageParticulier.trim() != "" ? reservateur.messageParticulier : "vide"} />
                                    </div>
                                    
                                    } 
                            </Box>
                    </div>

                    </div>
                    <div class="politique_annulation"></div>

                </div>
            );
        }
    }
    tarifs.push(<ConfirmAnnulChambre annulChambre={annulChambre} setAnnulChambre={setAnnulChambre} key={annulChambre} openLoad={props.openLoad} setOpenLoad={props.setOpenLoad} />);
    return tarifs;
}

export default TarifReserves;