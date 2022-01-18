import  React,{useEffect , useState}  from 'react';
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
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import callAPI from '../../utility.js';
import ValidationSuppression from "../../common/List/ValidationSuppression.js";
import Skeleton from '../../SkeletonListe/skeleton';
import  Navbar  from "../../Navbar/Navbar";
import FooterList from '../FooterList.js';
const moment = require('moment');

const headCells = [
      {
        id: 'idTarif',
        numeric: false,
        disablePadding: true,
        label: 'plan Tarif',
      },
      {
        id: 'idUser',
        numeric: true,
        disablePadding: false,
        label: 'Utilisateur',
      },
      {
        id: 'dateHisto',
        numeric: true,
        disablePadding: false,
        label: 'dateHistorique',
      },
      {
        id: 'delete',
        numeric: true,
        disablePadding: false,
        label: 'Action',
      }
    ];

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


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow style={{backgroundColor :"#F6F8FC",color:'white'}}>
          {headCells.map((headCell) => (
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

export default function Recherche(props){
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [historique, setHistorique] = React.useState([]);
    const [count, setCount] = React.useState("");
    const [currentNumPage, setCurrentNumPage] = React.useState(1);
    const [nbPage, setNbPage] = useState(1);
    const [rowsPerPageOptions, setRowsPerPageOptions] = 
      React.useState(props.rowsPerPageOptions ? props.rowsPerPageOptions : [5, 10, 15]);
    const [state , setState] = useState({ debut : "", fin: ""});
    const [nbContent, setNbContent] = React.useState(5);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = rows.map((n) => n.name);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
    };

    const handleChangePagination = (event , value) => {
        setIsLoading(true);
        setCurrentNumPage(value);
        callAPI("post" , "/histo/modifTarif" , {content :nbContent , pageCurrent : value , dateD : state.debut , dateF : state.fin} , callBack);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChange  = (event) =>{
        setIsLoading(true);
        setNbContent(parseInt(event.target.value, 10));
        setCurrentNumPage(1);
        callAPI("post" , "/histo/modifTarif" , {content : event.target.value , pageCurrent : 1 , dateD : state.debut , dateF : state.fin} , callBack);
    }

    const callBack = (data) =>{
      setIsLoading(false);
      setCount(data.count)
      setHistorique(data.list);
      setNbPage(data.nbrPage);
    }

    const rechercher = () => {
        setIsLoading(true);
        callAPI("post" , "/histo/modifTarif" , {content : nbContent , pageCurrent : currentNumPage , dateD : state.debut , dateF : state.fin} , callBack);
    };

    useEffect(() => {
        rechercher(1);
    }, []);

    const handlechangeDate =(e , field) =>{
        let current = {...state};
        current[field] = e.target.value;
        setState(current);
        console.log(current);
    }

    const [isLoading, setIsLoading] = React.useState(true);

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * nbContent - rows.length) : 0;
    let rows = [];
    return(
        <>
            <Navbar currentPage={5}/><br/><br/><br/>
              <Box sx={{ display: { xs: 'none', md: 'flex'  }, gap : 1 ,float : "left",paddingLeft :"50px" }} >
                <TextField 
                  size = "small"
                  label="debut"style={{width:"250px"}}
                  type ="date" value ={state.debut} onChange = {(e) => handlechangeDate(e , "debut")}
                  InputLabelProps={{
                      shrink :true,
                  }}
                />
                <TextField 
                  size = "small" type = "email"
                  label="fin"style={{width:"250px"}}
                  type ="date" value ={state.fin} onChange = { (e) =>handlechangeDate(e , "fin")}
                  InputLabelProps={{
                    shrink :true,
                    }}
                />
                <Button onClick={rechercher}><SearchIcon style={{color:"blue"}} /></Button>
              </Box>
            <Box sx={{ width: '100%', padding :"50px" }}>
            {
                isLoading ? <Paper sx={{ width: '100%', mb: 2 }}><Skeleton /></Paper> : <>
              <Paper sx={{ width: '100%'}}>
            
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
                    stableSort(historique, getComparator(order, orderBy))
                        .slice(page * nbContent, page * nbContent + nbContent)
                        .map((row, index) => {
                        const isItemSelected = null;
                        const labelId = `enhanced-table-checkbox-${index}`;
                       
                        return (
                          <TableRow
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                          >
                              <TableCell align="left">{row.idTarif.nom}</TableCell>
                              <TableCell align="left">{row.idUser}</TableCell>
                              <TableCell align="left">{row.dateHisto}</TableCell>
                              <TableCell align="left">{row.delete? "suppression " : "modification"}</TableCell>
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
              </Paper><br/>
              <FooterList 
                nbResult={count} 
                handleChangePagination = {handleChangePagination}
                rowsPerPageOptions={rowsPerPageOptions}
                nbContent={nbContent}
                currentNumPage={currentNumPage} 
                nbPage={nbPage}  
                handleChange = {handleChange}
              />

            </>
            }
          </Box>
          
      </>
    );
}



// import  React,{useEffect ,useState}  from 'react';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';
// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';

// import EditIcon from '@mui/icons-material/Edit';
// import SearchIcon from '@mui/icons-material/Search';
// import TextField from '@mui/material/TextField';
// import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import Typography from '@mui/material/Typography';
// import { styled } from '@mui/material/styles';
// import Skeleton from '../../SkeletonListe/skeleton';
// import  Navbar  from "../../Navbar/Navbar";
// import FooterList from '../FooterList.js';

// const headCells = [
//     {
//       id: 'idTarif',
//       numeric: false,
//       disablePadding: true,
//       label: 'plan Tarif',
//     },
//     {
//       id: 'idUser',
//       numeric: true,
//       disablePadding: false,
//       label: 'Utilisateur',
//     },
//     {
//       id: 'dateHisto',
//       numeric: true,
//       disablePadding: false,
//       label: 'dateHistorique',
//     },
//     {
//       id: 'delete',
//       numeric: true,
//       disablePadding: false,
//       label: 'Action',
//     }
//   ];

// const HtmlTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} classes={{ popper: className }} />
//   ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: '#f5f5f9',
//     color: 'rgba(0, 0, 0, 0.87)',
//     maxWidth: 220,
//     fontSize: theme.typography.pxToRem(12),
//     border: '1px solid #dadde9',
//   },
// }));

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// function EnhancedTableHead(props) {
//     const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//       props;
//     const createSortHandler = (property) => (event) => {
//       onRequestSort(event, property);
//     };
  
//     return (
//       <TableHead>
//         <TableRow style={{backgroundColor :"#F6F8FC",color:'white'}}>
//           {headCells.map((headCell) => (
//             <TableCell
//               key={headCell.id}
//               align={headCell.numeric ? 'left' : 'center'}
//               padding={headCell.disablePadding ? 'none' : 'normal'}
//               sortDirection={orderBy === headCell.id ? order : false}
//             >
//               <TableSortLabel
//                 active={orderBy === headCell.id}
//                 direction={orderBy === headCell.id ? order : 'asc'}
//                 onClick={createSortHandler(headCell.id)}
//               >
//                 {headCell.label}
//                 {orderBy === headCell.id ? (
//                   <Box component="span" sx={visuallyHidden}>
//                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                   </Box>
//                 ) : null}
//               </TableSortLabel>
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//     );
//   }
  
//   EnhancedTableHead.propTypes = {
//       numSelected: PropTypes.number.isRequired,
//       onRequestSort: PropTypes.func.isRequired,
//       onSelectAllClick: PropTypes.func.isRequired,
//       order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//       orderBy: PropTypes.string.isRequired,
//       rowCount: PropTypes.number.isRequired,
//     };

// // function ContenuTable(props){
// //   console.log(props);
// //     let historique = props.historique.map(histo => {
// //         return (
// //             <TableRow>
// //                 <TableCell align="left">{histo.idTarif.nom}</TableCell>
// //                 <TableCell align="left">{histo.idUser}</TableCell>
// //                 <TableCell align="left">{histo.dateHisto}</TableCell>
// //                 <TableCell align="left">{histo.delete ? "suppression" : "modification"}</TableCell>
// //             </TableRow> 
// //         );
// //     })
// //     return historique;
// // }
// // function Champs(props){
// //     let champs = props.champsModifier.map(ch => {
// //         return(
// //           <li>{ch}</li>
// //         );
// //       })
// //       return champs;
// // }

// // function AncienneValeur(props){
// //     let AncienneValeur = props.AncienneValeur.map(ch => {
// //         return(
// //           <li>{ch+""}</li>
// //         );
// //       })
// //       return AncienneValeur;
// // }

// // function NouvelleValeur(props){
// //     let nouvelleValeur = props.nouvelleValeur.map(ch => {
// //         return(
// //           <li>{ch+""}</li>
// //         );
// //       })
// //       return nouvelleValeur;
// // }


// function TChambre (props) {
//     const [order, setOrder] = useState('asc');
//     const [orderBy, setOrderBy] = useState('calories');
//     const [dense, setDense] = React.useState(true);

//     const [content , setContent] = useState(2);
//     const [pageCurrent, setPageCurrent] = useState(1);
//     const [nbrPage , setNbrPage] = useState();
//     const [historique , setHistorique] = useState([]);
//     const [nbResult , setNbResult] = useState(0);
//     const [state , setState] = useState({
//         debut : "",
//         fin: ""
//     });
//     const [skeleton, setSkeleton] = React.useState(true);

//     const [rowsPerPageOptions, setRowsPerPageOptions] = 
//       React.useState(props.rowsPerPageOptions ? props.rowsPerPageOptions : [5, 10, 15]);
    
//       const handleSelectAllClick = (event) => {
//         if (event.target.checked) {
//           const newSelecteds = rows.map((n) => n.name);
//           setSelected(newSelecteds);
//           return;
//         }
//         setSelected([]);
//     };

//     const ColorButton = styled(Button)(({ theme }) => ({
//         color: theme.palette.getContrastText(purple[500]),
//         backgroundColor:theme.palette.common.light,
//         '&:hover': {
//           color: theme.palette.common.white,
//           backgroundColor: theme.palette.common.dark,
//         },
//       }));

//     const StyledTableCell = styled(TableCell)(({ theme }) => ({
//         [`&.${tableCellClasses.head}`]: {
//           backgroundColor: theme.palette.primary.main,
//           color: theme.palette.common.white,
//         },
//         [`&.${tableCellClasses.body}`]: {
//           fontSize: 14,
//         },
//       }));

//     const callBack = (data) =>{
//       setSkeleton(false);
//       console.log(data)
//         setHistorique(data.list);
//         setNbrPage(data.nbrPage);
//     }

//     const handleChange  = (event) =>{
//         setContent(parseInt(event.target.value, 10));
//         setPageCurrent(1);
//         callAPI("post" , "/histo/modifTarif" , {content :event.target.value , pageCurrent : 1 , dateD : state.debut , dateF : state.fin} , callBack);
//     }

//     const handleChangePagination = (event , value) => {
//         setPageCurrent(value);
//         callAPI("post" , "/histo/modifTarif" , {content :content , pageCurrent : value , dateD : state.debut , dateF : state.fin} , callBack);
//     }

//     const handlechageDate =(e , field) =>{
//         let current = {...state};
//         current[field] = e.target.value;
//         setState(current);
//         console.log(current);
//     }

//     const search =() =>{
//         callAPI("post" , "/histo/modifTarif" , {content :content , dateD : state.debut , dateF : state.fin} , callBack);
//     }

//     const recherche = () =>{
//       callAPI("post" , "/histo/modifTarif" , {content : content , pageCurrent : pageCurrent , dateD : state.debut , dateF : state.fin} , callBack);
//     }
    
//     useEffect(() => {
//         recherche();
//     }, []);
//     return (
//         <div style={{padding : "10px"}}>
//           <Navbar currentPage={5}/><br/><br/>                
//             <Box
//                   sx={{
//                     '& > :not(style)': { m: 1, width: '25ch' },
//                   }}
//                 >
//                   <FormControl fullWidth>
//                     <InputLabel id="demo-simple-select-label">Content</InputLabel>
//                         <Select labelId="demo-simple-select-label"
//                             id="demo-simple-select" size = "small"
//                             value={content}
//                             label="content"
//                             onChange={handleChange}
//                         >
//                             <MenuItem value={2}>2</MenuItem>
//                             <MenuItem value={6}>6</MenuItem>
//                             <MenuItem value={8}>8</MenuItem>
//                         </Select>
//                     </FormControl>
//                     <TextField 
//                       size = "small"
//                       label="debut"style={{width:"250px"}}
//                       type ="date" value ={state.debut} onChange = {(e) => handlechageDate(e , "debut")}
//                       InputLabelProps={{
//                           shrink :true,
//                       }}
//                     />
//                     <TextField 
//                       size = "small" type = "email"
//                       label="fin"style={{width:"250px"}}
//                       type ="date" value ={state.fin} onChange = { (e) =>handlechageDate(e , "fin")}
//                       InputLabelProps={{
//                         shrink :true,
//                         }}
//                     />

//                     <ColorButton variant="contained" onClick={search} startIcon={<SearchIcon/>}>Search</ColorButton>
//             </Box>
//             <Paper sx={{ width: '100%', mb: 2 }}>
     
//              <TableContainer>
//                <Table
//                  sx={{ minWidth: 600 }}
//                  aria-labelledby="tableTitle"
//                  size={dense ? 'small' : 'medium'}
//                >
//                  <EnhancedTableHead
//                    numSelected={selected.length}
//                    order={order}
//                    orderBy={orderBy}
//                    onSelectAllClick={handleSelectAllClick}
//                    onRequestSort={handleRequestSort}
//                    rowCount={rows.length}
//                  />
//                  <TableBody>
                   
//                  </TableBody>
//                </Table>
//              </TableContainer>
//              {/* <TablePagination style={{backgroundColor : '#2F4050',color:'white' }}
//                rowsPerPageOptions={[2, 4, 10]}
//                component="div"
//                count={count}
//                rowsPerPage={rowsPerPage}
//                page={page}
//                onRowsPerPageChange={handleChangeRowsPerPage}
//              /> */}
//            </Paper>


                    






//              <FooterList 
//                 pagine={nbrPage} pageCurrent = {pageCurrent}  handleChangePagination = {handleChangePagination}
                
//                 rowsPerPageOptions={rowsPerPageOptions}
//                 nbContent={content}
//                 setNbContent={setContent}
//                 currentNumPage={pageCurrent} setCurrentNumPage={setPageCurrent}
//                 nbPage={nbrPage} 
//             />
//             {/* <div style={{overflow : 'auto'}}>
//                 <div style={{float :"left"}}></div>
//                 <div style={{float : "right"}}>
//                     <Pagination pagine={nbrPage} pageCurrent = {pageCurrent}  handleChangePagination = {handleChangePagination}/>
//                 </div>
//             </div> */}
//         </div>
//     );
// }
// export default TChambre;