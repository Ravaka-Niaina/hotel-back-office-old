
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
  console.log(res);
  let currentState = JSON.parse(JSON.stringify(this.state));
  if(res.status === 200){
    this.props.history.push('/');
  }
  // else if(res.status === 401){//Unauthorized
  //   this.props.history.push('/');
  // }
  this.setState(currentState);
}

handleInputChange(event, inputName){
  const currentState = JSON.parse(JSON.stringify(this.state));
  currentState.client[inputName] = event.target.value;
  this.setState(currentState);
}

update(e){
  e.preventDefault();
  console.log(this.state.client);
  let toSend = JSON.parse(JSON.stringify(this.state.client));
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
      <div className="">
       <h5 className="">
       Entrez le code de sécurité
       </h5>
       <p className="">
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
            name="mdp" 
            onChange={(e) => this.handleInputChange(e, "mdp")}
            />
            </div>
                      </div>
                    </div>
                    <div className="footer" style={{marginTop:'25px'}}> 
            <Button variant="contained" color="success" onClick={(e) => this.update(e)}>
            continuer
            </Button>
            <br/>
            <Link>
            <Button variant="contained" style={{marginTop:'20px'}}>
            Retour
            </Button>
            </Link>
        </div>
        </form>  
      </div>
    )
  }
}