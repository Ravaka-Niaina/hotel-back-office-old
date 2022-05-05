
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
import ButtonLoading from "./buttonLoading.js";


export default class RecoverPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        client:{
        _id: "",
        mdp:""
        },
        customer:[],
        password:""
        ,errors: [],
        error: {
          password: null,
        },
        btnLoad:false

    };
}

setDetailsClient(data){
    console.log(data);
    let currentState = JSON.parse(JSON.stringify(this.state));
    currentState = data;
    this.setState(currentState);
}

errorPage(){

}

componentDidMount(){
  console.log(this.state.client);
  let access = localStorage.getItem('access');
  if(access != '64' || access != 64){
this.props.history.push('/confirmation');
  }else{
    axios({
        method: 'get',
        url: process.env.REACT_APP_BACK_URL +
            "/client/details/" + this.props.match.params._id+ '?id',
        withCredentials: true
    })
    .then(res => this.setDetailsClient(res.data))
    .catch(err => console.log(err));

    let script = document.createElement("script");
    script.src = "./script.js";
    script.async = true;
    document.body.appendChild(script);
  }
}

tryRedirect(res){
  let currentState = JSON.parse(JSON.stringify(this.state));
  
  let keys = Object.keys(currentState.error);
  keys.map((k) => {
    currentState.error[k] = null;
  });

  if(res.status === 200){
    localStorage.setItem('access',0);
    this.props.history.push('/');
  }else{
    this.setState({btnLoad:false});
    currentState.errors = res.errors;
    keys = Object.keys(res.errors);
    keys.map((k) => {
        currentState.error[k] = res.errors[k];
    });
  }
  this.setState(currentState);
  this.setState({btnLoad:false});
}

handleInputChange(event, inputName){
  const currentState = JSON.parse(JSON.stringify(this.state));
  currentState[inputName] = event.target.value;
  currentState.error[inputName] = null;
  this.setState(currentState);
}

update(e){
  e.preventDefault();
  let toSend = JSON.parse(JSON.stringify(this.state));
  this.setState({btnLoad:true});
  axios({
      method: 'post',
      url: process.env.REACT_APP_BACK_URL + "/client/update",
      withCredentials: true,
      data: toSend
  })
  .then(res => this.tryRedirect(res.data))
  .catch(err => console.log(err));
  
}

  render() {
    return (
      <div id="division">
        <h5 id='grandTitre'>
        Choisissez un nouveau mot de passe
        </h5>
        <hr/>
        <p id='paragraphe'>
        Créez un mot de passe d’au moins 5 caractères. Un mot de passe fort est une combinaison de lettres, de chiffres et de signes de ponctuation.
        </p>
       <form onSubmit={this.handleSubmit}>
        <div className="content">
          <div className="form">
            <div className="form-group" style={{paddingTop:"15px"}}>
              <TextField 
              id="standard-basic" 
              className="form-control" 
              label="" 
              variant="outlined" 
              style={{width:"400px",display: "none"}}
              type="text" 
              name="id"
              value={this.state.client._id}
              />
            </div>
            <div>
            <TextField id="outlined-basic" 
            label="Mot de passe" 
            variant="outlined" 
            className="form-control"  
            style={{width:"200px"}}
            type="password" 
            name="password" 
            fullWidth
            size='small'
            onChange={(e) => this.handleInputChange(e, "password")}
            error={this.state.error.password === null ? false : true}
            helperText={this.state.error.password === null ? null : this.state.error.password}
            />
            </div>
          </div>
        </div>
          <div className="footer" style={{marginTop:'25px'}}> 
          {
          this.state.btnLoad
          ? <ButtonLoading />
          : 
            <Button variant="contained" color="success" onClick={(e) => this.update(e)}>
            continuer
            </Button>
          }
            <Link to={'/'} style={{textDecoration:'none',marginLeft: "10px"}}>
            <Button style={{backgroundColor: "gainsboro",color: "black",fontWeight: "bold"}}>
            Annuler
            </Button>
            </Link>
          </div>
       </form>  
      </div>
    )
  }
}