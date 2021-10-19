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

function Register() {
  return (
    <div className="base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="form">

        <div className="form-group">
            <label htmlFor='email'>Email :</label>
            <input type="email" name="email" placeholder="Email"></input>
          </div>
          <div className="form-group">
            <label htmlFor='motPasse'>Mot de passe :</label>
            <input type="password" name="mdp" placeholder="Mot de passe"></input>
          </div>
          <div className="form-group">
            <label htmlFor='confirmation'>Confirmation :</label>
            <input type="text" name="confirmMdp" placeholder="Confirmation du mot de passe"></input>
          </div>
          <div className="form-group">
            <label htmlFor='type'>Type utilisateur :</label>
            <input type="text" name="type" placeholder="Type utilisateur"></input>
          </div>
        </div>
      </div>
    
      <div className="footer">
        <button type="button" className="btn">Register</button>
        <Link to='/'>
          <button type="button" className="btn1">Retour</button>
          </Link>
      </div>
    </div>
            );
}

export default Register;