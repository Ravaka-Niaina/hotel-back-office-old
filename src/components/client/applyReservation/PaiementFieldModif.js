import './paiement_field.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCreditCard,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
function PaiementField(props){
    const [reservateur, setReservateur] = useState({numeroCarte:"",expirationCarte: "", ccvCarte: "", nomCarte: ""});
    const [errorEmpty, setErrorEmpty] = useState({numeroCarte:false,expirationCarte: false, ccvCarte: false, nomCarte: false});
    function handleChangeInfoReservateur(field, value){
        let current = JSON.parse(JSON.stringify(props.reservation));
        let errorField = JSON.parse(JSON.stringify(errorEmpty));
        current[field] = value;
        if(value!=""){
            errorField[field] = false; 
        }
        props.setReservation(current);
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
        <div class="paiement_field">
            <p><span class="guest-payment_payNowAmount"><span>{props.reservation.toPayDevise.toFixed(2)}&nbsp; {props.devise}.</span></span> <span>Veuillez fournir un mode de paiement valide.</span></p>
            <div class="logo_card">
                <img src={process.env.PUBLIC_URL + '/Visa.png'} />
                <img src={process.env.PUBLIC_URL + '/MasterCard.png'} />
                <img src={process.env.PUBLIC_URL + '/Amex.png'} />
                <img src={process.env.PUBLIC_URL + '/EuroCard.png'} />
            </div>
            <div >
                <div class="input-field input-field-carte">
                    <span class="fixed_left"><FontAwesomeIcon icon={faCreditCard} /></span>
                    <input style={{paddingLeft:55}} type="text" value={props.reservation.reservateur.numeroCarte} disabled
                onChange={(e) => handleChangeInfoReservateur("numeroCarte", e.target.value)} onBlur={(e) => handleEmptyInfoReservateur("numeroCarte")} required />
                    <label  style={{marginTop : "-15px"}}><span style={{marginLeft:40}}>Numéro de carte</span> <span class="red_required">*</span>
                       
                    </label>
                    {
                        errorEmpty.numeroCarte ?
                        <div class="error_text">
                            Le numéro de carte est obligatoire.
                        </div>
                        :null
                    }
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div class="input-field input-field-carte">
                            <input type="text" value={props.reservation.reservateur.expirationCarte} placeholder='MM/YY' disabled
                        onChange={(e) => handleChangeInfoReservateur("expirationCarte", e.target.value)} onBlur={(e) => handleEmptyInfoReservateur("expirationCarte")} required />
                            <label style={{marginTop : "-15px"}} >Date d'expiration (MM/AA) <span class="red_required">*</span></label>
                            {
                                errorEmpty.expirationCarte ?
                                <div class="error_text">
                                    La date d’expiration est requise
                                </div>
                                :null
                            }
                    </div>
                    <div class="input-field input-field-carte" style={{width:150,marginLeft:10}}>
                            <span class="fixed_right"><FontAwesomeIcon color="black" icon={faInfoCircle} /></span>
                            <input type="text" value={props.reservation.reservateur.ccvCarte} disabled
                        onChange={(e) => handleChangeInfoReservateur("ccvCarte", e.target.value)} onBlur={(e) => handleEmptyInfoReservateur("ccvCarte")} required />
                            <label  style={{marginTop : "-15px"}}>CCV <span class="red_required">*</span></label>
                            {
                                errorEmpty.ccvCarte ?
                                <div class="error_text">
                                   Le code de sécurité est obligatoire
                                </div>
                                :null
                            }
                    </div>
                </div>
                <div class="input-field input-field-carte">
                            <input type="text" value={props.reservation.reservateur.nomCarte} disabled
                        onChange={(e) => handleChangeInfoReservateur("nomCarte", e.target.value)} onBlur={(e) => handleEmptyInfoReservateur("nomCarte")} required />
                            <label  style={{marginTop : "-15px"}}>Nom figurant sur la carte  <span class="red_required">*</span></label>
                            {
                                errorEmpty.nomCarte ?
                                <div class="error_text">
                                    Le nom est obligatoire
                                </div>
                                :null
                            }
                </div>

            </div>
             

        </div>
    ); 
}

export default PaiementField;