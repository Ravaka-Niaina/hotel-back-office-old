// import React from "react";

// export class Register extends React.Component{

//     constructor(props){
//         super(props);
//     }

//     render(){
//         return (
// <div className="base-container">
//   <div className="header">Register</div>
//   <div className="content">
//     <div className="form">
//       <div className="form-group">
//         <label htmlFor='username'>Username</label>
//         <input type="text" name="username" placeholder="Username"></input>
//       </div>
//       <div className="form-group">
//         <label htmlFor='email'>Email</label>
//         <input type="email" name="email" placeholder="Email"></input>
//       </div>
//       <div className="form-group">
//         <label htmlFor='password'>Password</label>
//         <input type="password" name="password" placeholder="Password"></input>
//       </div>
//     </div>
//   </div>

//   <div className="footer">
//     <button type="button" className="btn">Register</button>
//   </div>
// </div>
//         );
//     }
// }

import "./style.css";
import {Link} from 'react-router-dom';
import React from "react";

function CustomError(props){
  if(props.errors.length > 0){
    return(
    <div className="erreur">
      <p><strong>{ props.errors[0].message }</strong></p>
    </div>);
  }else{
    return(
      <div>

      </div>
    );
  }
}


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
      <div className="base-container">
        <div className="header">Register</div>
        <div className="content">
          <CustomError errors={this.state.errors}/>
          <div className="form">
  
          <div className="form-group">
              <label htmlFor='email'>Email :</label>
              <input type="email" name="email" 
                placeholder="Email" 
                value={this.state.email}
                onChange={(e) =>this.handleEmailChange(e)}></input>
            </div>
            <div className="form-group">
              <label htmlFor='motPasse'>Mot de passe :</label>
              <input type="password" name="mdp" 
                placeholder="Mot de passe" 
                value={this.state.mdp}
                onChange={(e) =>this.handleMdpChange(e)}></input>
            </div>
            <div className="form-group">
              <label htmlFor='confirmation'>Confirmation :</label>
              <input type="password" name="confirmMdp" 
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
            </div>
          </div>
        </div>
      
        <div className="footer">
          <button type="button" className="btn"
            onClick={(e) => this.register(e)}>
            Register
            </button>
          <Link to='/'>
            <button type="button" className="btn1">
              Retour
              </button>
            </Link>
        </div>
      </div>
              );
  }
}

export default Register;