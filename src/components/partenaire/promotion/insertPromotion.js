
import CustomError from '../../../CustomError';
import axios from "axios";
import React, {useEffect} from "react";
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import callAPI from '../../../utility.js';

import {Link} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import "./promotion.css";
import InputAdornment from '@mui/material/InputAdornment';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import ButtonLoading from "../buttonLoading.js";
import SkelettonForm from '../../../SkeletonListe/SkeletonFormulaire.js';
import  Navbar  from "../Navbar/Navbar";

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
          sejourMin:null,
          premierJour:null,
          dernierJour:null,
          leadMin: null, 
          leadMax: null,
          remise:null,
          typeChambre:null,
          planTarifaire:null,
          dateDebutS: null,
          dateFinS: null,
        },
        nom: '',
        planTarifaire: [],
        typeChambre: [],
        dateDebutS: '',
        dateFinS: '',
        weekDays:{
        lundi: '',
        mardi: '',
        mercredi: '',
        jeudi: '',
        vendredi: '',
        samedi: '',
        dimanche: ''
                },
        sejourMin:'',
        premierJour:'',
        dernierJour:'',
        isLeadHour: true
        ,lead: {min: '', max: ''}
        ,isRemiseEuro: true
        ,remise:'',
    }
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [skeletonAffiche , setSkeleton] = useState(true);

  const history = useHistory();

  function setListTypeChambre(res){
    let current = JSON.parse(JSON.stringify(state));
    for(let i = 0; i < res.listTypeChambre.length; i++){
      res.listTypeChambre[i].checked = false;
    }
    current.typeChambre = res.listTypeChambre;

    for(let i = 0; i < res.listTarif.length; i++){
      res.listTarif[i].checked = false;
    }
    current.planTarifaire = res.listTarif;
    setState(current);
    setSkeleton(false);
}

  useEffect(() => {
    callAPI('get', '/TCTarif/list', {}, setListTypeChambre);
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
  
  function tryRedirect(res){
    console.log(res);
    let currentState = JSON.parse(JSON.stringify(state));
    let keys = Object.keys(currentState.error);
    keys.map((k) => {
      currentState.error[k] = null;
    });
    if(res.status === 200){
      history.push('/back/promotion');
    }else if(res.status === 401){//Unauthorized
      setBtnLoad(false);
      history.push('/back/login');
    }else{
      setBtnLoad(false);
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
      setBtnLoad(true);
      let toSend = JSON.parse(JSON.stringify(state));
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

  function handleInputChange2( e, name1, name2){
    console.log(e.target.value);
    let current = JSON.parse(JSON.stringify(state));
    current[name1][name2] = e.target.value;
    setState(current)
    }

    function handleInputChange3( e, name1, name2){
      console.log(e.target.value);
      let current = JSON.parse(JSON.stringify(state));
      current[name1][name2] = Number.parseInt(e.target.value);
      setState(current)
      }

    function handleInputRemiseChange( e, name1){
      console.log(e.target.value);
      let current = JSON.parse(JSON.stringify(state));
      current[name1] = e.target.value;
      setState(current)
      }
    
  function handleIsLeadHourChange(value){
    let temp = {...state};
    temp.isLeadHour = value;
    setState(temp);
        }

  function handleIsRemiseEuroChange(value){
    let temp = {...state};
    temp.isRemiseEuro = value;
    setState(temp);
        }
  
  return (
<>
<Navbar currentPage={3}/>
<div className="block">
        {
          skeletonAffiche ? <SkelettonForm  heigth = {300} />  : <>
        <h4 id="title1">Ajouter une nouvelle promotion</h4><br/>
          <h5>Détails de la promotion</h5>
            <div className="form-group" style={{marginTop:"15px"}}>
              <label id='bigLabel'>À quels plans tarifaires cette promotion s'appliquera-t-elle ? </label>
              <p id='litleLabel' style={{marginLeft:"15px",marginTop:'5px'}}>Sélectionnez au moins 1 plan tarifaire</p>
                <div className="form-group"  style={{marginTop:"1px"}}>
                    <FormGroup>
                      <PlanTarifaire planTarifaire={state.planTarifaire} handleCheckBoxPlanTarifaire={handleCheckBoxPlanTarifaire}/>
                      {state.error.planTarifaire === null ? null : <div className="customError"><span>{state.error.planTarifaire}</span></div>}
                    </FormGroup> 
                </div>
            </div>
                <label id='bigLabel'>
                  Quelles chambres ?
                </label>
                <p id='litleLabel' style={{marginLeft:"15px",marginTop:'5px'}}>Sélectionnez au moins 1 type de chambre</p>
              <div className="form-group"  style={{marginTop:"5px"}}>
                <FormGroup>
                    <TypeChambre 
                        typeChambre={state.typeChambre} 
                        handleCheckBoxTypeChambre={handleCheckBoxTypeChambre}
                      />
                      {state.error.typeChambre === null ? null : <div className="customError"><span>{state.error.typeChambre}</span></div>}
                </FormGroup>    
              </div>
          <hr style={{width:'95%'}}></hr>
          <div style={{marginTop:'0px'}}>
              <div>
                  <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px',marginLeft:'0px'}} >
                      Remise { state.isRemiseEuro ? "Euro" : "Pourcentage"} 
                  </label>
              </div>
              <RadioGroup
                  aria-label="Pourcentage"
                  defaultValue="euro"
                  name="radio-buttons-group"
              >
                  <div className ="row" style={{marginTop:'15px'}}>
                      <div className ="col">
                          <TextField
                          label="Remise"
                          type='number'
                          id=''
                          size='small'
                          value={state.remise.euro}
                          placeholder='Hour/Date'
                          onChange={(e) => handleInputRemiseChange( e, "remise")}
                          error={state.error.remise === null ? false : true}
                          helperText={state.error.remise === null ? null : state.error.remise}
                          /> 
                          {console.log(state.error.remise)}
                      </div>
                      <div className ="col">
                          <FormControlLabel 
                          value="euro" 
                          onClick={(e) => handleIsRemiseEuroChange(true)} 
                          control={<Radio />} 
                          label={
                          <span id='litleLabel'>
                          Euro
                          </span>} />
                      </div>
                      <div className ="col">
                          <FormControlLabel  
                          value="pourcentage" 
                          onClick={(e) => handleIsRemiseEuroChange(false)} 
                          control={<Radio />} 
                          label={
                              <span id='litleLabel'>
                                Pourcentage
                              </span>} /> 
                      </div>
                  </div>
              </RadioGroup>
          </div>
              
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

  <div style={{marginTop:'0px'}}>
      <div>
          <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px',marginLeft:'0px'}} >
              Lead { state.isLeadHour ? "hour" : "day"} 
          </label>
      </div>
      <RadioGroup
          aria-label="Lead"
          defaultValue="hour"
          name="radio-buttons-group"
      >
          <div className ="row" style={{marginTop:'15px'}}>
              <div className ="col">
                  <TextField
                  label="Min"
                  type='number'
                  id='lead'
                  size='small'
                  value={state.lead.min}
                  placeholder='Hour/Date'
                  onChange={(e) => handleInputChange2( e, "lead", "min")}
                  error={state.error.leadMin === null ? false : true}
                  helperText={state.error.leadMin === null ? null : state.error.leadMin}
                  /> 
              </div>
              <div className ="col">
                  <TextField
                  label="Max"
                  type='number'
                  id='lead'
                  size='small'
                  value={state.lead.max}
                  placeholder='Hour/Date'
                  onChange={(e) => handleInputChange2( e, "lead", "max")}
                  error={state.error.leadMax === null ? false : true}
                  helperText={state.error.leadMax === null ? null : state.error.leadMax}
                  /> 
              </div>
              <div className ="col">
                  <FormControlLabel 
                  value="hour" 
                  onClick={(e) => handleIsLeadHourChange(true)} 
                  control={<Radio />} 
                  label={
                  <span id='litleLabel'>
                  Hour
                  </span>} />
              </div>
              <div className ="col">
                  <FormControlLabel  
                  value="day" 
                  onClick={(e) => handleIsLeadHourChange(false)} 
                  control={<Radio />} 
                  label={
                      <span id='litleLabel'>
                        Day
                      </span>} /> 
              </div>
          </div>
      </RadioGroup>
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
    <label id='bigLabel'> Tarif réduit disponible uniquement pendant : </label>
   <p>
    <FormControlLabel 
      control={<Checkbox/>}
      type='number' 
      label={<p id='label'>Lundi</p>}
      value='1'
      name="lundi"  
      onChange={(e) => handleInputChange3( e, "weekDays", "lundi")} 
    />
    <FormControlLabel 
      control={<Checkbox/>} 
      type='number' 
      label={<p id='label'>Mardi</p>}
      value='1'
      name="mardi"  
      onChange={(e) => handleInputChange3( e, "weekDays", "mardi")} 
    />

    <FormControlLabel 
      control={<Checkbox/>} 
      type='number'  
      label={<p id='label'>Mercredi</p>}
      value='1'
      name="mercredi" 
      onChange={(e) => handleInputChange3( e, "weekDays", "mercredi")}  
    />

    <FormControlLabel 
      control={<Checkbox/>} 
      type='number'   
      label={<p id='label'>Jeudi</p>} 
      value='1'
      name="jeudi"  
      onChange={(e) => handleInputChange3( e, "weekDays", "jeudi")} 
    />

    <FormControlLabel 
      control={<Checkbox/>} 
      type='number' 
      label={<p id='label'>Vendredi</p>} 
      value='1'
      name="vendredi"  
      onChange={(e) => handleInputChange3( e, "weekDays", "vendredi")} 
    />

    <FormControlLabel 
      control={<Checkbox/>} 
      type='number'  
      label={<p id='label'>Samedi</p>} 
      value='1'
      name="samedi"  
      onChange={(e) => handleInputChange3( e, "weekDays", "samedi")} 
    />

    <FormControlLabel 
      control={<Checkbox/>} 
      type='number' 
      label={<p id='label'>Dimanche</p>} 
      value='1'
      name="dimanche"  
      onChange={(e) => handleInputChange3( e, "weekDays", "dimanche")} 
    />
   </p> 
  </div>

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
   </div><br/>  
   <div>    
    <div class="bouton-aligne" >  
        {
          btnLoad ? <ButtonLoading /> :
          <Button  
            variant="contained" 
            type='submit' 
            style={{textDecoration:'none',backgroundColor:'#2ac4ea'}}
            onClick={(e) => insert(e)}>
            <span style={{color:'white'}}>Ajouter</span>
          </Button>
        }
      </div>
    <div class="bouton-aligne">
      <Link to={'/back/promotion'} style={{textDecoration:'none'}}>
        <Button variant="outlined" 
        id="btn2"
        >
        <span style={{color:'#1976d2'}}>Retour</span>
        </Button>
      </Link>
    </div>
   </div>
   </>
  }
</div>
</>
  );
}
  
  export default InsertPromotion;