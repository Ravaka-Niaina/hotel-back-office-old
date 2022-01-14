import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

import {StyledTableCell, StyledTableRow, 
    rows, rowsPaiement, Champs, ChampsImportant, line} from '../../../common/commonAssets.js';
import TarifReserves from './TarifReserves.js';

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
                            value="Ritsy Andriamanantsoa" />
                    </div>
                    <div style={line}>
                        <ChampsImportant label="Check in" value={props.reservation.itineraires[u].dateSejour.debut} />
                        <ChampsImportant label="Check out" value={props.reservation.itineraires[u].dateSejour.fin} />
                        <Champs label="Nombre de nuité" value={(props.reservation.itineraires[u].nights + 1) + " nights"} />
                    </div>
                    <TarifReserves 
                        indexItineraire={u}
                        reservation={props.reservation}
                        setReservation={props.setReservation}
                        reservateur={props.reservateur}
                        affilie={props.affilie}
                        setAffilie={props.setAffilie}
                        openLoad={props.openLoad}
                        setOpenLoad={props.setOpenLoad}
                        isEditEnabled={props.isEditEnabled} />
                </div>
            );
        }
    }
    

    return(
        <div>
            {itineraires}

        {/* Tsy tadidiko hoe inona ito ambany ito */}
        {/*
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
        */}
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

export default InfoItineraires;