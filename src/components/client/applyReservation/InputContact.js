import { Box } from '@mui/material';
import { useState } from 'react';
import {Champs} from '../../common/commonAssets.js';
function InputContact(props){

    const [reservateur, setReservateur] = useState({prenom:"",nom: "", email: "", tel: "", messageParticulier: ""});
    const [errorEmpty, setErrorEmpty] = useState({prenom:false,nom: false, email: false, tel: false, messageParticulier: false});
    
    const [isClientPrincipal, setIsClientPrincipal] = useState(false);

    function handleClientprincipal(value){
        setIsClientPrincipal(!isClientPrincipal);
        
        if(!isClientPrincipal){
           
            setReservateur(props.reservateur);
            
        }else{
            setReservateur({prenom:"",nom: "", email: "", tel: "", messageParticulier: ""});
        }
    }
    function handleChangeInfoReservateur(field, value, indice){
    
        let current = JSON.parse(JSON.stringify(reservateur));
        let errorField = JSON.parse(JSON.stringify(errorEmpty));
        current[field] = value;

        let reservation = {...props.reservation};
        reservation.itineraires[props.indiceItineraire].tarifReserves[props.indiceTarifReserver].reservateurWithEmail[field] = value;
        if(value!=""){
            errorField[field] = false; 
        }else{
            errorField[field] = true; 
        }
        props.setReservation(reservation);
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
    
    return(
        <div class="infos_contact" style={{border:'none'}}>
                <div class="infos_contact_header">
                    <h2 class="infos_heading">Informations de contact</h2>
                    {props.isEditEnabled ?
                    <span class="required-field-indicator-message_container">
                        <span><span class="required-field-indicator-message_required">*</span> Obligatoire</span>
                    </span> : null
                    }
                </div>
                    {
                        props.isEditEnabled ?
                            <h2 class="infos_heading" style={{fontSize:'1.1rem'}}><span>Pour qui réservez-vous ?</span></h2> : null 
                    }
                {
                    props.isEditEnabled ?
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
                                        onChange={(e) => handleChangeInfoReservateur("prenom", e.target.value )} onBlur={(e) => handleEmptyInfoReservateur("prenom")} required />
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
    );
}

export default InputContact;