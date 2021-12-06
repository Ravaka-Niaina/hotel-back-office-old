import "./register.css";
import {Link} from 'react-router-dom';
import React from "react";
import CustomError from '../../CustomError';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import APIGeT from "./utility.js";

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hotelDescription: false,
        description:'',
        email: '',
        mdp: '',
        confirmMdp: '',
        type: '',
        status: '',
        errors: [],
        nom : "",
        prenom :"",
        typeU : []
    };
    this.CallBackListRole = this.CallBackListRole.bind(this);
  }

  CallBackListRole(data){
    let current = JSON.parse(JSON.stringify(this.state));
    current.typeU = data.roles;
    this.setState(current);
  }
  
  componentDidMount(){
    APIGeT("get" , "/roles/find" , this.CallBackListRole);
    }
  
  tryRedirectLogin(res){
    if(res.status === 200){
      this.props.history.push('/login');
    }else{
      let currentState = JSON.parse(JSON.stringify(this.state));
      currentState.errors = res.errors;
      this.setState(currentState);
    }
  }

  register(e){
    console.log(this.state);
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(this.state)
    };
    fetch(process.env.REACT_APP_BACK_URL + "/user/", requestOptions)
      .then(res => res.json())
      .then(res => this.tryRedirectLogin(res));
  }

    handleDescriptionChange(event){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.description = event.target.value;
    this.setState(currentState);
  }
  handleTypeChange(event , fieldname){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState[fieldname] = event.target.value;
    this.setState(currentState);
    console.log(currentState);
    console.log(currentState.typeU);
  }

  render(){
    let typeUser = this.state.typeU.map(typeA => {
      return(
        <MenuItem value={typeA._id}> <span>{typeA.name}</span></MenuItem>
      )
    });

    return (
      <div className="body"> 
        <div className="register-container">
            <div className="header">Register</div>
              <CustomError errors={this.state.errors}/><br/>
            <div className="form">
            <div className="form-group" style={{marginTop:"10px"}}>
              <FormControl fullWidth>
                <TextField
                  label="nom"style={{width:"300px"}}
                  name="nom" value={this.state.nom}
                  onChange={(e) =>this.handleTypeChange(e , "nom")}
                />
              </FormControl>
              </div>
              <div className="form-group" style={{marginTop:"10px"}}>
                <FormControl fullWidth>
                  <TextField
                    label="Prenom"style={{width:"300px"}}
                    name="type" value={ this.state.prenom}
                    onChange={(e) =>this.handleTypeChange(e , "prenom")}
                  />
                </FormControl>
              </div>
              <div className="form-group" style={{paddingTop:"15px"}}>
                <TextField id="standard-basic" className="form-control" 
                label={<p style={{fontSize:'16px'}}>Email</p> } 
                variant="standard" style={{width:"300px"}}
                type="email" name="email" value={this.state.email}
                onChange={(e) =>this.handleTypeChange(e , "email")}/>
              </div>
              <div className="form-group" style={{paddingTop:"15px"}}>
                <TextField id="standard-basic"className="form-control" 
                label={<p style={{fontSize:'16px'}}>Mot de passe</p>} 
                variant="standard" style={{width:"300px"}}type="password" 
                name="mdp" value={this.state.mdp}
                onChange={(e) =>this.handleTypeChange(e , "mdp")}/>
              </div>
              <div className="form-group" style={{paddingTop:"15px"}}>
              <TextField id="standard-basic" className="form-control" 
                label={<p style={{fontSize:'16px'}}>Confirmation mot de passe</p>} 
                variant="standard" style={{width:"300px"}}type="password"
                name="confirmMdp" placeholder="Confirmation du mot de passe"
                value={this.state.confirmMdp}
                onChange={(e) =>this.handleTypeChange(e , "confirmMdp")}/>
              </div>
              <div className="form-group" style={{paddingTop:"40px"}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type utilisateur</InputLabel>
                <Select
                  labelId="demo-simple-select-label" id="demo-simple-select"
                  label="Type utilisateur"style={{width:"300px"}}
                  name="type" value={ this.state.type}
                  onChange={(e) =>this.handleTypeChange(e , 'type')}
                >
                  {typeUser}
                {/*<MenuItem value="1" onClick={(e) => this.setState({hotelDescription : true})}>Partenaire</MenuItem>
                  <MenuItem value="2" onClick={() => this.setState({hotelDescription :false})}>Client</MenuItem>
                */}
                  </Select>
              </FormControl>
              
              </div>
              {
                this.state.hotelDescription ?
                  <TextField 
                  id="outlined-basic" variant="outlined"
                  multiline rows={2} rowsMax={4}
                  style={{width:'300px',height:'50px',marginTop:'15px'}}
                  type="text" name="description" 
                  value={this.state.description}
                  onChange={(e) =>this.handleDescriptionChange(e)}
                  />
                  : null
              }
              <Link to='/login' style={{textDecoration:'none',marginLeft:'210px',marginTop:'30px'}}>
                <p style={{color:'#2F4050',textDecoration:'underline'}}>Se connecter</p>
              </Link>
              <div className="footer">
                <Button variant="contained" color="primary" 
                  onClick={(e) => this.register(e)} style={{textDecoration:'none'}}>
                  <span style={{color:'white'}}>S'inscrire</span>
                </Button>
              </div>
        </div>
      </div>
    </div>
    );
  }
  
}

export default Register;
