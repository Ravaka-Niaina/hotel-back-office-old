import TextField from '@mui/material/TextField';
//import TimePicker from '@mui/lab/TimePicker';
//import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import CustomError from '../../CustomError';
import {useEffect, useRef} from "react";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../typeChambre.css';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import React from 'react'
import callAPI from '../../utility';
import FormGroup from '@mui/material/FormGroup';


const utility = require('./utility.js');



function InsertPlanTarifaire(){
    const [errors, setErrors] = useState([]);
    const [planTarifaire, setPlanTarifaire] = useState({
        nom: '',
        description: '',
        dateReservation: {debut: '', fin: ''},
        dateSejour: {debut: '', fin: ''},
        LeadDay: [
            {_id: 1, label: 'Lundi', checked: false},
            {_id: 2, label: 'Mardi', checked: false},
            {_id: 3, label: 'Mercredi', checked: false},
            {_id: 4, label: 'Jeudi', checked: false},
            {_id: 5, label: 'Vendredi', checked: false},
            {_id: 6, label: 'Samedi', checked: false},
            {_id: 7, label: 'Dimanche', checked: false}
        ],
        LeadHour: {min: '', max: ''}, // [{min: number, max: number}]
        chambresAtrb: [],
        politiqueAnnulAtrb: [

        ]
    });
    const [politique, setPolitique] = useState([]);

    function setPolitiqueAnnulation(res){
        let current = JSON.parse(JSON.stringify(politique));
        current = res.politiqueAnnulation;
        setPolitique(current);
        
    }

    function setListTypeChambre(res){
        console.log(res);
        let current = JSON.parse(JSON.stringify(planTarifaire));
        current.chambresAtrb = res.list;
        current.politiqueAnnulAtrb = politique;
        setPlanTarifaire(current);
        console.log(current);
    }

    useEffect(() => {
        callAPI('get', '/politiqueAnnulation', {}, setPolitiqueAnnulation);
        callAPI('get', '/typeChambre', {}, setListTypeChambre);
      }, []);

    function tryRedirect(res){
        if(res.status === 200){
            this.props.history.push('/');
        }else{
            setErrors(res.errors);
        }
        console.log(res);
    }

    function insert(e){
        const current = utility.getPlan(planTarifaire);
        console.log(current);
        callAPI('post', '/planTarifaire/insert', current, tryRedirect);
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                    <div className="col-md-9">
                        <div className="jumbotron" 
                            style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)',marginTop:'-60px'}}>
                            <h1 className="text-center" id='title1'>Ajouter plan tarifaire</h1>
                            <hr></hr>
                            <CustomError errors={errors} />
                            <form className="needs-validation">
                                <Box>
                                    <div style={{marginTop:'40px',display:'inline'}}>
                                        <label style={{marginRight: '10px'}}>Nom: </label>
                                        <TextField 
                                            id="standard-basic"
                                            variant="standard"
                                            style={{width: '300px'}}
                                            type="text"
                                            value={planTarifaire.nom}
                                            onChange={(e) => utility.handleInputChange1(planTarifaire, setPlanTarifaire, e, "nom")}
                                        />
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <label style={{marginRight: '10px'}}>Déscription: </label>
                                        <TextField 
                                            id="standard-basic"
                                            variant="standard"
                                            style={{width: '300px'}}
                                            type="text"
                                            value={planTarifaire.description}
                                            onChange={(e) => utility.handleInputChange1(planTarifaire, setPlanTarifaire, e, "description")}
                                        />
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <div>
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} >Date de réservation: </label>
                                        </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label style={{marginRight: '10px'}}>Début: </label>
                                                    <TextField 
                                                        id="standard-basic"
                                                        variant="standard"
                                                        style={{width: '200px'}}
                                                        type="date"
                                                        value={planTarifaire.dateReservation.debut}
                                                        onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "dateReservation", "debut")}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label style={{marginRight: '10px'}}>Fin: </label>
                                                    <TextField 
                                                        id="standard-basic"
                                                        variant="standard"
                                                        style={{width: '200px'}}
                                                        type="date"
                                                        value={planTarifaire.dateReservation.fin}
                                                        onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "dateReservation", "fin")}
                                                    />
                                                </div>
                                            </div>
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <div>
                                            <label className="row form-label-mt4" style={{textDecoration: 'underline'}} >Date de séjour: </label>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <label style={{marginRight: '10px'}}>Début: </label>
                                                <TextField 
                                                    id="standard-basic"
                                                    variant="standard"
                                                    style={{width: '200px'}}
                                                    type="date"
                                                    value={planTarifaire.dateSejour.debut}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "dateSejour", "debut")}
                                                />
                                            </div>
                                            <div className="col">
                                                <label style={{marginRight: '10px'}}>Fin: </label>
                                                <TextField 
                                                    id="standard-basic"
                                                    variant="standard"
                                                    style={{width: '200px'}}
                                                    type="date"
                                                    value={planTarifaire.dateSejour.fin}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "dateSejour", "fin")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <div>
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} >Lead day: </label>
                                        </div>
                                        <div>
                                            <FormGroup>
                                                <utility.LeadDay 
                                                    days={planTarifaire.LeadDay} 
                                                    planTarifaire={planTarifaire}
                                                    setPlanTarifaire={setPlanTarifaire}
                                                    handleCheckBoxChange={utility.handleCheckBoxChange} />
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <div>
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} >Chambres attribuées: </label>
                                        </div>
                                        <div>
                                            <utility.ChambresAtrb 
                                                chambresAtrb={planTarifaire.chambresAtrb} 
                                                planTarifaire={planTarifaire}
                                                setPlanTarifaire={setPlanTarifaire}
                                                handleCheckBoxChange={utility.handleCheckBoxChange} />
                                        </div>
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <div>
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} >Lead hour: </label>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <label style={{marginRight: '10px'}}>Début: </label>
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    style={{width: '200px'}}
                                                    type="time"
                                                    value={planTarifaire.LeadHour.min}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "LeadHour", "min")}
                                                />
                                            </div>
                                            <div className="col">
                                                <label style={{marginRight: '10px'}}>Fin: </label>
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    style={{width: '200px'}}
                                                    type="time"
                                                    value={planTarifaire.LeadHour.max}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "LeadHour", "max")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <div>
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} >Politiques d'annulation: </label>
                                        </div>
                                        <utility.PolitiqueAnnulAtrb  
                                            politiqueAnnulAtrb={planTarifaire.politiqueAnnulAtrb}
                                            planTarifaire={planTarifaire}
                                            setPlanTarifaire={setPlanTarifaire}
                                            handleCheckBoxChange={utility.handleCheckBoxChange} />
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
                </div>
            </div>
    );
}
export default InsertPlanTarifaire;