import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

import {loadingStyle, StyledTableCell, StyledTableRow, 
    createData, rows, createPaiement, rowsPaiement, style, 
    Champs, ChampsImportant, line} from '../../common/commonAssets.js';

function Politiques(props){
    let politiques = [];
    for(let i = 0; i < props.politiques.length; i++){
        const u = i;
        politiques.push(
            <div>
                <h4>{props.politiques[u].nom}</h4> 
                <TableContainer component={Paper} sx={{ width: "400px" }}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Avant</StyledTableCell>
                            <StyledTableCell align="left">Pourcentage</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.politiques[u].datePrice ? props.politiques[u].datePrice.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell align="left">{row.date} {row.jour === "jours" ? "jours" : "heures"}</StyledTableCell>
                                <StyledTableCell align="left">{row.pourcentage}</StyledTableCell>
                            </StyledTableRow>
                        )): null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
            </div>
           
        );
       
    }
    return(
        <div>
            {/* {politiques} */}
            <div class="details_politique">
                <p>Votre carte sera débité du montant total de la réservation le jour de votre arrivée le JJ/MM/AN. </p>
                <p>Vous pouvez annuler votre réservation gratuitement avant le JJ/MM/AN à Midi. </p>
                <p> En cas d’annulation après le JJ/MM/AN à Midi, votre carte sera débité de 20%.</p>
                <p> En cas d’annulation après le JJ/MM/AN à Midi, votre carte sera débité de 50%.</p>
            </div>
            <div class="prix_reservation">

            </div>
        </div>
    );
}

export default Politiques;