// import React from "react";

// export class Login extends React.Component{

//     constructor(props){
//         super(props);
//     }

//     render(){
//         return (
// <div className="container">
// <div className="base-container">
//   <div className="header">Login</div>
//   <div className="content">
//     <div className="form">
//       <div className="form-group">
//         <label htmlFor='username'>Username</label>
//         <input type="text" name="username" placeholder="Username"></input>
//       </div>
//       <div className="form-group">
//         <label htmlFor='password'>Password</label>
//         <input type="password" name="password" placeholder="Password"></input>
//       </div>
//     </div>
//   </div>

//   <div className="footer">
//     <button type="button" className="btn">login</button>
//   </div>
// </div>
// </div>
//         );
//     }
// }
import "./style.css";
import {Link} from 'react-router-dom';

function Login() {
  return (
    <div className="container">
    <div className="base-container">
    <img src="user.png" style={{width : '12%',marginLeft:''}} ></img>
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
        </div>
      </div>
    
      <div className="footer">
        <button type="button" className="btn">Login</button>
        <Link to='/Register'>
        <p style={{fontFamily:"",fontSize:"16px",color:"black"}}>S'inscrire</p>
          </Link>
      </div>
    </div>
    </div>
            );
}

export default Login;