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
      hotelDescription: false,
        description:'',
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

  handleEmailChange(event){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.email = event.target.value;
    this.setState(currentState);
  }

    handleDescriptionChange(event){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.description = event.target.value;
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
    <MenuItem value="1" onClick={() => this.setState({hotelDescription :true})}>Partenaire</MenuItem>
    <MenuItem value="2" onClick={() => this.setState({hotelDescription :false})}>Client</MenuItem>
  </Select>
</FormControl>
</div>
{
this.state.hotelDescription ?
<TextField 
id="outlined-basic"
variant="outlined"
multiline
rows={2}
rowsMax={4}
style={{
width:'300px',
height:'50px',
marginTop:'15px'
}}
type="text"
name="description" 
value={this.state.description}
onChange={(e) =>this.handleDescriptionChange(e)}
/>
: null
}
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
style={{backgroundColor:'#2ac4ea'}} 
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