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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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
import Pagination from '../pagination/pagination.js';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';


let rows = [];
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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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


const headCells = [
  {
    id: 'nom',
    numeric: false,
    disablePadding: true,
    label: 'nom Tarif',
  },
  {
    id: 'tarif',
    numeric: false,
    disablePadding: true,
    label: "Tarif",
  },
  {
    id: 'typeChambre',
    numeric: true,
    disablePadding: false,
    label: 'Type Chambre',
  },
  {
    id: 'remiseEuro',
    numeric: true,
    disablePadding: false,
    label: 'Remise',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date Sejour',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  }
];


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

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [list, setList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [indiceU, setId] = React.useState("");
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function functionAppelList(data){
    console.log(data);
    
    rows = [];
    for(let i = 0; i < data.promotions.length; i++){
      rows.push(data.promotions[i]);  
    }
    setList(data.promotions);
   // rows = list;
    
  }
 

  useEffect(() => {
      GETaPI("get", "/promotion" ,functionAppelList);
  }, []);

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
  const closeModal = () => {
    setOpen(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
    <Navbar currentPage={3}/><br/>
    <Box sx={{ width: '100%', padding :"50px" }}>
    <Link to={'/promotion/create'}  style={{float : 'left'}}>
        <Button variant ="contained">Insert Promotion</Button> 
    </Link>
    <div style={{float : 'right'}}>  
      <TextField 
        id="outlined-size-small"
        size="small" label ="Search"
        name="Search"
        type="text"
      />
      <SearchIcon style={{color:"blue"}}/>
    </div> <br/><br/>
      <Paper sx={{ width: '100%', mb: 2 }}>
     
        <TableContainer>
          <Table
            sx={{ minWidth: 600 }}
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
            />
            <TableBody>
              {
              stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = null;
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow 
                      onClick={(event) => handleClick(event, row._id , true)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.nom}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align = "center"
                      >
                        {row.nom}
                      </TableCell>
                      <TableCell >{row.tarif}</TableCell>
                      <TableCell align="left">{row.typeChambre}</TableCell>
                      <TableCell align="left">{row.remiseEuro}</TableCell>
                      <TableCell align="left">{row.dateDebutS} au {row.dateFinS} </TableCell>
                      <TableCell align="rigth">
                        <Link to={'/'}> 
                          <EditIcon style={{color : "green"}} />
                        </Link> 
                          <DeleteIcon style={{color : "red"}}/>
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{overflow : 'auto'}}>
        <div style={{float :"left"}}>
          <FormControlLabel 
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label={dense ? "grand " : "petit"}
          />
        </div>
        <div style={{float : "right"}}>
          <Pagination  />
        </div>
      </div>
    </Box>
    </>
  );
}
