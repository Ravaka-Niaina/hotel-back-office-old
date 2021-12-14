
// import { TextField } from "@mui/material";
import CustomError from '../CustomError';
import axios from "axios";
import React, {useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import callAPI from '../utility';

import {Link} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import "./promotion.css";
import InputAdornment from '@mui/material/InputAdornment';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { withStyles } from "@material-ui/core/styles";
import {FileInput, Preview, Videos, Font} from '../partenaire/utilityTypeChambre.js';

import { useState } from 'react';

function PlanTarifaire(props){
  let i = -1;
  let list = props.planTarifaire.map(tarif => {
      i++;
      let u = i;
      return(
        <FormControlLabel 
          checked={tarif.checked}
          control={<Checkbox/>}
          onChange={(e) => props.handleCheckBoxPlanTarifaire(e, u)}
          label={<span id='litleLabel'>{tarif.nom}</span>}
          style={{marginLeft:"20px"}}
        />
      );
  })
  return list;
}

function TypeChambre(props){
  console.log(props.typeChambre);
  let i = -1;
  let typeChambre = props.typeChambre.map(typeC => {
      i++;
      let u = i;
      return(
        <FormControlLabel 
          checked={typeC.checked}
          control={<Checkbox/>}
          onChange={(e) => props.handleCheckBoxTypeChambre(e, u)}
          label={<span id='litleLabel'>{typeC.nom}</span>}
          style={{marginLeft:"20px"}}
        />
      );
  })
  return typeChambre;
}

function InsertPromotion(){
  const noImage = '/no-image.jpg';
  let [val, setVal] = useState(1);
  let [newIcon, setNewIcon] = useState({font: "", nom: ""});
  let [errInsertEq, setErrInsertEq] = useState(null);
  let [state, setState] = useState(
    {
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
    }
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const history = useHistory();
  
  function setPlanTarifaire(res){
    console.log(res);
    let current = JSON.parse(JSON.stringify(state));
    for(let i = 0; i < res.list.length; i++){
      res.list[i].checked = false;
    }
    current.planTarifaire = res.list;
    state = current;
    //setState(current);
  }

  // function setListTypeChambre(res){
  //   console.log(res);
  //   let current = JSON.parse(JSON.stringify(state));
  //   for(let i = 0; i < res.list.length; i++){
  //     res.list[i].checked = false;
  //   }
  //   current.typeChambre = res.list;
  //   state = current;
  //   //setState(current);
  // }

  function setListTypeChambre(res){
    console.log(res);
    let current = JSON.parse(JSON.stringify(state));
    for(let i = 0; i < res.list.length; i++){
      res.list[i].checked = false;
    }
    current.typeChambre = res.list;
    state = current;
}


  function setListEquipement(res){
    let current = JSON.parse(JSON.stringify(state));
    current.equipements = res.equipements;
    setState(current);
  }

  useEffect(() => {
    callAPI('post', '/typeChambre', {}, setListTypeChambre);
    callAPI('post', '/planTarifaire', {}, setPlanTarifaire);
    callAPI('get', '/equipement', {}, setListEquipement);
  }, []); 

  function handleCheckBoxPlanTarifaire(e, index){
    let current = JSON.parse(JSON.stringify(state));
    current.planTarifaire[index].checked = e.target.checked;
    setState(current);
  }

  function handleCheckBoxTypeChambre(e, index){
    let current = JSON.parse(JSON.stringify(state));
    current.typeChambre[index].checked = e.target.checked;
    setState(current);
  }

  function handleCheckBoxEquipement(e, index){
    let current = JSON.parse(JSON.stringify(state));
    current.equipements[index].checked = e.target.checked;
    setState(current);
    
  }

  function tryRedirect(res){
    if(res.status === 200){
      history.push('/promotion');
    }else if(res.status === 401){//Unauthorized
      history.push('/login');
    }else{
      let currentState = JSON.parse(JSON.stringify(state));
      currentState.errors = res.errors;
      setState(currentState);
    }
  }

  function insert(e){
      e.preventDefault();
      console.log('Envoie en attente...');
      let toSend = JSON.parse(JSON.stringify(state));

      let selectedEquip = [];
      for(let i = 0; i < state.equipements.length; i++){
        if(state.equipements[i].checked){
          selectedEquip.push(state.equipements[i]._id);
        }
      }
      toSend.equipements = selectedEquip;
      
      let selectedPlan = [];
      for(let i = 0; i < state.planTarifaire.length; i++){
        if(state.planTarifaire[i].checked){
          selectedPlan.push(state.planTarifaire[i]._id);
        }
      }
      toSend.planTarifaire = selectedPlan;

      let selectedTypeC = [];
      for(let i = 0; i < state.typeChambre.length; i++){
        if(state.typeChambre[i].checked){
          selectedTypeC.push(state.typeChambre[i]._id);
        }
      }
      toSend.typeChambre = selectedTypeC;
      axios({
          method: 'post',
          url: process.env.REACT_APP_BACK_URL + "/promotion/create",
          withCredentials: true,
          data: toSend
      })
      .then(res => tryRedirect(res.data))
      .catch(err => console.log(err));
  }

  function handleInputChange(event, inputName){
      const currentState = JSON.parse(JSON.stringify(state));
      currentState[inputName] = event.target.value;
      setState(currentState);
  }
  
  return (
<div className="block">
<form>
<h4 className='entete'>Ajouter une nouvelle promotion</h4>
  <div className="block1">
  <h6>Détails de la promotion</h6>
   <div className="form-group" style={{marginTop:"15px"}}>
<label id='bigLabel'>
À quels plans tarifaires cette promotion s'appliquera-t-elle ?
</label>
<p id='litleLabel' style={{textDecoration:'underline',marginLeft:'12px'}}>Sélectionnez au moins 1 plan tarifaire</p>
<div className="form-group"  style={{marginTop:"1px"}}>
<FormGroup>
<PlanTarifaire planTarifaire={state.planTarifaire} handleCheckBoxPlanTarifaire={handleCheckBoxPlanTarifaire}/>
</FormGroup> 
  </div>
   </div>
<label id='bigLabel'>
Quelles chambres ?
</label>
<p id='litleLabel' style={{textDecoration:'underline',marginLeft:'12px'}}>Sélectionnez au moins 1 type de chambre</p>
  <div className="form-group"  style={{marginTop:"5px"}}>
  <FormGroup>
<TypeChambre typeChambre={state.typeChambre} handleCheckBoxTypeChambre={handleCheckBoxTypeChambre}/>
</FormGroup>    
  </div>


<hr style={{width:'95%'}}></hr>

  {/* <div className="form-group" style={{marginTop:"15px"}}>
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

  </div> */}
  </div>
  <div className='block2' style={{marginTop:"30px"}}>
<h6>Dates de séjour</h6>
<label id='bigLabel' style={{marginTop:"5px"}}>
Quand les clients peuvent-ils profiter de cette promotion ?
</label>
<p id='litleLabel' style={{textDecoration:'underline',marginLeft:'12px'}}>Sélectionnez au moins 1 date</p>
  <div className="form-group" style={{marginTop:"25px"}}>
   <p>
<TextField id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control"  
style={{width:"200px"}}
type="date" 
name="dateDebutS" 
value={state.dateDebutS}
onChange={(e) => handleInputChange(e, "dateDebutS")}
size="small"
/>

  <TextField id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control"  
style={{width:"200px",marginLeft:'20px'}}
type="date" 
name="dateFinS" 
value={state.dateFinS}
onChange={(e) => handleInputChange(e, "dateFinS")}
size="small"
/>
   </p>
  </div>

   <div className="form-group" style={{marginTop:"30px"}}>
<label id='bigLabel'>
Sejour minimum
</label>
<TextField 
id="outlined-basic" 
label=""
variant="outlined"
className="form-control" 
style={{width:"400px",height:'20px'}}
size="small"
type="text" 
name="sejourMin" 
value={state.sejourMin}
onChange={(e) => handleInputChange(e, "sejourMin")} 
style={{marginTop:"15px"}}
/>
   </div>
  
  {/* <div className="form-group" style={{marginTop:"40px"}}>
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
<TextField 
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
/>

: null
}

{
this.state.HideShowH ?
<TextField 
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
/>
: null
}

  </div> */}

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
value={state.premierJour}
onChange={(e) => handleInputChange(e, "premierJour")}
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
value={state.dernierJour}
onChange={(e) => handleInputChange(e, "dernierJour")}
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
/> 

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Decembre</p>}
value="1"
name="decembre"  
onChange={(e) => handleInputChange(e, "decembre")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Janvier</p>}
value="1"
name="janvier"  
onChange={(e) => handleInputChange(e, "janvier")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Fevrier</p>}
value="1"
name="fevrier"   
onChange={(e) => handleInputChange(e, "fevrier")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Mars</p>}
value="1"
name="mars"  
onChange={(e) => handleInputChange(e, "mars")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Avril</p>} 
value="1"
name="avril"  
onChange={(e) => handleInputChange(e, "avril")}
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
<TextField 
id="outlined-basic" 
label=""
variant="outlined"
className="form-control" 
style={{width:"400px"}}
size="small"
type="text" 
name="nom" 
onChange={(e) => handleInputChange(e, "nom")} 
value={state.nom}
style={{marginTop:"15px"}}
/>
   </div>     
   </div>    
    
  <div className="pied" style={{marginTop:'25px'}}>   
   <div class="bouton-aligne">  
<Button  
variant="contained" 
type='submit' 
style={{textDecoration:'none',backgroundColor:'#2ac4ea'}}
onClick={(e) => insert(e)}>
<span style={{color:'white'}}>Ajouter</span>
</Button>
   </div>
   <div class="bouton-aligne">
    <Link to={'/promotion'} style={{textDecoration:'none'}}>
       <Button variant="outlined" 
       id="btn2"
       >
<span style={{color:'#1976d2'}}>Retour</span>
       </Button>
    </Link>
   </div>
  </div>
 </form>
</div>
  );
}
  
  export default InsertPromotion;