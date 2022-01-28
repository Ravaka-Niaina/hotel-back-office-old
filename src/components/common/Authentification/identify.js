
import React from 'react';
import axios from 'axios';
import Select from 'react-select'
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


export default class searchTypeChambre extends React.Component {
  // state = {
  //   name: '',
  // }

  constructor(props){
    super(props);
    this.state = {
      user: [],
        email: ""
    };
}

  // handleChange = event => {
  //   this.setState({ name: event.target.value });
  // }

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
        <div className="header">Recherche un compte</div>
        <form onSubmit={this.handleSubmit}>
        <div className="content">
          <div className="form">
<div className="form-group" style={{paddingTop:"15px"}}>
<TextField id="standard-basic" className="form-control" label="email" variant="outlined" style={{width:"400px"}}
type="text" name="email" 
onChange={(e) => this.handleInputChange(e, "email")}/>
</div>
          </div>
        </div>
        <div className="footer" style={{marginTop:'25px'}}> 
<Button variant="contained" color="success" type='submit'>
Search
</Button>
<br/>
<Link to={'/promotion'}>
<Button variant="contained" style={{marginTop:'20px'}}>
Retour
</Button>
</Link>
        </div>
        </form>
        <h5>Resultat du recherche</h5>   
              {this.state.user.map((utilisateur) => (  
                <div id='result'>  
                  <p id='infoUser'>{utilisateur.prenom} {utilisateur.nom}</p>     
                </div>,
                <div>
                  <p>
                Comment voulez-vous recevoir votre code de réinitialisation du mot de passe ?
                 </p> 
                 <p>            
                Envoyer le code par e-mail
                 </p>  
                 <p>            
                {utilisateur.email}
                 </p>
<TextField id="standard-basic" label="email" variant="outlined" style={{width:"400px"}} type="hidden" name="email" value={utilisateur.email}/>
<Button variant="contained" color="success" type='submit'>
Continuer
</Button>
                </div>    
              ))}  
      </div>
    )
  }
}