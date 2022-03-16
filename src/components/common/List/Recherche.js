import  React,{useEffect}  from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
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

// ----------------------template--------------------------

// import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
// import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// // material
// import {
//   Card,
//   Stack,
//   Avatar,
//   // Button,
//   Checkbox,
//   // TableRow,
//   // TableBody,
//   // TableCell,
//   Container,
//   Typography,
//   // TableContainer,
//   TablePagination
// } from '@mui/material';
// // components
// import Page from '../../../comp/Page';
// import Label from '../../../comp/Label';
// import Scrollbar from '../../../comp/Scrollbar';
// import Iconify from '../../../comp/Iconify';
// import SearchNotFound from '../../../comp/SearchNotFound';
// import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/user';
// //
// import USERLIST from '../../../_mocks_/user.js';

// const TABLE_HEAD = [
//   { id: 'name', label: 'Name', alignRight: false },
//   { id: 'company', label: 'Company', alignRight: false },
//   { id: 'role', label: 'Role', alignRight: false },
//   { id: 'isVerified', label: 'Verified', alignRight: false },
//   { id: 'status', label: 'Status', alignRight: false },
//   { id: '' }
// ];

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

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => (_user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || _user.company.toLowerCase().indexOf(query.toLowerCase()) !== -1 || _user.role.toLowerCase().indexOf(query.toLowerCase()) !== -1 ));
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

// ----------------------*template*--------------------------


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

const getValue = (row, fieldName) => {
  let value = {...row};
  let fields = fieldName.split(".");
  fields.map(field => {
    value = value[field];
  });
  return value;
}

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

    //-----------------------------template-------------------------------

    // const [page, setPage] = useState(0);
    // const [order, setOrder] = useState('asc');
    // const [selected, setSelected] = useState([]);
    // const [orderBy, setOrderBy] = useState('name');
    // const [filterName, setFilterName] = useState('');
    // const [rowsPerPage, setRowsPerPage] = useState(5);
  
    // const handleRequestSort = (event, property) => {
    //   const isAsc = orderBy === property && order === 'asc';
    //   setOrder(isAsc ? 'desc' : 'asc');
    //   setOrderBy(property);
    // };
  
    // const handleSelectAllClick = (event) => {
    //   if (event.target.checked) {
    //     const newSelecteds = USERLIST.map((n) => n.name);
    //     setSelected(newSelecteds);
    //     return;
    //   }
    //   setSelected([]);
    // };
  
    // const handleClick = (event, name) => {
    //   const selectedIndex = selected.indexOf(name);
    //   let newSelected = [];
    //   if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(selected, name);
    //   } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(selected.slice(1));
    //   } else if (selectedIndex === selected.length - 1) {
    //     newSelected = newSelected.concat(selected.slice(0, -1));
    //   } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //       selected.slice(0, selectedIndex),
    //       selected.slice(selectedIndex + 1)
    //     );
    //   }
    //   setSelected(newSelected);
    // };
  
    // const handleChangePage = (event, newPage) => {
    //   setPage(newPage);
    // };
  
    // const handleChangeRowsPerPage = (event) => {
    //   setRowsPerPage(parseInt(event.target.value, 10));
    //   setPage(0);
    // };
  
    // const handleFilterByName = (event) => {
    //   setFilterName(event.target.value);
    // };
  
    // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  
    // const filteredUsers = applySortFilter(listResult, getComparator(order, orderBy), filterName);
  
    // const isUserNotFound = filteredUsers.length === 0;

    //----------------------------*template*--------------------------------

    return(


      // <Page title="User | Minimal-UI">
      // <Container>
      //   <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      //     <Typography variant="h4" gutterBottom>
      //       User
      //     </Typography>
      //     <Button
      //       variant="contained"
      //       component={RouterLink}
      //       to="#"
      //       startIcon={<Iconify icon="eva:plus-fill" />}
      //     >
      //       New User
      //     </Button>
      //   </Stack>

      //   <Card>
      //     <UserListToolbar
      //       numSelected={selected.length}
      //       filterName={filterName}
      //       onFilterName={handleFilterByName}
      //     />

      //     <Scrollbar>
      //       <TableContainer sx={{ minWidth: 800 }}>
      //         <Table>
      //           <UserListHead
      //             order={order}
      //             orderBy={orderBy}
      //             headLabel={TABLE_HEAD}
      //             rowCount={USERLIST.length}
      //             numSelected={selected.length}
      //             onRequestSort={handleRequestSort}
      //             onSelectAllClick={handleSelectAllClick}
      //           />
      //           <TableBody>
      //             {filteredUsers
      //               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      //               .map((row) => {
      //                 const { id, name, role, status, company, avatarUrl, isVerified } = row;
      //                 const isItemSelected = selected.indexOf(name) !== -1;

      //                 return (
      //                   <TableRow
      //                     hover
      //                     key={id}
      //                     tabIndex={-1}
      //                     role="checkbox"
      //                     selected={isItemSelected}
      //                     aria-checked={isItemSelected}
      //                   >
      //                     <TableCell padding="checkbox">
      //                       <Checkbox
      //                         checked={isItemSelected}
      //                         onChange={(event) => handleClick(event, name)}
      //                       />
      //                     </TableCell>
      //                     <TableCell component="th" scope="row" padding="none">
      //                       <Stack direction="row" alignItems="center" spacing={2}>
      //                         <Avatar alt={name} src={avatarUrl} />
      //                         <Typography variant="subtitle2" noWrap>
      //                           {name}
      //                         </Typography>
      //                       </Stack>
      //                     </TableCell>
      //                     <TableCell align="left">{company}</TableCell>
      //                     <TableCell align="left">{role}</TableCell>
      //                     <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
      //                     <TableCell align="left">
      //                       <Label
      //                         variant="ghost"
      //                         color={(status === 'banned' && 'error') || 'success'}
      //                       >
      //                         {sentenceCase(status)}
      //                       </Label>
      //                     </TableCell>

      //                     <TableCell align="right">
      //                       <UserMoreMenu />
      //                     </TableCell>
      //                   </TableRow>
      //                 );
      //               })}
      //             {emptyRows > 0 && (
      //               <TableRow style={{ height: 53 * emptyRows }}>
      //                 <TableCell colSpan={6} />
      //               </TableRow>
      //             )}
      //           </TableBody>
      //           {isUserNotFound && (
      //             <TableBody>
      //               <TableRow>
      //                 <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
      //                   <SearchNotFound searchQuery={filterName} />
      //                 </TableCell>
      //               </TableRow>
      //             </TableBody>
      //           )}
      //         </Table>
      //       </TableContainer>
      //     </Scrollbar>

      //     <TablePagination
      //       rowsPerPageOptions={[5, 10, 25]}
      //       component="div"
      //       count={USERLIST.length}
      //       rowsPerPage={rowsPerPage}
      //       page={page}
      //       onPageChange={handleChangePage}
      //       onRowsPerPageChange={handleChangeRowsPerPage}
      //     />
      //   </Card>
      // </Container>
    // </Page>

        <>
            {/* <Navbar currentPage={props.currentPage}/><br/> */}
            
            <Box sx={{ width: '100%', padding :"50px" }}>
            {hasARToViewInsert
             ? <Link to={props.btnInsert.urlRedirect}  style={{float : 'left'}}>
                <Button 
                variant="contained" 
                endIcon={<AddIcon style={{color:'white'}}/>}
                style={{textDecoration:'none'}}>
                    <span style={{color:'white'}}>{props.btnInsert.label}</span>
                </Button>
            </Link>
            : null }
            <InputRecherche rechercher={rechercher} toSearch={toSearch} setToSearch={setToSearch} /> <br/><br/>
            { hasARViewList ? <>{
                isLoading ? <Paper sx={{ width: '100%', mb: 2 }}><Skeleton /></Paper> :<>
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
                                    { 
                                      hasARToViewDetails
                                      ? <Link to={props.urlEdit + row._id}>
                                        <HtmlTooltip title="Editer"> 
                                            <EditIcon style={{color : "green"}} />
                                        </HtmlTooltip> 
                                      </Link > 
                                      : null
                                    }
                                    { hasARToDelete
                                    ? <HtmlTooltip title="Supprimer" > 
                                          <DeleteIcon style={{color : "red" , cursor :'pointer'}} 
                                          onClick={(e) => {setToDelete(row); setOpenModalDelete(true)}} />
                                      </HtmlTooltip> 
                                    : null }
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
            }</> : null }
            
          </Box>
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
  // console.log("TRLALALA"+ JSON.stringify(props));
  return(
      <ResponsiveDrawer 
          title = {props.title}
          getContent = {() => Recherche(props)} 
      />
      
  );
}