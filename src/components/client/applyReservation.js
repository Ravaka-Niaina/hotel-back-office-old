import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import callAPI from '../../utility';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import  Navbar  from "../../Navbar/Navbar";

import {setValue} from '../../../src/utility2.js';

import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const loadingStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

function createData(_id, nom, jours, prix) {
    return { _id, nom, prix, jours };
}
  
const rows = [
createData(1, 'Politique 1', 30, 10),
createData(2, 'Politique 1', 20, 30),
createData(3, 'Politique 1', 10, 70)
];

function createPaiement(_id, datePaiement, montant){
    return{_id, datePaiement, montant};
}
const rowsPaiement = [
    createPaiement(1, '2021-01-01', 150),
    createPaiement(2, '2021-01-05', 80.5),
    createPaiement(3, '2021-02-13', 225),
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Champs(props){
    return(
        <div style={{width:"fit-content", float: "left", margin: "5px 10px", minWidth: "200px"}}>
            <p style={{width:"fit-content", marginBottom: "0"}}>
                <span style={{color: "#6B6B6B", fontSize: "14px"}}>{props.label}:</span>
            </p>
            <p><span style={{width:"fit-content", fontSize: "16px"}}>{props.value}</span></p>
        </div>
    );
}

function ChampsImportant(props){
    return(
        <div style={{width:"fit-content", float: "left", margin: "5px 10px", minWidth: "200px"}}>
            <p style={{width:"fit-content", marginBottom: "0"}}>
                <span style={{color: "#6B6B6B", fontSize: "14px"}}>{props.label}:</span>
            </p>
            <p><span style={{width:"fit-content", fontSize: "20px", fontStyle: "bold", fontWeight: "700"}}>{props.value}</span></p>
        </div>
    );
}

const line = {overflow: "auto"};
  
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
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

function handleClientInfo(reservation, indexItineraire, indexTarif, i, categPers, field, value, setReservation){
    let current = JSON.parse(JSON.stringify(reservation));
    current.itineraires[indexItineraire].tarifReserves[indexTarif].infoGuests[categPers][i][field] = value;
    setReservation(current);
}
  
function InputUtilisateur(props){
    let inputs = [];

    if(props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests == undefined
        || props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes == undefined){
            console.log("Namboarina");
        let infoGuests = {adultes: [], enfants: []};
        for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbAdulte; i++){
            infoGuests.adultes.push({nom: "", email: "", tel: ""});
        }
        for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbEnfant; i++){
            infoGuests.enfants.push({nom: "", email: "", tel: ""});
        }
        let temp = JSON.parse(JSON.stringify(props.reservation));
        temp.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests = infoGuests;
        props.setReservation(temp);
        console.log(props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests);
    }

    try{
        console.log(props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests);
        if(props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbAdulte > 0){
            inputs.push(<h5>Adultes</h5>);
        }
        for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbAdulte; i++){
            inputs.push(
                <>
                    <TextField
                        id="outlined-required"
                        label={"Nom"}
                        placeholder="Dupond"
                        value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].nom}
                        onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "adultes", "nom", e.target.value, props.setReservation)}
                    />
                    <TextField
                        id="outlined-required"
                        label={"Email"}
                        placeholder="dupond@gmail.com"
                        value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].email}
                        onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "adultes", "email", e.target.value, props.setReservation)}
                    />
                    <TextField
                        id="outlined-required"
                        label={"Tel"}
                        placeholder="034 00 000 00"
                        value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].tel}
                        onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "adultes", "tel", e.target.value, props.setReservation)}
                    />
                </>
            );
        }

        if(props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbEnfant > 0){
            inputs.push(<h5>Enfant</h5>);
        }
        for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbEnfant; i++){
            inputs.push(
                <>
                    <TextField
                        id="outlined-required"
                        label={"Nom"}
                        placeholder="Dupond"
                        value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.enfants[i].nom}
                        onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "enfants", "nom", e.target.value, props.setReservation)}
                    />
                    <TextField
                        id="outlined-required"
                        label={"Email"}
                        placeholder="dupond@gmail.com"
                        type="email"
                        value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.enfants[i].email}
                        onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "enfants", "email", e.target.value, props.setReservation)}
                    />
                    <TextField
                        id="outlined-required"
                        label={"Tel"}
                        placeholder="034 00 000 00"
                        value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.enfants[i].tel}
                        onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "enfants", "tel", e.target.value, props.setReservation)}
                    />
                </>
            );
        }
    }catch(err){

    }
    return inputs
}

function Politiques(props){
    let politiques = [];
    for(let i = 0; i < props.politiques.length; i++){
        const u = i;
        politiques.push(
            <div>
                <h4>{props.politiques[u].nom}</h4> 
                <TableContainer component={Paper}>
                    <Table sx={{ width: "400px" }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Avant</StyledTableCell>
                            <StyledTableCell align="left">Pourcentage</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.politiques[u].datePrice.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell align="left">{row.date} {row.jour === "jours" ? "jours" : "heures"}</StyledTableCell>
                                <StyledTableCell align="left">{row.pourcentage}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
            </div>
        );
    }
    return(
        <div>
            <h3>Politiques d'annulation et paiement</h3>
            {politiques}
        </div>
    );
}

function TarifReserves(props){
    let tarifs = [];
    console.log("indexItineraire = " + props.indexItineraire);
    for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves.length; i++){
        const u = i;
        tarifs.push(
            <div>
                <h3>Informations Hôtel</h3>
                <div style={line}>
                    <Champs label="Nom" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTypeChambre.infoHotel.nom} />
                    <Champs label="Adresse" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTypeChambre.infoHotel.adresse} />
                    <Champs label="Email" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTypeChambre.infoHotel.email} />
                    <Champs label="Téléphone" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTypeChambre.infoHotel.tel} />
                </div>
                <div style={line}>
                    <Champs label="Type chambre" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].nomTypeChambre} />
                    <Champs label="Plan tarifaire" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].nomTarif} />
                </div>
                <InputUtilisateur 
                    reservation={props.reservation}
                    setReservation={props.setReservation}
                    indexItineraire={props.indexItineraire}
                    indexTarif={u}/>
                <Politiques politiques={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTarif.infoPolitique} />
            </div>
            
        );
    }
    return tarifs;
}

function InfoItineraires(props){
    let itineraires = [];
    if(props.reservation != null){
        for(let i = 0; i < props.reservation.itineraires.length; i++){
            const u = i;
            itineraires.push(
                <div>
                    <h2>Informations itinéraire {u + 1}</h2>
                    <div style={line}>
                        <Champs 
                            label={"Numéro de réservation " + (u + 1)} 
                            value={props.reservation.itineraires[u].num === undefined ? "Vide" : props.reservation.itineraires[u].num } />
                        <Champs 
                            label="Nom client" 
                            value="Ratefiarivony Ravaka" />
                        <button>Celui qui séjourne dans la chambre est celui qui a fait la réservation</button>
                    </div>
                    <div style={line}>
                        <ChampsImportant label="Check in" value={props.reservation.itineraires[u].dateSejour.debut} />
                        <ChampsImportant label="Check out" value={props.reservation.itineraires[u].dateSejour.fin} />
                        <Champs label="Nombre de nuité" value="2 nuits" />
                    </div>
                    <TarifReserves 
                        indexItineraire={u}
                        reservation={props.reservation}
                        setReservation={props.setReservation} />
                </div>
            );
        }
    }
    

    return(
        <div>
            {itineraires}
        <h3>Nom tarif</h3>
        <TableContainer component={Paper}>
            <Table sx={{ width: 400 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="left">Jours</StyledTableCell>
                    <StyledTableCell align="left">Prix</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row._id}>
                        <StyledTableCell align="left">{row.jours}</StyledTableCell>
                        <StyledTableCell align="left">{row.prix}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <h3>Paiements</h3>
        <TableContainer component={Paper}>
            <Table sx={{ width: 400 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="left">Date paiement</StyledTableCell>
                    <StyledTableCell align="left">Montant</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {rowsPaiement.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell align="left">{row.datePaiement}</StyledTableCell>
                            <StyledTableCell align="left">{"€ " +row.montant}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    <StyledTableRow key="total" style={{backgroundColor: "yellow"}}>
                    <StyledTableCell align="left"><strong>Total</strong></StyledTableCell>
                    <StyledTableCell align="left"><strong>€ 450</strong></StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}

function Total(props){
    return(
        <div style={line}>
            <ChampsImportant label="Prix total" value="€ 200" />
        </div>
    ); 
}

function ApplyReservation(props){
    const [reservation, setReservation] = useState(null);
    const { _id } = useParams();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const [open, setOpen] = useState(false);
    const [err, setErr] = useState(null);
    const [email, setEmail] = useState("");
    const [openLoad, setOpenLoad] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    function validerReservation(){
        console.log(reservation);
        callAPI('post', '/reservation/applyWithEmail', {_id: reservation._id, email: email, reservation: reservation}, function(res){console.log(res);} );
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
            if(res.reservation.emailUtilisateur != undefined){
                setEmail(res.reservation.emailUtilisateur);
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

    return (
        <>
        <div style={{filter: "blur(" + (openLoad ? "2" : "0") + "px)"}}>
            <Navbar/>
            <Box sx={{ bgcolor: 'background.paper', maxWidth: 800, margin: "0 auto"}}>
                <h1>Détails réservation</h1>
                <TextField
                    id="outlined-required"
                    label="Email utilisateur"
                    placeholder="dupond@gmail.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <InfoItineraires reservation={reservation} setReservation={setReservation} />
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