
import React from 'react';
import axios from 'axios';
import Select from 'react-select'
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./promotion.css";
import InputAdornment from '@mui/material/InputAdornment';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { withStyles } from "@material-ui/core/styles";


export default class InsertPromotion extends React.Component {
  // state = {
  //   name: '',
  // }

  constructor(props){
    super(props);
    this.state = {
      typeChambres: [],
      tarifs: [],
      HideShowP: false,
      HideShowE: false,
      leadDay: false,
      leadHour: false,
        promotion: {
          errors: [],
          nom: '',
          planTarifaire: [],
          typeChambre: [],
          remisePourcentage: '',
          remiseEuro: '',
          dateDebutS: '',
          dateFinS: '',
          lundi: '',
          mardi: '',
          mercredi: '',
          jeudi: '',
          vendredi: '',
          samedi: '',
          dimanche: '',
          sejourMin:'',
          premierJour:'',
          dernierJour:'',
          leadDayMin:'',
          leadDayMax:'',
          leadHourMin:'',
          leadHourMax:''
        },
    };
}

  // handleChange = event => {
  //   this.setState({ name: event.target.value });
  // }

  async getTypeChambres(){
    axios.get(process.env.REACT_APP_BACK_URL + '/TCTarif')
    .then(res => {
      const typeChambres ={typeChambres: res.data.list} ;
      
      this.setState( typeChambres );
      console.log(this.state);
    })
  }

    async getTarifs(){
    axios.get(process.env.REACT_APP_BACK_URL + '/planTarifaire')
    .then(res => {
      const tarifs ={tarifs: res.data.list} ;
      
      this.setState( tarifs );
      console.log(this.state);
    })
  }

  handleInputChange(event, inputName){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.promotion[inputName] = event.target.value;
    this.setState(currentState);
}

//Une fonction qui gérera notre valeur sélectionnée
// handleSelectChange(event, selectName){
//   const currentState = JSON.parse(JSON.stringify(this.state));
//   currentState.promotion[selectName] = {_id:event.value};
//   this.setState(currentState)
//  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post(process.env.REACT_APP_BACK_URL + `/promotion/create`,  this.state.promotion )
      .then(res => {
        console.log(res);
        console.log(res.data);
          alert('success message ...');
      })
  }

  componentDidMount(){
    this.getTarifs()
    this.getTypeChambres()
}

  render() {
    return (
<div className="block">
 <form onSubmit={this.handleSubmit}>
<h4 className='entete'>Ajouter une nouvelle promotion</h4>
  <div className="block1">
  <h5>Détails de la promotion</h5>
   <div className="form-group" style={{marginTop:"15px"}}>
<label>
À quels plans tarifaires cette promotion s'appliquera-t-elle ?
</label>
<p>Sélectionnez au moins 1 plan tarifaire</p>
<div className="form-group"  style={{marginTop:"1px"}}>
{this.state.tarifs.map((tarif) => (  
<p>
  <Checkbox   
  value={tarif.nom}
  name="tarif"  
  onChange={(e) => this.handleInputChange(e, "tarif")}
  />
  {tarif.nom}
  </p>  
              ))}  
  </div>
   </div>

<label>
Quelles chambres ?
</label>
<p>Sélectionnez au moins 1 type de chambre</p>
  <div className="form-group"  style={{marginTop:"5px"}}>
{this.state.typeChambres.map((typeChambre) => (  
<p>
  <Checkbox   
  value={typeChambre.nom}
  name="typeChambre"  
  onChange={(e) => this.handleInputChange(e, "typeChambre")}
  />
  {typeChambre.nom}
  </p>  
              ))}
     
  </div>

<hr style={{width:'95%'}}></hr>

  <div className="form-group" style={{marginTop:"15px"}}>
<label>
Quelle remise voulez-vous offrir ?
</label>

<FormControl component="fieldset">
  <FormLabel component="legend"></FormLabel>
  <RadioGroup
    aria-label=""
    defaultValue=""
    name="radio-buttons-group"
  >
    <FormControlLabel 
    value="female" 
    control={<Radio />} 
    label={<p id='label'>Pourcentage</p>} 
    onClick={() => this.setState({HideShowE :false,HideShowP :true})}/>
    <FormControlLabel 
    value="male" 
    control={<Radio />} 
    label={<p id='label'>Euro</p>} 
    onClick={() => this.setState({HideShowP :false,HideShowE :true})}/>
  </RadioGroup>
</FormControl>

{
this.state.HideShowP ?
<TextField 
id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control" 
InputProps={{
startAdornment: <InputAdornment position="start">
    <strong>%</strong>
</InputAdornment>,
}}
style={{width:"100px",marginTop:"15px"}}
size="small"
type="number" 
name="remisePourcentage" 
onChange={(e) => this.handleInputChange(e, "remisePourcentage")}
/>
: null
}

{
this.state.HideShowE ?
<TextField 
id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control" 
InputProps={{
startAdornment: <InputAdornment position="start">
    <strong>£</strong>
</InputAdornment>,
}}
style={{width:"130px"}}
size="small"
type="number" 
name="remiseEuro" 
onChange={(e) => this.handleInputChange(e, "remiseEuro")}
/>
: null
}

  </div>
  </div>
  <div className='block2' style={{marginTop:"30px"}}>
<h5>Dates de séjour</h5>
<label style={{marginTop:"5px"}}>
Quand les clients peuvent-ils profiter de cette promotion ?
</label>
<p>Sélectionnez au moins 1 date</p>
  <div className="form-group" style={{marginTop:"25px"}}>
   <p>
   <input
    type='date'
    id='dateDebutS'
    style={{width:"200px"}}
    name="dateDebutS" 
    value={this.state.dateDebutS}
    onChange={(e) => this.handleInputChange(e, "dateDebutS")}
    
    /> 

{/* <TextField id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control"  
style={{width:"200px"}}
type="date" 
name="dateDebutS" 
onChange={(e) => this.handleInputChange(e, "dateDebutS")}
size="small"
/> */}

<input
    type='date'
    id='dateFinS'
    style={{width:"200px",marginLeft:'20px'}}
    type="date" 
    name="dateFinS" 
    value={this.state.dateFinS}
    onChange={(e) => this.handleInputChange(e, "dateFinS")}
    /> 

  {/* <TextField id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control"  
style={{width:"200px",marginLeft:'20px'}}
type="date" 
name="dateFinS" 
onChange={(e) => this.handleInputChange(e, "dateFinS")}
size="small"
/> */}
   </p>
  </div>

   <div className="form-group" style={{marginTop:"30px"}}>
<label>
Sejour minimum
</label>
<input
    type='number'
    id='sejourMin'
    style={{width:"300px",marginTop:"15px"}}
    name="sejourMin" 
    value={this.state.sejourMin}
    onChange={(e) => this.handleInputChange(e, "sejourMin")} 
    />

{/* <TextField 
id="outlined-basic" 
label=""
variant="outlined"
className="form-control" 
style={{width:"400px",height:'20px'}}
size="small"
type="text" 
name="sejourMin" 
onChange={(e) => this.handleInputChange(e, "sejourMin")} 
style={{marginTop:"15px"}}
/> */}
   </div>
  
   <div className="form-group" style={{marginTop:"40px"}}>
<label>
Lead hour ou day 
</label>
<FormControl component="fieldset">
  <FormLabel component="legend"></FormLabel>
  <RadioGroup
    aria-label=""
    defaultValue=""
    name="radio-buttons-group"
  >
    <FormControlLabel 
    value="mal" 
    control={<Radio />}  
    label={<p id='label'>Day</p>}
    onClick={() => this.setState({leadHour :false,leadDay :true})}/>
    <FormControlLabel 
    value="female" 
    control={<Radio />} 
    label={<p id='label'>Hour</p>} 
    onClick={() => this.setState({leadDay :false,leadHour :true})}/>
  </RadioGroup>
</FormControl>

{
  this.state.leadDay ?
<TextField 
id="outlined-basic" 
label="Min" 
variant="outlined" 
className="form-control" 
style={{width:"130px"}}
placeholder='Jour'
size="small"
type="number" 
name="leadDayMin" 
value={this.state.leadDayMin}
onChange={(e) => this.handleInputChange(e, "leadDayMin")}
/>
:null
}

{
  this.state.leadDay ?
<TextField 
id="outlined-basic" 
label="Max" 
variant="outlined" 
className="form-control" 
style={{width:"130px",marginTop:'15px'}}
placeholder='Jour'
size="small"
type="number" 
name="leadDayMax"
value={this.state.leadDayMax}
onChange={(e) => this.handleInputChange(e, "leadDayMax")}
/>
:null
}

{
  this.state.leadHour ?
<TextField 
id="outlined-basic" 
label="Min" 
variant="outlined" 
className="form-control" 
style={{width:"130px"}}
placeholder='Heure'
size="small"
type="number" 
name="leadHourMax" 
value={this.state.leadHourMax}
onChange={(e) => this.handleInputChange(e, "leadHourMax")}
/>
:null
}

{
  this.state.leadHour ?
<TextField 
id="outlined-basic" 
label="Max" 
variant="outlined" 
className="form-control" 
style={{width:"130px",marginTop:'15px'}}
placeholder='Heure'
size="small"
type="number" 
name="leadHourMin"
value={this.state.leadHourMin} 
onChange={(e) => this.handleInputChange(e, "leadHourMin")}
/>
:null
}

  </div> 

  <div className="form-group" style={{marginTop:"40px"}}>
<label id='bigLabel'>
Nombre de jour d'attribution de la promotion
</label>

<div className="form-group" style={{marginTop:"25px"}}>
<p>
<TextField id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control"  
style={{width:"200px"}}
type="text" 
name="premierJour" 
InputProps={{
  endAdornment: <InputAdornment position="end">
      premier jour
  </InputAdornment>,
  }}
value={this.state.premierJour}
onChange={(e) => this.handleInputChange(e, "premierJour")}
size="small"
/>

  <TextField id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control"  
style={{width:"200px",marginLeft:'20px'}}
type="text" 
name="dernierJour"
InputProps={{
  endAdornment: <InputAdornment position="end">
      dernier jour
  </InputAdornment>,
  }} 
value={this.state.dernierJour}
onChange={(e) => this.handleInputChange(e, "dernierJour")}
size="small"
/>
   </p>
   </div>
  </div>

  <div className="form-group" style={{marginTop:"15px"}}>
<label>
Tarif réduit disponible uniquement pendant :
</label>
   <p>
   <FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Lundi</p>}
value="1"
name="lundi"  
onChange={(e) => this.handleInputChange(e, "lundi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Mardi</p>}
value="1"
name="mardi"  
onChange={(e) => this.handleInputChange(e, "mardi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Mercredi</p>}
value="1"
name="mercredi"   
onChange={(e) => this.handleInputChange(e, "mercredi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Jeudi</p>} 
value="1"
name="jeudi"  
onChange={(e) => this.handleInputChange(e, "jeudi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Vendredi</p>} 
value="1"
name="vendredi"  
onChange={(e) => this.handleInputChange(e, "vendredi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Samedi</p>} 
value="1"
name="samedi"  
onChange={(e) => this.handleInputChange(e, "samedi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Dimanche</p>} 
value="1"
name="dimanche"  
onChange={(e) => this.handleInputChange(e, "dimanche")}
/>
   </p> 
  </div>

  </div>

  <div className="block3">
   <div className="form-group" style={{}}>
<h5>Nom de la promotion </h5>
<label>
Comment voulez-vous nommer cette promotion ?
</label>

<input
    type='text'
    id='nom'
    style={{width:"400px",marginTop:"15px"}} 
    name="nom" 
    onChange={(e) => this.handleInputChange(e, "nom")} 
    value={this.state.nom}
    /> 

{/* <TextField 
id="outlined-basic" 
label=""
variant="outlined"
className="form-control" 
style={{width:"400px"}}
size="small"
type="text" 
name="nom" 
onChange={(e) => this.handleInputChange(e, "nom")} 
style={{marginTop:"15px"}}
/> */}
   </div>     
   </div>    
    
  <div className="pied" style={{marginTop:'25px'}}>   
   <div class="bouton-aligne">  
<Button  
variant="contained" 
type='submit' 
style={{textDecoration:'none',color:'black'}}>
<span style={{color:'white'}}>Ajouter</span>
</Button>
   </div>
   <div class="bouton-aligne">
    <Link to={'/promotion'} style={{textDecoration:'none'}}>
       <Button variant="outlined" 
       id="btn2">
<span style={{color:'#1976d2'}}>Retour</span>
       </Button>
    </Link>
   </div>
  </div>
 </form>
</div>
    )
  }
}