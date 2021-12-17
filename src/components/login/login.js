import Cookies from 'universal-cookie';
import  Sidebar  from "../../Sidebar/Sidebar";
import  Navbar  from "../../Navbar/Navbar";
import CustomError from '../../CustomError';
import "./style.css";
import {Link} from 'react-router-dom';
import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { breadcrumbsClasses } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const axios = require('axios').default;

const styles = theme => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important"
  }
});

function Typecookie(type){
  console.log(type);
  const [cookies, setCookie] = useCookies();
  return setCookie('idSession', type, { path: '/' });
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
    this.state.type = res.idSession;
    if(res.status === 200){
      const cookie = new Cookies();
      cookie.set('sessionId', this.state.type , { path: '/' })
      window.location.href = "/"
      //this.props.history.push("/");
    }else{
      let currentState = JSON.parse(JSON.stringify(this.state));
      currentState.errors = res.errors;
      this.setState(currentState);
    }
  }

  componentDidMount(){
      const cookie = new Cookies();
      cookie.set('sessionId', "V01", { path: '/login' });
      document.body.style.backgroundColor = "#2F4050";

        
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
    const {classes} = this.props;
    return (
      <div>
        <div className="container">
          <div className="login-container"> 
           <div id='img'>
           <AccountCircleIcon fontSize="large" style = {{color : "white"}}/>
           </div>
            <div className="content">
              <CustomError errors={this.state.errors} />
              <div className="form">
                <div className="form-group" style={{paddingTop:"15px"}}>
                  <TextField style={{width:"300px"}} 
                     type ="email" label ="email" 
                    name="email"  value={this.state.email}
                    onChange={(e) => this.handleEmailChange(e)}
                   
                    /> <br/>
                  
                    <TextField type ="password"
                      label="password"style={{width:"300px"}}
                      name="mdp" value={this.state.mdp}
                      onChange={(e) => this.handleMdpChange(e)}/>
                    
                    {/**
                  <TextField 
                  id="standard-basic" 
                  className="form-control" 
                  label={
                    <p>
                      Email
                    </p>
                        } 
                  variant="standard" 
                  style={{}}
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
                   style={{}}
                  type="password" 
                  name="mdp" 
                  value={this.state.mdp}
                  onChange={(e) => this.handleMdpChange(e)}/> */}
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
                color:"white",
                textDecoration:'underline'}}>
                S'inscrire
                </p>
            </Link>
            <div className="footer">
              <Button 
              variant="contained"  size ="small"
              style={{backgroundColor:'#1E90FF'}} 
              onClick={(e) => this.login(e)}>
              <span style={{color:'white'}}>Se Connecter</span>
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  }
  
}

export default(Login);