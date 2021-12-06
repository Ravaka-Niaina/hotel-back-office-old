import  Sidebar  from "../../Sidebar/Sidebar";
import  Navbar  from "../../Navbar/Navbar";
import CustomError from '../../CustomError';
import "./style.css";
import {Link} from 'react-router-dom';
import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
const axios = require('axios').default;

function Typecookie(type){
  const [cookies, setCookie] = useCookies();
  return setCookie('type', type, { path: '/' });
}


class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      mdp: '',
      errors: [], 
      type : ""
    };
  }

  tryRedirectToHome(res){
    console.log(res);
    this.state.type = res.type;
    if(res.status === 200){
      if(res.type == "61aa0a7fd50d02f54b01a3ed"){
        this.props.history.push('/frontClient');
      }
      if(res.type == "61aa0a7fd50d02f54b01a3ee"){
        this.props.history.push('/');
      }
      if(res.type == "61aa0a7fd50d02f54b01a3ec"){
        this.props.history.push('/');
      }
      //Typecookie(res.type);
      
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
  }

  render(){
    return (
      <div>
        <div className="container">
          <div className="login-container">
          <img src="user.png" style={{width : '15%',marginLeft:''}} ></img>
            <div className="content">
              <CustomError errors={this.state.errors} />
              <div className="form">
                <div className="form-group" style={{paddingTop:"15px"}}>
                  <TextField 
                  id="standard-basic" 
                  className="form-control" 
                  label={
                    <p>
                      Email
                    </p>
                        } 
                  variant="standard" 
                  style={{width:"280px"}}
                  type="email" 
                  name="email" 
                  value={this.state.email}
                  onChange={(e) => this.handleEmailChange(e)}/>
                  </div>
                  <div className="form-group" style={{paddingTop:"15px"}}>
                  <TextField 
                  id="standard-basic" 
                  className="form-control" 
                  label={
                    <p>
                      Mot de passe
                    </p>
                        }
                   variant="standard" 
                   style={{width:"280px"}}
                  type="password" 
                  name="mdp" 
                  value={this.state.mdp}
                  onChange={(e) => this.handleMdpChange(e)}/>
                </div>
              </div>
            </div>
              

            <Link 
            to='/Register' 
            style={{
              textDecoration:'none',
              marginLeft:'210px',
              marginTop:'30px'}}>
              <p 
              style={{
                color:"#87CEEB",
                color:'#2F4050',
                textDecoration:'underline'}}>
                S'inscrire
                </p>
            </Link>
            <div className="footer">
              <Button 
              variant="contained" 
              style={{backgroundColor:'#1E90FF'}} 
              onClick={(e) => this.login(e)}>
              <span style={{color:'white'}}>Se Connecter</span>
              </Button>
            </div>
          </div>
        </div>
      </div> 
    );
  }
  
}

export default Login;