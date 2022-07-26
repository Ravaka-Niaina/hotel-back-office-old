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
import Total from './applyReservation/Total.js';
import InfoItineraires from './applyReservation/InfoItineraires.js';
import {Champs} from '../common/commonAssets.js';
import FormControlLabel from '@mui/material/FormControlLabel';
import {setValue} from '../../../src/utility2.js';
import './confirmation_reservation.css';
import PaiementField from './applyReservation/PaiementField';
import { is } from 'date-fns/locale';
import ModalAnnulationChambre from '../common/ModalAnnulationChambre.js';
import NavBar from "./NavbarClient/Navbar.js" 
import Axios from 'axios';

import NavBarStepper from "./NavbarClient/NavBar&Stepper.js"; 


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
    const [inputGrise, setInputGrise] = useState({prenom:false,nom: false, email: false, tel: false});
    const [showResults, setShowResults] = useState(false);

    const [load, setLoad] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalChambre, setShowModalChambre] = useState(false);
    const[ variableAnnuler , setVariableAnnuler] = useState({idReservation:'', indexItineraire :'',indexTarifsReserve : ''});
    const [indiceI , setIndice] = useState(null);
    const [isCompte , setisCompte] = useState(false);

    const[devise, setDevise] = useState("eur");


    const interpretResponse = (data) => {
        if(data.status === 200){
            history.push('/front/login');
        }
    };

    const register = (e) => {
        e.preventDefault();
        if(isConnectionShowing){
            const data = {
                nom: reservateur.nom.trim(),
                prenom: reservateur.prenom.trim(),
                email: reservateur.email.trim(),
                mdp: user.mdp.trim(),
                confirmMdp: user.confirmMdp.trim()
            };
            callAPI('post', '/user/register', data, interpretResponse);
        }
    };

    function AnnulationReservationChambre(e){
        e.preventDefault();
        setOpenLoad(true);
        setLoad(true);
        const data = { _id: variableAnnuler.idReservation, indexItineraire: variableAnnuler.indexItineraire, indexTarifReserve: variableAnnuler.indexTarifsReserve ,val :true};
        callAPI('post', '/reservation/AnnuleApplyR', data, setDetailReservation1 );
    }

    function setDetailReservation1(res){
        if(res.status == 200){
            setShowModalChambre(!showModalChambre);
            setLoad(false);
            GetDetails();
            history.push('#redirect');
        }else{
            setAlertError(res.message);
            history.push('#error');
        }
         
    }
    function ShowModalAnnulation(isTrue,ObjectChambreAnnuler){
        setLoad(false);
        if(isTrue){
            setShowModal(!showModal);
            let current = {...variableAnnuler};
            variableAnnuler["idReservation"]='';
            current["indexItineraire"]='';
            current["indexTarifsReserve"]='';
            setVariableAnnuler(current);

            setLoad(false);
        }else{
            setShowModalChambre(!showModalChambre)
            let keys = Object.keys(ObjectChambreAnnuler);
            let current = {...variableAnnuler};
            keys.map(field => {
                current[field] = ObjectChambreAnnuler[field];
            })
            setVariableAnnuler(current);
        }

    }
    
    function handleResponse(res){
        setOpenLoad(false);
        if(res.status === 200){
            localStorage.setItem('access', 1);
            setAlertSuccess(res.message);
            history.push("/reservation/" + _id + "/voucher");
        }else{
            setAlertError(res.errors[0].message);
            history.push('#error');
        }
    }
    

    function validerReservation(){
        if(isConditionAccepted){
            setOpenLoad(true);
            setAlertSuccess(null);
            setAlertError(null);
            const data = {_id: reservation._id, reservateur: reservateur, reservation: reservation};
            callAPI('post', '/reservation/applyWithEmail', data, handleResponse );
        }else{
            setConditionError(true);
            window.location.href = '#conditions';
        }
    }

    function setDetailReservation(res){
        console.log(res);
        setOpenLoad(false);
        if(res.reservation == null){
            setOpenLoad(false);
            history.push("/")
        }
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
                //ilai function rate 
                console.log(current);

                Axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json`)
                .then((resultat) => {
                    let To = SetToDevise();
                    let rate = resultat.data.eur;
                    rate = rate[To];
                    if(To == "eur"){
                        current.toPayDevise = current.toPay; 
                    }else{
                        console.log(current);
                        current = changeToPay(current,rate,To,false);
                        setDevise(To);
                    }
                      
                    setReservation(current);
                    setAffilie(tempAffilie); 
                });
              
                

                if(res.reservation.reservateur != undefined){
                    setisCompte(true);
                    setReservateur(res.reservation.reservateur);
                }

                if(res.reservateur.nom !== ""){
                    let objectKeys = Object.keys(res.reservateur);
                    let grise = {...inputGrise};
                    let currentReservateur = {...reservateur};
                    for(let i = 0 ; i < objectKeys.length ; i++){
                        if(res.reservateur[objectKeys[i]] !== ""){
                            grise[objectKeys[i]] = true;
                            currentReservateur[objectKeys[i]] = res.reservateur[objectKeys[i]];
                        }
                    }
                    setInputGrise(grise);
                    setReservateur(currentReservateur);
                }

            }catch(err){
                console.log(err);
            }
        }else{
            setAlertError(res.errors[0].message);
        }
    }
    function ControllerAcces(){
        if(localStorage.access !== "2"){
            history.push("/");
            return false;
        }else{
            return true;
        }
        
    }

    function GetDetails(){
       return callAPI('get', '/reservation/details/' + _id, {}, setDetailReservation);
    }

    function changeDeviseRate(value ,info){
        setDevise(value);
        let current = {...reservation};
        let rate = info[value];
        if(value == "eur"){
            current = changeToPay(current,rate,value,true);
        }else{
            current = changeToPay(current,rate,value,false);
        }
        console.log(current);
        localStorage.setItem("devise" , value);
        setReservation(current);
    }

    function changeToPay(current,rate,value,isEuro){
        console.log(current);
        for(let i = 0; i <  current.itineraires.length ; i++){
            for(let j = 0; j <  current.itineraires[i].tarifReserves.length ; j++){
                if(isEuro){
                    current.toPayDevise = current.toPay;
                    current.itineraires[i].tarifReserves[j].toPayDevise.afterProm = current.itineraires[i].tarifReserves[j].toPay.afterProm;
                }else{
                    current.toPayDevise = current.toPay*rate;
                    current.itineraires[i].tarifReserves[j].toPayDevise.afterProm = current.itineraires[i].tarifReserves[j].toPay.afterProm*rate;
                }
            }
        }
        console.log(current);

        return current;
    }

    function SetToDevise(){
        let devise = localStorage.getItem("devise");
        if(!devise){
            devise = "eur"
        }
        return devise;
    }


    useEffect(() => {
        let acceSs = ControllerAcces();
        if(acceSs){
            GetDetails();
        }
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

    function handleChangeInfoUser(field, value){
        let current = JSON.parse(JSON.stringify(user));
        current[field] = value;
        setUser(current);
    }

    return (
        <>
            {(reservation !== null) ? 
                <div id="content" style={{filter: "blur(" + (openLoad ? "2" : "0") + "px)"}}>
                    <NavBarStepper access = {localStorage.access} id = {_id} indice = {1} changeDeviseRate={changeDeviseRate}/><br/>
                    <Box sx={{ bgcolor: 'background.paper', maxWidth: 800, margin: "0 auto"
                    , padding: "15px 15px"}}>
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
                                                {
                                                    inputGrise.prenom ?  
                                                        <input type="text" value={reservateur.prenom} disabled/> 
                                                    : <>
                                                    <input type="text" value={reservateur.prenom}
                                                        onChange={(e) => handleChangeInfoReservateur("prenom", e.target.value)} 
                                                        onBlur={(e) => handleEmptyInfoReservateur("prenom")} required desabled/>
                                                        <label>Prénom <span class="red_required">*</span></label>
                                                        {
                                                            errorEmpty.prenom ?
                                                            <div class="error_text">
                                                                Le prénom est obligatoire.
                                                            </div>
                                                            :null
                                                        }
                                                         </>
                                                }
                                                        
                                                </div>
                                                <div class="input-field">
                                                {
                                                    inputGrise.nom ?  
                                                        <input type="text" value={reservateur.nom} disabled/> 
                                                    :<>
                                                    <input type="text" value={reservateur.nom} 
                                                        onBlur={(e) => handleEmptyInfoReservateur("nom")}
                                                         onChange={(e) => handleChangeInfoReservateur("nom", e.target.value)} required />
                                                         <label>Nom <span class="red_required">*</span></label>
                                                        {
                                                            errorEmpty.nom ?
                                                            <div class="error_text">
                                                                Le nom est obligatoire.
                                                            </div>
                                                            :null
                                                        }
                                                        </>
                                                }
                                                        
                                                </div>
                                                <div class="input-field">
                                                    
                                                    <input type="text" value={reservateur.tel}
                                                            onChange={(e) => handleChangeInfoReservateur("tel", e.target.value)} required />
                                                        <label>Téléphone pendant la journée</label>
                                                </div>
                                                <div class="input-field input-email">
                                                    {
                                                        inputGrise.email ?  
                                                            <input type="text" value={reservateur.email} disabled/> 
                                                        : <>
                                                            <input type="text" value={reservateur.email} 
                                                                onBlur={(e) => handleEmptyInfoReservateur("email")}
                                                                onChange={(e) => handleChangeInfoReservateur("email", e.target.value)} required />
                                                            <label>Adresse e-mail <span class="red_required">*</span></label>
                                                            {
                                                                errorEmpty.email ?
                                                                <div class="error_text">
                                                                    L'adresse e-mail est obligatoire.
                                                                </div>
                                                                :null
                                                            }
                                                        </>
                                                    }
  
                                                     <p class="infos_mail">Voici l'adresse e-mail à laquelle votre confirmation sera envoyée.</p>    
                                                </div>

                                                
                                        </Box>
                                        {
                                            isCompte ? "" : <>
                                                 <hr style={{marginLeft:'0.8em'}}></hr>
                                                <h2 class="infos_heading"><span>Réserver plus rapidement (en option)</span></h2>
                                                
                                                <div class="inscription_quick">
                                                    <input type="checkbox" id="inscription_quick" name="scales" 
                                                            checked={isConnectionShowing} onChange={quickConnection}/>
                                                    <label for="scales">J'aimerais créer un compte.</label>
                                                </div>
                                            </>
                                        }
                                       
                                        {isConnectionShowing ?
                                            <div class="password_quick">
                                                    <div class="input-field">
                                                        <input type="password" required 
                                                        value={reservateur.mdp}
                                                        onChange={(e) => handleChangeInfoUser("mdp", e.target.value)} />
                                                            <label>Mot de passe <span class="red_required">*</span></label>
                                                    </div>
                                                    
                                                    <div class="input-field">
                                                        <input type="password" required
                                                        value={reservateur.confirmMdp}
                                                        onChange={(e) => handleChangeInfoUser("confirmMdp", e.target.value)} />
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
                            ShowModalAnnulation={ShowModalAnnulation}
                            devise={devise} />
                        <div class="infos_contact">
                            <h2 class="infos_heading">Paiement</h2>
                            <PaiementField reservation={reservation} reservateur={reservateur} setReservateur ={setReservateur} devise={devise}/>
                            <Total toPay={reservation.toPayDevise} devise={devise}/>
                            
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
                            
                                <button  style={{minWidth:250,heigth:80}}  class="btn button_btn button_pink button_sm" variant="contained" onClick={(e) => {validerReservation();register(e);}}>Valider réservation</button>
                                
                         </div>
                    </Box>
                </div>
                :<> {
                    alertError ? <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">{alertError}</Alert>
                    </Stack>: ""
                }</>
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoad}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ModalAnnulationChambre ShowModalAnnulation={ShowModalAnnulation} showModal={showModalChambre} AnnulationReservationChambre = {AnnulationReservationChambre}  load ={load}  />  
        
                  
        </>
    );

}
export default ApplyReservation;