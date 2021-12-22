// import CustomError from '../CustomError';
import CustomError from '../CustomError';
import axios from "axios";
import React, {useEffect} from "react";
import {Link} from 'react-router-dom';

import  Navbar  from "../Navbar/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import './typeChambre.css';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {setValue} from '../../src/utility2.js';
import callAPI from '../utility';

import {FileInput, Preview, Videos, Font} from './utilityTypeChambre.js';


const Input = styled('input')({
  display: 'none',
});

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
            style={{marginLeft:"20px"}}
          />
        );
    })
    return list;
  }

class DetailsTypeCHambre extends React.Component{
    changeState(tabFieldName, value){
        let current = JSON.parse(JSON.stringify(this.state));
        let temp = JSON.parse(JSON.stringify(this.state));
        for(let i = 0; i < tabFieldName.length; i++){
            temp = temp[tabFieldName[i]];
        }
    }
    constructor(props){
        super(props);
        this.noImage = '/no-image.jpg';
        this.state = {
            val: 1,
            newIcon: {font: "", nom: ""},
            errInsertEq: null,
            open: false,
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
            typeChambre: {
                _id: '',
                nom: '',
                nbAdulte: '',
                nbEnfant: '',
                photo: [],
                
                chambreTotal:'',
                etage:'',
                superficie:'',
                description:'',
                equipements: [],
                planTarifaire: [],
                videos: []
            }
            , tarifs: []
            , previewPhoto: [this.noImage]
        }
        this.handleCheckBoxPlanTarifaire = this.handleCheckBoxPlanTarifaire.bind(this);
        this.handleCheckBoxEquipement = this.handleCheckBoxEquipement.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.setDetailsTypeChambre = this.setDetailsTypeChambre.bind(this);
        this.setListEquipement2 = this.setListEquipement2.bind(this);
    }

    setDetailsTypeChambre(data){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState = data;
        if(currentState.typeChambre.photo != '' || 
            currentState.typeChambre.photo != undefined ||
            currentState.typeChambre.photo != null){
                currentState.previewPhoto = [];
                for(let i = 0; i < currentState.typeChambre.photo.length; i++){
                    currentState.previewPhoto[i] = process.env.REACT_APP_BACK_URL + "/" + currentState.typeChambre.photo[i];
                }
            }
        this.setState(currentState);
        console.log(this.state);
    }

    tryRedirect(res){
        console.log(res);
        let currentState = JSON.parse(JSON.stringify(this.state));
        let keys = Object.keys(currentState.error);
        keys.map((k) => {
            currentState.error[k] = null;
        });
        if(res.status === 200){
          this.props.history.push('/typeChambre');
        }else if(res.status === 401){//Unauthorized
            this.props.history.push('/login');
        }else{
          currentState.errors = res.errors;
          keys = Object.keys(res.errors);
          keys.map((k) => {
              currentState.error[k] = res.errors[k];
          });
        }
        this.setState(currentState);
    }

    setTarifs(res){
        console.log(res);
        if(res.status === 200){
            let currentState = JSON.parse(JSON.stringify(this.state));
            currentState.tarifs = res.list;
            this.setState(currentState);
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL +
                "/typeChambre/details/" + this.props.match.params._id ,
            withCredentials: true
        })
        .then(res => this.setDetailsTypeChambre(res.data))
        .catch(err => console.log(err));
    }

    update(e){
        e.preventDefault();
        console.log(this.state.typeChambre);
        let toSend = JSON.parse(JSON.stringify(this.state.typeChambre));
        let equipements = [];
        for(let i = 0; i < this.state.typeChambre.equipements.length; i++){
            if(this.state.typeChambre.equipements[i].checked){
                equipements.push(this.state.typeChambre.equipements[i]._id);
            }
        }
        toSend.equipements = equipements;
        let planTarifaire = [];
        for(let i = 0; i < this.state.typeChambre.planTarifaire.length; i++){
            if(this.state.typeChambre.planTarifaire[i].checked){
                planTarifaire.push(this.state.typeChambre.planTarifaire[i]._id);
            }
        }
        toSend.planTarifaire = planTarifaire;
        console.log(toSend);
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + "/typeChambre/update",
            withCredentials: true,
            data: toSend
        })

        .then(res => this.tryRedirect(res.data))
        .catch(err => console.log(err));
    }

    handleInputChange(event, inputName){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.typeChambre[inputName] = event.target.value;
        currentState.error[inputName] = null;
        this.setState(currentState);
    }

    handlePhotoChange(e){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.error.photo = null;
        currentState.typeChambre.photo = [];
        currentState.previewPhoto = [];
        let finished = 0;
        console.log(e.target.files.length);
        for(let i = 0; i < e.target.files.length; i++){
          const u = i;
          const img = e.target.files[i];
          const r = /^image/;
          if(r.test(img.type)){
            const reader = new FileReader();
            reader.onload = (evt) => {
              currentState.typeChambre.photo[u] = evt.target.result;
              currentState.previewPhoto[u] = evt.target.result;
              finished++;
              if(finished === e.target.files.length){
                this.setState(currentState);
              }
            }
            reader.readAsDataURL(img);
          }else{
            currentState.previewPhoto = [this.noImage];
            this.setState(currentState);
          }
        }
      }

   

    handleCheckBoxPlanTarifaire(e, index){
        let current = JSON.parse(JSON.stringify(this.state));
        current.typeChambre.planTarifaire[index].checked = e.target.checked;
        this.setState(current);
    }
    
    handleCheckBoxEquipement(e, index){
        let current = JSON.parse(JSON.stringify(this.state));
        current.typeChambre.equipements[index].checked = e.target.checked;
        this.setState(current);
    }

    changeStateValue(tabFieldName, value){
        let currentState = setValue(this.state, tabFieldName, value);
        this.setState(currentState);
    }

    setListEquipement2(res){
        if(res.status == 200){
          this.changeStateValue(["newIcon"], {font: "", nom: ""});
          this.changeStateValue(["errInsertEq"], null);
          this.changeStateValue(["typeChambre", "equipements"], res.equipements);
          this.changeStateValue(["open"], false);
        }else{
            console.log(this.state);
            this.changeStateValue(["errInsertEq"], res.message);
        }
      }

    addEquipement(){
        callAPI('post', '/equipement/insert', {icon: this.state.newIcon}, this.setListEquipement2);
    }

    handleNewEqChange(e, fieldName){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.newIcon[fieldName] = e.target.value;
        this.setState(currentState);
    }

    
    render(){
        let list = null;
        list = this.state.tarifs.map(tarif => {
            return <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{tarif.nom}</TableCell>
              <TableCell align="center">{tarif.prixParJour}</TableCell>
              <TableCell align="center">{tarif.services}</TableCell>
              <TableCell align="center">{tarif.conditionsAnnulation}</TableCell>
              <TableCell align="center">
              <Link to={"/tarif/details/" + tarif._id + "/" + this.state.typeChambre._id} style={{textDecoration:'none'}}>
                <Button variant="contained" style={{backgroundColor:'#4682B4'}}>
                    Modifier
                </Button>    
                </Link>
              </TableCell>
            </TableRow>
        });

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

        return(
            <div> 
                <Navbar/>
                
            <div className="">
                <div className="jumbotron">
                    <h1 className="" id='title1'>Détails type chambre</h1>
                    <CustomError errors={this.state.errors} />
                    <form className="needs-validation" style={{marginTop:'15px'}}>
                        <Box>
                            <div style={{marginTop:'40px'}}>

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
                      value={this.state.typeChambre.nom} onChange={(e) => this.handleInputChange(e, "nom")}
                      error={this.state.error.nom === null ? false : true}
                      helperText={this.state.error.nom === null ? null : this.state.error.nom}
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
                      value={this.state.typeChambre.chambreTotal} onChange={(e) => this.handleInputChange(e, "chambreTotal")}
                      error={this.state.error.chambreTotal === null ? false : true}
                      helperText={this.state.error.chambreTotal === null ? null : this.state.error.chambreTotal}
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
                      value={this.state.typeChambre.etage} onChange={(e) => this.handleInputChange(e, "etage")}
                      error={this.state.error.etage === null ? false : true}
                      helperText={this.state.error.etage === null ? null : this.state.error.etage}
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
                      value={this.state.typeChambre.superficie} onChange={(e) =>this.handleInputChange(e, "superficie")}
                      error={this.state.error.superficie === null ? false : true}
                      helperText={this.state.error.superficie === null ? null : this.state.error.superficie}
                      />
                    </div>
                                
                        {
                            //console.log('yes')
                        }
                        <div style={{marginTop:'15px'}}>
                            <div className="row">
                                <Preview preview={this.state.previewPhoto} />
                            </div>
                            <div className="row">
                                <FileInput 
                                    style={{marginTop: '5px'}}
                                    value=""
                                    handlePhotoChange={this.handlePhotoChange} />
                            </div>
                            {this.state.error.photo === null ? null : <div style={{color: "#D32F2F", font: "13px Roboto,Helvetica,Arial,sans-serif"}}><span>{this.state.error.photo}</span></div>}
                        </div>

                        <div style={{marginTop:'15px'}}>
                            <div className="row">
                            <div style={{marginTop:'10px'}}>
                                <label className="form-label mt-4" style={{textDecoration:'underline'}} id='bigLabel'> Videos  </label>
                            </div>
                            </div>
                            <div className="row">
                                <Videos state={this.state} setState={this.setState} context={this} />
                            </div>
                        </div>

                    </div>

                            <div style={{marginTop:'10px'}}>
                                <label className="form-label mt-4" style={{textDecoration:'underline'}} id='bigLabel'>Occupation  </label>
                            </div>
                            <div style={{marginTop:'5px'}}>
                                <TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'  
                                label="Adulte" 
                                type="number" 
                                style={{width:'370px'}}
                                value={this.state.typeChambre.nbAdulte} 
                                onChange={(e) => this.handleInputChange(e, "nbAdulte")}
                                error={this.state.error.nbAdulte === null ? false : true}
                                helperText={this.state.error.nbAdulte === null ? null : this.state.error.nbAdulte} />
                                
                                <TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label="Enfant" 
                                type="number" 
                                style={{width:'370px',marginLeft:'123px' }}
                                    value={this.state.typeChambre.nbEnfant} onChange={(e) => this.handleInputChange(e, "nbEnfant")}
                                error={this.state.error.nbEnfant === null ? false : true}
                                helperText={this.state.error.nbEnfant === null ? null : this.state.error.nbEnfant}    
                                />
                            </div>
                            <div style={{marginTop:'15px'}}>
                                <div style={{}}>
                                    <label className="form-label mt-4" style={{textDecoration:'underline'}} id='bigLabel'>Description </label>
                                </div>
                                <TextField
                                id="outlined-basic" 
                                variant="outlined" 
                                type='text'
                                    placeholder=""
                                    multiline
                                    rows={2}
                                    label="Description"
                                    rowsMax={4}
                                    style={{width:'100%',height:'50px',marginTop:'5px'}}
                                    value={this.state.typeChambre.description} onChange={(e) => this.handleInputChange(e, "description")}
                                    error={this.state.error.description === null ? false : true}
                                    textHelper={this.state.error.description === null ? null : this.state.error.description}
                                />
                            </div>

                            <div style={{marginTop:'40px'}}>
                                <div>
                                    <label className="form-label-mt4" style={{textDecoration: 'underline'}} id='bigLabel'>Equipements </label>
                                </div>
                                <FormGroup>
                                    <Equipements  equipements={this.state.typeChambre.equipements} handleCheckBoxEquipement={this.handleCheckBoxEquipement} />
                                </FormGroup>
                                <Button onClick={(e) => this.changeStateValue(["open"], true)}>Ajouter equipement</Button>
                                <Modal
                                    open={this.state.open}
                                    onClose={(e) => { this.changeStateValue(["open"], false)}}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                                        Ajouter nouveau equipement
                                    </Typography>
                                    {
                                        this.state.errInsertEq != null ?
                                        <p style={{backgroundColor: "red"}}>{this.state.errInsertEq}</p>
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
                                        value={this.state.newIcon.font}
                                        onChange={(e) => this.handleNewEqChange(e, "font")}/>
                                        <TextField 
                                        id="outlined-basic"
                                        variant="outlined"
                                        size='small'  
                                        className="form-control" 
                                        label="Nom"
                                        style={{width:"300px",marginTop:'10px'}}
                                        type="text" 
                                        name="Nom" 
                                        value={this.state.newIcon.nom}
                                        onChange={(e) => this.handleNewEqChange(e, "nom")}/>
                                    </div>
                                        <br/>
                                        <div style={{margin:'0 auto', width:'fit-content', marginTop:'20px'}}>
                                            <Button variant="contained" onClick={(e) => this.addEquipement()}>Ajouter equipement</Button>
                                        </div>
                                    </Typography>
                                    </Box>
                                </Modal>
                            </div>
                            <div style={{marginTop:'15px'}}>
                                <div>
                                    <label className="form-label-mt4" style={{textDecoration: 'underline'}} id='bigLabel'>Plan tarifaire attribué: </label>
                                </div>
                                <FormGroup>
                                    <PlanTarifaire planTarifaire={this.state.typeChambre.planTarifaire} handleCheckBoxPlanTarifaire={this.handleCheckBoxPlanTarifaire}/>
                                </FormGroup>
                            </div>
                        </Box>

                    <div style={{marginTop:'30px'}}>

                    <Button variant="contained"  style={{backgroundColor:'#FA8072'}} onClick={(e) => this.update(e)}>
                        Modifier
                    </Button>
                    <Link to='/typeChambre' style={{textDecoration:'none'}}>
                        <Button variant="contained" style={{backgroundColor:'#293846',color:'white',marginLeft:'20px'}}>
                            Retour
                        </Button>
                    </Link>
                    </div>
            </form>
            </div>
            </div>
                {/* <div className="col-md-2"></div> */}
            </div>

        );
    }
}

export default DetailsTypeCHambre;