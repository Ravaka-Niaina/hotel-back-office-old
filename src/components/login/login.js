import  Sidebar  from "../../Sidebar/Sidebar";
import  Navbar  from "../../Navbar/Navbar";
import CustomError from '../../CustomError';
import "./style.css";
import {Link} from 'react-router-dom';
import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const axios = require('axios').default;

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
      this.props.history.push('/');
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
        <Navbar/>
        
        <div className="container">
          <div className="base-container">
          <img src="user.png" style={{width : '12%',marginLeft:''}} ></img>
            <div className="content">
              <CustomError errors={this.state.errors} />
              <div className="form">
                <div className="form-group" style={{paddingTop:"15px"}}>
                  <TextField id="standard-basic" className="form-control" label="Email" variant="standard" style={{width:"350px"}}
                  type="email" 
                  name="email" 
                  value={this.state.email} placeholder="Email"
                  onChange={(e) => this.handleEmailChange(e)}/>
                  </div>
                  <div className="form-group" style={{paddingTop:"15px"}}>
                  <TextField id="standard-basic" className="form-control" label="Mot de passe" variant="standard" style={{width:"350px"}}
                  type="password" 
                  name="mdp" 
                  value={this.state.mdp}
                  onChange={(e) => this.handleMdpChange(e)}/>
                </div>
              </div>
            </div>
              

            <Link to='/Register' style={{textDecoration:'none',marginLeft:'290px',marginTop:'30px'}}>
              <p style={{color:"#87CEEB",fontSize:"17px",color:'#2F4050',textDecoration:'underline'}}>S'inscrire</p>
            </Link>
            <div className="footer">
              {/* <button type="button" className="btn" id="btn" onClick={(e) => this.login(e)}>Login</button> */}
              <Button variant="contained" style={{backgroundColor:'#1E90FF'}} onClick={(e) => this.login(e)}>
              Se Connecter
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Login;