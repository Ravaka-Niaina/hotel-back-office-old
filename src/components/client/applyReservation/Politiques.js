import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import {getDiffDays,addDays,dateToDDMMYYYY} from '../../client/utility.js';

import {loadingStyle, StyledTableCell, StyledTableRow, 
    createData, rows, createPaiement, rowsPaiement, style, 
    Champs, ChampsImportant, line} from '../../common/commonAssets.js';

function Politiques(props){
    let politiques = [];
    const tarif = props.tarif;
    const datedebut = new Date(tarif.dateSejour.debut);
    const datenow = new Date();
    const diff = getDiffDays(datenow,datedebut);
    console.log(datedebut);
    console.log("diff day:"+diff);
    if(diff>=15){
        let d = addDays(datedebut,-15);
        politiques.push(<p>Vous pouvez annuler votre réservation gratuitement avant le {dateToDDMMYYYY(d)} à Midi. </p>);
    }else if(diff <15 && diff >=5){
        let d = addDays(datedebut,-15);
        politiques.push(<p> En cas d’annulation après le {dateToDDMMYYYY(d)} à Midi, votre carte sera débité de 20%.</p>);
    }else if(diff<5 && diff>0){
        let d = addDays(datedebut,-5);
        politiques.push(<p> En cas d’annulation après le {dateToDDMMYYYY(d)} à Midi, votre carte sera débité de 50%.</p>);
    }else{

    }
    // for(let i = 0; i < props.politiques.length; i++){
    //     const u = i;
    //     politiques.push(
    //         <div>
    //             <h4>{props.politiques[u].nom}</h4> 
    //             <TableContainer component={Paper} sx={{ width: "400px" }}>
    //                 <Table aria-label="customized table">
    //                     <TableHead>
    //                     <TableRow>
    //                         <StyledTableCell align="left">Avant</StyledTableCell>
    //                         <StyledTableCell align="left">Pourcentage</StyledTableCell>
    //                     </TableRow>
    //                     </TableHead>
    //                     <TableBody>
    //                     {props.politiques[u].datePrice ? props.politiques[u].datePrice.map((row) => (
    //                         <StyledTableRow key={row._id}>
    //                             <StyledTableCell align="left">{row.date} {row.jour === "jours" ? "jours" : "heures"}</StyledTableCell>
    //                             <StyledTableCell align="left">{row.pourcentage}</StyledTableCell>
    //                         </StyledTableRow>
    //                     )): null}
    //                     </TableBody>
    //                 </Table>
    //             </TableContainer>
    //             <br/>
    //         </div>
           
    //     );
       
    // }
    
    return(
        <div>
            
            <div class="details_politique">
                <p>Votre carte sera débité du montant total de la réservation le jour de votre arrivée le {dateToDDMMYYYY(datedebut)}. </p>
                
                
                
                 {politiques} 
            </div>
            <div class="prix_reservation">

            </div>
        </div>
    );
}

export default Politiques;