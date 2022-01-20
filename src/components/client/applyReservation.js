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
    const [reservateur, setReservateur] = useState({nom: "", email: "", tel: "", messageParticulier: ""});
    const [openLoad, setOpenLoad] = useState(true);

    const [alertSuccess, setAlertSuccess] = useState(null);
    const [alertError, setAlertError] = useState(null);
    const [affilie, setAffilie] = useState([]);
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [isConnectionShowing, setIsConnectionShowing] = useState(false);

    function handleResponse(res){
        console.log(res);
        setOpenLoad(false);
        if(res.status === 200){
            setAlertSuccess(res.message);
            window.location.href = '#success';
        }else{
            setAlertError(res.errors[0].message);
            window.location.href = '#error';
        }
    }

    function validerReservation(){
        console.log(reservation);
        setOpenLoad(true);
        setAlertSuccess(null);
        setAlertError(null);
        callAPI('post', '/reservation/applyWithEmail', {_id: reservation._id, reservateur: reservateur, reservation: reservation}, handleResponse );
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
        current[field] = value;
        setReservateur(current);
    }
    function quickConnection(event){
        setIsConnectionShowing(!isConnectionShowing);
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
                                <span class="required-field-indicator-message_container">
                                    <span><span class="required-field-indicator-message_required">*</span> Obligatoire</span>
                                </span>
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
                                            {/* <TextField
                                                id="outlined-required"
                                                label="Nom"
                                                placeholder="dupond"
                                                value={reservateur.nom}
                                                onChange={(e) => handleChangeInfoReservateur("nom", e.target.value)} />
                                            <TextField
                                                id="outlined-required"
                                                label="Email"
                                                placeholder="dupond@gmail.com"
                                                type="email"
                                                value={reservateur.email}
                                                onChange={(e) => handleChangeInfoReservateur("email", e.target.value)} />
                                            <TextField
                                                id="outlined-required"
                                                label="Tel"
                                                placeholder="034 00 000 00"
                                                value={reservateur.tel}
                                                onChange={(e) => handleChangeInfoReservateur("tel", e.target.value)} />
                                            <TextField 
                                                label="Message particulier"
                                                placeholder="Votre message"
                                                value={reservateur.messageParticulier}
                                                onChange={(e) => handleChangeInfoReservateur("messageParticulier", e.target.value)} />         */}
                                                <div class="input-field">
                                                    <input type="text" required />
                                                        <label>Prénom <span class="red_required">*</span></label>
                                                </div>
                                                <div class="input-field">
                                                    <input type="text" required />
                                                        <label>Nom <span class="red_required">*</span></label>
                                                </div>
                                                <div class="input-field">
                                                    <input type="text" required />
                                                        <label>Téléphone pendant la journée</label>
                                                </div>
                                                <div class="input-field input-email">
                                                    <input type="text" required />
                                                        <label>Adresse e-mail <span class="red_required">*</span></label>
                                                     <p class="infos_mail">Voici l'adresse e-mail à laquelle votre confirmation sera envoyée.</p>    
                                                </div>

                                                
                                        </Box>
                                        <hr style={{marginLeft:'0.8em'}}></hr>
                                        <h2 class="infos_heading"><span>Réserver plus rapidement (en option)</span></h2>
                                        
                                        <div class="inscription_quick">
                                            <input type="checkbox" id="inscription_quick" name="scales" 
                                                    checked={isConnectionShowing} onChange={quickConnection}/>
                                            <label for="scales"></label>
                                        </div>
                                        
                                        
                                    </div>
                                    : <div>
                                        <Champs label="Nom" value={reservateur.nom.trim() !== "" ? reservateur.nom : "vide"} />
                                        <Champs label="Email" value={reservateur.email.trim() !== "" ? reservateur.email : "vide"} />
                                        <Champs label="Tel" value={reservateur.tel.trim() !== "" ? reservateur.tel : "vide"} />
                                        <Champs label="Message particulier" value={reservateur.messageParticulier.trim() != "" ? reservateur.messageParticulier : "Vide"} />
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
                            openLoad={openLoad}
                            setOpenLoad={setOpenLoad}
                            isEditEnabled={isEditEnabled} />
                        <Total toPay={reservation.toPay} />
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained">Imprimer</Button>
                            <Button variant="contained">Partager</Button>
                            <Button variant="contained">Ajouter au calendrier</Button>
                        </Stack>
                        <br />
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" onClick={(e) => setIsEditEnabled(!isEditEnabled)}>{isEditEnabled ? "Désactiver modification réservation" : "Modifier réservation"}</Button>
                            <Button variant="contained">Annuler réservation</Button>
                            <Button variant="contained" onClick={(e) => validerReservation()}>Valider réservation</Button>
                        </Stack>
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