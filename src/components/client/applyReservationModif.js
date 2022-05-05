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
import InfoItineraires from './applyReservation/InfoItinerairesModif.js';
import {Champs} from '../common/commonAssets.js';
import FormControlLabel from '@mui/material/FormControlLabel';
import {setValue} from '../../utility2.js';
import './confirmation_reservation.css';
import PaiementField from './applyReservation/PaiementFieldModif';
import { is } from 'date-fns/locale';
import ModalAnnulationChambre from '../common/ModalAnnulationChambre.js';
import ConfirmationModif from '../common/ConfirmationModif.js'; 
import NavBarStepper from "./NavbarClient/NavBar&Stepper.js";
import Axios from 'axios';

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

function ApplyReservationModif(props){
    const history = useHistory();
    const [reservation, setReservation] = useState(null);
    const [openLoad, setOpenLoad] = useState(true);

    const { _id , numeroItineraire } = useParams();
    const [reservateur, setReservateur] = useState({prenom:"",nom: "", email: "", tel: "", messageParticulier: "",numeroCarte:"",expirationCarte:"",ccvCarte:"",nomCarte:""});
    const [user, setUser] = useState({mdp : "",confirmMdp:""});
   
    const [errorEmpty, setErrorEmpty] = useState({prenom:false,nom: false, email: false, tel: false, messageParticulier: false,numeroCarte:false,expirationCarte:false,ccvCarte:false,nomCarte:false,});

    const [alertSuccess, setAlertSuccess] = useState(null);
    const [alertError, setAlertError] = useState(null);
    const [affilie, setAffilie] = useState([]);
    const [isEditEnabled, setIsEditEnabled] = useState(true);
    const [isConnectionShowing, setIsConnectionShowing] = useState(false);
    const [isConditionAccepted, setIsConditionAccepted] = useState(false);
    const [conditionError, setConditionError] = useState(false);
    const [inputGrise, setInputGrise] = useState({prenom:false,nom: false, email: false, tel: false});

    const [load, setLoad] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalChambre, setShowModalChambre] = useState(false);
    const[ variableAnnuler , setVariableAnnuler] = useState({idReservation:'', indexItineraire :'',indexTarifsReserve : ''});
    const [indiceI , setIndice] = useState(null);

    const [showConfirmationModif , setConfModif] = useState(false);
    const[isVariableModif , setisVariableModif] = useState(false);
    const[ReservationNotUpdate , setReservationNotUpdate] = useState(null);

    const[devise, setDevise] = useState("eur");

    function showConfModif(istrue){
        if(istrue){
            localStorage.setItem('access', 1); 
            history.push("/reservation/" + _id + "/voucher/"+numeroItineraire);
        }else{
            return setConfModif(!showConfirmationModif);
        }
    }

    function setisVariableUpdate(isTrue){
        setisVariableModif(isTrue);
    }

    function AnnulationReservationChambre(){
        setLoad(true);
        const data = { _id: variableAnnuler.idReservation, indexItineraire: variableAnnuler.indexItineraire, indexTarifReserve: variableAnnuler.indexTarifsReserve };
        callAPI('post', '/reservation/delete', data, setDetailReservation1 );
    }
    
    function handleResponse(res){
        localStorage.setItem('access', 1);
        setOpenLoad(false);
        if(res.status === 200){
            setAlertSuccess(res.message);
            history.push("/reservation/" + _id + "/voucher/"+numeroItineraire);
            localStorage.setItem("access" , 1);
        }else{
            setAlertError(res.errors[0].message);
            history.push('#error');
        }
    }
    
    function ShowModalAnnulation(isTrue,ObjectChambreAnnuler){
        if(isTrue){
            setShowModal(!showModal);
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

    function ModifierReservation(){
        if(isConditionAccepted){
            setOpenLoad(true);
            setAlertSuccess(null);
            setAlertError(null);
            callAPI('post', '/reservation/updateReservation', {_id: reservation._id, numeroItineraire : numeroItineraire , reservation: reservation}, handleResponse );
        }else{
            setConditionError(true);
            window.location.href = '#conditions';
        }
     
    }

    function setDetailReservation1(res){
        console.log(res);
        if(numeroItineraire == "1"){
            if(res.reservation == null){
                setShowModalChambre(!showModalChambre);
                setAlertError(res.message);
                setReservation(res.reservation);
                setLoad(false);
            }else{
                setOpenLoad(false);
                setLoad(false);
                if(res.status == 200){
                    setReservation(res.reservation); 
                    setShowModalChambre(!showModalChambre);
                    if(res.errors.length != 0){
                        setAlertError(res.errors[0].message);
                    }
                   
                }else{
                    console.log(res.errors[0].message);
                    setAlertError(res.errors[0].message);
                    setShowModalChambre(!showModalChambre)
                }
                setShowModalChambre(!showModalChambre);
            }
            history.push('#redirect');
        }else{
            localStorage.setItem("access" , 1);
            history.push("/reservation/" + _id + "/voucher/"+numeroItineraire);
        }
    }

    function setDetailReservation(res){
        setDevise(localStorage.getItem("devise"));
        if(res.indiceI != null){
            setIndice(res.indiceI);
        }
        setOpenLoad(false);
        if(res.status == 200){
            let current = JSON.parse(JSON.stringify(res.reservation));
            
            Axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json`)
                .then((resultat) => {
                    let To = SetToDevise();
                    let rate = resultat.data.eur;
                    rate = rate[To];
                    if(To == "eur"){
                        current.toPayDevise = current.toPay; 
                    }else{
                        current.toPayDevise = current.toPay*rate; 
                        setDevise(To);
                    }
                    console.log(current);
                    setReservation(current); 
                    setReservationNotUpdate(res.reservation);
                });

        }else{
            console.log(res.errors[0].message);
            setAlertError(res.errors[0].message);
        }
    }

    function redirect(){
        history.push("/");
    }

    function changeDeviseRate(value ,info){
        setDevise(value);
        let current = {...reservation};
        let rate = info[value];
        current = changeToPay(current,rate,value);
        localStorage.setItem("devise" , value);
        setReservation(current);
    }

    function changeToPay(current,rate,value){
        if(value == "eur"){
            current.toPayDevise = current.toPay;
        }else{
            current.toPayDevise = current.toPay*rate;
        }
        for(let i = 0; i <  current.itineraires.length ; i++){
            for(let j = 0; j <  current.itineraires[i].tarifReserves.length ; j++){
                if(value == "eur"){
                    current.itineraires[i].tarifReserves[j].toPayDevise.afterProm = current.itineraires[i].tarifReserves[j].toPay.afterProm;
                }else{
                    current.itineraires[i].tarifReserves[j].toPayDevise.afterProm = current.itineraires[i].tarifReserves[j].toPay.afterProm*rate;
                }  
            }
        }
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
        if(localStorage.access !== "2"){
            history.push("/");
        }else{
            let num = "";
            if(numeroItineraire !== "1"){
                num = numeroItineraire;
            }
            callAPI('post', '/reservation/details/' , {_id , numeroItineraire : num}, setDetailReservation);
        }
    }, [_id]);


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
            {
                (reservation !== null) ? 
            <>
                <NavBarStepper access = {localStorage.access} id = {_id} indice = {1} numeroItineraire = {numeroItineraire} isConnected={true}
                    setConfModif={setConfModif} showConfModif={showConfModif} isVariableModif={isVariableModif} changeDeviseRate={changeDeviseRate} /><br/>
                <div id="content" style={{filter: "blur(" + (openLoad ? "2" : "0") + "px)"}}>
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
                        {reservation.infoEtat === null ? null : <strong>Statut réservation: {reservation.infoEtat.label} le {reservation.infoEtat.date}</strong>}
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
                                <div id="redirect">
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
                                                <label style={{marginTop : "-15px"}}>prenom <span >*</span></label>
                                                <input type="text" value={reservation.reservateur.prenom} disabled/> 
                                            </div>
                                            <div class="input-field">
                                                <label style={{marginTop : "-15px"}}>nom <span >*</span></label>
                                                <input type="text" value={reservation.reservateur.nom} disabled/> 
                                            </div>
                                            <div class="input-field">
                                                <label style={{marginTop : "-15px"}}>tel <span >*</span></label>
                                                <input type="text" value={reservation.reservateur.tel} disabled/> 
                                            </div>
                                            <div class="input-field input-email">
                                                <label style={{marginTop : "-15px"}}>email <span >*</span></label>
                                                <input type="text" value={reservation.reservateur.email} disabled/> 
                                                    <p class="infos_mail">Voici l'adresse e-mail à laquelle votre confirmation sera envoyée.</p>    
                                            </div>
                                    </Box>
                                </div>
                                   
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
                            indiceI ={indiceI} variableAnnuler={variableAnnuler}
                            setisVariableUpdate={setisVariableUpdate}
                            devise={devise}
                            />
                        <div class="infos_contact">
                            <h2 class="infos_heading">Paiement</h2>
                            <PaiementField reservation={reservation} setReservation = {setReservation} setisVariableUpdate={setisVariableUpdate} devise={devise}/>
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
                            <button  style={{minWidth:250,heigth:80}}  class="btn button_btn button_pink button_sm" variant="contained" onClick={(e) => ModifierReservation()}>Modifier réservation</button>
                        </div>
                        
                       
                         
                        
                    </Box>
                </div>
                </>
                : <Stack sx={{ width: '100%' }} spacing={2}>
                { alertError ? 
                    <>
                        <Alert severity="error"><li>{alertError} </li>
                        {
                        alertError ?
                            <>
                                { 
                                    alertError !== "Cette réservation n'existe pas ou est déjà annulée" ? 
                                    <><br/><li><span> Cette réservation n'existe pas ou est déjà annulée</span> </li> </>
                                    : ""
                                }
                            </> : "" }
                        </Alert>
                        <div style={{display:'flex',flexDirection:'row',flexWrap:'no-wrap',justifyContent:'space-between'}}>
                            <button  style={{minWidth:250,heigth:80}}  class="btn button_btn button_pink button_sm" variant="contained"
                                onClick={(e) => redirect()}>Nouvelle Réservation</button>
                        </div>
                    </>
                : null }
                </Stack>
           
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoad}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ModalAnnulationChambre ShowModalAnnulation={ShowModalAnnulation} showModal={showModalChambre} AnnulationReservationChambre = {AnnulationReservationChambre}  load ={load}  />  
                  
            <ConfirmationModif showConfirmationModif={showConfirmationModif}  showConfModif={showConfModif} load ={load}  ModifierReservation={ModifierReservation}/>  
        
        </>
    );

}
export default ApplyReservationModif;