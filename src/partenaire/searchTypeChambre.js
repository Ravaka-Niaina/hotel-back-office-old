
import React from 'react';
import axios from 'axios';
import Select from 'react-select'
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import './typeChambre.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';


export default class searchTypeChambre extends React.Component {
  // state = {
  //   name: '',
  // }

  constructor(props){
    super(props);
    this.state = {
      typeChambre: [],
        nbAdulte: "",
        nbEnfant: ''
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
    axios.get(process.env.REACT_APP_BACK_URL + `/typeChambre/search/${this.state.nbAdulte}/${this.state.nbEnfant}`)
    .then(res => {
        const typeChambre = {typeChambre : res.data.typeChambre};
        console.log(typeChambre);
        this.setState(typeChambre);
      })
  }

  render() {
    return (
      <div className="" style={{marginLeft:"auto",marginRight:"auto"}}>
        <div className="entete">Recherche Type Chambre</div>
        <form onSubmit={this.handleSubmit}>
        <div className="contenue">
          <div className="formulaire">
<div className="form-group" style={{paddingTop:"15px"}} id='guest'>
<TextField 
id="standard-basic" 
className="form-control" 
label="Nombre adulte" 
variant="standard" 
style={{width:"400px"}}
type="number" name="nbAdulte" 
onChange={(e) => this.handleInputChange(e, "nbAdulte")}
/>

</div>

<div className="form-group" style={{}} id='guest'>
<TextField id="standard-basic" className="form-control" label="Nombre enfant" variant="standard" style={{width:"400px"}}
type="number" name="nbEnfant" 
onChange={(e) => this.handleInputChange(e, "nbEnfant")}/>
</div>
          </div>
        </div>
        <div className="pied" style={{marginTop:'25px'}}> 
<Button variant="contained" color="success" type='submit'>
Search
</Button><br/>
<Link to={'/promotion'}>
<Button variant="contained" style={{marginTop:'20px'}}>
Retour
</Button>
</Link>
        </div>
        </form>
        <h1>Resultat du recherche</h1> 
        <table className="table table-bordered">  
            <thead>  
              <tr>   
                  <th>Nom</th>  
                  <th>equipements</th>  
                  <th>Nombre Adulte</th>  
                  <th>Nombre Enfant</th>  
              </tr>  
            </thead>  
    
            <tbody>  
              {this.state.typeChambre.map((typeC) => (  
                <tr>  
                  <td>{typeC.nom}</td>   
                  <td>{typeC.equipements}</td>  
                  <td>{typeC.nbAdulte}</td>  
                  <td>{typeC.nbEnfant}</td>   
                </tr>  
              ))}  
            </tbody>  
    
        </table>  
      </div>
    )
  }
}