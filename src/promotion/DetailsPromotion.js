// import CustomError from '../CustomError';
import CustomError from '../CustomError';
import axios from "axios";
import React, {useEffect} from "react";
import {Link} from 'react-router-dom';

import  Navbar  from "../Navbar/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';

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

import {FileInput, Preview, Videos, Font} from '../partenaire/utilityTypeChambre.js';


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
     console.log(props.planTarifaire);
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
        promotion: {
            _id: '',
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
            dernierJour:'',
            equipements:[]
        }
            , tarifs: []
            , planTarifaire: []
            , previewPhoto: [this.noImage]
        }
        this.handleCheckBoxPlanTarifaire = this.handleCheckBoxPlanTarifaire.bind(this);
        this.handleCheckBoxEquipement = this.handleCheckBoxEquipement.bind(this);
        this.setDetailsPromotion = this.setDetailsPromotion.bind(this);
        this.setListEquipement2 = this.setListEquipement2.bind(this);
        this.setTarifs = this.setTarifs.bind(this);
    }

    setDetailsPromotion(data){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState = data;
        this.setState(currentState);
        console.log(this.state);
    }

    tryRedirect(res){
        console.log(res);
        if(res.status === 200){
          this.props.history.push('/promotion');
        }else if(res.status === 401){//Unauthorized
            this.props.history.push('/login');
        }else{
          let currentState = JSON.parse(JSON.stringify(this.state));
          currentState.errors = res.errors;
          this.setState(currentState);
        }
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
                "/promotion/detail/" + this.props.match.params._id ,
            withCredentials: true
        })
        .then(res => this.setDetailsPromotion(res.data))
        .catch(err => console.log(err));
    }

    update(e){
        e.preventDefault();
        console.log(this.state.promotion);
        let toSend = JSON.parse(JSON.stringify(this.state.promotion));
        let equipements = [];
        for(let i = 0; i < this.state.promotion.equipements.length; i++){
            if(this.state.promotion.equipements[i].checked){
                equipements.push(this.state.promotion.equipements[i]._id);
            }
        }
        toSend.equipements = equipements;
        let planTarifaire = [];
        for(let i = 0; i < this.state.promotion.planTarifaire.length; i++){
            if(this.state.promotion.planTarifaire[i].checked){
                planTarifaire.push(this.state.promotion.planTarifaire[i]._id);
            }
        }
        toSend.planTarifaire = planTarifaire;
        console.log(toSend);
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + "/promotion/updateP",
            withCredentials: true,
            data: toSend
        })

        .then(res => this.tryRedirect(res.data))
        .catch(err => console.log(err));
    }

    handleInputChange(event, inputName){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.promotion[inputName] = event.target.value;
        this.setState(currentState);
    }
   
    handleCheckBoxPlanTarifaire(e, index){
        let current = JSON.parse(JSON.stringify(this.state));
        current.promotion.planTarifaire[index].checked = e.target.checked;
        this.setState(current);
    }
    
    handleCheckBoxEquipement(e, index){
        let current = JSON.parse(JSON.stringify(this.state));
        current.promotion.equipements[index].checked = e.target.checked;
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
          this.changeStateValue(["promotion", "equipements"], res.equipements);
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
              <Link to={"/tarif/details/" + tarif._id + "/" + this.state.promotion._id} style={{textDecoration:'none'}}>
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

                <h5>Nom de la promotion </h5>
<label id='bigLabel'>
Comment voulez-vous nommer cette promotion ?
</label>

<input
    type='text'
    id='nom'
    style={{width:"400px",marginTop:"15px"}} 
    name="nom" 
    value={this.state.promotion.nom} 
    onChange={(e) => this.handleInputChange(e, "nom")}
    /> 

<div style={{marginTop:'15px'}}>
                                <div>
                                    <label className="form-label-mt4" style={{textDecoration: 'underline'}} id='bigLabel'>Plan tarifaire attribué: </label>
                                </div>
                                <FormGroup>
                                    <PlanTarifaire planTarifaire={this.state.promotion.planTarifaire} handleCheckBoxPlanTarifaire={this.handleCheckBoxPlanTarifaire}/>
                                </FormGroup>
                            </div>

            </div>

        );
    }
}

export default DetailsTypeCHambre;