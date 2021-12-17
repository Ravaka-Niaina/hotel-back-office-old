
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
      HideShowJ: false,
      HideShowH: false,
        promotion: {
            nom: '',
            tarif: '',
            typeChambre: '',
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
            novembre: '',
            decembre: '',
            janvier: '',
            fevrier: '',
            mars: '',
            avril: '',
            sejourMin:'',
            leadHour:'',
            leadDay:'',
            premierJour:'',
            dernierJour:''
        },
    };
}

  // handleChange = event => {
  //   this.setState({ name: event.target.value });
  // }

  async getTypeChambres(){
    axios.get(process.env.REACT_APP_BACK_URL + '/typechambre')
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
        if(res.data.status == 200){
          console.log("Should redirect now...");
          this.props.history.push('/promotion');
        }else{
          console.log(res.data.message);
        }
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
  <h6>Détails de la promotion</h6>
   <div className="form-group" style={{marginTop:"15px"}}>
<label id='bigLabel'>
À quels plans tarifaires cette promotion s'appliquera-t-elle ?
</label>
<p id='litleLabel'>Sélectionnez au moins 1 plan tarifaire</p>
<div className="form-group"  style={{marginTop:"1px"}}>
{this.state.tarifs.map((tarif) => (  
<p>
  <Checkbox   
  value={tarif.nom}
  name="tarif"  
  onChange={(e) => this.handleInputChange(e, "tarif")}
  />
  <span id='litleLabel'>
    {tarif.nom}
  </span>
  </p>  
              ))}  
  </div>
   </div>

<label id='bigLabel'>
Quelles chambres ?
</label>
<p id='litleLabel'>Sélectionnez au moins 1 type de chambre</p>
  <div className="form-group"  style={{marginTop:"5px"}}>
{this.state.typeChambres.map((typeChambre) => (  
<p>
  <Checkbox   
  value={typeChambre.nom}
  name="typeChambre"  
  onChange={(e) => this.handleInputChange(e, "typeChambre")}
  />
  <span id='litleLabel'>
    {typeChambre.nom}
  </span>
  </p>  
              ))}
     
  </div>

<hr style={{width:'95%'}}></hr>

  <div className="form-group" style={{marginTop:"15px"}}>
<label id='bigLabel'>
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
    value="male" 
    control={<Radio />} 
    label={<p id='label'>Pourcentage</p>} 
    onClick={() => this.setState({HideShowE :false,HideShowP :true})}/>
    <FormControlLabel 
    value="female" 
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
<h6>Dates de séjour</h6>
<label style={{marginTop:"5px"}} id='bigLabel'>
Quand les clients peuvent-ils profiter de cette promotion ?
</label>
<p id='litleLabel'>Sélectionnez au moins 1 date</p>
  <div className="form-group" style={{marginTop:"25px"}}>
   <p>
<input
type='date'
id='dateD'
name="dateDebutS" 
onChange={(e) => this.handleInputChange(e, "dateDebutS")}
style={{width:"200px"}}
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
id='dateF'
name="dateFinS" 
onChange={(e) => this.handleInputChange(e, "dateFinS")}
style={{width:"200px",marginLeft:'20px'}}
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
<label id='bigLabel'>
Sejour minimum
</label>

<input
type='number'
id='sejourMin'
name="sejourMin" 
onChange={(e) => this.handleInputChange(e, "sejourMin")} 
style={{marginTop:"15px"}}
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
<label id='bigLabel'>
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
    onClick={() => this.setState({HideShowH :false,HideShowJ :true})}/>
    <FormControlLabel 
    value="female" 
    control={<Radio />} 
    label={<p id='label'>Hour</p>} 
    onClick={() => this.setState({HideShowJ :false,HideShowH :true})}/>
  </RadioGroup>
</FormControl>

{
this.state.HideShowJ ?
<input
type='number'
id='leadDay'
name="leadDay" 
placeholder='Jour'
onChange={(e) => this.handleInputChange(e, "leadDay")}
style={{width:"130px"}}
/>

/* <TextField 
id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control" 
style={{width:"130px"}}
placeholder='Jour'
size="small"
type="number" 
name="leadDay" 
onChange={(e) => this.handleInputChange(e, "leadDay")}
/> */

: null
}

{
this.state.HideShowH ?
<input
type='number'
id='leadHour'
name="leadHour" 
placeholder='Heure'
onChange={(e) => this.handleInputChange(e, "leadHour")}
style={{width:"130px"}}
/>

/* <TextField 
id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control" 
style={{width:"130px"}}
placeholder='Heure'
size="small"
type="number" 
name="leadHour" 
onChange={(e) => this.handleInputChange(e, "leadHour")}
/> */
: null
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
onChange={(e) => this.handleInputChange(e, "dernierJour")}
size="small"
/>
   </p>
   </div>
  </div>

  <div className="form-group" style={{marginTop:"15px"}}>
<label id='bigLabel'>
Tarif réduit disponible uniquement pendant :
</label>
   <p>
<FormControlLabel 
control={<Checkbox />} 
label={<p id='label'>Novembre</p>}
value="1"
name="novembre"  
onChange={(e) => this.handleInputChange(e, "novembre")}
/> 

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Decembre</p>}
value="1"
name="decembre"  
onChange={(e) => this.handleInputChange(e, "decembre")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Janvier</p>}
value="1"
name="janvier"  
onChange={(e) => this.handleInputChange(e, "janvier")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Fevrier</p>}
value="1"
name="fevrier"  
onChange={(e) => this.handleInputChange(e, "fevrier")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Mars</p>}
value="1"
name="mars"  
onChange={(e) => this.handleInputChange(e, "mars")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Avril</p>} 
value="1"
name="avril"  
onChange={(e) => this.handleInputChange(e, "avril")}
/>
   </p> 
  </div>

  </div>

  <div className="block3">
   <div className="form-group" style={{}}>
<h6>Nom de la promotion </h6>
<label id='bigLabel'>
Comment voulez-vous nommer cette promotion ?
</label>
<input
type='text'
id='nom'
name="nom" 
onChange={(e) => this.handleInputChange(e, "nom")} 
style={{marginTop:"15px",width:"400px"}}
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
style={{textDecoration:'none',color:'black',backgroundColor:'#2ac4ea'}}>
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