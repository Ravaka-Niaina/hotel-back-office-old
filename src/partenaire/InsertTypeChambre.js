
// import { TextField } from "@mui/material";
import CustomError from '../CustomError';
import axios from "axios";
import React, {useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Checkbox } from "@mui/material";
import './typeChambre.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Link} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import callAPI from '../utility';

import { useState } from 'react';
import {FileInput, Preview, Videos, Font} from './utilityTypeChambre.js';

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
          label={<span id='litleLabel'>
          {tarif.nom}
                </span>}
          style={{marginLeft:"20px",marginTop:'15px'}}
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
          <div style={{height:"40px"}}>
            <FormControlLabel
              checked={equipement.checked}
              control={<Checkbox/>}
              label=""
              onChange={(e) => props.handleCheckBoxEquipement(e, u)}
              style={{marginLeft:"20px"}}
            />
            <Font font={equipement.font} />
            <span id='litleLabel' style={{marginLeft:'8px'}}>
            {equipement.nom}
            </span>
          </div>
          
        );
    })
  return equipements;
}



function InsertTypeCHambre(){
  const noImage = '/no-image.jpg';
  let [val, setVal] = useState(1);
  let [newIcon, setNewIcon] = useState({font: "", nom: ""});
  let [errInsertEq, setErrInsertEq] = useState(null);
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
      preview: [noImage],
      videos: []
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

  
  function setListEquipement(res){
    console.log(res);
    let current = JSON.parse(JSON.stringify(state));
    current.equipements = res.equipements;
    setState(current);
  }

  useEffect(() => {
    callAPI('post', '/planTarifaire', {}, setPlanTarifaire);
    //callAPI('get', '/equipement', {}, setListEquipement);
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

  function handleVideoChange(e){
    let currentState = JSON.parse(JSON.stringify(state));
    currentState.videos = [];
    for(let i = 0; i < e.target.files.length; i++){
      currentState.videos.push({});
    }
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function handleNewIconChange(e, fieldName){
    let currentState = JSON.parse(JSON.stringify(newIcon));
    currentState[fieldName] = e.target.value;
    setNewIcon(currentState);
  }

  function setListEquipement2(res){
    if(res.status == 200){
      setNewIcon({font: "", nom: ""});
      setErrInsertEq(null);
      let current = JSON.parse(JSON.stringify(state));
      current.equipements = res.equipements;
      setState(current);
      setOpen(false);
    }else{
      setErrInsertEq(res.message);
    }
  }

  function addEquipement(){
    callAPI('post', '/equipement/insert', {icon: newIcon}, setListEquipement2);
  }

  return (
    <div> 
        <Navbar/>
              <div className="jumbotron">
                <h4 className="" id='title1'>Ajouter Type chambre</h4>
                <CustomError errors={state.errors} />
                <form className="needs-validation" className='forms' style={{marginTop:'15px'}}>
                    <div style={{marginTop:'40px'}} id='input-group1'>
                      <TextField 
                      id="outlined-basic"
                      variant="outlined"
                      size='small'
                      label={
                      <p id='libel'>
                      Nom
                      </p>
                            } 
                      style={{width:'370px'}}
                      type="text" 
                      value={state.nom} onChange={(e) => handleInputChange(e, "nom")}
                      />
                    <TextField 
                      id="outlined-basic"
                      variant="outlined"
                      size='small'
                      label={
                        <p id='libel'>
                        Nom
                        </p>
                             } 
                      type="number"
                      style={{width:'370px',marginLeft:'123px'}}
                      value={state.chambreTotal} onChange={(e) => handleInputChange(e, "chambreTotal")}
                      />
                     </div>

                     <div style={{marginTop:'40px'}} id='input-group1'>
                      <TextField 
                      id="outlined-basic"
                      variant="outlined"
                      size='small'
                      label={
                        <p id='libel'>
                            Etage
                        </p>
                             } 
                      type="number"
                      style={{width:'370px'}}
                      value={state.etage} onChange={(e) => handleInputChange(e, "etage")}
                      />
                      <TextField 
                      id="outlined-basic"
                      variant="outlined"
                      size='small'
                      label={
                        <p id='libel'>
                            Superficie
                        </p>
                             } 
                      type="number" 
                      style={{width:'370px',marginLeft:'123px'}}
                      value={state.superficie} onChange={(e) => handleInputChange(e, "superficie")}
                      />
                    </div>
                    
                    
                    <div style={{marginTop:'15px'}}>
                        <label className="form-label mt-4" style={{textDecoration:'underline'}} id='bigLabel'>Photos  </label>
                      </div>
                      <div className="row">
                          <Preview preview={state.preview} />
                      </div>
                      <div className="row">
                          <FileInput 
                            id='InputFile'
                            style={{marginTop: '5px'}}
                            value=""
                            handlePhotoChange={handlePhotoChange} />
                      </div>

                    <div style={{marginTop:'15px'}}>
                      <div className="row">
                      <div style={{marginTop:'10px'}}>
                        <label className="form-label mt-4" style={{textDecoration:'underline'}} id='bigLabel'>Videos  </label>
                      </div>
                      </div>
                      <div className="row">
                        <Videos state={state} setState={setState} />
                      </div>
                    </div>

                    <div style={{marginTop:'10px'}}>
                      <label className="form-label mt-4" 
                      style={{textDecoration:'underline'}}
                      id='bigLabel'>
                        Occupation 
                      </label>
                    </div>
                    <div style={{marginTop:'5px'}}>
                      <TextField 
                      id="outlined-basic"
                      variant="outlined"
                      size='small' 
                      label={
                        <p id='libel'>
                            Adulte
                        </p>
                             }
                      type="number"
                      value={state.nbAdulte}
                      onChange={(e) => handleInputChange(e, "nbAdulte")}
                      style={{width:'370px'}}
                      />
                      <TextField 
                      id="outlined-basic"
                      variant="outlined"
                      size='small'
                      label={
                        <p id='libel'>
                            Enfant
                        </p>
                             }  
                      type="number" 
                      value={state.nbEnfant}
                      onChange={(e) => handleInputChange(e, "nbEnfant")}
                      style={{width:'370px',marginLeft:'123px'}}
                      />
                    </div>

                    <div style={{marginTop:'15px'}}>
                      <div style={{}}>
                      <label className="form-label mt-4" 
                      style={{textDecoration:'underline'}}
                      id='bigLabel'>
                        Description
                      </label>
                    </div>
                    <TextField id="outlined-basic" variant="outlined" type='text'
                      placeholder=""
                      multiline
                      rows={2}
                      rowsMax={4}
                      label={
                        <p id='libel'>
                            Description
                        </p>
                             }
                      style={{width:'100%',height:'50px',marginTop:'5px'}}
                      value={state.description}
                      onChange={(e) => handleInputChange(e, "description")} />
                    <div style={{marginTop:'40px'}}>
                        <div>
                            <label className="form-label-mt4" 
                            style={{textDecoration: 'underline'}} 
                            id='bigLabel'>
                              Equipements
                            </label>
                      </div>
                      <FormGroup>
                        <Equipements  equipements={state.equipements} handleCheckBoxEquipement={handleCheckBoxEquipement} />
                      </FormGroup>
                      <Button onClick={handleOpen}>Ajouter equipement</Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                            Ajouter nouveau equipement
                          </Typography>
                          {
                            errInsertEq != null ?
                            <p style={{backgroundColor: "red"}}>{errInsertEq}</p>
                            : null
                          }
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <div style={{marginLeft:'14px'}}>
                            <TextField 
                              id="outlined-basic"
                              variant="outlined"
                              size='small'
                              className="form-control" 
                              label="Font" 
                              style={{width:"300px"}}
                              type="text" 
                              name="Font" 
                              value={newIcon.font}
                              onChange={(e) => handleNewIconChange(e, "font")}/>
                              <TextField 
                              id="outlined-basic"
                              variant="outlined"
                              size='small'
                              className="form-control" 
                              label="Nom" 
                              style={{width:"300px",marginTop:'10px'}}
                              type="text" 
                              name="Nom" 
                              value={newIcon.nom}
                              onChange={(e) => handleNewIconChange(e, "nom")}/>
                            </div>
                              <br/>
                              <div style={{margin:'0 auto', width:'fit-content', marginTop:'20px'}}>
                                <Button variant="contained" onClick={(e) => addEquipement()}>Ajouter equipement</Button>
                              </div>
                          </Typography>
                        </Box>
                      </Modal>
                    </div>
                    <div style={{marginTop:'15px'}}>
                      <div>
                          <label className="form-label-mt4" 
                          style={{textDecoration: 'underline'}} 
                          id='bigLabel'>
                            Plan tarifaire attribué
                          </label>
                      </div>
                      <FormGroup>
                        <PlanTarifaire planTarifaire={state.planTarifaire} handleCheckBoxPlanTarifaire={handleCheckBoxPlanTarifaire}/>
                      </FormGroup>
                    </div>
                    </div>
                  

                    <div className="pied" style={{marginTop:'30px'}}>   
                     <div class="bouton-aligne">  
                  <Button  
                  variant="contained" 
                  type='submit' 
                  id='btn1'
                  onClick={(e) => insert(e)}
                  style={{backgroundColor:'#2ac4ea' }}>
                  <span style={{color:'white'}}>Ajouter</span>
                  </Button>
                     </div>
                     <div class="bouton-aligne">
                      <Link to={'/typeChambre'} style={{textDecoration:'none'}}>
                        <Button variant="outlined" 
                        id="btn2">
                  <span style={{color:'#1976d2'}}>Retour</span>
                        </Button>
                      </Link>
                     </div>
                    </div>

                  {/* <div style={{marginTop:'50px'}}>
                    <Button 
                    variant="contained" 
                    color="success" 
                    onClick={(e) => insert(e)}
                    style={{textDecoration:'none'}}>
                      <span style={{color:'white'}}>Créer</span>
                    </Button>
                        </div> */}
                </form>
              </div>
            </div>
  );
}
  
  export default InsertTypeCHambre;