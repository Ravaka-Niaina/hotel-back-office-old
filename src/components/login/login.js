import CustomError from '../../CustomError';
import "./style.css";
import {Link} from 'react-router-dom';
import React from "react";
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
      <div className="container">
        <div className="base-container">
        <img src="user.png" style={{width : '12%',marginLeft:''}} ></img>
          <div className="content">
            <CustomError errors={this.state.errors} />
            <div className="form">
              <div className="form-group">
                <label htmlFor='email'>Email :</label>
                <input 
                  type="email" 
                  name="email" 
                  value={this.state.email} placeholder="Email"
                  onChange={(e) => this.handleEmailChange(e)}></input>
              </div>
              <div className="form-group">
                <label htmlFor='motPasse'>Mot de passe :</label>
                <input 
                  type="password" 
                  name="mdp" 
                  placeholder="Mot de passe"
                  value={this.state.mdp}
                  onChange={(e) => this.handleMdpChange(e)}></input>
              </div>
            </div>
          </div>
        
          <div className="footer">
            <button type="button" className="btn" id="btn" onClick={(e) => this.login(e)}>Login</button>
            <Link to='/Register'>
            <p style={{fontFamily:"",fontSize:"16px",color:"black"}}>S'inscrire</p>
              </Link>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Login;