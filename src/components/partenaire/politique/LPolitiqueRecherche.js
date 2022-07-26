import  React,{useEffect}  from 'react';
import { useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card } from '@mui/material';
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
// import  Navbar  from "../Navbar/Navbar";
import  ResponsiveDrawer  from "../../partenaire/Navbar/responsive-drawer.js";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Skeleton from '../../../SkeletonListe/skeleton';
import FooterList from '../../common/List/FooterList.js';
import callAPI from '../../../utility.js';
import Iconify from '../../../comp/Iconify';
import ValidationSuppression from "../../common/List/ValidationSuppression.js";
const moment = require('moment');

function DatePrice(props){
    console.log(props);
    let liste = props.row.map(list => {
    return(
            <li>{list.date}  {props.type}  {list.pourcentage}  % </li>
        );
    })
    return liste;
}

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
  const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
  }));

  function UserMoreMenu(props) {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <>
          <IconButton ref={ref} onClick={() => setIsOpen(true)}>
            <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
          </IconButton>

            <Menu
              open={isOpen}
              anchorEl={ref.current}
              onClose={() => setIsOpen(false)}
              PaperProps={{
                sx: { width: 200, maxWidth: '100%' }
              }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem 
              sx={{ color: 'text.secondary' }}
              onClick={(e) => {props.setToDelete(props.row); props.setOpenModalDelete(true)}}
              >
                <ListItemIcon>
                  <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                </ListItemIcon> 
                <ListItemText primary="Supprimer" primaryTypographyProps={{ variant: 'body2' }} />
              </MenuItem>
             
              <MenuItem 
              component={RouterLink} to={props.urlEdit + props.row._id} sx={{ color: 'text.secondary' }}>
                <ListItemIcon>
                  <Iconify icon="eva:edit-fill" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Modifier" primaryTypographyProps={{ variant: 'body2' }} />
              </MenuItem>
              

            </Menu>
            
      </> 

    );
  }  

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (

      <TableHead>
        <TableRow style={{backgroundColor :"#bfbfbf",color:'white'}}>
          {props.headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              // align={headCell.numeric ? 'left' : 'center'}
              align = "left"
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ fontFamily:'Raleway', fontSize:17 }}
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

function removeSpecialCharFromDate(date, type){
  date = "" + date;
  if(date.includes(" ")){
    if(type === "Date"){
      date = date.split(" ")[0];
    }
  }else if(date.includes("T")){
    const elts = date.split("T");
    if(type === "Date"){
      date = elts[0];
    }else{
      const datePart = elts[0];
      const timePart = elts[1].split("Z")[0];
      date = datePart + " " + timePart;
    }
  }
  return date;
}

const getValue = (row, fieldName) => {
  let value = {...row};
  let fields = fieldName.split(".");
  fields.map(field => {
    value = value[field];
  });
  return value;
}

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#3CB371',
  borderColor: '#3CB371',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

function Recherche(props){
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [list, setList] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [indiceU, setId] = React.useState("");
    const [listResult, setListResult] = React.useState([]);
    const [headCells, setHeadCells] = React.useState([]);
    const [toSearch, setToSearch] = React.useState("");
    const [currentNumPage, setCurrentNumPage] = React.useState(1);
    const [nbPage, setNbPage] = React.useState(1);
    const [nbContent, setNbContent] = React.useState(props.nbContent ? props.nbContent : 5);
    const [rowsPerPageOptions, setRowsPerPageOptions] = 
      React.useState(props.rowsPerPageOptions ? props.rowsPerPageOptions : [5, 10, 15]);
    const [nbResult, setNbResult] = React.useState(0);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [toDelete, setToDelete] = React.useState({_id: null, nom: null});
    const history = useHistory();

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = rows.map((n) => n.name);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
    };

    const redirection = (link) =>{
      history.push(link);
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
          temp[infoField.field] = getValue(row, infoField.field);
          if(infoField.type === "Date" || infoField.type === "DateTime"){
            temp[infoField.field] = removeSpecialCharFromDate(temp[infoField.field], infoField.type);
          }
        });
        toPrint.push(temp);
      });
      data.list = toPrint;
    }

    const rechercher = (numPage, providedNbContent) => {
        setIsLoading(true);
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
            setNbResult(data.nbResult);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        rechercher(1);
        let temp = [];
        props.fieldsToPrint.map(infoField => {
          if(infoField.field !== "_id" && infoField.field !== "type"){
              if(infoField.field == "datePrice" || infoField.field == "nom"){
                temp.push({
                    id: infoField.field,
                    numeric: infoField.type === "Integer" || infoField.type === "Float" ? false : true,
                    disablePadding: false,
                    label: infoField.label
                });
              }else{
                temp.push({
                    id: infoField.field,
                    numeric: infoField.type === "Integer" || infoField.type === "Float" ? true : false,
                    disablePadding: false,
                    label: infoField.label
                });
              }
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
    
    const [message, setMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * nbContent - rows.length) : 0;
    let rows = [];
    return(
        <>
            {/* <Navbar  currentPage={props.currentPage}/><br/> */}
              <Box sx={{ width: '100%', padding :"50px" }} >
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                  </Grid>
                  <Grid item xs={2}>
                      <BootstrapButton 
                          variant="contained" 
                          endIcon={<AddIcon style={{color:'white'}}/>}
                          onClick={ ()=> redirection(props.btnInsert.urlRedirect) }
                          style={{textDecoration:'none'}}
                          sx={{ borderRadius:3 }}
                      >
                          <span style={{color:'white', fontSize:'14px', fontWeight:'bold'}}>{props.btnInsert.label}</span>
                      </BootstrapButton>
                  </Grid> 
                </Grid>
            
            <Paper sx={{ width: '100%', mb: 2, borderRadius: 5, mt:3 }}>
              <Card sx={{ borderRadius: 5 }}>

              <RootStyle>
                  <TextField 
                      id="outlined-size-small"
                      size="small" label ="Search"
                      name="Search"
                      type="text"
                      value={toSearch}
                      onChange={(e) => setToSearch(e.target.value)}
                      InputProps={{ endAdornment: 
                      <InputAdornment position="end">
                          <SearchIcon style={{color:"grey"}} 
                              onClick={(e) => rechercher(1)} />
                      </InputAdornment>
                      }}
                  />
                  {
                    isLoading ? 
                    <Skeleton /> : <></>
                  }
                  <Tooltip title="Filter list">
                    <IconButton>
                      <Iconify icon="ic:round-filter-list" />
                    </IconButton>
                  </Tooltip>
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
                       
                        return (
                            <TableRow
                            onClick={(event) => handleClick(event, row._id , true)}
                            role="checkbox"
                            tabIndex={-1}
                            key={row._id}
                            >
                                <TableCell align="left">{row.nom}</TableCell>
                                <TableCell align="left"><DatePrice row = {row.datePrice}  type = {row.type}/></TableCell>
                                <TableCell align="left">{row.remboursable ? "oui" : "non"}</TableCell>
                                <TableCell align="left">
                                  <UserMoreMenu 
                                    row={row}
                                    urlEdit={props.urlEdit}
                                    setToDelete={setToDelete}
                                    setOpenModalDelete={setOpenModalDelete}
                                  />
                                    {/* <Link to={props.urlEdit + row._id}>
                                    <HtmlTooltip title="Editer"> 
                                        <EditIcon style={{color : "green"}} />
                                    </HtmlTooltip> 
                                    </Link >
                                    <HtmlTooltip title="Supprimer" > 
                                        <DeleteIcon style={{color : "red" , cursor :'pointer'}} 
                                        onClick={(e) => {setToDelete(row); setOpenModalDelete(true)}} />
                                    </HtmlTooltip>  */}
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
                <FooterList 
                  nbResult={nbResult} 
                  rowsPerPageOptions={rowsPerPageOptions}
                  nbContent={nbContent}
                  setNbContent={setNbContent}
                  currentNumPage={currentNumPage} setCurrentNumPage={setCurrentNumPage}
                  nbPage={nbPage} rechercher={rechercher}
                />
              </Card>  
            </Paper>
            
          </Box>
          <ValidationSuppression 
            openModalDelete={openModalDelete}
            setOpenModalDelete={setOpenModalDelete}
            toDelete={toDelete}
            tableName={props.tableName}
            rechercher={rechercher}
            setCurrentNumPage={setCurrentNumPage}
          />
      </>
    );
}
export default function recherche_(props) {
  return(
      <ResponsiveDrawer 
          title = {props.title}
          getContent = {() => Recherche(props)} 
      />
      
  );
}