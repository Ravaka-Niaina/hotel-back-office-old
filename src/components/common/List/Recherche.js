import  React,{useEffect}  from 'react';
import { useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, Toolbar, IconButton } from '@mui/material';
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
import {Container} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import EditIcon from '@mui/icons-material/Edit';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Skeleton from '../../../SkeletonListe/skeleton';

import callAPI from '../../../utility.js';
import { removeSpecialCharFromDate } from '../../../utility/utilityDate.js';
import FooterList from './FooterList.js';
import ValidationSuppression from './ValidationSuppression.js';
import {session} from '../utilitySession.js';

import Login from '../../common/Authentification/Login.js';
import NotEnoughAccessRight from '../NotEnoughAccessRight.js';
import InputRecherche from './Recherche/InputRecherche.js';

// import UserMoreMenu from '../../../sections/@dashboard/user/UserMoreMenu';
import UserListToolbar from '../../../sections/@dashboard/user/UserListToolbar';

import Iconify from '../../../comp/Iconify';

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

  const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
  }));

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
            { 
              props.hasARToDelete
              ?
              <MenuItem 
              sx={{ color: 'text.secondary' }}
              onClick={(e) => {props.setToDelete(props.row); props.setOpenModalDelete(true)}}
              >
                <ListItemIcon>
                  <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                </ListItemIcon> 
                <ListItemText primary="Supprimer" primaryTypographyProps={{ variant: 'body2' }} />
              </MenuItem>
              : null
            }

            { 
              props.hasARToViewDetails
              ?
              <MenuItem 
              component={RouterLink} to={props.urlEdit + props.row._id} sx={{ color: 'text.secondary' }}>
                <ListItemIcon>
                  <Iconify icon="eva:edit-fill" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Modifier" primaryTypographyProps={{ variant: 'body2' }} />
              </MenuItem>
              : null
            } 

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
      
      <TableHead >
        <TableRow style={{backgroundColor :"#bfbfbf",color:'white'}}>
          {props.headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              // align={headCell.numeric ? 'left' : 'center'}
              align="left"
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
    const [currentNumPage, setCurrentNumPage] = React.useState(1);
    const [nbPage, setNbPage] = React.useState(1);
    const [nbContent, setNbContent] = React.useState(props.nbContent ? props.nbContent : 5);
    const [rowsPerPageOptions, setRowsPerPageOptions] = 
      React.useState(props.rowsPerPageOptions ? props.rowsPerPageOptions : [5, 10, 15]);
    const [nbResult, setNbResult] = React.useState(0);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [toDelete, setToDelete] = React.useState({_id: null, nom: null});
    
    

    const history = useHistory();

    let hasARToViewInsert = session.getInstance().hasOneOfTheseAccessRights(props.accessRightToViewInsert);
    let hasARToDelete = session.getInstance().hasOneOfTheseAccessRights(props.accessRightToDelete);
    let hasARToViewDetails = session.getInstance().hasOneOfTheseAccessRights(props.accessRightToViewDetails);

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

      const redirection = (link) =>{
        history.push(link);
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
            if(props.fieldsToSearch){
              valuesToSearch = [
                { "value": cleanValue, "fields": props.fieldsToSearch },
              ];
            }else{//rowsInputSearch no miasa
              for(let i = 0; i < props.rowsInputSearch.length; i++){
                for(let u = 0; u < props.rowsInputSearch[i].inputs.length; u++){

                }
              }
            }
            
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
            console.log(data);
            rearrangeCells(data);
            setListResult(data.list);
            setNbPage(data.nbPage);
            setNbResult(data.nbResult);
            setIsLoading(false);
        });
    };
    
    useEffect(() => {
          const hasARViewList = session.getInstance().hasOneOfTheseAccessRights(props.accessRightToViewList ? props.accessRightToViewList : []);
          if(hasARViewList){
            rechercher(1);
          }
          let temp = [];
          props.fieldsToPrint.map(infoField => {
            if(infoField.field !== "_id" && !infoField.forcePrint){
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
    
    const [message, setMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const [toSearch, setToSearch] = React.useState("");

    const isConnected = session.getInstance().isConnected();
    if(!isConnected){
        return(<Login urlRedirect={window.location.href} />);
    }
    const hasARViewList = session.getInstance().hasOneOfTheseAccessRights(props.accessRightToViewList ? props.accessRightToViewList : []);
    if(!hasARViewList && !hasARToViewInsert && !hasARToViewDetails && !hasARToDelete){
      console.log("tsy mety");
      return(<NotEnoughAccessRight />);
    }

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * nbContent - rows.length) : 0;
    let rows = [];

    return(

        <>
            {/* <Navbar currentPage={props.currentPage}/><br/> */}
            {/* <Container> */}
            <Box sx={{ width: '100%', pt:"60px", pl:"50px", pr:"50px" }}>
            {hasARToViewInsert
            //  ? <Link to={props.btnInsert.urlRedirect}  style={{float : 'left'}}>
              ? 
              <Grid container spacing={2}>
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={2}>
                  <BootstrapButton 
                  variant="contained" 
                  onClick={ ()=> redirection(props.btnInsert.urlRedirect) }
                  endIcon={<AddIcon style={{color:'white'}}/>}
                  style={{textDecoration:'none'}}
                  sx={{ borderRadius:3 }}
                  >
                      <span style={{color:'white', fontSize:'14px', fontWeight:'bold' }}>{props.btnInsert.label}</span>
                  </BootstrapButton>
                </Grid>
              </Grid>
            // </Link>
            : null }
            
            <Paper sx={{ width: '100%', mb: 2, borderRadius: 5, mt:3 }}>
              <Card sx={{ borderRadius: 5 }}>

                <RootStyle>
                  <InputRecherche rechercher={rechercher} toSearch={toSearch} setToSearch={setToSearch} /> <br/><br/>
                  { hasARViewList ? <>{
                      isLoading ? <Skeleton /> :<>
                    </>
                  } </>:null}
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
                            style={{height:60}}
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
                                <TableCell align="left">

                                  <UserMoreMenu 
                                  row={row}
                                  urlEdit={props.urlEdit}
                                  hasARToDelete={hasARToDelete}
                                  setToDelete={setToDelete}
                                  setOpenModalDelete={setOpenModalDelete}
                                  hasARToViewDetails={hasARToViewDetails}
                                  />
                                      {/* { 
                                        hasARToViewDetails
                                        ? <Link to={props.urlEdit + row._id}>
                                          <HtmlTooltip title="Editer"> 
                                              <EditIcon style={{color : "gray"}} />
                                          </HtmlTooltip> 
                                        </Link > 
                                        : null
                                      }
                                    
                                      { hasARToDelete
                                      ? <HtmlTooltip title="Supprimer" > 
                                            <DeleteIcon style={{color : "gray" , cursor :'pointer'}} 
                                            onClick={(e) => {setToDelete(row); setOpenModalDelete(true)}} />
                                        </HtmlTooltip> 
                                      : null } */}
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
            {/* </>
            }</> : null } */}
            
          </Box>
          {/* </Container> */}
          <ValidationSuppression 
            openModalDelete={openModalDelete}
            setOpenModalDelete={setOpenModalDelete}
            toDelete={toDelete}
            tableName={props.tableName}
            rechercher={rechercher}
            setCurrentNumPage={setCurrentNumPage}
            accessRightToDelte={props.accessRightToDelete}
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