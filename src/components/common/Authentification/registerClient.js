// import "./register.css";
import {Link} from 'react-router-dom';
import React from "react";
// import CustomError from '../../CustomError';
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
    fetch(process.env.REACT_APP_BACK_URL + "/client/", requestOptions)
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

  render(){
    return (
      <div className="base-container">
        <div className="header">Register</div>
        <div className="content">
          {/* <CustomError errors={this.state.errors}/> */}
          <div className="form">
<div className="form-group" style={{paddingTop:"15px"}}>
<TextField id="standard-basic" className="form-control" label="Email" variant="standard" style={{width:"400px"}}
type="email" 
name="email" 
value={this.state.email}
onChange={(e) =>this.handleEmailChange(e)}/>
</div>
<div className="form-group" style={{paddingTop:"15px"}}>
<TextField id="standard-basic" className="form-control" label="Mot de passe" variant="standard" style={{width:"400px"}}
type="password" 
name="mdp" 
value={this.state.mdp}
onChange={(e) =>this.handleMdpChange(e)}/>
</div>
<div className="form-group" style={{paddingTop:"15px"}}>
<TextField id="standard-basic" className="form-control" label="Confirmation mot de passe" variant="standard" style={{width:"400px"}}
type="password"
name="confirmMdp"
placeholder="Confirmation du mot de passe"
value={this.state.confirmMdp}
onChange={(e) =>this.handleConfirmMdpChange(e)}/>
</div>

          </div>
        </div>
      
        <Link to='/login' style={{textDecoration:'none',marginLeft:'305px',marginTop:'30px'}}>
            <p style={{color:"#87CEEB",fontSize:"17px",color:'#2F4050',textDecoration:'underline'}}>Se connecter</p>
          </Link>
        <div className="footer">
<Button variant="contained" color="success" onClick={(e) => this.register(e)}>
S'inscrire
</Button>
        </div>
      </div>
    );
  }
  
}

export default Register;