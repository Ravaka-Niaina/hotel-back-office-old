import CustomError from '../CustomError';
import { styled, createTheme } from '@mui/material/styles';

import "./style.css";
import {Link} from 'react-router-dom';
import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
const axios = require('axios').default;

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      mdp: '',
      errors: []
    };
  }

  tryRedirectToHome(res){
    console.log(res);
    if(res.status === 200){
      this.props.history.push('/home');
    }else{
      let currentState = JSON.parse(JSON.stringify(this.state));
      currentState.errors = res.errors;
      this.setState(currentState);
    }
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

  login(e){
    e.preventDefault();
    let data = {email: this.state.email, mdp: this.state.mdp};
    axios({
      method: 'post',
      url: process.env.REACT_APP_BACK_URL + "/user/login",
      withCredentials: true,
      data: data
    })
    .then(res => this.tryRedirectToHome(res.data))
    .catch(err => console.log(err))
  
        /*
    fetch("http://localhost:3000/user/list")
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res)));
    */
  }

  render(){
    return(
      <html>
        <head>
          <meta name="viewport" content="initial-scale=1, width=device-width" /> 
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </head>
        <body>
          <div className="container">
            <div className="base-container">
            <img src="user.png" alt="" style={{width : '12%',marginLeft:''}} ></img>
              <div className="content">
              <CustomError errors={this.state.errors} />
                <div className="form">
                  <div className="form-group">
                    <label htmlFor='email'>Email :</label>
                    <input type="email" 
                      name="email" placeholder="Email" 
                      value={this.state.email}
                      onChange={(e) => this.handleEmailChange(e)} ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor='motPasse'>Mot de passe :</label>
                    <input type="password" 
                    name="mdp" placeholder="Mot de passe" 
                    value={this.state.mdp}
                    onChange={(e) => this.handleMdpChange(e)}></input>
                  </div>
                </div>
              </div>
            
              <div className="footer">
                <p>
                  <LoadingButton type="button" variant="contained" onClick={(e) => this.login(e)}>Login</LoadingButton>
                </p>
                <p>
                  <Link to='/Register'>
                    <Button>S'inscrire</Button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
      
    );
  }
}



export default Login;