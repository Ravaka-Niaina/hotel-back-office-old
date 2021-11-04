import callAPI from '../utility';
import CustomError from '../CustomError';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import { useParams, useHistory } from 'react-router-dom'
import  Navbar  from "../Navbar/Navbar";
const utility = require('./utility.js');



function DetailsTarif(){
    const [errors, setErrors] = useState([]);
    const [planTarifaire, setPlanTarifaire] = useState({
        _id: '',
        nom: '',
        description: '',
        dateReservation: {debut: '', fin: ''},
        dateSejour: {debut: '', fin: ''},
        LeadDay: [
            {_id: 1, label: 'Lundi', checked: true},
            {_id: 2, label: 'Mardi', checked: false},
            {_id: 3, label: 'Mercredi', checked: true},
            {_id: 4, label: 'Jeudi', checked: false},
            {_id: 5, label: 'Vendredi', checked: false},
            {_id: 6, label: 'Samedi', checked: false},
            {_id: 7, label: 'Dimanche', checked: false}
        ],
        LeadHour: {min: '', max: ''},
        chambresAtrb: [],
        politiqueAnnulAtrb: []
    });
    const { _id } = useParams();
    const history = useHistory();

    function tryRedirect(res){
        if(res.status === 200){
            history.push('/tarif');
        }else{
            setErrors(res.errors);
        }
        console.log(res);
    }

    function update(e){
        const current = utility.getPlan(planTarifaire);
        console.log(current);
        callAPI('post', '/planTarifaire/update', current, tryRedirect);
    }

    function setPlan(res){
        let current = JSON.parse(JSON.stringify(planTarifaire));
        current = res.planTarifaire;
        console.log(res);
        setPlanTarifaire(current);
    }

    useEffect(() => {
        console.log(planTarifaire.dateReservation.debut);
        callAPI('get', "/planTarifaire/details/" + _id, {}, setPlan);
      }, [_id]);

    return(
        <div className="container">
            <Navbar currentPage={1}/>
            <div className="row">
                <div className="col-md-3"></div>
                    <div className="col-md-9">
                        <div className="jumbotron" 
                            style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)',marginTop:'-60px'}}>
                            <h1 className="text-center" id='title1'>Modifier plan tarifaire</h1>
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
                                            <utility.LeadDay 
                                                days={planTarifaire.LeadDay} 
                                                planTarifaire={planTarifaire}
                                                setPlanTarifaire={setPlanTarifaire}
                                                handleCheckBoxChange={utility.handleCheckBoxChange} />
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
                                    <Button variant="contained" color="success" onClick={(e) => update(e)}>
                                        Modifier
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
    );
}

export default DetailsTarif;