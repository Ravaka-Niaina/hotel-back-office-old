
import React from 'react';
import axios from 'axios';
import Select from 'react-select'
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import callAPI from '../../../utility';
import "./global.css";


export default class SearchTypeChambre extends React.Component {
  // state = {
  //   name: '',
  // }

  constructor(props){
    super(props);
    this.state = {
        utilisateur:{
          email:''
        },
        user:[],
        email: "",
        hideShowBtn1:true,
        hideShowBtn2:false,

    };
}

  // handleChange = event => {
  //   this.setState({ name: event.target.value });
  // }

  handleEmailChange(event,inputName){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.utilisateur[inputName] = event.target.value;
    this.setState(currentState);
}
  
sendMailToCustomer(e){
  e.preventDefault();
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(this.state)
  };
  fetch(process.env.REACT_APP_BACK_URL + "/client/sendMailToCustomer",requestOptions)
      .then(res => res.json())
      .then(res => {this.setMessageRetour(res); console.log(res)});
}

  handleInputChange(event, inputName){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState[inputName] = event.target.value;
    this.setState(currentState);
}

handleSubmit = event => {
  event.preventDefault();
  axios.get(`http://localhost:3000/user/search/${this.state.email}`)
  .then(res => {
      const user = {user : res.data.user};
      console.log(user);
      this.setState(user);
    })
}

  render() {
    return (
      <div className="" style={{marginLeft:"auto",marginRight:"auto"}}>
        <h5 id='grandTitre'>Rechercher votre compte</h5>
        <form onSubmit={this.handleSubmit}>
        <div className="content">
          <div className="form">
<div className="form-group" style={{paddingTop:"15px"}}>
<p id='paragraphe'>Entrez votre e-mail</p>
<TextField id="standard-basic" className="form-control" label="email" variant="outlined" style={{width:"400px"}}
type="text" name="email" 
onChange={(e) => this.handleInputChange(e, "email")}/>
</div>
          </div>
        </div>
        <div className="footer" style={{marginTop:'25px'}}> 
<Button variant="contained" color="primary" type='submit'>
Search
</Button>
<br/>
        </div>
        </form>
        <hr/>
             
              {this.state.user.map((utilisateur) => (  
               <div> 
                <div id='result'>  
                  <p id='infoUser'>{utilisateur.prenom} {utilisateur.nom}</p>     
                </div>
                <div>
                 <p id="paragraphe">            
                Envoyer le code par e-mail :
                 </p>  
                 <p id='infoUser'> 
                 {utilisateur.email}           
                 </p>
                </div> 
                <TextField 
                id="standard-basic" 
                label="" 
                variant="outlined" 
                style={{width:"400px",display: "none"}} 
                type="email" 
                name="email" 
                value={utilisateur.email}
                onChange={(e) => this.handleEmailChange(e)} />
                <div> 
                <box> 
                {this.state.hideShowBtn1?
                <Link to={'/confirmation'} style={{textDecoration:'none'}}>
                <Button 
                variant="contained" 
                color="success" 
                type='submit' 
                onClick={(e) => {this.sendMailToCustomer(e);this.setState({hideShowBtn2 :true,hideShowBtn1 :false})}}>
                Ok
                </Button>
                </Link>
                :
                null
                }
                {this.state.hideShowBtn2?
                <Link to={'/confirmation'} style={{textDecoration:'none'}}>
                <Button variant="contained" color='secondary'>
                 Continuer
                </Button>
                </Link>
                :
                null
                }
                <Link to={'/'} style={{textDecoration:'none'}}>
                <Button variant="contained">
                Ce n'est pas vous ?
                </Button>
                </Link>
                </box> 
                </div> 
              </div>   
              ))}   
      </div>
    )
  }
}