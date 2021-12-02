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
import  Navbar  from "../../Navbar/Navbar";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import Total from './applyReservation/Total.js';
import InfoItineraires from './applyReservation/InfoItineraires.js';
import {loadingStyle, StyledTableCell, StyledTableRow, 
    createData, rows, createPaiement, rowsPaiement, style, 
    Champs, ChampsImportant, line} from './applyReservation/commonAssets.js';
    import {setValue} from '../../../src/utility2.js';
  
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
    const [reservation, setReservation] = useState(null);
    const { _id } = useParams();
    const [reservateur, setReservateur] = useState({nom: "", email: "", tel: "", messageParticulier: ""});
    const [openLoad, setOpenLoad] = useState(true);

    const [alertSuccess, setAlertSuccess] = useState(null);
    const [alertError, setAlertError] = useState(null);
    const [affilie, setAffilie] = useState(false);

    function handleResponse(res){
        console.log(res);
        setOpenLoad(false);
        if(res.status === 200){
            setAlertSuccess(res.message);
        }else{
            setAlertError(res.errors[0].message);
        }
        document.getElementById("content").scrollHeight = document.getElementById("content").scrollTop;
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
        try{
            let current = JSON.parse(JSON.stringify(res.reservation));
            for(let i = 0; i < current.itineraires.length; i++){
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
            if(res.reservation.reservateur != undefined){
                setReservateur(res.reservation.reservateur);
            }
        }catch(err){
            console.log(err);
        }
        
    }

    useEffect(() => {
        callAPI('get', '/reservation/details/' + _id, {}, setDetailReservation);
    }, [_id]);

    function setMessage(res){
        console.log(res);
    }

    function generatePDF(){
        //ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
        //callAPI('post', '/reservation/apply', {_id: _id, email: "ravaka@yopmail.com"}, setMessage);
    }

    function handleChangeInfoReservateur(field, value){
        let current = JSON.parse(JSON.stringify(reservateur));
        current[field] = value;
        setReservateur(current);
    }

    return (
        <>
        <div id="content" style={{filter: "blur(" + (openLoad ? "2" : "0") + "px)"}}>
            <Navbar/>
            <Box sx={{ bgcolor: 'background.paper', maxWidth: 800, margin: "0 auto"}}>
                <h1>Détails réservation</h1>
                {alertSuccess != null ? 
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="success">{alertSuccess}</Alert>
                    </Stack> : null
                }
                {alertError != null ? 
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">{alertError}</Alert>
                    </Stack> : null
                }
                <h2>Informations sur la personne qui fait la réservation</h2>
                <Box>
                    <TextField
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
                        onChange={(e) => handleChangeInfoReservateur("messageParticulier", e.target.value)} />
                </Box>
                
                <InfoItineraires 
                    reservation={reservation} 
                    setReservation={setReservation}
                    reservateur={reservateur} />
                <Total />
                <Stack direction="row" spacing={2}>
                    <Button variant="contained">Imprimer</Button>
                    <Button variant="contained">Partager</Button>
                    <Button variant="contained">Ajouter au calendrier</Button>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained">Modifier réservation</Button>
                    <Button variant="contained">Annuler réservation</Button>
                    <Button variant="contained" onClick={(e) => validerReservation()}>Valider réservation</Button>
                </Stack>
            </Box>
        </div>
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