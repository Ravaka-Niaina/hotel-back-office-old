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
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import  Navbar  from "../../Navbar/Navbar";


import axios from "axios";
import Modal from '@mui/material/Modal';

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
    border: '2px solid #000',
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

function InputTypeChambre(props){
    let inputs = [];
    console.log("index tarif = " + props.indexTarif);
    console.log(props.reservation.itineraires[props.indexItineraire].tarifReserves);
    try{
        for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.length; i++){
            const u = i;
            inputs.push(
                <div>
                    <TextField
                        id="outlined-required"
                        label={"Nom personne " + (u + 1)}
                        placeholder="Jean"
                        value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests[u].nom}
                    />
                    <TextField
                        id="outlined-required"
                        label="Adresse email 1"
                        placeholder="utilisateur@gmail.com"
                        value=""
                    />
                    <TextField
                        id="outlined-required"
                        label="Numéro de téléphone 1"
                        placeholder="+261 33 45 345 43"
                    />
                </div>
            );
        }
    }catch(err){
        console.log(err);
    }
    return inputs;
}

function InputTarifs(props){
    let tarifs = [];
    for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves.length; i++){
        const u = i;
        tarifs.push(
            <InputTypeChambre
                reservation={props.reservation}
                indexItineraire={props.indexItineraire}
                indexTarif={u} 
                inputs={props.inputs}
                setInputs={props.setInputs} />
        );  
        
    }
    return tarifs;
}

function InputUtilisateur(props){
    
    let itineraires = [];
    try{
        for(let i = 0; i < props.reservation.itineraires.length; i++){
            const u = i;
            itineraires.push(
                <InputTarifs 
                    reservation={props.reservation} 
                    indexItineraire={u}
                    inputs={props.inputs}
                    setInputs={props.setInputs} />
            );
        }
    }catch(err){/*console.log(err)*/}
    
    if(props.editable){
        return (
            <div>
                <TextField
                    id="outlined-required"
                    label={"Email utilisateur "}
                    placeholder="utilisateur@gmail.com"
                    onChange={(e) => props.setEmail(e.target.value)}
                    value={props.email}
                />
                <div>
                    {itineraires}
                </div>
            </div>
            );
        {/*
        return (<div>
            <TextField
                id="outlined-required"
                label="Nom personne 1"
                placeholder="Jean"
                value=""
            />
            <TextField
                id="outlined-required"
                label="Adresse email 1"
                placeholder="utilisateur@gmail.com"
                value=""
            />
            <TextField
                id="outlined-required"
                label="Numéro de téléphone 1"
                placeholder="+261 33 45 345 43"
            />
            <h3>Ajouter paiement</h3>
            <div style={line}>
            <TextField
                id="outlined-required"
                label="Date Paiement"
                type="datetime-local"
                defaultValue="2021-11-16"
            />
            <TextField
                id="outlined-required"
                label="Montant"
                defaultValue="350 €"
            />
            <Button variant="contained">Ajouter paiement</Button>
            </div>
            <div>
                <TextField
                    id="outlined-required"
                    label="Message"
                    placeholder="Placez ici votre message..."
                    multiline="true"
                    rows="3"
                    fullWidth="true"
                    style={{width: "400px"}}
                />
            </div>
        </div>);
        */}
    }else{
        return (
        <div>
            <div style={line}>
                <Champs label="Nom personne 1" value="Jean" />
                <Champs label="Adresse email 1" value="Jean" />
                <Champs label="Numéro de téléphone 1" value= "+261 33 45 345 43" />
            </div>
            <div style={line}>
                <Champs label="Message de l'utilisateur" value= "Voici un exemple de commentaire Voici un exemple de commentaire Voici un exemple de commentaire Voici un exemple de commentaire "/>
            </div>
        </div>);
    }
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
    for(let i = 0; i < props.tarifReserves.length; i++){
        tarifs.push(
            <div>
                <h3>Informations Hôtel</h3>
                <div style={line}>
                    <Champs label="Nom" value={props.tarifReserves[i].infoTypeChambre.infoHotel.nom} />
                    <Champs label="Adresse" value={props.tarifReserves[i].infoTypeChambre.infoHotel.adresse} />
                    <Champs label="Email" value={props.tarifReserves[i].infoTypeChambre.infoHotel.email} />
                    <Champs label="Téléphone" value={props.tarifReserves[i].infoTypeChambre.infoHotel.tel} />
                </div>
                <div style={line}>
                    <Champs label="Type chambre" value={props.tarifReserves[i].nomTypeChambre} />
                    <Champs label="Plan tarifaire" value={props.tarifReserves[i].nomTarif} />
                </div>
                <Politiques politiques={props.tarifReserves[i].infoTarif.infoPolitique} />
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
                    <TarifReserves tarifReserves={props.reservation.itineraires[u].tarifReserves} />
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
    const [inputs, setInputs] = useState(null);
    const { _id } = useParams();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const [open, setOpen] = useState(false);
    const [err, setErr] = useState(null);
    const [email, setEmail] = useState("");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    function validerReservation(){
        console.log(email);
        callAPI('post', '/reservation/applyWithEmail', {_id: reservation._id, email: email}, function(res){console.log(res);} );
    }

    function setDetailReservation(res){
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
                        current.itineraires[a].tarifReserves[b].infoGuests = [];
                        for(let v = 0; v < max; v++){
                            const c = v;
                            current.itineraires[a].tarifReserves[b].infoGuests[c] = { nom: "", email: "", tel: "" };
                        }
                    }
                }
            }
            setReservation(current);
            console.log(reservation);
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
        <div>
            <Navbar/>
            <Box style={{border: "2px solid red"}}>
                <h1>Détails réservation</h1>
                
                <Box sx={{ bgcolor: 'background.paper', maxWidth: 800, margin: "0 auto", border: "2px solid green" }}>
                    <AppBar position="static">
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        >
                        <Tab label="Itinéraires" {...a11yProps(0)} />
                        <Tab label="Utilisateurs" {...a11yProps(1)} />
                        <Tab label="Résultat" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <InfoItineraires reservation={reservation} />
                            <Total />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <InputUtilisateur 
                                editable={true} 
                                reservation={reservation}
                                inputs={inputs}
                                setInputs={setInputs}
                                email={email}
                                setEmail={setEmail} />
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <InfoItineraires reservation={reservation} />
                            <InputUtilisateur 
                                editable={false} 
                                reservation={reservation}
                                inputs={inputs}
                                setInputs={setInputs}
                                email={email}
                                setEmail={setEmail} />
                            <Total />
                            <div>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained">Imprimer</Button>
                                    <Button variant="contained">Partager</Button>
                                    <Button variant="contained">Ajouter au calendrier</Button>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained">Modifier réservation</Button>
                                    <Button variant="contained">Annuler réservation</Button>
                                    <button onClick={(e) => validerReservation()}>Valider réservation</button>
                                </Stack>
                            </div>
                        </TabPanel>
                    </SwipeableViews>
                </Box>
            </Box>
        </div>
      );

}
export default ApplyReservation;