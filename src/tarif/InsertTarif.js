import TextField from '@mui/material/TextField';
//import TimePicker from '@mui/lab/TimePicker';
//import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import CustomError from '../CustomError';
import {useEffect, useRef} from "react";
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './insertTarif.css';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import React from 'react'
import callAPI from '../utility';
import FormGroup from '@mui/material/FormGroup';
import  Navbar  from "../Navbar/Navbar";

const utility = require('./utility.js');



function InsertTarif(){
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
    const history = useHistory();

    function setListTypeChambre(res){
        let current = JSON.parse(JSON.stringify(planTarifaire));
        current.chambresAtrb = res.listType;
        current.politiqueAnnulAtrb = res.listPolitique;
        setPlanTarifaire(current);
    }

    useEffect(() => {
        callAPI('get', '/typeChambre/TPAvecPA', {}, setListTypeChambre);
      }, []);

    function tryRedirect(res){
        console.log(res);
        if(res.status === 200){
            history.push('/tarif');
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
        <div className="">
            <Navbar currentPage={1}/>
            <div className="">
                    <div className="">
                        <div className="jumbotron" 
                            style=
                            {{backgroundColor:'white',
                            boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)',
                            marginTop:'80px',
                            marginLeft:'2%'
                            }}>
                            <h1 className="text-center" id='title1'>Ajouter plan tarifaire</h1>
                            <hr></hr>
                            <CustomError errors={errors} />
                            <form className="needs-validation">
                                <Box>
                                    <div style={{marginTop:'40px',display:'inline'}}>
                                        <TextField 
                                            id="standard-basic"
                                            variant="standard"
                                            style={{width: '300px'}}
                                            type="text"
                                            label={
                                            <p id='litleLabel'>
                                                Nom
                                            </p>
                                                 }
                                            value={planTarifaire.nom}
                                            onChange={(e) => utility.handleInputChange1(planTarifaire, setPlanTarifaire, e, "nom")}
                                        />
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <label style={{textDecoration: 'underline'}} id='bigLabel'>Déscription: </label>
                                        <br/>
                                        <TextField 
                                            id="outlined-basic"
                                            variant="outlined"
                                            multiline
                                            rows={2}
                                            rowsMax={4}
                                            style={{
                                            width:'100%',
                                            height:'50px',
                                            marginTop:'15px'
                                                  }}
                                            type="text"
                                            value={planTarifaire.description}
                                            onChange={(e) => utility.handleInputChange1(planTarifaire, setPlanTarifaire, e, "description")}
                                        />
                                    </div>
                                    <div style={{marginTop:'50px'}}>
                                        <div>
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} id='bigLabel'>Date de réservation: </label>
                                        </div>
                                            <div className="row" style={{marginTop:'10px'}}>
                                                <div className="col">
                                                    <label style={{marginRight: '10px'}} id='litleLabel'>Début: </label>
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
                                                    <label style={{marginRight: '10px'}} id='litleLabel'>Fin: </label>
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
                                            <label className="row form-label-mt4" style={{textDecoration: 'underline'}} id='bigLabel'>Date de séjour: </label>
                                        </div>
                                        <div className="row" style={{marginTop:'10px'}}>
                                            <div className="col">
                                                <label style={{marginRight: '10px'}} id='litleLabel'>Début: </label>
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
                                                <label style={{marginRight: '10px'}} id='litleLabel'>Fin: </label>
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
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} id='bigLabel'>Lead day: </label>
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
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} id='bigLabel'>Chambres attribuées: </label>
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
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} id='bigLabel'>Lead hour: </label>
                                        </div>
                                        <div className="" style={{marginTop:'10px'}}>
                                            <div id="column">
                                                <label style={{marginRight: '10px'}} id='litleLabel'>Début: </label>
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    style={{width: '75px'}}
                                                    type="time"
                                                    value={planTarifaire.LeadHour.min}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "LeadHour", "min")}
                                                />
                                            </div>
                                            <div id="column" className='col2'>
                                                <label style={{marginRight: '10px'}} id='litleLabel'>Fin: </label>
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    style={{width: '75px'}}
                                                    type="time"
                                                    value={planTarifaire.LeadHour.max}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "LeadHour", "max")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <div>
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} id='bigLabel'>Politiques d'annulation: </label>
                                        </div>
                                        <utility.PolitiqueAnnulAtrb  
                                            politiqueAnnulAtrb={planTarifaire.politiqueAnnulAtrb}
                                            planTarifaire={planTarifaire}
                                            setPlanTarifaire={setPlanTarifaire}
                                            handleCheckBoxChange={utility.handleCheckBoxChange} />
                                    </div>
                                </Box>
                                <div style={{marginTop:'50px'}}>
                                    <Button 
                                    variant="contained" 
                                    color="success" 
                                    onClick={(e) => insert(e)}
                                    style={{textDecoration:'none'}}
                                    >
                                <span style={{color:'white'}}>Créer</span>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default InsertTarif;