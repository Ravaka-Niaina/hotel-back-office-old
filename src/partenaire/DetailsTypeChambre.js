// import CustomError from '../CustomError';
import CustomError from '../CustomError';
import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom';

import  Navbar  from "../Navbar/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import './typeChambre.css';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Input = styled('input')({
  display: 'none',
});


class DetailsTypeCHambre extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: [],
            typeChambre: {
                _id: '',
                nom: '',
                nbAdulte: '',
                nbEnfant: '',
                photo: '',
                
                chambreTotal:'',
                etage:'',
                superficie:'',
                description:''
            }
            , tarifs: []
        }
    }

    setDetailsTypeChambre(data){
        console.log(data);
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState = data;
        this.setState(currentState);
    }

    tryRedirect(res){
        console.log(res);
        if(res.status === 200){
          this.props.history.push('/typeChambre');
        }else if(res.status === 401){//Unauthorized
            this.props.history.push('/login');
        }else{
          let currentState = JSON.parse(JSON.stringify(this.state));
          currentState.errors = res.errors;
          this.setState(currentState);
        }
    }

    setTarifs(res){
        console.log(res);
        if(res.status === 200){
            let currentState = JSON.parse(JSON.stringify(this.state));
            currentState.tarifs = res.list;
            this.setState(currentState);
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + 
                "/typeChambre/details/" + this.props.match.params._id + '?id',
            withCredentials: true
        })
        .then(res => this.setDetailsTypeChambre(res.data))
        .catch(err => console.log(err));

        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + 
                "/tarif?idTypeChambre=" + this.props.match.params._id,
            withCredentials: true
        })
        .then(res => this.setTarifs(res.data))
        .catch(err => console.log(err));
    }

    update(e){
        e.preventDefault();
        console.log(this.state.typeChambre);
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + "/typeChambre/update",
            withCredentials: true,
            data: this.state.typeChambre
        })
        .then(res => this.tryRedirect(res.data))
        .catch(err => console.log(err));
    }

    handleInputChange(event, inputName){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.typeChambre[inputName] = event.target.value;
        this.setState(currentState);
    }
    handlePhotoChange(event){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.photo = event.target.files[0];
        this.setState(currentState);
    }

    render(){
        let list = null;
        list = this.state.tarifs.map(tarif => {
            return <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{tarif.nom}</TableCell>
              <TableCell align="center">{tarif.prixParJour}</TableCell>
              <TableCell align="center">{tarif.services}</TableCell>
              <TableCell align="center">{tarif.conditionsAnnulation}</TableCell>
              <TableCell align="center">
              <Link to={"/tarif/details/" + tarif._id + "/" + this.state.typeChambre._id} style={{textDecoration:'none'}}>
                <Button variant="contained" style={{backgroundColor:'#4682B4'}}>
                    Modifier
                </Button>    
                </Link>
              </TableCell>
            </TableRow>
        });
        return(
            <div> 
                <Navbar/>
                
            <div className="container">
             <div className="row">
            {/* <div className="col-md-1"></div> */}
              <div className="col-md-12">
                <div className="jumbotron1" 
                style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)',marginLeft:'180px',marginTop:'-60px'}}>
                    <h1 className="text-center" id='title1'>Détails type chambre</h1>
                    <hr></hr>
                    <CustomError errors={this.state.errors} />
                    <form className="needs-validation">

<Box>
<div style={{marginTop:'40px'}}>
<TextField id="standard-basic" label="Nom" variant="standard" style={{width:'40%'}} 
value={this.state.typeChambre.nom} onChange={(e) => this.handleInputChange(e, "nom")}/>

<input type="file" value={this.state.photo} onChange={(e) => this.handleInputChange(e, "photo")} />

<div style={{marginTop:'30px'}}>
<TextField id="standard-basic" label="chambre totale" variant="standard" type="number"
style={{width:'40%'}} value={this.state.typeChambre.chambreTotal} onChange={(e) => this.handleInputChange(e, "chambreTotal")}/>
</div>

<div style={{marginTop:'30px'}}>
<TextField id="standard-basic" label="Etage" variant="standard" type="text"
style={{width:'40%'}} value={this.state.typeChambre.etage} onChange={(e) => this.handleInputChange(e, "etage")}/>
<TextField id="standard-basic" label="Superficie" variant="standard" type="number" 
style={{width:'40%',marginLeft:'152px'}} value={this.state.typeChambre.superficie} onChange={(e) => this.handleInputChange(e, "superficie")}/>
</div>

</div>

<div style={{marginTop:'20px'}}>
<label className="form-label mt-4" style={{textDecoration:'underline'}}>Occupation : </label>
</div>
<div style={{marginTop:'5px'}}>
<TextField id="standard-basic" label="Adulte" variant="standard" type="number" style={{width:'40%'}}
value={this.state.typeChambre.nbAdulte} onChange={(e) => this.handleInputChange(e, "nbAdulte")}/>
<TextField id="standard-basic" label="Enfant" variant="standard" type="number" style={{width:'40%',marginLeft:'152px'}}
value={this.state.typeChambre.nbEnfant} onChange={(e) => this.handleInputChange(e, "nbEnfant")}/>
</div>
<div style={{marginTop:'20px'}}>
<div style={{}}>
<label className="form-label mt-4" style={{textDecoration:'underline'}}>Description: </label>
</div>
<TextField id="outlined-basic" variant="outlined" type='text'
  placeholder=""
  multiline
  rows={2}
  rowsMax={4}
  style={{width:'100%',height:'50px'}}
  value={this.state.typeChambre.description} onChange={(e) => this.handleInputChange(e, "description")}
/>
</div>
    </Box>

        <div style={{marginTop:'50px'}}>

<Button variant="contained"  style={{backgroundColor:'#FA8072'}} onClick={(e) => this.update(e)}>
Modifier
</Button>
<Link to='/typeChambre' style={{textDecoration:'none'}}>
<Button variant="contained" style={{backgroundColor:'#293846',color:'white',marginLeft:'20px'}}>
Retour
</Button>
</Link>
                        </div>
                    </form>
                    {/*
                    <h2 className="mt-5" style={{textDecoration:'underline',textAlign:'center'}}>Liste tarifs</h2>

<TableContainer component={Paper} style={{marginTop:'40px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>Nom</strong></TableCell>
            <TableCell align="center"><strong>Prix par jour</strong></TableCell>
            <TableCell align="center"><strong>Services</strong></TableCell>
            <TableCell align="center"><strong>Conditions d'annulation</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { list }
        </TableBody>
      </Table>
    </TableContainer>
    */}

                </div>
                </div>
                {/* <div className="col-md-2"></div> */}
             </div>
            </div>
            </div>
        );
    }
}

export default DetailsTypeCHambre;