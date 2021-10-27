// import { TextField } from "@mui/material";
import CustomError from '../CustomError';
import axios from "axios";
import React from "react";

import  Navbar  from "../Navbar/Navbar";
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import './typeChambre.css';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const Input = styled('input')({
  display: 'none',
});

class InsertTypeCHambre extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        errors: [],
        nom: '',
        equipements: '',
        nbAdulte: '',
        nbEnfant: '',
        photo: '',
        
        chambreTotal:'',
        etage:'',
        superficie:'',
        description:''
    }
}

tryRedirect(res){
  console.log(this.state);
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

insert(e){
    e.preventDefault();
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACK_URL + "/typeChambre/insert",
        withCredentials: true,
        data: this.state
    })
    .then(res => this.tryRedirect(res.data))
    .catch(err => console.log(err));
}

handleInputChange(event, inputName){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState[inputName] = event.target.value;
    this.setState(currentState);
}
handlePhotoChange(event){
    let currentState = JSON.parse(JSON.stringify(this.state));
    currentState.photo = event.target.files[0];
    this.setState(currentState);
}
  render(){
    return (
      <div> 
      <Navbar/>
      
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
            <div className="col-md-9">

             <div className="jumbotron" 
              style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)',marginTop:'-60px'}}>
              <h1 className="text-center" id='title1'>Ajouter Type chambre</h1>
              <hr></hr>
              <CustomError errors={this.state.errors} />
              <form className="needs-validation">
                 
                <Box>
                  <div style={{marginTop:'40px',display:'inline'}}>
                    <TextField id="standard-basic" label="Nom" variant="standard" style={{width:'40%'}}
                    type="text" 
                    value={this.state.nom} onChange={(e) => this.handleInputChange(e, "nom")}/>
                                          <TextField id="standard-basic" label="chambre totale" variant="standard" type="number"
                    style={{width:'40%',marginLeft:'152px'}}
                    value={this.state.chambreTotal} onChange={(e) => this.handleInputChange(e, "chambreTotal")}/>
                  </div>

                  <div style={{marginTop:'30px'}}>
                    <TextField id="standard-basic" label="Etage" variant="standard" type="text"
                    style={{width:'40%'}}
                    value={this.state.etage} onChange={(e) => this.handleInputChange(e, "etage")}/>
                    <TextField id="standard-basic" label="Superficie" variant="standard" type="number" 
                    style={{width:'40%',marginLeft:'152px'}}
                    value={this.state.superficie} onChange={(e) => this.handleInputChange(e, "superficie")}/>
                  </div>

                  <div style={{marginTop:'70px'}}>
      <input type="file" className='form-control' value={this.state.photo} onChange={(e) => this.handleInputChange(e, "photo")} style={{width:'45%'}}/>
                  </div>



                  <div style={{marginTop:'20px'}}>
                    <div style={{}}>
                      <label className="form-label mt-4" style={{textDecoration:'underline'}}>Equipements: </label>
                    </div>
                    <div>
                      <FormControlLabel control={<Checkbox/>} label="Free Wifi"/>
                      <FormControlLabel control={<Checkbox/>} label="Air Conditioning" style={{marginLeft:"20px"}}/>
                      <FormControlLabel control={<Checkbox/>} label="Separate Shower" style={{marginLeft:"20px"}}/>
                    </div>
                    <div>
                      <FormControlLabel control={<Checkbox/>} label="Hair Dryer" />
                      <FormControlLabel control={<Checkbox/>} label="Desk or Workplace" style={{marginLeft:"10px"}} />
                    </div>
                  </div>

                  <div style={{marginTop:'10px'}}>
                    <label className="form-label mt-4" style={{textDecoration:'underline'}}>Occupation : </label>
                  </div>
                  <div style={{marginTop:'5px'}}>
                    <TextField id="standard-basic" label="Adulte" variant="standard" type="number"
                      value={this.state.nbAdulte}
                      onChange={(e) => this.handleInputChange(e, "nbAdulte")}
                      style={{width:'40%'}}/>
                    <TextField id="standard-basic" label="Enfant" variant="standard" type="number" 
                      value={this.state.nbEnfant}
                      onChange={(e) => this.handleInputChange(e, "nbEnfant")}
                      style={{width:'40%',marginLeft:'152px'}}/>
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
                    value={this.state.description}
                    onChange={(e) => this.handleInputChange(e, "description")} />
                  </div>
                </Box>
                <div style={{marginTop:'50px'}}>
                  <Button variant="contained" color="success" onClick={(e) => this.insert(e)}>
                    Créer
                  </Button>
                </div>
              </form>
             </div>
          </div>
          {/* <div className="col-md-3"></div> */}
        </div>
    </div>
  </div>
    );
  }
}
  
  export default InsertTypeCHambre;