
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const loadingStyle = {
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

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

export function createData(_id, nom, jours, prix) {
    return { _id, nom, prix, jours };
}
  
export const rows = [
createData(1, 'Politique 1', 30, 10),
createData(2, 'Politique 1', 20, 30),
createData(3, 'Politique 1', 10, 70)
];

export function createPaiement(_id, datePaiement, montant){
    return{_id, datePaiement, montant};
}
export const rowsPaiement = [
    createPaiement(1, '2021-01-01', 150),
    createPaiement(2, '2021-01-05', 80.5),
    createPaiement(3, '2021-02-13', 225),
];

export const style = {
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

export function Champs(props){
    return(
        <div style={{width:"fit-content", float: "left", margin: "5px 10px", minWidth: "200px"}}>
            <p style={{width:"fit-content", marginBottom: "0"}}>
                <span style={{color: "#6B6B6B", fontSize: "14px"}}>{props.label}:</span>
            </p>
            <p><span style={{width:"fit-content", fontSize: "16px"}}>{props.value}</span></p>
        </div>
    );
}

export function ChampsImportant(props){
    return(
        <div style={{width:"fit-content", float: "left", margin: "5px 10px", minWidth: "200px"}}>
            <p style={{width:"fit-content", marginBottom: "0"}}>
                <span style={{color: "#6B6B6B", fontSize: "14px"}}>{props.label}:</span>
            </p>
            <p><span style={{width:"fit-content", fontSize: "20px", fontStyle: "bold", fontWeight: "700"}}>{props.value}</span></p>
        </div>
    );
}

export const line = {overflow: "auto"};