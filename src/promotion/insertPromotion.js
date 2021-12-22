
// import { TextField } from "@mui/material";
import CustomError from '../CustomError';
import axios from "axios";
import React, {useEffect} from "react";
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
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
          label={<span id='label'>{tarif.nom}</span>}
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
          label={<span id='label'>{typeC.nom}</span>}
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
  const [visibleP, setVisibleP] = React.useState(false);
  const [visibleE, setVisibleE] = React.useState(false);
  const [visibleLD, setVisibleLD] = React.useState(false);
  const [visibleLH, setVisibleLH] = React.useState(false);
  let [state, setState] = useState(
    {
        errors: [],
        error: {
          nom: null,
          dateDebutS: null,
          dateFinS: null,
          sejourMin:null,
          premierJour:null,
          dernierJour:null
        },
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
    callAPI('post', '/TCTarif', {}, setListTypeChambre);
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
    console.log(res);
    let currentState = JSON.parse(JSON.stringify(state));
    let keys = Object.keys(currentState.error);
    keys.map((k) => {
      currentState.error[k] = null;
    });
    if(res.status === 200){
      history.push('/promotion');
    }else if(res.status === 401){//Unauthorized
      history.push('/login');
    }else{
      console.log(res.errors);
      let keys = Object.keys(res.errors);
      keys.map((k) => {
        currentState.error[k] = res.errors[k];
      });
    }
    setState(currentState);
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
      currentState.error[inputName] = null;
      setState(currentState);
  }
  
  return (
<div className="block">
<form>
<h4 className='enteteP'>Ajouter une nouvelle promotion</h4>
  <div className="block1">
  <h5>Détails de la promotion</h5>
   <div className="form-group" style={{marginTop:"15px"}}>
<label id='bigLabel'>
À quels plans tarifaires cette promotion s'appliquera-t-elle ?
</label>
<p id='litleLabel' style={{marginLeft:"15px",marginTop:'5px'}}>Sélectionnez au moins 1 plan tarifaire</p>
<div className="form-group"  style={{marginTop:"1px"}}>
<FormGroup>
<PlanTarifaire planTarifaire={state.planTarifaire} handleCheckBoxPlanTarifaire={handleCheckBoxPlanTarifaire}/>
</FormGroup> 
  </div>
   </div>
<label id='bigLabel'>
Quelles chambres ?
</label>
<p id='litleLabel' style={{marginLeft:"15px",marginTop:'5px'}}>Sélectionnez au moins 1 type de chambre</p>
  <div className="form-group"  style={{marginTop:"5px"}}>
  <FormGroup>
<TypeChambre typeChambre={state.typeChambre} handleCheckBoxTypeChambre={handleCheckBoxTypeChambre}/>
</FormGroup>    
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
    onClick={() => {setVisibleP(true);setVisibleE(false)}}/>
    <FormControlLabel 
    value="female" 
    control={<Radio />} 
    label={<p id='label'>Euro</p>} 
    onClick={() => {setVisibleE(true);setVisibleP(false)}}
    />
  </RadioGroup>
</FormControl>

{
visibleP &&
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
onChange={(e) => handleInputChange(e, "remisePourcentage")}
/>
}

{
  visibleE &&
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
onChange={(e) => handleInputChange(e, "remiseEuro")}
/>
}

  </div>

  </div>
  <div className='block2' style={{marginTop:"30px"}}>
<h5>Dates de séjour</h5>
<label style={{marginTop:"5px"}} id='bigLabel'>
Quand les clients peuvent-ils profiter de cette promotion ?
</label>
<p id='litleLabel' style={{marginLeft:"15px",marginTop:'5px'}}>Sélectionnez au moins 1 date</p>
  <div className="form-group" style={{marginTop:"25px"}}>
   <p>

<TextField id="outlined-basic" 
label="Date debut" 
InputLabelProps={{
shrink: true,
}}
variant="outlined" 
className="form-control"  
style={{width:"200px"}}
type="date" 
name="dateDebutS" 
value={state.dateDebutS}
onChange={(e) => handleInputChange(e, "dateDebutS")}
size="small"
error={state.error.dateDebutS === null ? false : true}
helperText={state.error.dateDebutS === null ? null : state.error.dateDebutS}
/>

<TextField id="outlined-basic" 
label="Date fin" 
InputLabelProps={{
  shrink: true,
  }}
variant="outlined" 
className="form-control"  
style={{width:"200px",marginLeft:'20px'}}
type="date" 
name="dateFinS" 
value={state.dateFinS}
onChange={(e) => handleInputChange(e, "dateFinS")}
size="small"
error={state.error.dateFinS === null ? false : true}
helperText={state.error.dateFinS === null ? null : state.error.dateFinS}
/>
   </p>
  </div>

   <div className="form-group" style={{marginTop:"30px"}}>
<label id='bigLabel'>
Sejour minimum
</label>

{/* <input
    type='number'
    id='sejourMin'
    style={{width:"300px",marginTop:"15px"}}
    name="sejourMin" 
    value={state.sejourMin}
    onChange={(e) => handleInputChange(e, "sejourMin")} 
    />  */}

<TextField 
id="outlined-basic" 
label="Sejour minimum"
variant="outlined"
className="form-control" 
style={{width:"200px"}}
size="small"
type="number" 
name="sejourMin" 
value={state.sejourMin}
onChange={(e) => handleInputChange(e, "sejourMin")} 
style={{marginTop:"15px"}}
error={state.error.sejourMin === null ? false : true}
helperText={state.error.sejourMin === null ? null : state.error.sejourMin}
/> 
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
    onClick={() => {setVisibleLD(true);setVisibleLH(false)}}/>
    <FormControlLabel 
    value="female" 
    control={<Radio />} 
    label={<p id='label'>Hour</p>} 
    onClick={() => {setVisibleLH(true);setVisibleLD(false)}}/>
  </RadioGroup>
</FormControl>

{
  visibleLD &&
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
onChange={(e) => handleInputChange(e, "leadDayMin")}
/>
}

{
  visibleLD &&
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
onChange={(e) => handleInputChange(e, "leadDayMax")}
/>
}

{
  visibleLH &&
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
onChange={(e) => handleInputChange(e, "leadHourMax")}
/>
}

{
  visibleLH &&
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
onChange={(e) => handleInputChange(e, "leadHourMin")}
/>
}

  </div> 

  <div className="form-group" style={{marginTop:"40px"}}>
<label id='bigLabel'>
Nombre de jour d'attribution de la promotion
</label>

<div className="form-group" style={{marginTop:"25px"}}>
<p>
<TextField id="outlined-basic" 
label="Premier jour" 
variant="outlined" 
className="form-control"  
style={{width:"200px"}}
type="number" 
name="premierJour" 
value={state.premierJour}
onChange={(e) => handleInputChange(e, "premierJour")}
size="small"
error={state.error.premierJour === null ? false : true}
helperText={state.error.premierJour === null ? null : state.error.premierJour}
/>

  <TextField id="outlined-basic" 
label="Dernier jour" 
variant="outlined" 
className="form-control"  
style={{width:"200px",marginLeft:'20px'}}
type="number" 
name="dernierJour"
value={state.dernierJour}
onChange={(e) => handleInputChange(e, "dernierJour")}
size="small"
error={state.error.dernierJour === null ? false : true}
helperText={state.error.dernierJour === null ? null : state.error.dernierJour}
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
control={<Checkbox/>} 
label={<p id='label'>Lundi</p>}
value="1"
name="lundi"  
onChange={(e) => handleInputChange(e, "lundi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Mardi</p>}
value="1"
name="mardi"  
onChange={(e) => handleInputChange(e, "mardi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Mercredi</p>}
value="1"
name="mercredi"   
onChange={(e) => handleInputChange(e, "mercredi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Jeudi</p>} 
value="1"
name="jeudi"  
onChange={(e) => handleInputChange(e, "jeudi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Vendredi</p>} 
value="1"
name="vendredi"  
onChange={(e) => handleInputChange(e, "vendredi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Samedi</p>} 
value="1"
name="samedi"  
onChange={(e) => handleInputChange(e, "samedi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Dimanche</p>} 
value="1"
name="dimanche"  
onChange={(e) => handleInputChange(e, "dimanche")}
/>
   </p> 
  </div>

  </div>

  <div className="block3">
   <div className="form-group" style={{}}>
<h5>Nom de la promotion </h5>
<label id='bigLabel'>
Comment voulez-vous nommer cette promotion ?
</label>

<TextField 
id="outlined-basic" 
label="Nom"
variant="outlined"
className="form-control" 
style={{width:"400px"}}
size="small"
type="text" 
name="nom" 
onChange={(e) => handleInputChange(e, "nom")} 
value={state.nom}
style={{marginTop:"15px"}}
error={state.error.nom === null ? false : true}
helperText={state.error.nom === null ? null : state.error.nom}
/> 
   </div>     
   </div>    


  <div className="pied" style={{marginTop:'25px'}}>   
   <div class="bouton-aligne">  
<Button  
variant="contained" 
type='submit' 
style={{textDecoration:'none',color:'black'}}
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