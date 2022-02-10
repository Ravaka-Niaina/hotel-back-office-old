
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

    };
}

setDetailsClient(data){
    console.log(data);
    let currentState = JSON.parse(JSON.stringify(this.state));
    currentState = data;
    this.setState(currentState);
}

componentDidMount(){
  console.log(this.state.client);
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

tryRedirect(res){
  let currentState = JSON.parse(JSON.stringify(this.state));

  let keys = Object.keys(currentState.error);
  keys.map((k) => {
    currentState.error[k] = null;
  });

  if(res.status === 200){
    this.props.history.push('/');
  }else{
    currentState.errors = res.errors;
    keys = Object.keys(res.errors);
    keys.map((k) => {
        currentState.error[k] = res.errors[k];
    });
  }
  this.setState(currentState);
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
       Entrez le code de sécurité
       </h5>
       <hr/>
       <p id='paragraphe'>
       Merci de vérifier dans vos e-mails que vous avez reçu un message avec votre code. Celui-ci est composé de 4 chiffres.
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
            type="text" 
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
            <Button variant="contained" color="success" onClick={(e) => this.update(e)}>
            continuer
            </Button>
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