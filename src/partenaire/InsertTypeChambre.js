// import { TextField } from "@mui/material";
import CustomError from '../CustomError';
import axios from "axios";
import React, {useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import './typeChambre.css';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import callAPI from '../utility';

import { useState } from 'react';
import {FileInput, Preview} from './utilityTypeChambre.js';

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
          label={tarif.nom}
          style={{marginLeft:"20px"}}
        />
      );
  })
  return list;
}

function Equipements(props){
  let i = -1;
    let equipements = props.equipements.map(equipement => {
        i++;
        let u = i;
        return(
          <FormControlLabel
            checked={equipement.checked}
            control={<Checkbox/>}
            onChange={(e) => props.handleCheckBoxEquipement(e, u)}
            label={equipement.nom}
            style={{marginLeft:"20px"}}
          />
        );
    })
  return equipements;
}



function InsertTypeCHambre(){
  const noImage = '/no-image.jpg';
  let[val, setVal] = useState(1);
  let [state, setState] = useState(
    {
      errors: [],
      nom: '',
      nbAdulte: '',
      nbEnfant: '',
      photo: [],
      
      chambreTotal:'',
      etage:'',
      superficie:'',
      description:'',
      planTarifaire: [],
      equipements: [],
      preview: [noImage]
    }
  );
  const history = useHistory();
  
  function setPlanTarifaire(res){
    let current = JSON.parse(JSON.stringify(state));
    for(let i = 0; i < res.list.length; i++){
      res.list[i].checked = false;
    }
    current.planTarifaire = res.list;
    state = current;
    //setState(current);
    console.log(current);
  }

  function setListEquipement(res){
    let current = JSON.parse(JSON.stringify(state));
    current.equipements = res.equipements;
    setState(current);
  }

  useEffect(() => {
    callAPI('get', '/planTarifaire', {}, setPlanTarifaire);
    callAPI('get', '/equipement', {}, setListEquipement);
  }, []); 

  function handleCheckBoxPlanTarifaire(e, index){
    let current = JSON.parse(JSON.stringify(state));
    current.planTarifaire[index].checked = e.target.checked;
    setState(current);
  }

  function handleCheckBoxEquipement(e, index){
    let current = JSON.parse(JSON.stringify(state));
    current.equipements[index].checked = e.target.checked;
    setState(current);
    
  }

  function tryRedirect(res){
    console.log(state);
    console.log(res);
    if(res.status === 200){
      history.push('/typeChambre');
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

      console.log(toSend);
      axios({
          method: 'post',
          url: process.env.REACT_APP_BACK_URL + "/typeChambre/insert",
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

  function handlePhotoChange(e){
    let currentState = JSON.parse(JSON.stringify(state));
    currentState.photo = [];
    currentState.preview = [];
    let finished = 0;
    for(let i = 0; i < e.target.files.length; i++){
      const u = i;
      const img = e.target.files[i];
      const r = /^image/;
      if(r.test(img.type)){
        const reader = new FileReader();
        reader.onload = (evt) => {
          currentState.photo[u] = evt.target.result;
          currentState.preview[u] = evt.target.result;
          finished++;
          if(finished === e.target.files.length){
            setState(currentState);
          }
        }
        reader.readAsDataURL(img);
      }else{
        currentState.preview = [noImage];
        setState(currentState);
      }
    }
  }

  return (
    <div> 
        <Navbar/>
        <div className="">
          <div className="">
              <div className="">
              <div className="jumbotron" 
                style=
                {{backgroundColor:'white',
                boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)',
                marginTop:'80px',
                marginLeft:'2%'
                }}>
                <h4 className="text-center" id='title1'>Ajouter Type chambre</h4>
                <hr></hr>
                <CustomError errors={state.errors} />
                <form className="needs-validation">
                  <Box>
                    <div style={{marginTop:'40px',display:'inline'}}>
                      <TextField 
                      id="standard-basic" 
                      label={
                      <p id='litleLabel'>
                      Nom
                      </p>
                            } 
                      variant="standard" 
                      style={{width:'40%'}}
                      type="text" 
                      value={state.nom} onChange={(e) => handleInputChange(e, "nom")}
                      />
                      <TextField 
                      id="standard-basic" 
                      label={
                        <p id='litleLabel'>
                            Chambre total
                        </p>
                             } 
                      variant="standard" 
                      type="number"
                      style={{width:'40%',marginLeft:'123px'}}
                      value={state.chambreTotal} onChange={(e) => handleInputChange(e, "chambreTotal")}
                      />
                    </div>

                    <div style={{marginTop:'30px'}}>
                      <TextField 
                      id="standard-basic" 
                      label={
                        <p id='litleLabel'>
                            Etage
                        </p>
                             } 
                      variant="standard" 
                      type="number"
                      style={{width:'40%'}}
                      value={state.etage} onChange={(e) => handleInputChange(e, "etage")}
                      />
                      <TextField 
                      id="standard-basic" 
                      label={
                        <p id='litleLabel'>
                            Superficie
                        </p>
                             } 
                      variant="standard" 
                      type="number" 
                      style={{width:'40%',marginLeft:'123px'}}
                      value={state.superficie} onChange={(e) => handleInputChange(e, "superficie")}
                      />
                    </div>

                    <div style={{marginTop:'30px'}}>
                      <div className="row">
                          <Preview preview={state.preview} />
                      </div>
                      <div className="row">
                          <FileInput 
                            style={{marginTop: '5px'}}
                            value=""
                            handlePhotoChange={handlePhotoChange} />
                      </div>
                    </div>

                    <div style={{marginTop:'10px'}}>
                      <label className="form-label mt-4" 
                      style={{textDecoration:'underline'}}
                      id='bigLabel'>
                        Occupation : 
                      </label>
                    </div>
                    <div style={{marginTop:'5px'}}>
                      <TextField 
                      id="standard-basic" 
                      label={
                        <p id='litleLabel'>
                            Adulte
                        </p>
                             }
                      variant="standard" 
                      type="number"
                      value={state.nbAdulte}
                      onChange={(e) => handleInputChange(e, "nbAdulte")}
                      style={{width:'40%'}}
                      />
                      <TextField 
                      id="standard-basic" 
                      label={
                        <p id='litleLabel'>
                            Enfant
                        </p>
                             } 
                      variant="standard" 
                      type="number" 
                      value={state.nbEnfant}
                      onChange={(e) => handleInputChange(e, "nbEnfant")}
                      style={{width:'40%',marginLeft:'123px'}}
                      />
                    </div>

                    <div style={{marginTop:'20px'}}>
                      <div style={{}}>
                      <label className="form-label mt-4" 
                      style={{textDecoration:'underline'}}
                      id='bigLabel'>
                        Description: 
                      </label>
                    </div>
                    <TextField id="outlined-basic" variant="outlined" type='text'
                      placeholder=""
                      multiline
                      rows={2}
                      rowsMax={4}
                      style={{width:'100%',height:'50px'}}
                      value={state.description}
                      onChange={(e) => handleInputChange(e, "description")} />
                    <div style={{marginTop:'40px'}}>
                        <div>
                            <label className="form-label-mt4" 
                            style={{textDecoration: 'underline'}} 
                            id='bigLabel'>
                              Equipements: 
                            </label>
                      </div>
                      <FormGroup>
                        <Equipements  equipements={state.equipements} handleCheckBoxEquipement={handleCheckBoxEquipement} />
                      </FormGroup>
                    </div>
                    <div style={{marginTop:'30px'}}>
                      <div>
                          <label className="form-label-mt4" 
                          style={{textDecoration: 'underline'}} 
                          id='bigLabel'>
                            Plan tarifaire attribué: 
                          </label>
                      </div>
                      <FormGroup>
                        <PlanTarifaire planTarifaire={state.planTarifaire} handleCheckBoxPlanTarifaire={handleCheckBoxPlanTarifaire}/>
                      </FormGroup>
                    </div>
                    </div>
                  </Box>
                  <div style={{marginTop:'50px'}}>
                    <Button 
                    variant="contained" 
                    color="success" 
                    onClick={(e) => insert(e)}
                    style={{textDecoration:'none'}}>
                      <span style={{color:'white'}}>Créer</span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
  
  export default InsertTypeCHambre;