import callAPI from '../../../../utility';
import CustomError from '../../../../CustomError';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './insertTarif.css';
import Box from '@mui/material/Box';
import { useParams, useHistory } from 'react-router-dom'
import  Navbar  from "../../Navbar/Navbar";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio'
import {Link} from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import ButtonLoading from "../../buttonLoading.js"

import {session} from '../../../common/utilitySession.js';
import Login from '../../../common/Authentification/Login.js';
const utility = require('./utility.js');




function DetailsTarif(){
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState({
        nom: null,
        description: null,
        isDateReservAuto: false,
        dateReservationDebut: null,
        dateReservationFin: null,
        dateSejourDebut: null, 
        dateSejourFin: null,
        leadMin: null, 
        leadMax: null
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
    const [btnLoad, setBtnLoad] = useState(false);

    const { _id } = useParams();
    const history = useHistory();

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
        }else if(res.status === 401){//Unauthorized
            history.push('/back/login');
        }else if(res.status === 403){
            history.push('/notEnoughAccessRight');
        }else{
            setBtnLoad(false);
            let keys = Object.keys(res.errors);
            keys.map((k) => {
                temp[k] = res.errors[k];
            });
        }
        setError(temp);
    }

    function update(e){
        setBtnLoad(true);
        const current = utility.getPlan(planTarifaire);
        console.log(current);
        callAPI('post', '/planTarifaire/update', current, tryRedirect);
    }

    function setPlan(res){
        if(res.status === 200){
            setPlanTarifaire(res.planTarifaire);
        }else if(res.status === 401){//Unauthorized
            history.push('/back/login');
        }else if(res.status === 403){
            history.push('/notEnoughAccessRight');
        }
    }

    const hasARGet = session.getInstance().hasOneOfTheseAccessRights(["getPlanTarifaire", "superAdmin"]);
    const hasARUpdate = session.getInstance().hasOneOfTheseAccessRights(["updatePlanTarifaire", "superAdmin"]);


    useEffect(() => {
        const isConnected = session.getInstance().isConnected();
        if(!isConnected){
            return(<Login urlRedirect={window.location.href} />);
        }else if(hasARGet || hasARUpdate){
            console.log("hasAR");
            callAPI('get', "/planTarifaire/details/" + _id, {}, setPlan);
        }else{
            console.log("hasNoAR");
            history.push('/notEnoughAccessRight');
        }
      }, [_id]);

    return(
        <div className="">
            <Navbar currentPage={1}/>
                        <div className="jumbotron">
                            <h1 className="" id='title1'>Modifier plan tarifaire</h1>
                            <CustomError errors={errors} />
                            <form className="needs-validation" style={{marginTop:'15px'}}>
                                <Box>
                                    <div style={{marginTop:''}}>
                                        <TextField 
                                            id="outlined-basic"
                                            variant="outlined"
                                            size='small'
                                            style={{width: '300px'}}
                                            type="text"
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
                                            rows={4}
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

                                    <div style={{marginTop:'100px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline'}} id='bigLabel'>Date de réservation </label>
                                        </div>
                                        <div className="row" style={{marginTop:'10px'}}>
                                        <utility.DateReservAuto planTarifaire={planTarifaire} setPlanTarifaire={setPlanTarifaire} />                                            <div className="col">
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
                                    <div style={{marginTop:'20px'}}>
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
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "dateSejour", "fin", true)}
                                                    error={error.dateSejourFin === null ? false : true}
                                                    helperText={error.dateSejourFin === null ? null : error.dateSejourFin}
                                                    /> 
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{marginTop:'20px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px',marginLeft:'0px'}} >
                                                Lead { planTarifaire.isLeadHour ? "hour" : "day"} 
                                            </label>
                                        </div>
                                        <RadioGroup
                                            aria-label="Lead"
                                            name="radio-buttons-group"
                                        >
                                            <div className ="row" style={{marginTop:'15px'}}>
                                                <div className ="col">
                                                    <TextField
                                                    label="Min"
                                                    type='number'
                                                    size='small'
                                                    id='lead'
                                                    value={planTarifaire.lead.min}
                                                    placeholder='Hour/Date'
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "lead", "min")}
                                                    error={error.leadMin === null ? false : true}
                                                    helperText={error.leadMin === null ? null : error.leadMin}
                                                    /> 
                                                </div>
                                                <div className ="col">
                                                    <TextField
                                                    label="Max"
                                                    type='number'
                                                    size='small'
                                                    id='lead'
                                                    value={planTarifaire.lead.max}
                                                    placeholder='Hour/Date'
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "lead", "max")}
                                                    error={error.leadMax === null ? false : true}
                                                    helperText={error.leadMax === null ? null : error.leadMax}
                                                    /> 
                                                </div>
                                                <div className ="col">
                                                    <FormControlLabel 
                                                    value="hour" 
                                                    checked={planTarifaire.isLeadHour ? true : false}
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
                                                    checked={planTarifaire.isLeadHour ? false : true}
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
                                        </div>
                                    </div>
                                    <div style={{marginTop:'20px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline'}} id='bigLabel'>Politiques d'annulation: </label>
                                        </div>
                                        <utility.PolitiqueAnnulAtrb  
                                            politiqueAnnulAtrb={planTarifaire.politiqueAnnulAtrb}
                                            planTarifaire={planTarifaire}
                                            setPlanTarifaire={setPlanTarifaire}
                                            handleCheckBoxChange={utility.handleCheckBoxChange} />
                                        
                                    </div>
                                </Box>
                                <div className="pied" style={{marginTop:'30px'}}>   
                                    <div class="bouton-aligne">
                                    {
                                        btnLoad ? <ButtonLoading /> :
                                        <Button variant="contained"  style={{backgroundColor:'#FA8072'}} onClick={(e) => update(e)}>
                                            Modifier
                                        </Button>
                                    }
                                
                                    </div>
                                    <div class="bouton-aligne">
                                    <Link to='/back/typeChambre' style={{textDecoration:'none'}}>
                                        <Button variant="contained" style={{backgroundColor:'#293846',color:'white',marginLeft:'20px'}}>
                                            Retour
                                        </Button>
                                    </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
 
                
            </div>
            
    );
}

export default DetailsTarif;