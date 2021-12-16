import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
//import TimePicker from '@mui/lab/TimePicker';
//import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import CustomError from '../CustomError';
import {useEffect, useRef} from "react";
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './insertTarif.css';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import React from 'react'
import callAPI from '../utility';
import FormGroup from '@mui/material/FormGroup';
import  Navbar  from "../Navbar/Navbar";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio'

const utility = require('./utility.js');



function InsertTarif(){
    const [errors, setErrors] = useState([]);
    const [isLeadHour, setIsLeadHour] = useState(true);
    const [lead, setLead] = useState("");
    const [planTarifaire, setPlanTarifaire] = useState({
        nom: '',
        description: '',
        dateReservation: {debut: '', fin: ''},
        dateSejour: {debut: '', fin: ''},
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
        setPlanTarifaire(current);
    }

    useEffect(() => {
        callAPI('get', '/TCTarif/TPAvecPA', {}, setListTypeChambre);
      }, []);

    function tryRedirect(res){
        console.log(res);
        if(res.status === 200){
            history.push('/tarif');
        }else{
            setErrors(res.errors);
        }
    }

    function insert(e){
        const current = utility.getPlan(planTarifaire, isLeadHour, lead);
        callAPI('post', '/planTarifaire/insert', current, tryRedirect);
    }

    return(
        <div className="">
            <Navbar currentPage={1}/>
            <div className="">
                    <div className="">
                        <div className="jumbotron">
                            <h1 className="text-center" id='title1'>Ajouter plan tarifaire</h1>
                            <hr></hr>
                            <CustomError errors={errors} />
                            <form className="needs-validation">
                                <Box>
                                    <div style={{marginTop:'40px',display:'inline'}}>
                                        <TextField 
                                            id="outlined-basic"
                                            variant="outlined"
                                            style={{width: '300px'}}
                                            type="text"
                                            size='small'
                                            label={
                                            <p id='libel'>
                                                Nom
                                            </p>
                                                 }
                                            value={planTarifaire.nom}
                                            onChange={(e) => utility.handleInputChange1(planTarifaire, setPlanTarifaire, e, "nom")}
                                        />
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <label style={{textDecoration: 'underline'}} id='bigLabel'>Déscription </label> 
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
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} id='bigLabel'>Date de réservation </label> 
                                        </div>
                                            <div className="row" style={{marginTop:'10px'}}>
                                                <div className="col">
                                                    <label style={{marginRight: '10px'}} id='litleLabel'>Début :</label>

                                                    <OutlinedInput
                                                    id="outlined-adornment-weight"
                                                    size='small'
                                                    style={{width: '200px'}}
                                                    type="date"
                                                    value={planTarifaire.dateReservation.debut}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "dateReservation", "debut")}
                                                    />

                                                </div>
                                                <div className="col">
                                                    <label style={{marginRight: '10px'}} id='litleLabel'>Fin :</label> 

                                                    <OutlinedInput
                                                    id="outlined-adornment-weight"
                                                    size='small'
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
                                            <label className="row form-label-mt4" style={{textDecoration: 'underline',marginLeft:'0px'}} id='bigLabel'>Date de séjour </label> 
                                        </div>
                                        <div className="row" style={{marginTop:'10px'}}>
                                            <div className="col">
                                                <label style={{marginRight: '10px'}} id='litleLabel'>Début :</label> 

                                                <OutlinedInput
                                                    id="outlined-adornment-weight"
                                                    size='small'
                                                    style={{width: '200px'}}
                                                    type="date"
                                                    value={planTarifaire.dateSejour.debut}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "dateSejour", "debut")}
                                                    />

                                            </div>
                                            <div className="col">
                                                <label style={{marginRight: '10px'}} id='litleLabel'>Fin :</label>

                                                <OutlinedInput
                                                    id="outlined-adornment-weight"
                                                    size='small'
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
                                            <label className="row form-label-mt4" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px',marginLeft:'0px'}} >
                                                Lead { isLeadHour ? "hour" : "day"} 
                                            </label>
                                        </div>
                                        <RadioGroup
                                            aria-label="Lead"
                                            defaultValue="hour"
                                            name="radio-buttons-group"
                                        >
                                            <div className ="row">
                                                <div className ="col">

                                                <OutlinedInput
                                                    id="outlined-adornment-weight"
                                                    size='small'
                                                    style={{width: "200px"}}
                                                    type="number"
                                                    value={lead}
                                                    onChange={(e) => setLead(e.target.value)}
                                                    />

                                                </div>
                                                <div className ="col">
                                                    <FormControlLabel value="hour" onClick={(e) => setIsLeadHour(true)} control={<Radio />} label="Hour" />
                                                </div>
                                                <div className ="col">
                                                    <FormControlLabel  value="day" onClick={(e) => setIsLeadHour(false)} control={<Radio />} label="Day" />
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <div>
                                            <label className="form-label-mt4" style={{textDecoration: 'underline'}} id='bigLabel'>Chambres attribuées </label> 
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
                                            <label className="form-label-mt4" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px'}} >Politiques d'annulation </label> 
                                        </div>
                                        <utility.PolitiqueAnnulAtrb  
                                            politiqueAnnulAtrb={planTarifaire.politiqueAnnulAtrb}
                                            planTarifaire={planTarifaire}
                                            setPlanTarifaire={setPlanTarifaire}
                                            handleCheckBoxChange={utility.handleCheckBoxChange} />
                                    </div>
                                </Box>

                                <div className="pied" style={{marginTop:'25px'}}>   
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