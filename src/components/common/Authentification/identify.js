
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
import Alert from '@mui/material/Alert';
import ButtonLoading from "./buttonLoading.js";


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
        btnLoad:false,
        btnLoad1:false
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

tryRedirect(res){
  let currentState = JSON.parse(JSON.stringify(this.state));
  if(res.status === 200){
    this.setState({btnLoad1:false});
    this.props.history.push('/confirmation');
  }
  this.setState(currentState);
}
  
sendMailToCustomer(e){
  e.preventDefault();
  this.setState({btnLoad1:true});
  let toSend = JSON.parse(JSON.stringify(this.state));
  axios({
      method: 'post',
      url: process.env.REACT_APP_BACK_URL + "/client/sendMailToCustomer",
      withCredentials: true,
      data: toSend
  })
  .then(res => this.tryRedirect(res.data))
  .catch(err => console.log(err));
}

  handleInputChange(event, inputName){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState[inputName] = event.target.value;
    this.setState(currentState);
}

handleSubmit = event => {
  event.preventDefault();
  this.setState({btnLoad:true});
  callAPI('get', '/user/search/' + this.state.email, {}, (data) => {
    const user = {user : data.user};
      this.setState(user);
      this.setState({btnLoad:false});
  });
}
  render() {
    return (
    <div id='division'>  
      <div className="division1">
        <h5 id='grandTitre'>Retrouvez votre compte</h5>
        <hr/>
         <form onSubmit={this.handleSubmit}>
        <div className="content">
          <div className="form">
           <div className="form-group" style={{paddingTop:"15px"}}>
            <p id='paragraphe'>Veuillez entrer votre adresse e-mail pour rechercher votre compte.</p>
            <TextField 
            id="standard-basic" 
            className="form-control" 
            label="Adresse email" 
            variant="outlined"
            type="text" 
            name="email" 
            size="small"
            fullWidth
            onChange={(e) => this.handleInputChange(e, "email")}/>
           </div>

          </div>
        </div>
        <div id="btn-group" style={{marginTop:'25px'}}> 
          <Link to={'/'} style={{textDecoration:'none',marginLeft: "10px"}}>
          <Button style={{backgroundColor: "gainsboro",color: "black",fontWeight: "bold"}}>
          Annuler
          </Button>
          </Link>
          {console.log('Button loading='+this.state.btnLoad)}
                {
        this.state.btnLoad
          ? <ButtonLoading />
          : 
          <Button 
          variant="contained" 
          color="primary" 
          type='submit' 
          style={{fontWeight: "bold",marginLeft:'10px'}}
          disabled={this.state.email.trim() == '' ? true : false}>
          Rechercher
          </Button>
        }
          <br/>
        </div>
        </form>
        


     <div id='division2'>
{(this.state.user !== null) ?
      <div> 
       <div id='result'>  
        <p id='infoUser'>{this.state.user.prenom} {this.state.user.nom}</p>     
       </div>
       <div>
        {(this.state.user.length !== 0)?
          <p id="paragraphe" style={{textDecoration:'underline'}}>            
        Envoyer le code par e-mail :
          </p> 
        :
        null
        }   
        <p id='infoUser'> 
        {this.state.user.email}           
        </p>
       </div> 
        <TextField 
        id="standard-basic" 
        label="" 
        variant="outlined" 
        style={{width:"400px",display: "none"}} 
        type="email" 
        name="email" 
        value={this.state.user.email}
        onChange={(e) => this.handleEmailChange(e)} />
       <div> 
        <box> 
        {(this.state.hideShowBtn1 && (this.state.user.length !== 0))?
         <div>
           
                {
          this.state.btnLoad1
          ? <ButtonLoading />
          : 
          <Button 
          variant="contained" 
          color="success" 
          type='submit' 
          style={{fontWeight:'bold'}}

          onClick={(e) => {this.sendMailToCustomer(e)}}>
          Ok
          </Button>
                }
          
         </div>
          :
          null
          }
          {(this.state.hideShowBtn2 && (this.state.user.length !== 0))?
         <div>
          <Link to={'/confirmation'} style={{textDecoration:'none'}}>
          <Button variant="contained" color='secondary' style={{fontWeight:'bold'}}>
          Continuer
          </Button>
          </Link>
         </div>
          :
          null
          } 
        </box> 
       </div>
      </div>
:
<Alert severity="error">Cette compte n'existe pas</Alert>
}  
     </div>    
      </div>
    </div>
    )
  }
}