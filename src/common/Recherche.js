import  React,{useEffect}  from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import GETaPI from "../APiGet.js";
import  Navbar  from "../Navbar/Navbar";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import EditIcon from '@mui/icons-material/Edit';
import Pagination from './Pagination.js';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { HTML5_FMT } from 'moment';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Skeleton from '../SkeletonListe/skeleton';

import callAPI from '../utility.js';

const moment = require('moment');

  const HtmlTooltip = styled(({ className, ...props }) => (
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

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
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

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow style={{backgroundColor :"#F6F8FC",color:'white'}}>
          {props.headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'left' : 'center'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function Recherche(props){
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = 
      React.useState(props.rowsPerPageOptions ? props.rowsPerPageOptions[0] : 5);
    const [list, setList] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [indiceU, setId] = React.useState("");
    const [listResult, setListResult] = React.useState([]);
    const [headCells, setHeadCells] = React.useState([]);
    const [toSearch, setToSearch] = React.useState("");
    const [currentNumPage, setCurrentNumPage] = React.useState(1);
    const [nbPage, setNbPage] = React.useState(1);
    const [nbContent, setNbContent] = React.useState(props.nbContent);
    const [rowsPerPageOptions, setRowsPerPageOptions] = 
      React.useState(props.rowsPerPageOptions ? props.rowsPerPageOptions : [5, 10, 15]);

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

    const rearrangeCells = (data) => {
      let toPrint = [];
      data.list.map(row => {
        let temp = {};
        props.fieldsToPrint.map(infoField => {
          temp[infoField.field] = row[infoField.field];
          if(infoField.type === "Date"){
            temp[infoField.field] = moment(temp[infoField.field]).format('YYYY-MM-DD');
          }
        });
        toPrint.push(temp);
      });
      data.list = toPrint;
    }

    const rechercher = (numPage, providedNbContent) => {
        let valuesToSearch = [];
        let cleanValue = toSearch.trim();
        if(cleanValue !== ""){
            valuesToSearch = [
                { "value": cleanValue, "fields": props.fieldsToSearch },
            ];
        }
        let fieldsToPrint = [];
        props.fieldsToPrint.map(infoField => {
          fieldsToPrint.push(infoField.field);
        });
        const data = {
            "tableName": props.tableName,
            "valuesToSearch": valuesToSearch,
            "fieldsToPrint": fieldsToPrint,
            "nbContent": providedNbContent ? providedNbContent : nbContent,
            "numPage": numPage
        };
        callAPI(props.method ? props.method : "post", props.urlSearch, data, (data) => {
            rearrangeCells(data);
            setListResult(data.list);
            setNbPage(data.nbPage);
        });
    };

    useEffect(() => {

        rechercher(1);
        let temp = [];
        props.fieldsToPrint.map(infoField => {
          if(infoField.field !== "_id"){
            temp.push({
              id: infoField.field,
              numeric: infoField.type === "Integer" || infoField.type === "Float" ? true : false,
              disablePadding: false,
              label: infoField.label
            });
          }
        });
        temp.push({
          id: "actions",
          numeric: false,
          disablePadding: false,
          label: "Actions"
        });
        setHeadCells(temp);
    }, []);

    const suppression = (e,id, nom) => {
        setMessage('');
        callAPI("post" ,"/politique/suppression" ,{id : id , nom : nom} , suppre)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      const nbRows = parseInt(event.target.value, 10)
        setRowsPerPage(nbRows);
        rechercher(1, nbRows);
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    
    const [message, setMessage] = React.useState("");
    const [skeleton, setSkeleton] = React.useState(true);

    function suppre(data){

    }

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    let rows = [];
    return(
        <>
            <Navbar currentPage={1}/><br/>
            <Box sx={{ width: '100%', padding :"50px" }}>
            <Link to={'/promotion/insertPromotion'}  style={{float : 'left'}}>
                <Button 
                variant="contained" 
                endIcon={<AddIcon style={{color:'white'}}/>}
                style={{textDecoration:'none'}}>
                    <span style={{color:'white'}}>Ajouter Promotion</span>
                </Button>
            </Link> 
            <div style={{float : 'right'}}>  
                <TextField 
                id="outlined-size-small"
                size="small" label ="Search"
                name="Search"
                type="text"
                value={toSearch}
                onChange={(e) => setToSearch(e.target.value)}
                />
                <Button onClick={(e) => rechercher(1)}><SearchIcon style={{color:"blue"}} /></Button>
            </div> <br/><br/>

            {
                !skeleton ? <Skeleton /> :

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
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                    <HtmlTooltip
                                        title={
                                        <React.Fragment>
                                            <Typography color="green" style={{textDecoration:'underline'}}>Editer</Typography>
                                            <strong>{row.nom} ?</strong><br/>
                                        </React.Fragment>
                                        }
                                    > 
                                        <EditIcon style={{color : "green"}} />
                                    </HtmlTooltip> 
                                    </Link >
                                    <HtmlTooltip
                                        title={
                                        <React.Fragment>
                                            <Typography color="error" style={{textDecoration:'underline'}}>Suppression</Typography>
                                            <strong>voulez-vous vraiment supprimer "{row.nom}" ?</strong><br/>
                                            <Button variant ="contained" color="error" onClick = {(event) => suppression(event , row._id ,row.nom )}>Supprimer</Button> 
                                        </React.Fragment>
                                        }
                                    > 
                                        <DeleteIcon style={{color : "red" , cursor :'pointer'}} />
                                    </HtmlTooltip> 
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
                <TablePagination style={{backgroundColor : '#2F4050',color:'white' }}
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            }
            <div style={{overflow : 'auto'}}>
                <div style={{float :"left"}}>
                <FormControlLabel 
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label={dense ? "grand " : "petit"}
                />
                </div>
                <div style={{float : "right"}}>
                    <Pagination 
                    current={currentNumPage} 
                    setCurrentNumPage={setCurrentNumPage}
                    pagine={nbPage}
                    rechercher={rechercher} />
                </div>
            </div>
            </Box>
        </>
    );
}