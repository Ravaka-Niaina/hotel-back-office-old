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

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        email: '',
        mdp: '',
        confirmMdp: '',
        type: '',
        status: '',
        errors: []
    };
  }

  tryRedirectLogin(res){
    if(res.status === 200){
      this.props.history.push('/');
    }else{
      let currentState = JSON.parse(JSON.stringify(this.state));
      currentState.errors = res.errors;
      this.setState(currentState);
    }
  }

  register(e){
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

  handleEmailChange(event){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.email = event.target.value;
    this.setState(currentState);
  }

  handleMdpChange(event){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.mdp = event.target.value;
    this.setState(currentState);
  }

  handleConfirmMdpChange(event){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.confirmMdp = event.target.value;
    this.setState(currentState);
  }

  handleTypeChange(event){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.type = event.target.value;
    this.setState(currentState);
  }

  render(){
    return (
      <div className="register-container">
        <div className="header">Register</div>
        <div className="content">
          <CustomError errors={this.state.errors}/>
          <div className="form">
  
          {/* <div className="form-group">
              <label htmlFor='email'>Email :</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Email"
                value={this.state.email}
                onChange={(e) =>this.handleEmailChange(e)}></input>
            </div>
            <div className="form-group">
              <label htmlFor='motPasse'>Mot de passe :</label>
              <input 
                type="password" 
                name="mdp" 
                placeholder="Mot de passe"
                value={this.state.mdp}
                onChange={(e) =>this.handleMdpChange(e)}></input>
            </div>
            <div className="form-group">
              <label htmlFor='confirmation'>Confirmation :</label>
              <input
                type="password"
                name="confirmMdp"
                placeholder="Confirmation du mot de passe"
                value={this.state.confirmMdp}
                onChange={(e) =>this.handleConfirmMdpChange(e)}></input>
            </div>
            <div className="form-group">
              <label htmlFor='type'>Type utilisateur :</label>
              <select className="form-select" name="type" 
                value={ this.state.type}
                onChange={(e) =>this.handleTypeChange(e)}>
                  <option value="0">Veuillez choisir un type...</option>
                <option value="1">Partenaire</option>
                <option value="2">Client</option>
              </select>
            </div> */}

<div className="form-group" style={{paddingTop:"15px"}}>
<TextField 
id="standard-basic" 
className="form-control" 
label={
<p style={{fontSize:'16px'}}>
Email
</p>
} 
variant="standard" 
style={{width:"300px"}}
type="email" 
name="email" 
value={this.state.email}
onChange={(e) =>this.handleEmailChange(e)}/>
</div>
<div className="form-group" style={{paddingTop:"15px"}}>
<TextField 
id="standard-basic"
 className="form-control" 
 label={
<p style={{fontSize:'16px'}}>
Mot de passe
</p>
} 
 variant="standard" 
 style={{width:"300px"}}
type="password" 
name="mdp" 
value={this.state.mdp}
onChange={(e) =>this.handleMdpChange(e)}/>
</div>
<div className="form-group" style={{paddingTop:"15px"}}>
<TextField 
id="standard-basic" 
className="form-control" 
label={
<p style={{fontSize:'16px'}}>
Confirmation mot de passe
</p>
} 
variant="standard" 
style={{width:"300px"}}
type="password"
name="confirmMdp"
placeholder="Confirmation du mot de passe"
value={this.state.confirmMdp}
onChange={(e) =>this.handleConfirmMdpChange(e)}/>
</div>
<div className="form-group" style={{paddingTop:"40px"}}>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Type utilisateur</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Type utilisateur"
    style={{width:"300px"}}
    name="type" 
    value={ this.state.type}
    onChange={(e) =>this.handleTypeChange(e)}
  >
    <MenuItem value="1">Partenaire</MenuItem>
    <MenuItem value="2">Client</MenuItem>
  </Select>
</FormControl>
</div>
          </div>
        </div>
      
        <Link 
        to='/login' 
        style={{
          textDecoration:'none',
          marginLeft:'210px',
          marginTop:'30px'}}>
            <p style={{
              color:'#2F4050',
              textDecoration:'underline'}}>
              Se connecter
              </p>
          </Link>
        <div className="footer">
          {/* <button type="button" className="btn" id="btn"
            onClick={(e) => this.register(e)}>
            Register
            </button> */}
<Button 
variant="contained" 
color="primary" 
onClick={(e) => this.register(e)}
style={{textDecoration:'none'}}>
<span style={{color:'white'}}>S'inscrire</span>
</Button>
        </div>
      </div>
    );
  }
  
}

export default Register;