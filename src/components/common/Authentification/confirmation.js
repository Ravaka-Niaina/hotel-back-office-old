
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

search(e){
  e.preventDefault();
  axios.get(`http://localhost:3000/client/search/${this.state.codeR}`)
  .then(res => {
      const client = {client : res.data.client};
      // console.log(user);
      this.setState(client);
    })
}

handleInputChange(event, inputName){
  const currentState = JSON.parse(JSON.stringify(this.state));
  currentState[inputName] = event.target.value;
  this.setState(currentState);
}

  render() {
    return (
      <div className="">
       <h5 id="grandTitre">
       Entrez le code de sécurité
       </h5>
       <p id="paragraphe">
       Merci de vérifier dans vos e-mails que vous avez reçu un message avec votre code. Celui-ci est composé de 4 chiffres.
       </p>

       <form>
        <div className="content">
          <div className="form">
            <div className="form-group" style={{paddingTop:"15px"}}>
              <TextField 
              id="standard-basic" 
              className="form-control" 
              label="code" 
              variant="outlined" 
              style={{width:"400px"}}
              type="text" 
              name="codeR"
              onChange={(e) => this.handleInputChange(e, "codeR")}/>
            </div>
                      </div>
                    </div>
                    <div className="footer" style={{marginTop:'25px'}}>
          <box> 
            {this.state.hideShowBtn1?
            <Button 
            variant="contained" 
            color="success" 
            type='submit' 
            onClick={(e) => {this.search(e);this.setState({hideShowBtn2 :true,hideShowBtn1 :false})}}>
            Envoyer
            </Button>
            :null}
            {this.state.hideShowBtn2?
            <Link to={'/recover/password/' + this.state.client._id} style={{textDecoration:'none'}}>
            <Button variant="contained" style={{marginTop:'20px'}}>
            Continuer
            </Button>
            </Link>
            :null}
          </box>
                </div>
        </form>  
      </div>
    )
  }
}