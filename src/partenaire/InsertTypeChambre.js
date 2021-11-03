// import { TextField } from "@mui/material";
import CustomError from '../CustomError';
import axios from "axios";
import React, {useEffect, useRef} from "react";
import  Sidebar  from "../Sidebar/Sidebar";
import  Navbar  from "../Navbar/Navbar";
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import './typeChambre.css';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import callAPI from '../utility';

import { useState } from 'react';


const FileInput = ({value, handlePhotoChange}) => {
  return(
    <div>
      <label>
        Click to select some files...
        <input 
          style={{display: 'none'}}
          type="file"
          onChange={handlePhotoChange}
        />
      </label>
    </div>
  );
}

function PlanTarifaire(props){
  let i = -1;
  console.log(props.planTarifaire);
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
  let [state, setState] = useState(
    {
      errors: [],
      nom: '',
      nbAdulte: '',
      nbEnfant: '',
      photo: '',
      
      chambreTotal:'',
      etage:'',
      superficie:'',
      description:'',
      planTarifaire: [],
      equipements: []
    }
  );
  
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
      console.log('TOKONY MANAO REDIRECT OK');
      //this.props.history.push('/typeChambre');
    }else if(res.status === 401){//Unauthorized
      console.log('TOKONY MANAO REDIRECT LOGIN');
        //this.props.history.push('/login');
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

  function handlePhotoChange(event){
    let currentState = JSON.parse(JSON.stringify(state));
    if(event.target.files[0]){
      let img = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        currentState.photo = evt.target.result;
        setState(currentState);
        console.log('Photo changed...');
        console.log(state);
      }
      reader.readAsDataURL(img);
    }
  }
  return (
    <div> 
        <Navbar/>
        <Sidebar/>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
              <div className="col-md-9">

              <div className="jumbotron" 
                style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)',marginTop:'-60px'}}>
                <h1 className="text-center" id='title1'>Ajouter Type chambre</h1>
                <hr></hr>
                <CustomError errors={state.errors} />
                <form className="needs-validation">
                  
                  <Box>
                    <div style={{marginTop:'40px',display:'inline'}}>
                      <TextField id="standard-basic" label="Nom" variant="standard" style={{width:'40%'}}
                      type="text" 
                      value={state.nom} onChange={(e) => handleInputChange(e, "nom")}/>
                                            <TextField id="standard-basic" label="chambre totale" variant="standard" type="number"
                      style={{width:'40%',marginLeft:'152px'}}
                      value={state.chambreTotal} onChange={(e) => handleInputChange(e, "chambreTotal")}/>
                    </div>

                    <div style={{marginTop:'30px'}}>
                      <TextField id="standard-basic" label="Etage" variant="standard" type="number"
                        style={{width:'40%'}}
                        value={state.etage} onChange={(e) => handleInputChange(e, "etage")}/>
                      <TextField id="standard-basic" label="Superficie" variant="standard" type="number" 
                      style={{width:'40%',marginLeft:'152px'}}
                      value={state.superficie} onChange={(e) => handleInputChange(e, "superficie")}/>
                    </div>

                    <div style={{marginTop:'70px'}}>
                      <FileInput 
                        value=""
                        handlePhotoChange={handlePhotoChange} />
                    </div>

                    <div style={{marginTop:'10px'}}>
                      <label className="form-label mt-4" style={{textDecoration:'underline'}}>Occupation : </label>
                    </div>
                    <div style={{marginTop:'5px'}}>
                      <TextField id="standard-basic" label="Adulte" variant="standard" type="number"
                        value={state.nbAdulte}
                        onChange={(e) => handleInputChange(e, "nbAdulte")}
                        style={{width:'40%'}}/>
                      <TextField id="standard-basic" label="Enfant" variant="standard" type="number" 
                        value={state.nbEnfant}
                        onChange={(e) => handleInputChange(e, "nbEnfant")}
                        style={{width:'40%',marginLeft:'152px'}}/>
                    </div>

                    <div style={{marginTop:'20px'}}>
                      <div style={{}}>
                      <label className="form-label mt-4" style={{textDecoration:'underline'}}>Description: </label>
                    </div>
                    <TextField id="outlined-basic" variant="outlined" type='text'
                      placeholder=""
                      multiline
                      rows={2}
                      rowsMax={4}
                      style={{width:'100%',height:'50px'}}
                      value={state.description}
                      onChange={(e) => handleInputChange(e, "description")} />
                    </div>
                    <div style={{marginTop:'30px'}}>
                        <div>
                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} >Equipements: </label>
                        </div>
                        <FormGroup>
                          <Equipements  equipements={state.equipements} handleCheckBoxEquipement={handleCheckBoxEquipement} />
                        </FormGroup>
                    </div>
                    <div style={{marginTop:'30px'}}>
                        <div>
                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} >Plan tarifaire attribué: </label>
                        </div>
                        <FormGroup>
                          <PlanTarifaire planTarifaire={state.planTarifaire} handleCheckBoxPlanTarifaire={handleCheckBoxPlanTarifaire}/>
                        </FormGroup>
                    </div>
                  </Box>
                  <div style={{marginTop:'50px'}}>
                    <Button variant="contained" color="success" onClick={(e) => insert(e)}>
                      Créer
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="col-md-3"></div> */}
          </div>
      </div>
    </div>
  );
}
  
  export default InsertTypeCHambre;