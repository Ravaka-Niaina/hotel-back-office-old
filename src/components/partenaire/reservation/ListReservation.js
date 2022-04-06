import * as React from 'react';
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
import Iconify from '../../../comp/Iconify';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Toolbar, IconButton } from '@mui/material';

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
import Card from '@mui/material/Card';

import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 200,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
  }));


  function CollapsibleTable() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

function Rows(props){
    {
        stableSort(props.listResult, getComparator(props.order, props.orderBy))
            .slice(props.page * props.nbContent, props.page * props.nbContent + props.nbContent)
            .map((row, index) => {
            const isItemSelected = null;
            const labelId = `enhanced-table-checkbox-${index}`;
            
            return(
                <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => props.setIsOpen(!props.isOpen)}
                        >
                        {props.isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.etat}
                    </TableCell>
                    <TableCell align="right">{row.reservateur}</TableCell>
                    <TableCell align="right">{row.dateValidation}</TableCell>
                </TableRow>

                <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={props.isOpen} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        Itineraires
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Numero Itineraire</TableCell>
                            <TableCell>Date d'arrivee</TableCell>
                            <TableCell align="right">Date de depart</TableCell>
                            <TableCell align="right">Nombre de nuit</TableCell>
                            <TableCell align="right">Type des chambres</TableCell>
                            <TableCell align="right">Nom des Tarifs</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            row.itineraires.map(itineraire =>(
                            <TableRow key={itineraire.NumeroITineraire}>
                              <TableCell component="th" scope="row">
                                {itineraire.NumeroITineraire} 
                              </TableCell>
                              <TableCell>
                                  {removeSpecialCharFromDate(itineraire.dateSejour.debut)}
                              </TableCell>
                              <TableCell align="right">
                                  {removeSpecialCharFromDate(itineraire.dateSejour.fin)}
                              </TableCell>
                              <TableCell align="right">
                                  {removeSpecialCharFromDate(itineraire.nights)}
                              </TableCell>
                              <TableCell align="right">
                                <ul>
                                    {
                                        itineraire.tarifReserves.map(tarif => {
                                        return(
                                                <li>{tarif.nomTypeChambre}</li>
                                        );
                                    })}
                                </ul>
                              </TableCell>
                              <TableCell>
                                <ul>
                                    {
                                        itineraire.tarifReserves.map(tarif => {
                                        return(
                                                <li>{tarif.nomTarif}</li>
                                        );
                                    })}
                                </ul>
                              </TableCell>
                            </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
              </>
            );
            
        })}
        {props.emptyRows > 0 && (
            <TableRow
            style={{
                height: (props.dense ? 33 : 53) * props.emptyRows,
            }}
            >
            <TableCell colSpan={6} />
            
            </TableRow>
        )}
}

function ListeReservation(props){
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [dense, setDense] = useState(true);
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
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

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const cliquer = (event, index) => {
        console.log("curIndex "+index)
        // setAnchorEl(event.currentTarget);
        setCurrentIndex(index);
        setIsOpen(!isOpen)
    };

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
        console.log(toSend);
        callAPI('post', '/reservation/partenaire', toSend, setResult);
    }

    function setResult(data){
        console.log(data);
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
            
            
            <Paper sx={{ width: '100%', mb: 2, borderRadius: 5, mt:3  }}>
                <Card sx={{ borderRadius: 5 }}>

                    <RootStyle>
                    <InputRecherche 
                        debut={debut} setDebut={setDebut} 
                        fin={fin} setFin={setFin}
                        etat={etat} setEtat={setEtat}
                        errorEtat={errorEtat} setErrorEtat={setErrorEtat}
                        arrayEtat={arrayEtat} setArrayEtat={setArrayEtat}
                        searchDateOfWhich={searchDateOfWhich}
                        setSearchDateOfWich={setSearchDateOfWich}
                        rechercher={rechercher} 
                    />
                    { isLoading ? <Skeleton /> :<> </> }
                    
                    </RootStyle>

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
                                
                                return(
                                    <>
                                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                        <TableCell>
                                            <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={(e) => cliquer(e, index)}
                                            >
                                            {isOpen && currentIndex === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        
                                        <TableCell align = "left">
                                            {
                                                row.reservateur != null ? row.reservateur.nom + " " + row.reservateur.prenom : "pas de reservateur"
                                            }
                                        </TableCell>
                                        <TableCell align = "left">
                                            {
                                                row.dateValidation != null ? row.dateValidation : "pas validee"
                                            }
                                        </TableCell>
                                        <TableCell align = "left">
                                            {
                                                row.etat != null ? row.etat : "pas d'etat"
                                            }
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    {
                                        currentIndex == index ?

                                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                        <Typography variant="h6" gutterBottom component="div">
                                            Itineraires
                                        </Typography>
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell>Numero Itineraire</TableCell>
                                                <TableCell>Date d'arrivee</TableCell>
                                                <TableCell align="right">Date de depart</TableCell>
                                                <TableCell align="right">Nombre de nuit</TableCell>
                                                <TableCell align="right">Type des chambres</TableCell>
                                                <TableCell align="right">Nom des Tarifs</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {
                                                row.itineraires.map(itineraire =>(
                                                <TableRow key={itineraire.NumeroITineraire}>
                                                <TableCell component="th" scope="row">
                                                    {itineraire.NumeroITineraire} 
                                                </TableCell>
                                                <TableCell>
                                                    {removeSpecialCharFromDate(itineraire.dateSejour.debut)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {removeSpecialCharFromDate(itineraire.dateSejour.fin)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {removeSpecialCharFromDate(itineraire.nights)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <ul>
                                                        {
                                                            itineraire.tarifReserves.map(tarif => {
                                                            return(
                                                                    <li>{tarif.nomTypeChambre}</li>
                                                            );
                                                        })}
                                                    </ul>
                                                </TableCell>
                                                <TableCell>
                                                    <ul>
                                                        {
                                                            itineraire.tarifReserves.map(tarif => {
                                                            return(
                                                                    <li>{tarif.nomTarif}</li>
                                                            );
                                                        })}
                                                    </ul>
                                                </TableCell>
                                                </TableRow>
                                                ))
                                            }
                                            </TableBody>
                                        </Table>
                                        </Box>
                                    </Collapse>
                                    :null}
                                    </TableCell>
                                </TableRow>
                                
                                </>
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
                </Card>
            </Paper>
            <FooterList 
              nbResult={nbResult} 
              rowsPerPageOptions={rowsPerPageOptions}
              nbContent={nbContent}
              setNbContent={setNbContent}
              currentNumPage={currentNumPage} setCurrentNumPage={setCurrentNumPage}
              nbPage={nbPage} rechercher={rechercher}
            />
            
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