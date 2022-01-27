
import { useState } from 'react';
import CustomError from '../../../CustomError';
import axios from "axios";
import React, {useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import { Checkbox } from "@mui/material";
import './typeChambre.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Link} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams, useHistory } from 'react-router-dom'

import callAPI from '../../../utility';
import {FileInput, Preview, Videos, Font} from './utilityTypeChambre.js';
import {session} from '../../common/utilitySession.js';
import NotEnoughAccessRight from '../../common/NotEnoughAccessRight';

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

function openEditEquipement(equipement, newIcon, setNewIcon, handleOpen){
  const eq = {...equipement};
  let icon = {...newIcon};
  icon._id = eq._id;
  icon.nom = eq.nom;
  icon.font = eq.font;
  setNewIcon(icon);
  handleOpen();
}

function deleteEquipement(equipement, setListEquipement2){
  callAPI('post', '/equipement/delete', {id: equipement._id}, setListEquipement2);
}

function Equipements(props){
  let i = -1;
    let equipements = props.equipements.map(equipement => {
        i++;
        let u = i;
        return(
          <tr>
            <td style={{width: "25px"}}>
              <FormControlLabel
                checked={equipement.checked}
                control={<Checkbox/>}
                label=""
                onChange={(e) => props.handleCheckBoxEquipement(e, u)}
                style={{marginLeft:"20px"}}
              />
            </td>
            <td>
              <Font font={equipement.font} />
            </td>
            <td>
              {equipement.nom}
            </td>
            <td>
            <EditIcon style={{color : "green"}} onClick={(e) => openEditEquipement(equipement, props.newIcon, props.setNewIcon, props.handleOpen)} />
            </td>
            <td>
              <DeleteIcon style={{color : "red"}} onClick={(e) => deleteEquipement(equipement, props.setListEquipement2)} />
            </td>
          </tr>
          
        );
    })
    const table = <table style={{width: "400px"}}>
      {equipements}
    </table>
  return table;
}
function InsertTypeCHambre(){
  const noImage = '/no-image.jpg';
  let [val, setVal] = useState(1);
  let [newIcon, setNewIcon] = useState({_id: null, font: "", nom: ""});
  let [errInsertEq, setErrInsertEq] = useState(null);
  let [state, setState] = useState(
    {
      errors: [],
      error: {
        nom: null,
        nbAdulte: null,
        nbEnfant: null,
        chambreTotal:null,
        etage:null,
        superficie:null,
        description:null,
        photo: null
      },
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
  const [errorFont, setErrorFont] = React.useState({
    autre: null,
    font: null,
    nom: null
  });
  const { _id } = useParams();
  
  const isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;
  const hasARInsert = session.getInstance().hasOneOfTheseAccessRights(["insertTypeChambre", "superAdmin"]);
  const hasARGet = session.getInstance().hasOneOfTheseAccessRights(["getTypeChambre", "superAdmin"]);
  const hasARUpdate = session.getInstance().hasOneOfTheseAccessRights(["updateTypeChambre", "superAdmin"]);
  const fieldsToSet = ["_id", "nom", "nbAdulte", "nbEnfant", "photo",
      "chambreTotal", "etage", "superficie", "description",
      "planTarifaire", "equipements", "videos"];
  
  const setDetailsTypeChambre = (data) => {
    let currentState = {...state};
    if(data.status === 401){//Unauthorized
      history.push('/back/login');
    }else if(data.status === 403){
      history.push('/notEnoughAccessRight');
    }
    fieldsToSet.map(field => {
      currentState[field] = data.typeChambre[field];
    });
    if(currentState.photo != '' || 
        currentState.photo != undefined ||
        currentState.photo != null){
            currentState.preview = [];
            for(let i = 0; i < currentState.photo.length; i++){
                currentState.preview[i] = process.env.REACT_APP_BACK_URL + "/" + currentState.photo[i];
            }
        }
    setState(currentState);
}

  useEffect(() => {
    if(isInsert && hasARInsert){
      callAPI('get', '/TCTarif/infoInsertTypeChambre', {}, setInfo);
    }else if(hasARGet || hasARUpdate){
      callAPI("get", "/typeChambre/details/" + _id, {}, setDetailsTypeChambre);
    }
  }, [_id]);
  
  const history = useHistory();
  if(isInsert && !hasARInsert){
    return(
      <NotEnoughAccessRight />
    );
  }
  if(!isInsert && !hasARGet && !hasARUpdate){
    return(
      <NotEnoughAccessRight />
    );
  }
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function setInfo(res){
    console.log(res);
    let current = JSON.parse(JSON.stringify(state));
    for(let i = 0; i < res.listTarif.length; i++){
      res.listTarif[i].checked = false;
    }
    current.planTarifaire = res.listTarif;
    
    for(let i = 0; i < res.listEquipement.length; i++){
      res.listEquipement[i].checked = false;
    }
    current.equipements = res.listEquipement;
    setState(current);
  }

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
    let currentState = JSON.parse(JSON.stringify(state));
    let keys = Object.keys(currentState.error);
    keys.map((k) => {
      currentState.error[k] = null;
    });
    
    if(res.status === 200){
      history.push('/back/typeChambre');
    }else if(res.status === 401){//Unauthorized
      history.push('/back/login');
    }else if(res.status === 403){
      history.push('/notEnoughAccessRight');
    }
    else{
      let keys = Object.keys(res.errors);
      keys.map((k) => {
        currentState.error[k] = res.errors[k];
      });
    }
    setState(currentState);
  }

  function insert(e){
    e.preventDefault();
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
    callAPI('post', '/typeChambre/insert', toSend, tryRedirect);
  }

  function update(e){
    e.preventDefault();
    let toSend = {};
    fieldsToSet.map(field => {
      toSend[field] = state[field];
    });
    toSend = {...toSend};
    let equipements = [];
    for(let i = 0; i < state.equipements.length; i++){
        if(state.equipements[i].checked){
            equipements.push(state.equipements[i]._id);
        }
    }
    toSend.equipements = equipements;
    let planTarifaire = [];
    for(let i = 0; i < state.planTarifaire.length; i++){
        if(state.planTarifaire[i].checked){
            planTarifaire.push(state.planTarifaire[i]._id);
        }
    }
    toSend.planTarifaire = planTarifaire;
    callAPI('post', '/typeChambre/update/', toSend, tryRedirect);
  }

  function handleInputChange(event, inputName){
      const currentState = JSON.parse(JSON.stringify(state));
      currentState[inputName] = event.target.value;
      currentState.error[inputName] = null;
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
    
    let tempError = {...errorFont};
    tempError[fieldName] = null;
    setErrorFont(tempError);
  }

  function setListEquipement2(res){
    if(res.status === 200){
      setNewIcon({font: "", nom: ""});
      let current = {...state};
      current.equipements = res.equipements;
      setState(current);
      setOpen(false);
    }else{
      let temp = {...errorFont};
      let errKeys = Object.keys(res.errors);
      errKeys.map((k) => {
        temp[k] = res.errors[k];
      });
      setErrorFont(temp);
    }
  }

  function addEquipement(){
    if(newIcon._id === null){
      callAPI('post', '/equipement/insert', {icon: newIcon}, setListEquipement2);
    }else{
      callAPI('post', '/equipement/update', {icon: newIcon}, setListEquipement2);
    }
  }

  function openAjouterEquipement(){
    let temp = {...newIcon};
    temp._id = null;
    temp.font = "";
    temp.nom = "";
    setNewIcon(temp);
    handleOpen();
  }

  return (
    <div> 
        <Navbar/>
              <div className="jumbotron">
                <h4 className="" id='title1'>{isInsert ? "Ajouter type chambre" : "Modifier type chambre"}</h4>
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
                      error={state.error.nom === null ? false : true}
                      helperText={state.error.nom === null ? null : state.error.nom}
                      />
                    <TextField 
                      id="outlined-basic"
                      variant="outlined"
                      size='small'
                      label={
                        <p id='libel'>
                        Chambre total
                        </p>
                             } 
                      type="number"
                      style={{width:'370px',marginLeft:'123px'}}
                      value={state.chambreTotal} onChange={(e) => handleInputChange(e, "chambreTotal")}
                      error={state.error.chambreTotal === null ? false : true}
                      helperText={state.error.chambreTotal === null ? null : state.error.chambreTotal}
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
                      error={state.error.etage === null ? false : true}
                      helperText={state.error.etage === null ? null : state.error.etage}
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
                      error={state.error.superficie === null ? false : true}
                      helperText={state.error.superficie === null ? null : state.error.superficie}
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
                            {state.error.photo === null ? null : <div className="customError"><span>{state.error.photo}</span></div>}
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
                      error={state.error.nbAdulte === null ? false : true}
                      helperText={state.error.nbAdulte === null ? null : state.error.nbAdulte}
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
                      error={state.error.nbEnfant === null ? false : true}
                      helperText={state.error.nbEnfant === null ? null : state.error.nbEnfant}
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
                      onChange={(e) => handleInputChange(e, "description")} 
                      error={state.error.description === null ? false : true}
                      helperText={state.error.description === null ? null : state.error.description}
                    />
                    <div style={{marginTop:'40px'}}>
                        <div>
                            <label className="form-label-mt4" 
                            style={{textDecoration: 'underline'}} 
                            id='bigLabel'>
                              Equipements
                            </label>
                      </div>
                      <FormGroup>
                        <Equipements  
                          equipements={state.equipements} 
                          handleCheckBoxEquipement={handleCheckBoxEquipement}
                          newIcon={newIcon}
                          setNewIcon={setNewIcon}
                          handleOpen={handleOpen}
                          setListEquipement2={setListEquipement2}
                        />
                      </FormGroup>
                      <Button onClick={openAjouterEquipement}>Ajouter equipement</Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                            {newIcon._id === null ? "Ajouter nouveau equipement" : "Modifier equipement"}
                          </Typography>
                          {errorFont.autre === null ? null : <div className="customError"><span>{errorFont.autre}</span></div>}
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
                              onChange={(e) => handleNewIconChange(e, "font")}
                              error={errorFont.font === null ? false : true}
                              helperText={errorFont.font === null ? null : errorFont.font}
                              />
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
                              onChange={(e) => handleNewIconChange(e, "nom")}
                              error={errorFont.nom === null ? false : true}
                              helperText={errorFont.nom === null ? null : errorFont.nom}
                              />
                            </div>
                              <br/>
                              <div style={{margin:'0 auto', width:'fit-content', marginTop:'20px'}}>
                                <Button variant="contained" onClick={(e) => addEquipement()}>{newIcon._id === null ? "Ajouter equipement" : "Modifier equipement"}</Button>
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
                      {isInsert && hasARInsert 
                      ? <Button  
                        variant="contained" 
                        type='submit' 
                        id='btn1'
                        onClick={(e) => insert(e)}
                        style={{backgroundColor:'#2ac4ea' }}>
                        <span style={{color:'white'}}>Ajouter</span>
                      </Button>
                      : null}

                      {!isInsert && hasARUpdate
                      ? <Button  
                        variant="contained" 
                        type='submit' 
                        id='btn1'
                        onClick={(e) => update(e)}
                        style={{backgroundColor:'#2ac4ea' }}>
                        <span style={{color:'white'}}>Modifier</span>
                      </Button>
                      : null}
                     </div>
                     <div class="bouton-aligne">
                      <Link to={'/back/typeChambre'} style={{textDecoration:'none'}}>
                        <Button variant="outlined" 
                        id="btn2">
                  <span style={{color:'#1976d2'}}>Retour</span>
                        </Button>
                      </Link>
                     </div>
                    </div>
                </form>
              </div>
            </div>
  );
}
  
  export default InsertTypeCHambre;