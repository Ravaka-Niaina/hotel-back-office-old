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
import  Navbar  from "../../partenaire/Navbar/Navbar.js";
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

export default function ListeReservation(props){
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
    const [etat, setEtat] = useState(null);
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
            value: "0",
            label: "Annulé"
        }
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [debut, setDebut] = useState("");
    const [fin, setFin] = useState("");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);

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

    function rechercher(){}

    useEffect(() => {
        
    }, []);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * nbContent - rows.length) : 0;
    let rows = [];

    return(
        <>
            <Navbar currentPage={props.currentPage}/><br/>
            <Box sx={{ width: '100%', padding :"50px" }}>
            <InputRecherche 
                debut={debut} setDebut={setDebut} 
                fin={fin} setFin={setFin}
                etat={etat} setEtat={setEtat}
                errorEtat={errorEtat} setErrorEtat={setErrorEtat}
                arrayEtat={arrayEtat} setArrayEtat={setArrayEtat} />
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
                                {
                                    Object.keys(row).map(k => {
                                        return(
                                            <>
                                                {
                                                k === "_id" ? null :
                                                <TableCell
                                                  component="td"
                                                  align = "left"
                                                >
                                                  { 
                                                    typeof(row[k]) === "object" ? 
                                                    row[k].map(elt => {
                                                      return(<li>{elt}</li>);
                                                    })
                                                    : <>{row[k]} </>
                                                  }
                                                </TableCell>
                                            }
                                            </>
                                        );
                                    })
                                }
                                <TableCell align="rigth">
                                    <Link to={props.urlEdit + row._id}>
                                        <HtmlTooltip title="Editer"> 
                                            <EditIcon style={{color : "green"}} />
                                        </HtmlTooltip> 
                                    </Link >
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