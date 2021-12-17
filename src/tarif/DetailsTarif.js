import callAPI from '../utility';
import CustomError from '../CustomError';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './insertTarif.css';
import Box from '@mui/material/Box';
import { useParams, useHistory } from 'react-router-dom'
import  Navbar  from "../Navbar/Navbar";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio'
import {Link} from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';


const utility = require('./utility.js');



function DetailsTarif(){
    const [errors, setErrors] = useState([]);
    const [isLeadHour, setIsLeadHour] = useState(true);
    const [lead, setLead] = useState("");
    const [planTarifaire, setPlanTarifaire] = useState({
        _id: '',
        nom: '',
        description: '',
        dateReservation: {debut: '', fin: ''},
        dateSejour: {debut: '', fin: ''},
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
    }

    function update(e){
        const current = utility.getPlan(planTarifaire, isLeadHour, lead);
        console.log(current);
        callAPI('post', '/planTarifaire/update', current, tryRedirect);
    }

    function setPlan(res){
        let current = JSON.parse(JSON.stringify(planTarifaire));
        current = res.planTarifaire;
        setIsLeadHour(res.planTarifaire.lead.isLeadHour);
        setLead(res.planTarifaire.lead.valeur);
        console.log(res);
        setPlanTarifaire(current);
    }

    useEffect(() => {
        console.log(planTarifaire.dateReservation.debut);
        callAPI('get', "/planTarifaire/details/" + _id, {}, setPlan);
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
                                            label={
                                                <p id='libel'>
                                                    Nom
                                                </p>
                                                     }
                                            value={planTarifaire.nom}
                                            onChange={(e) => utility.handleInputChange1(planTarifaire, setPlanTarifaire, e, "nom")}
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
                                            label={
                                                <p id='libel'>
                                                    Déscription
                                                </p>
                                                     }
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

                                    <div style={{marginTop:'100px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline'}} id='bigLabel'>Date de réservation </label>
                                        </div>
                                            <div className="row" style={{marginTop:'10px'}}>
                                                <div className="col">
                                                    <label style={{marginRight: '10px'}} id='litleLabel'>Début: </label>

                                                    <input
                                                    type='date'
                                                    id='dateD1'
                                                    value={planTarifaire.dateReservation.debut}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "dateReservation", "debut")}
    
                                                    /> 

                                                </div>
                                                <div className="col">
                                                    <label style={{marginRight: '10px'}} id='litleLabel'>Fin: </label>

                                                    <input
                                                    type='date'
                                                    id='dateF1'
                                                    value={planTarifaire.dateReservation.fin}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "dateReservation", "fin")}
                                                    />

                                                </div>
                                            </div>
                                    </div>
                                    <div style={{marginTop:'0px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline',marginLeft:'0px'}} id='bigLabel'>Date de séjour </label>
                                        </div>
                                        <div className="row" style={{marginTop:'10px'}}>
                                            <div className="col">
                                                <label style={{marginRight: '10px'}} id='litleLabel'>Début: </label>

                                                    <input
                                                    type='date'
                                                    id='dateD2'
                                                    value={planTarifaire.dateSejour.debut}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "dateSejour", "debut")}
                                                    /> 

                                            </div>
                                            <div className="col">
                                                <label style={{marginRight: '10px'}} id='litleLabel'>Fin: </label>

                                                    <input
                                                    type='date'
                                                    id='dateF2'
                                                    value={planTarifaire.dateSejour.fin}
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, e, "dateSejour", "fin")}
                                                    /> 

                                            </div>
                                        </div>
                                    </div>
                                    <div style={{marginTop:'0px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px',marginLeft:'0px'}} >
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

                                                    <input
                                                    type='number'
                                                    id='lead'
                                                    value={lead}
                                                    placeholder='Hour/Date'
                                                    onChange={(e) => setLead(e.target.value)}
                                                    /> 

                                                </div>
                                                <div className ="col">
                                                    <FormControlLabel 
                                                    checked={isLeadHour ? true : false} 
                                                    value="hour" 
                                                    onClick={(e) => setIsLeadHour(true)} 
                                                    control={<Radio />} 
                                                    label={
                                                        <span id='litleLabel'>
                                                        Hour
                                                        </span>}  />
                                                </div>
                                                <div className ="col">
                                                    <FormControlLabel 
                                                    checked={isLeadHour ? false : true} 
                                                    value="day" 
                                                    onClick={(e) => setIsLeadHour(false)} 
                                                    control={<Radio />} 
                                                    label={
                                                        <span id='litleLabel'>
                                                        Day
                                                        </span>} />
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div style={{marginTop:'0px'}}>
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

                                <div style={{marginTop:'30px'}}>

<Button variant="contained"  style={{backgroundColor:'#FA8072'}} onClick={(e) => update(e)}>
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
            
    );
}

export default DetailsTarif;