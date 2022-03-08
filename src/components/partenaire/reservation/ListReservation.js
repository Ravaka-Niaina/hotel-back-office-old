import  {useEffect, useState}  from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
// import  Navbar  from "../../partenaire/Navbar/Navbar.js";
import  ResponsiveDrawer  from "../../partenaire/Navbar/responsive-drawer.js";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '../../../SkeletonListe/skeleton';

import callAPI from '../../../utility.js';
import FooterList from '../../common/List/FooterList.js';

import Login from '../../common/Authentification/Login.js';
import NotEnoughAccessRight from '../../common/NotEnoughAccessRight.js';
import InputRecherche from './InputRecherche.js';
import EnhancedTableHead from './EnhancedTableHead.js';
import {headCells, HtmlTooltip, descendingComparator, getComparator, stableSort} from './Dependencies.js';
import { removeSpecialCharFromDate } from '../../../utility/utilityDate.js';
import {session} from '../../common/utilitySession.js';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function ListeReservation(props){
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [dense, setDense] = useState(true);
    const [open, setOpen] = useState(false);
    const [indiceU, setId] = useState("");
    const [listResult, setListResult] = useState([]);
    const [nbContent, setNbContent] = useState(5);
    const [nbResult, setNbResult] = useState(0);
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([5, 10, 15]);
    const [currentNumPage, setCurrentNumPage] = useState(1);
    const [nbPage, setNbPage] = useState(1);
    const [etat, setEtat] = useState("");
    const [errorEtat, setErrorEtat] = useState(null);
    const [arrayEtat, setArrayEtat] = useState([
        {
            value: "",
            label: ""
        },
        {
            value: "1",
            label: "Créé"
        },
        {
            value: "2",
            label: "Validé"
        },
        {
            value: "3",
            label: "Annulé"
        }
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [debut, setDebut] = useState("");
    const [fin, setFin] = useState("");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [searchDateOfWhich, setSearchDateOfWich] = useState({checkIn: false, checkOut: false, reservation: false});
    const [isNotif, setIsNotif] = useState(false);
    const [listIdNewReserv, setListIdNewReserv] = useState([]);

    const hasARReservation = session.getInstance().hasOneOfTheseAccessRights(["listeReservation", "superAdmin"]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = rows.map((n) => n.name);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
    };

    const handleClick = (event, field , bol) => {
        setId(field);
        setOpen(bol);
      };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function rechercher(){
        let choiceDateCateg = undefined;
        let keys = Object.keys(searchDateOfWhich);
        for(let i = 0; i < keys.length; i++){
            if(searchDateOfWhich[keys[i]] === true){
                choiceDateCateg = keys[i];
                break;
            }
        }
        let toSend = {
            debut: debut,
            fin: fin,
            choiceDateCateg: choiceDateCateg,
            etat: etat !== "" ? Number.parseInt(etat) : undefined,
            listIdNewReserv: isNotif ? listIdNewReserv: undefined
        };
        callAPI('post', '/reservation/partenaire', toSend, setResult);
    }

    function setResult(data){
        setListResult(data.list);
    }
    function setResultNewReserv(data){
        setListResult(data.list);
        let tmp = [];
        for(let i = 0; i < data.list.length; i++){
            tmp.push(data.list[i]._id);
        }
        setListIdNewReserv(tmp);
    }
    let history = useHistory();
    useEffect(() => {
        if(!hasARReservation){
            history.push("/NotEnoughAccessRight");
        }else{
            const regExp = new RegExp("/notif","i");
            if(regExp.test(window.location.href)){
                setIsNotif(true);
                callAPI('post', '/notifPartenaire/newReservations', {}, setResultNewReserv);
            }else{
                callAPI('post', '/reservation/partenaire', {}, setResult);
            }
        }
    }, []);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * nbContent - rows.length) : 0;
    let rows = [];

    return(
        
        <>
            {/* <Navbar currentPage={props.currentPage}/><br/> */}
            
            <Box sx={{ width: '100%', padding :"50px" }}>
            <h1>{isNotif ? "Nouvelles réservations" : "Liste réservations"}</h1>
            <InputRecherche 
                debut={debut} setDebut={setDebut} 
                fin={fin} setFin={setFin}
                etat={etat} setEtat={setEtat}
                errorEtat={errorEtat} setErrorEtat={setErrorEtat}
                arrayEtat={arrayEtat} setArrayEtat={setArrayEtat}
                searchDateOfWhich={searchDateOfWhich}
                setSearchDateOfWich={setSearchDateOfWich}
                rechercher={rechercher} />
            {isLoading ? <Paper sx={{ width: '100%', mb: 2 }}><Skeleton /></Paper> :<>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        headCells={headCells}
                    />
                    <TableBody>
                    {
                    stableSort(listResult, getComparator(order, orderBy))
                        .slice(page * nbContent, page * nbContent + nbContent)
                        .map((row, index) => {
                        const isItemSelected = null;
                        const labelId = `enhanced-table-checkbox-${index}`;
                        
                        return (
                            <TableRow
                            onClick={(event) => handleClick(event, row._id , true)}
                            role="checkbox"
                            tabIndex={-1}
                            key={row._id}
                            >   
                                <TableCell
                                    component="td"
                                    align = "left"
                                >
                                    <ul>
                                        {row.itineraires.map(itineraire => {
                                            return(
                                                <>
                                                    <li>
                                                        {itineraire.NumeroITineraire}
                                                    </li>
                                                </>
                                            );
                                        })}
                                    </ul>
                                </TableCell>
                                <TableCell
                                    component="td"
                                    align = "left"
                                >
                                    Num reserv temp
                                </TableCell>
                                <TableCell
                                    component="td"
                                    align = "left"
                                >
                                    {row.reservateur ? row.reservateur.nom + " " + row.reservateur.prenom : ""}
                                </TableCell>
                                <TableCell
                                    component="td"
                                    align = "left"
                                >
                                    <ul>
                                        <li>Rabearisoa Miora</li>
                                        <li>Andriatsitoaina Feno</li>
                                        <li>Rabetrano Pierre</li>
                                    </ul>
                                </TableCell>
                                <TableCell
                                    component="td"
                                    align = "left"
                                >
                                    {row.dateValidation === null ? "" : removeSpecialCharFromDate(row.dateValidation)}
                                </TableCell>
                                <TableCell
                                    component="td"
                                    align = "left"
                                >
                                    <ul>
                                        {row.itineraires.map(itineraire => {
                                            return(<li>{removeSpecialCharFromDate(itineraire.dateSejour.debut)}</li>)
                                        })}
                                    </ul>
                                </TableCell>
                                <TableCell
                                    component="td"
                                    align = "left"
                                >
                                    <ul>
                                        {row.itineraires.map(itineraire => {
                                            return(<li>{removeSpecialCharFromDate(itineraire.dateSejour.fin)}</li>)
                                        })}
                                    </ul>
                                </TableCell>
                                <TableCell
                                    component="td"
                                    align = "left"
                                >
                                    <ul>
                                        {row.itineraires.map(itineraire => {
                                            return(<li>{removeSpecialCharFromDate(itineraire.nights)}</li>)
                                        })}
                                    </ul>
                                </TableCell>
                                <TableCell
                                    component="td"
                                    align = "left"
                                >
                                    {row.itineraires.map(itineraire => {
                                        return(
                                            <ul>
                                                {
                                                    itineraire.tarifReserves.map(tarif => {
                                                    return(
                                                            <li>{tarif.nomTypeChambre}</li>
                                                    );
                                                })}
                                            </ul>
                                        );
                                    })}
                                </TableCell>
                                <TableCell
                                    component="td"
                                    align = "left"
                                >
                                    {row.itineraires.map(itineraire => {
                                        return(
                                            <ul>
                                                {
                                                    itineraire.tarifReserves.map(tarif => {
                                                    return(
                                                            <li>{tarif.nomTarif}</li>
                                                    );
                                                })}
                                            </ul>
                                        );
                                    })}
                                </TableCell>
                                <TableCell
                                    component="td"
                                    align = "left"
                                >
                                    {row.etat}
                                </TableCell>
                            </TableRow>
                        );
                        })}
                    {emptyRows > 0 && (
                        <TableRow
                        style={{
                            height: (dense ? 33 : 53) * emptyRows,
                        }}
                        >
                        <TableCell colSpan={6} />
                        
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </TableContainer>
            </Paper>
            <FooterList 
              nbResult={nbResult} 
              rowsPerPageOptions={rowsPerPageOptions}
              nbContent={nbContent}
              setNbContent={setNbContent}
              currentNumPage={currentNumPage} setCurrentNumPage={setCurrentNumPage}
              nbPage={nbPage} rechercher={rechercher}
            /></>
            }
            
          </Box>
      </>
      
    
    );
}

export default function ListeReservation_(props){
    return(
        <ResponsiveDrawer 
            // title = {props.title}
            getContent = {() => ListeReservation(props)} 
        />
        
    );
};