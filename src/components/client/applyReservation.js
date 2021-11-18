import { id } from 'date-fns/locale';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
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

function InputUtilisateur(props){
    let infoUsers = null;
    if(props.editable){
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

function InfoItineraires(props){

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
    return(
        <div>
        <h2>Informations Hôtel</h2>
        <div style={line}>
            <Champs label="Nom" value="Ravaka" />
            <Champs label="Adresse" value="Antananarivo" />
            <Champs label="Email" value="colbert@gmail.com" />
            <Champs label="Téléphone" value="034 50 456 78" />
        </div>
        <h2>Informations itineraires</h2>
        <div style={line}>
            <Champs label="Numéro de réservation" value="29384989" />
            <Champs label="Nom client" value="Ratefiarivony Ravaka" />
            <button>Celui qui séjourne dans la chambre est celui qui a fait la réservation</button>
        </div>
        <div style={line}>
            <Champs label="Type chambre" value="Type 1" />
            <Champs label="Plan tarifaire" value="Plan 1" />
        </div>
        <div style={line}>
            <ChampsImportant label="Check in" value="2021-11-16" />
            <ChampsImportant label="Check out" value="2021-11-16" />
            <Champs label="Nombre de nuité" value="2 nuits" />
        </div>
        <h3>Nom Politique d'annulation</h3>
        <TableContainer component={Paper}>
            <Table sx={{ width: "400px" }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="left">Jours</StyledTableCell>
                    <StyledTableCell align="left">Débit</StyledTableCell>
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
    const history = useHistory();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    function setDetailReservation(res){
        console.log(res);
        setReservation(res.reservation);
    }

    useEffect(() => {
        callAPI('get', '/reservation/details/' + _id, {}, setDetailReservation);
    }, [_id]);

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
                            <InfoItineraires />
                            <Total />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <InputUtilisateur editable={true} />
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <InfoItineraires />
                            <InputUtilisateur editable={false} />
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