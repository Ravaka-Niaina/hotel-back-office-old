import TextField from '@mui/material/TextField';
import CustomError from '../../../../CustomError';
import {useEffect, useRef} from "react";
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './insertTarif.css';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import callAPI from '../../../../utility';
import  Navbar  from "../../Navbar/Navbar";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import ButtonLoading from "../../buttonLoading.js"

import {session} from '../../../common/utilitySession.js';
import Login from '../../../common/Authentification/Login.js';
import NotEnoughAccessRight from '../../../common/NotEnoughAccessRight';
import SkelettonForm from '../../../../SkeletonListe/SkeletonFormulaire.js';
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
        politiqueAnnulAtrb: null,
        debutReserv: null,
        finReserv: null
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

        ],
        debutReserv: null,
        finReserv: null
    });
    const [btnLoad, setBtnLoad] = useState(false);
    const history = useHistory();
    const [skeletonAffiche , setSkeleton] = useState(true);
    const [leadMinInfini, setLeadMinInfini] = useState(false);
    const [isLeadMinDisabled, setIsLeadMinDisabled] = useState(false);
<<<<<<< HEAD
    const [reservAToutMoment, setReservAToutMoment] = useState(true);
    const [areDateReservDisabled, setAreDateReservDisabled] = useState(true);
    const { _id } = useParams();

    const isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;
=======
>>>>>>> 6100dc181135386bb19098d9c136d928ed98265c

    function setListTypeChambre(res){
        let current = JSON.parse(JSON.stringify(planTarifaire));
        current.chambresAtrb = res.listType;
        current.politiqueAnnulAtrb = res.listPolitique;
        for(let i = 0; i < current.politiqueAnnulAtrb.length; i++){
            current.politiqueAnnulAtrb[i].checked = false;
        }
        setPlanTarifaire(current);
        setSkeleton(false);
    }

    function setPlan(res){
        console.log(res);
        if(res.status === 200){
            setReservAToutMoment(res.planTarifaire.reservAToutMoment);
            setAreDateReservDisabled(res.planTarifaire.reservAToutMoment ? true : false);
            setLeadMinInfini(res.planTarifaire.leadMinInfini);
            setIsLeadMinDisabled(res.planTarifaire.leadMinInfini);
            setPlanTarifaire(res.planTarifaire);
            setSkeleton(false);
        }else if(res.status === 401){//Unauthorized
            history.push('/back/login');
        }else if(res.status === 403){
            history.push('/notEnoughAccessRight');
        }
    }

    const hasARInsert = session.getInstance().hasOneOfTheseAccessRights(["insertPlanTarifaire", "superAdmin"]);
    const hasARGet = session.getInstance().hasOneOfTheseAccessRights(["getPlanTarifaire", "superAdmin"]);
    const hasARUpdate = session.getInstance().hasOneOfTheseAccessRights(["updatePlanTarifaire", "superAdmin"]);

    useEffect(() => {
        const isConnected = session.getInstance().isConnected();
        if(!isConnected){
            return(<Login urlRedirect={window.location.href} />);
        }

        if(hasARInsert && isInsert){
            callAPI('get', '/TCTarif/TPAvecPA', {}, setListTypeChambre);
        }else if((hasARGet || hasARUpdate) && !isInsert){
            callAPI('get', "/planTarifaire/details/" + _id, {}, setPlan);
        }else{
            history.push('/notEnoughAccessRight');
        }
        
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
        setBtnLoad(false);
        if(res.status === 200){
            history.push('/back/tarif');
        }else if(res.status === 401){//Unauthorized
            history.push('/back/login');
        }else if(res.status === 403){
            history.push('/notEnoughAccessRight');
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

    function update(e){
        setBtnLoad(true);
        const current = utility.getPlan(planTarifaire);
        current.leadMinInfini = leadMinInfini;
        current.reservAToutMoment = reservAToutMoment;
        callAPI('post', '/planTarifaire/update', current, tryRedirect);
    }

    function insert(e){
        e.preventDefault();
        setBtnLoad(true);
        const current = utility.getPlan(planTarifaire);
        current.leadMinInfini = leadMinInfini;
<<<<<<< HEAD
        current.reservAToutMoment = reservAToutMoment;
=======
>>>>>>> 6100dc181135386bb19098d9c136d928ed98265c
        callAPI('post', '/planTarifaire/insert', current, tryRedirect);
    }

    function switchInfini(){
        setLeadMinInfini(!leadMinInfini);
        setIsLeadMinDisabled(!isLeadMinDisabled);
        let current = {...planTarifaire};
        current.lead.min = "";
        setPlanTarifaire(current);
    }

    function switchReservAToutMoment(){
        let errorTmp = {...error};
        errorTmp.dateReservationDebut = null;
        errorTmp.dateReservationFin = null;
        setError(errorTmp);
    
        setReservAToutMoment(!reservAToutMoment);
        setAreDateReservDisabled(!areDateReservDisabled);

        let tarifTmp = {...planTarifaire};
        tarifTmp.dateReservation = {debut: "", fin: ""};
        setPlanTarifaire(tarifTmp);
    }

    return(
        <div className="">
            <Navbar currentPage={1}/>
            <div className="">
                    <div className="">
                        <div className="jumbotron">
                            {
                                skeletonAffiche ? <SkelettonForm /> : <>

                            <h1 className="text-center" id='title1'>{isInsert ? "Ajouter plan tarifaire" : "Modifier plan tarifaire"}</h1>
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
                                        <div>
                                            <label>Quand les clients peuvent-ils réserver chez vous pour bénéficier de ce tarif?</label>
                                        </div>
                                        <div className="form-group" style={{ marginTop: '25px' }}>
                                            <p><FormControlLabel
                                                checked={reservAToutMoment}
                                                onClick={(e) => switchReservAToutMoment()}
                                                control={<Radio />}
                                                label={<span id="litleLabel">A tout moment</span>}
                                            /></p>
                                            <p><FormControlLabel
                                                checked={!reservAToutMoment}
                                                onClick={(e) => switchReservAToutMoment()}
                                                control={<Radio />}
                                                label={<span id="litleLabel">Sélectionner une période</span>}
                                            /></p>
                                        </div>
                                        <p id="litleLabel" style={{ marginLeft: '15px', marginTop: '5px' }}>
                                            Sélectionner une période
                                        </p>
                                        <div className="row" style={{marginTop:'20px'}}>
                                            <utility.DateReservAuto planTarifaire={planTarifaire} setPlanTarifaire={setPlanTarifaire} />
                                            <div className="col">
                                                <TextField
                                                label="Du"
                                                type='date'
                                                InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                size='small'
                                                value={planTarifaire.dateReservation.debut}
                                                onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "dateReservation", "debut")}
                                                error={error.dateReservationDebut === null ? false : true}
                                                helperText={error.dateReservationDebut === null ? null : error.dateReservationDebut}
                                                disabled={areDateReservDisabled}
                                                />

                                            </div>
                                            <div className="col">
                                                <TextField
                                                label="Au"
                                                type='date'
                                                InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                size='small'
                                                value={planTarifaire.dateReservation.fin}
                                                onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "dateReservation", "fin")}
                                                error={error.dateReservationFin === null ? false : true}
                                                helperText={error.dateReservationFin === null ? null : error.dateReservationFin}
                                                disabled={areDateReservDisabled}
                                                /> 

                                            </div>
                                        </div>
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline',marginLeft:'0px'}} id='bigLabel'>Date de séjour</label> 
                                        </div>
                                        <div>
                                            <label>Quand les clients peuvent-ils séjourner chez vous pour bénéficier de ce tarif ?</label>
                                        </div>
                                        <div>
                                            <label>Sélectionner une période</label>
                                        </div>
                                        <div className="row" style={{marginTop:'15px'}}>
                                            <div className="col">
                                                    <TextField
                                                    label="Du"
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
                                                    label="Au"
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
                                        <div>
                                            <FormControlLabel
                                                checked={leadMinInfini}
                                                onClick={(e) => switchInfini()}
                                                control={<Radio />}
                                                label={<span id="litleLabel">Pas de fin</span>}
                                            />
                                        </div>
                                        <RadioGroup
                                            aria-label="Lead"
                                            defaultValue="hour"
                                            name="radio-buttons-group"
                                        >
                                            <div className ="row" style={{marginTop:'15px'}}>
                                                <div className ="col">
                                                    <TextField
                                                    label="Min"
                                                    type='number'
                                                    size='small'
                                                    value={planTarifaire.lead.min}
                                                    placeholder='Hour/Date'
                                                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "lead", "min")}
                                                    error={error.leadMin === null ? false : true}
                                                    helperText={error.leadMin === null ? null : error.leadMin}
                                                    disabled={isLeadMinDisabled}
                                                    /> 
                                                </div>
                                                <div className ="col">
                                                    <TextField
                                                    label="Max"
                                                    type='number'
                                                    size='small'
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
                                        { hasARInsert && isInsert
                                        ? <>{ btnLoad ? <ButtonLoading />
                                            : <Button  
                                                variant="contained" 
                                                type='submit' 
                                                style={{textDecoration:'none',color:'black',backgroundColor:'#2ac4ea'}}
                                                onClick={(e) => insert(e)}>
                                                <span style={{color:'white'}}>Ajouter</span>
                                            </Button>
                                        } </>
                                        : null }

                                        {hasARUpdate && !isInsert
                                        ? <>{ btnLoad 
                                            ? <ButtonLoading /> 
                                            : <Button variant="contained"  style={{backgroundColor:'#FA8072'}} onClick={(e) => update(e)}>
                                                Modifier
                                            </Button> }
                                        </>
                                        : null }
                                    </div>
                                    <div class="bouton-aligne">
                                        <Link to={'/back/tarif'} style={{textDecoration:'none'}}>
                                        <Button variant="outlined" 
                                        id="btn2">
                                    <span style={{color:'#1976d2'}}>Retour</span>
                                        </Button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                             </>
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default InsertTarif;