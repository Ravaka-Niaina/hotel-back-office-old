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
            <h3>Politiques d'annulation et paiement</h3>
            {politiques}
        </div>
    );
}

export default Politiques;