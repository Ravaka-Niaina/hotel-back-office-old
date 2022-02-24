import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import callAPI from '../../utility';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Icon from '@mui/material/Icon';
import { useHistory } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Total from './applyReservation/Total.js';
import InfoItineraires from './applyReservation/InfoItineraires.js';
import {Champs} from '../common/commonAssets.js';
import FormControlLabel from '@mui/material/FormControlLabel';
    import {setValue} from '../../../src/utility2.js';
import './confirmation_reservation.css';
import PaiementField from './applyReservation/PaiementField';
import { is } from 'date-fns/locale';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

function ApplyReservation(props){
    const history = useHistory();
    const [reservation, setReservation] = useState(null);
    const { _id } = useParams();
    const [reservateur, setReservateur] = useState({prenom:"",nom: "", email: "", tel: "", messageParticulier: "",numeroCarte:"",expirationCarte:"",ccvCarte:"",nomCarte:""});
    const [user, setUser] = useState({mdp : "",confirmMdp:""});
    const [openLoad, setOpenLoad] = useState(true);
    const [errorEmpty, setErrorEmpty] = useState({prenom:false,nom: false, email: false, tel: false, messageParticulier: false,numeroCarte:false,expirationCarte:false,ccvCarte:false,nomCarte:false,});

    const [alertSuccess, setAlertSuccess] = useState(null);
    const [alertError, setAlertError] = useState(null);
    const [affilie, setAffilie] = useState([]);
    const [isEditEnabled, setIsEditEnabled] = useState(true);
    const [isConnectionShowing, setIsConnectionShowing] = useState(false);
    const [isConditionAccepted, setIsConditionAccepted] = useState(false);
    const [conditionError, setConditionError] = useState(false);

    
    function handleResponse(res){
        console.log(res);
        setOpenLoad(false);
        if(res.status === 200){
            setAlertSuccess(res.message);
            
            window.location.href = "/reservation/" + _id + "/voucher";
        }else{
            try{setAlertError(res.errors[0].message)}catch(err){}
            
            window.location.href = '#error';
        }
    }
    

    function validerReservation(){
        if(isConditionAccepted){
            console.log(reservation);
            setOpenLoad(true);
            setAlertSuccess(null);
            setAlertError(null);
            callAPI('post', '/reservation/applyWithEmail', {_id: reservation._id, reservateur: reservateur, reservation: reservation}, handleResponse );
        }else{
            setConditionError(true);
            window.location.href = '#conditions';
        }
     
    }

    function setDetailReservation(res){
        setOpenLoad(false);
        console.log(res);
        if(res.status === 200){
            try{
                let current = JSON.parse(JSON.stringify(res.reservation));
                let tempAffilie = [];
                for(let i = 0; i < current.itineraires.length; i++){
                    tempAffilie.push(false);
                    const a = i;
                    for(let u = 0; u < current.itineraires[i].tarifReserves.length; u++){
                        const b = u;
                        if(current.itineraires[a].tarifReserves[b] != undefined){
    
                            let nbEnfant = current.itineraires[a].tarifReserves[b].guests.nbEnfant;
                            try{
                                nbEnfant = Number.parseInt(nbEnfant);
                            }catch(err){}
                            
                            let nbAdulte = current.itineraires[a].tarifReserves[b].guests.nbAdulte;
                            try{
                                nbAdulte = Number.parseInt(nbAdulte);
                            }catch(err){}
                            
                            const max = nbEnfant + nbAdulte;
                        }
                    }
                }
                setReservation(current);
                setAffilie(tempAffilie);
                if(res.reservation.reservateur != undefined){
                    setReservateur(res.reservation.reservateur);
                }
            }catch(err){
                console.log(err);
            }
        }else{
            console.log(res.errors[0].message);
            setAlertError(res.errors[0].message);
        }
    }

    useEffect(() => {
        callAPI('get', '/reservation/details/' + _id, {}, setDetailReservation);
    }, [_id]);

    function generatePDF(){
        //ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
        //callAPI('post', '/reservation/apply', {_id: _id, email: "ravaka@yopmail.com"}, setMessage);
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
    function quickConnection(event){
        setIsConnectionShowing(!isConnectionShowing);
    }
    function conditionAccepted(event){
        if(!isConditionAccepted){
            setConditionError(false);
        }
        setIsConditionAccepted(!isConditionAccepted);
    }

    function handleChangeInfoUser(field, value){
        let current = JSON.parse(JSON.stringify(user));
        current[field] = value;
        setUser(current);
    }

    return (
        <>
            {(reservation !== null) ? 
                <div id="content" style={{filter: "blur(" + (openLoad ? "2" : "0") + "px)"}}>
                    <Box sx={{ bgcolor: 'background.paper', maxWidth: 800, margin: "0 auto"
                    , padding: "15px 15px"}}>
                        {/* <h1>Détails réservation</h1> */}
                        <button class="btn button_btn button_secondary button_sm" datatest="Button"><span>CONNECTER-VOUS POUR RÉSERVER RAPIDEMENT</span></button>
                        {alertSuccess != null ? 
                            <div id="success">
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="success">{alertSuccess}</Alert>
                                </Stack>
                            </div> : null
                        }
                        {alertError != null ?
                            <div id="error">
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">{alertError}</Alert>
                                </Stack>
                            </div> : null
                        }
                        <div class="infos_contact">
                            <div class="infos_contact_header">
                                <h2 class="infos_heading">Informations de contact</h2>
                                {isEditEnabled ?
                                <span class="required-field-indicator-message_container">
                                    <span><span class="required-field-indicator-message_required">*</span> Obligatoire</span>
                                </span> : null
                                }
                            </div>
                            <Box>
                                {isEditEnabled ?
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
                                        <h2 class="infos_heading"><span>Réserver plus rapidement (en option)</span></h2>
                                        
                                        <div class="inscription_quick">
                                            <input type="checkbox" id="inscription_quick" name="scales" 
                                                    checked={isConnectionShowing} onChange={quickConnection}/>
                                            <label for="scales">J'aimerais créer un compte.</label>
                                        </div>
                                        {isConnectionShowing ?
                                            <div class="password_quick">
                                                    <div class="input-field">
                                                        <input type="password" required />
                                                            <label>Mot de passe <span class="red_required">*</span></label>
                                                    </div>
                                                    
                                                    <div class="input-field">
                                                        <input type="password" required />
                                                        <label>Confirmer le mot de passe <span class="red_required">*</span></label>
                                                    </div>
                                            </div>
                                        :null
                                        }
                                        
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
                        <InfoItineraires 
                            reservation={reservation} 
                            setReservation={setReservation}
                            reservateur={reservateur}
                            affilie={affilie}
                            setAffilie={setAffilie}
                            isEditEnabled={isEditEnabled}
                            openLoad={openLoad}
                            setOpenLoad={setOpenLoad}
                            isEditEnabled={isEditEnabled} />
                        <div class="infos_contact">
                            <h2 class="infos_heading">Paiement</h2>
                            <PaiementField reservation={reservation}/>
                            <Total toPay={reservation.toPay} />
                            
                        </div>
                        <div class="infos_contact" id="conditions">
                            <h2 class="infos_heading">Confirmation</h2>
                            {
                                conditionError ?   <p style={{color:'#ac0000',marginLeft:'0.8em'}}>Veuillez accepter la politique de confidentialité et les conditions de réservation.</p> :null
                            }
                          
                            <div class="inscription_quick">
                                            <input type="checkbox" id="conditions" name="scales" 
                                                    checked={isConditionAccepted} onChange={conditionAccepted}/>
                                            <label for="scales" style={{fontWeight:'normal'}}>* J'accepte la <span><a href='' style={{textDecoration:'none',color:'#587817'}}> politique de confidentialité </a> </span>.</label>
                                            
                            </div>
                            <p style={{marginLeft:'0.8rem',fontSize:14}}>En effectuant cette réservation, j'accepte les <span> <a href='' style={{textDecoration:'none',color:'#587817'}}> conditions de réservation. </a> </span> </p>
                        </div>
                        <br />
                        <div style={{display:'flex',flexDirection:'row',flexWrap:'no-wrap',justifyContent:'space-between'}}>
                            <button  style={{minWidth:250,heigth:80}}  class="btn button_btn button_pink button_sm" variant="contained" onClick={(e) => validerReservation()}>Valider réservation</button>
                       
                         </div>
                        
                       
                         
                        
                    </Box>
                </div>
                : <Stack sx={{ width: '100%' }} spacing={2}>
                    <Icon><img src="../../warning.svg" style={{width:'50%'}} ></img></Icon>
                    <Alert severity="error">{alertError}</Alert>
                </Stack>
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoad}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
                  
        </>
    );

}
export default ApplyReservation;