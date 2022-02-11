
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


export default class Confirmation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        customer:{
          id:''
        },
        client:[],
        codeR: "",
        hideShowBtn1:true,
        hideShowBtn2:false,
    };
}

tryRedirect(res){
  let currentState = JSON.parse(JSON.stringify(this.state));
  if(res.status === 200){
    this.props.history.push('/recover/password/' + this.state.client._id);
  }
  this.setState(currentState);
}

search(e){
  e.preventDefault();
  callAPI('get', '/client/search/' + this.state.codeR, {}, (data) => {
    const client = {client : data.client};
    this.setState(client);
    this.tryRedirect(data);
  });
}

handleInputChange(event, inputName){
  const currentState = JSON.parse(JSON.stringify(this.state));
  currentState[inputName] = event.target.value;
  this.setState(currentState);
}

  render() {
    return (
    <div id="division">  
      <div className="">
       <h5 id="grandTitre">
       Entrez le code de sécurité
       </h5>
       <hr/>
       <p id="paragraphe">
       Merci de vérifier dans vos e-mails que vous avez reçu un message avec votre code. Celui-ci est composé de 4 chiffres.
       </p>
       <form>
        <div className="content">
          <div className="form">
            <div>
              {console.log(this.state.client)}
              {(this.state.client == null) ?
              <Alert severity="error">Les chiffres saisis ne correspondent pas à votre code. Veuillez réessayer.</Alert>
              :
              null
              }
            </div>
            <div className="form-group" style={{paddingTop:"15px"}}>
              <TextField 
              id="standard-basic" 
              className="form-control" 
              label="Entrez le code" 
              variant="outlined" 
              style={{width:"400px"}}
              type="text" 
              name="codeR"
              size="small"
              fullWidth
              onChange={(e) => this.handleInputChange(e, "codeR")}/>
            </div>
                      </div>
                    </div>
                    <div className="footer" style={{marginTop:'25px'}}>
          <box> 

            <Button 
            variant="contained" 
            color="success" 
            type='submit' 
            style={{fontWeight:'bold'}}
            onClick={(e) => {this.search(e)}}>
            Envoyer
            </Button>

            <Link to={'/'} style={{textDecoration:'none',marginLeft: "10px"}}>
            <Button style={{backgroundColor: "gainsboro",color: "black",fontWeight: "bold"}}>
            Annuler
            </Button>
            </Link>
          </box>
                </div>
        </form>  
      </div>
    </div>
    )
  }
}