import React , {useState , useEffect} from "react";
import Header from "../header.js";
import callAPI from '../../utility.js';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '../../pagination/pagination.js';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';

function ContenuTable(props){
    let historique = props.historique.map(histo => {
        return (
            <TableRow>
                <TableCell align="left">{histo.idTarif.nom}</TableCell>
                <TableCell align="left">{histo.idUser}</TableCell>
                <TableCell align="left">{histo.dateHisto}</TableCell>
                <TableCell align="left">{histo.delete ? "suppression" : "modification"}</TableCell>
            </TableRow> 
        );
    })
    return historique;
}
function Champs(props){
    let champs = props.champsModifier.map(ch => {
        return(
          <li>{ch}</li>
        );
      })
      return champs;
}

function AncienneValeur(props){
    let AncienneValeur = props.AncienneValeur.map(ch => {
        return(
          <li>{ch+""}</li>
        );
      })
      return AncienneValeur;
}

function NouvelleValeur(props){
    let nouvelleValeur = props.nouvelleValeur.map(ch => {
        return(
          <li>{ch+""}</li>
        );
      })
      return nouvelleValeur;
}


function TChambre (props) {
    const [content , setContent] = useState(20);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [nbrPage , setNbrPage] = useState();
    const [historique , setHistorique] = useState([]);
    const [state , setState] = useState({
        debut : "",
        fin: ""
    });

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor:theme.palette.common.light,
        '&:hover': {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.common.dark,
        },
      }));

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

    const callBack = (data) =>{
      console.log(data)
        setHistorique(data.list);
        setNbrPage(data.nbrPage);
    }

    const handleChange  = (event) =>{
        setContent(parseInt(event.target.value, 10));
        setPageCurrent(1);
        callAPI("post" , "/histo/TC" , {content :event.target.value , pageCurrent : 1 , dateD : state.debut , dateF : state.fin} , callBack);
    }

    const handleChangePagination = (event , value) => {
        setPageCurrent(value);
        callAPI("post" , "/histo/TC" , {content :content , pageCurrent : value , dateD : state.debut , dateF : state.fin} , callBack);
    }

    const handlechageDate =(e , field) =>{
        let current = {...state};
        current[field] = e.target.value;
        setState(current);
        console.log(current);
    }

    const search =() =>{
        callAPI("post" , "/histo/TC" , {content :content , dateD : state.debut , dateF : state.fin} , callBack);
    }

    useEffect(() => {
        callAPI("post" , "/histo/modifTarif" , {content :content , pageCurrent : pageCurrent ,dateD : state.debut , dateF : state.fin} , callBack);
    }, []);
    return (
        <div style={{padding : "10px"}}>
            <Header currentPage={0} /><br/><br/>

                <Box
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Content</InputLabel>
                        <Select labelId="demo-simple-select-label"
                            id="demo-simple-select" size = "small"
                            value={content}
                            label="content"
                            onChange={handleChange}
                        >
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                      size = "small"
                      label="debut"style={{width:"250px"}}
                      type ="date" value ={state.debut} onChange = {(e) => handlechageDate(e , "debut")}
                      InputLabelProps={{
                          shrink :true,
                      }}
                    />
                    <TextField 
                      size = "small" type = "email"
                      label="fin"style={{width:"250px"}}
                      type ="date" value ={state.fin} onChange = { (e) =>handlechageDate(e , "fin")}
                      InputLabelProps={{
                        shrink :true,
                        }}
                    />

                    <ColorButton variant="contained" startIcon={<SearchIcon/>}>Search</ColorButton>
            </Box><br/>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="left">plan tarifaire</StyledTableCell>
                    <StyledTableCell align="left">Utilisateur</StyledTableCell>
                    <StyledTableCell align="left">dateHistorique</StyledTableCell>
                    <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <ContenuTable historique = {historique} />
                </TableBody>
            </Table>
            </TableContainer><br/>
            <div style={{overflow : 'auto'}}>
                <div style={{float :"left"}}></div>
                <div style={{float : "right"}}>
                    <Pagination pagine={nbrPage} pageCurrent = {pageCurrent}  handleChangePagination = {handleChangePagination}/>
                </div>
            </div>
        </div>
    );
}
export default TChambre;