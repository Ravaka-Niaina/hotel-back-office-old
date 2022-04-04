import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const tmpHeadCells = [
    [ "numItineraire", "numero itineraire" ],
    [ "numReservation", "numero de reservation" ],
    [ "infoReservateur", "Infos reservateur" ],
    [ "infoOccupant", "Infos occupant" ],
    [ "dateReserv", "date de reservation" ],
    [ "checkIn", "date d'arrivee" ],
    [ "checkOut", "date de depart" ],
    [ "nbNuitee", "nombre de nuitee" ],
    [ "chambre", "chambre" ],
    [ "tarifs", "tarifs" ],
    [ "status", "Statut" ]
];
export let headCells = [];
for(let i = 0; i < tmpHeadCells.length; i++){
    headCells.push({
        id: tmpHeadCells[i][0],
        numeric: false,
        disablePadding: false,
        label: tmpHeadCells[i][1]
    });
}

export const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
}));

export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}