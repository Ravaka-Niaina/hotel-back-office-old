import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
//import TimePicker from '@mui/lab/TimePicker';
//import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import CustomError from '../../../../CustomError';
import {useEffect, useRef} from "react";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './insertTarif.css';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import React from 'react'
import callAPI from '../../../../utility';
import FormGroup from '@mui/material/FormGroup';
import  Navbar  from "../../Navbar/Navbar";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio'

const utility = require('./utility.js');



function InsertTarif(){
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState({
        nom: null,
        description: null,
        dateReservationDebut: null,
        dateReservationFin: null,
        dateSejourDebut: null, 
        dateSejourFin: null,
        leadMin: null, 
        leadMax: null,
        chambresAtrb: null,
        politiqueAnnulAtrb: null
    });
    const [planTarifaire, setPlanTarifaire] = useState({
        nom: '',
        description: '',
        isDateReservAuto: false,
        dateReservation: {debut: '', fin: ''},
        dateSejour: {debut: '', fin: ''},
        isLeadHour: true,
        lead: {min: '', max: ''},
        chambresAtrb: [],
        politiqueAnnulAtrb: [

        ]
    });
    const history = useHistory();

    function setListTypeChambre(res){
        console.log(res);
        let current = JSON.parse(JSON.stringify(planTarifaire));
        current.chambresAtrb = res.listType;
        current.politiqueAnnulAtrb = res.listPolitique;
        for(let i = 0; i < current.politiqueAnnulAtrb.length; i++){
            current.politiqueAnnulAtrb[i].checked = false;
        }
        setPlanTarifaire(current);
        console.log(current);
    }

    useEffect(() => {
        callAPI('get', '/TCTarif/TPAvecPA', {}, setListTypeChambre);
      }, []);

    function tryRedirect(res){
        let temp = {...error};
        temp = {
            nom: null,
            description: null,
            dateReservationDebut: null,
            dateReservationFin: null,
            dateSejourDebut: null, 
            dateSejourFin: null,
            leadMin: null, 
            leadMax: null
        };
        console.log(res);
        if(res.status === 200){
            history.push('/back/tarif');
        }else{
            let keys = Object.keys(res.errors);
            if(keys.length === 0){
                history.push('/back/tarif');
            }
            keys.map((k) => {
                temp[k] = res.errors[k];
            });
        }
        setError(temp);
    }

    function insert(e){
        e.preventDefault();
        const current = utility.getPlan(planTarifaire);
        console.log(current);
        callAPI('post', '/planTarifaire/insert', current, tryRedirect);
    }

    return(
        <div className="">
            <Navbar currentPage={1}/>
            <div className="">
                    <div className="">
                        <div className="jumbotron">
                            <h1 className="text-center" id='title1'>Ajouter plan tarifaire</h1>
                            <CustomError errors={errors} />
                            <form className="needs-validation" style={{marginTop:'15px'}}>
                                <Box>
                                    <div style={{marginTop:''}}>
                                        <TextField 
                                            id="outlined-basic"
                                            variant="outlined"
                                            style={{width: '300px'}}
                                            type="text"
                                            size='small'
                                            label="Nom"
                                            value={planTarifaire.nom}
                                            onChange={(e) => utility.handleInputChange1(planTarifaire, setPlanTarifaire, error, setError, e, "nom")}
                                            error={error.nom === null ? false : true}
                                            helperText={error.nom === null ? null : error.nom}
                                        />
                                    </div>
                                    <div style={{marginTop:'20px'}}>
                                        <label style={{textDecoration: 'underline'}} id='bigLabel'>Déscription </label> 
                                        <br/>
                                        <TextField 
                                            id="outlined-basic"
                                            variant="outlined"
                                            multiline
                                            rows={2}
                                            rowsMax={4}
                                            label="Déscription"
                                            style={{
                                            width:'100%',
                                            height:'50px',
                                            marginTop:'15px'
                                                  }}
                                            type="text"
                                            value={planTarifaire.description}
                                            onChange={(e) => utility.handleInputChange1(planTarifaire, setPlanTarifaire, error, setError, e, "description")}
                                            error={error.description === null ? false : true}
                                            helperText={error.description === null ? null : error.description}
                                        />
                                    </div>
                                    <div style={{marginTop:'60px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline'}} id='bigLabel'>Date de réservation </label> 
                                        </div>
                                            <div className="row" style={{marginTop:'20px'}}>
                                                <utility.DateReservAuto planTarifaire={planTarifaire} setPlanTarifaire={setPlanTarifaire} />
                                                <div className="col">
                                                    <TextField
                                                    label="Début"
                                                    type='date'
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                    size='small'
                                                    value={planTarifaire.dateReservation.debut}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "dateReservation", "debut")}
                                                    error={error.dateReservationDebut === null ? false : true}
                                                    helperText={error.dateReservationDebut === null ? null : error.dateReservationDebut}
                                                    /> 

                                                </div>
                                                <div className="col">
                                                    <TextField
                                                    label="Fin"
                                                    type='date'
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                    size='small'
                                                    value={planTarifaire.dateReservation.fin}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "dateReservation", "fin")}
                                                    error={error.dateReservationFin === null ? false : true}
                                                    helperText={error.dateReservationFin === null ? null : error.dateReservationFin}
                                                    /> 

                                                </div>
                                            </div>
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline',marginLeft:'0px'}} id='bigLabel'>Date de séjour </label> 
                                        </div>
                                        <div className="row" style={{marginTop:'15px'}}>
                                            <div className="col">
                                                    <TextField
                                                    label="Début"
                                                    type='date'
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                    size='small'
                                                    value={planTarifaire.dateSejour.debut}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "dateSejour", "debut")}
                                                    error={error.dateSejourDebut === null ? false : true}
                                                    helperText={error.dateSejourDebut === null ? null : error.dateSejourDebut}
                                                    /> 

                                            </div>
                                            <div className="col">
                                                    <TextField
                                                    label="Fin"
                                                    type='date'
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                    size='small'
                                                    value={planTarifaire.dateSejour.fin}
                                                    onChange={(e) => { 
                                                        utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "dateSejour", "fin", true)}}
                                                    error={error.dateSejourFin === null ? false : true}
                                                    helperText={error.dateSejourFin === null ? null : error.dateSejourFin}
                                                    /> 
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{marginTop:'0px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px',marginLeft:'0px'}} >
                                                Lead { planTarifaire.isLeadHour ? "hour" : "day"} 
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
                                                    label="Max"
                                                    type='number'
                                                    id='lead'
                                                    size='small'
                                                    value={planTarifaire.lead.max}
                                                    placeholder='Hour/Date'
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "lead", "max")}
                                                    error={error.leadMax === null ? false : true}
                                                    helperText={error.leadMax === null ? null : error.leadMax}
                                                    /> 
                                                </div>
                                                <div className ="col">
                                                    <TextField
                                                    label="Min"
                                                    type='number'
                                                    id='lead'
                                                    size='small'
                                                    value={planTarifaire.lead.min}
                                                    placeholder='Hour/Date'
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "lead", "min")}
                                                    error={error.leadMin === null ? false : true}
                                                    helperText={error.leadMin === null ? null : error.leadMin}
                                                    /> 
                                                </div>
                                                <div className ="col">
                                                    <FormControlLabel 
                                                    value="hour" 
                                                    onClick={(e) => utility.handleIsLeadHourChange(planTarifaire, setPlanTarifaire, true)} 
                                                    control={<Radio />} 
                                                    label={
                                                    <span id='litleLabel'>
                                                    Hour
                                                    </span>} />
                                                </div>
                                                <div className ="col">
                                                    <FormControlLabel  
                                                    value="day" 
                                                    onClick={(e) => utility.handleIsLeadHourChange(planTarifaire, setPlanTarifaire, false)} 
                                                    control={<Radio />} 
                                                    label={
                                                        <span id='litleLabel'>
                                                        Day
                                                        </span>} /> 
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div style={{marginTop:'20px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline'}} id='bigLabel'>Chambres attribuées </label> 
                                        </div>
                                        <div>
                                            <utility.ChambresAtrb 
                                                chambresAtrb={planTarifaire.chambresAtrb} 
                                                planTarifaire={planTarifaire}
                                                setPlanTarifaire={setPlanTarifaire}
                                                handleCheckBoxChange={utility.handleCheckBoxChange} />
                                            {error.chambresAtrb === null ? null : <div className="customError"><span>{error.chambresAtrb}</span></div>}
                                        </div>
                                    </div>
                                    <div style={{marginTop:'20px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px'}} >Politiques d'annulation </label> 
                                        </div>
                                        <utility.PolitiqueAnnulAtrb  
                                            politiqueAnnulAtrb={planTarifaire.politiqueAnnulAtrb}
                                            planTarifaire={planTarifaire}
                                            setPlanTarifaire={setPlanTarifaire}
                                            handleCheckBoxChange={utility.handleCheckBoxChange} />
                                        {error.PolitiqueAnnulAtrb === null ? null : <div className="customError"><span>{error.PolitiqueAnnulAtrb}</span></div>}
                                    </div>
                                </Box>

                                <div className="pied" style={{marginTop:'30px'}}>   
                                    <div class="bouton-aligne">  
                                    <Button  
                                    variant="contained" 
                                    type='submit' 
                                    style={{textDecoration:'none',color:'black',backgroundColor:'#2ac4ea'}}
                                    onClick={(e) => insert(e)}>
                                    <span style={{color:'white'}}>Ajouter</span>
                                    </Button>
                                    </div>
                                    <div class="bouton-aligne">
                                        <Link to={'/tarif'} style={{textDecoration:'none'}}>
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
                </div>
            </div>
    );
}
export default InsertTarif;