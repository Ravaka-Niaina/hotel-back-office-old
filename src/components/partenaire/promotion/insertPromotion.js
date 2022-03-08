import { useState } from 'react';
import {useEffect} from "react";
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import callAPI from '../../../utility.js';
import ButtonLoading from "../buttonLoading.js";
import SkelettonForm from '../../../SkeletonListe/SkeletonFormulaire.js';
import  ResponsiveDrawer  from "../Navbar/responsive-drawer.js";
import JoursPromotion from "./JoursPromotion.js";
import NbJoursAttribProm from "./insertPromotion/nbJourAttribProm.js";

import "./promotion.css";

function getNDigits(number, digit){
  digit = digit + '';
  const remain = number - digit.length;
  for(let i = 0; i < remain; i++){
      digit = "0" + digit;
  }
  return digit;
}
function getDate(date){
  date = new Date(date);
  let year = date.getFullYear();
  let month = getNDigits(2, date.getMonth() + 1);
  let day = getNDigits(2, date.getDate());
  date = year + '-' + month + '-' + day;
  return date;
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
        label={<span id='label'>{tarif.nom}</span>}
        style={{marginLeft:"20px"}}
      />
    );
  })
  return list
}


function TypeChambre(props) {
  let i = -1;
  let typeChambre = props.typeChambre.map((typeC) => {
    i++;
    let u = i;
    return (
      <FormControlLabel
        checked={typeC.checked}
        control={<Checkbox />}
        onChange={(e) => props.handleCheckBoxTypeChambre(e, u)}
        label={<span id="label">{typeC.nom}</span>}
        style={{ marginLeft: '20px' }}
      />
    )
  })
  return typeChambre;
}

function InsertPromotion() {
  const [isDateFinSejourDisabled, setIsDateFinSejourDisabled] = useState(false);

  let [state, setState] = useState({
    errors: [],
    error: {
      nom: null,
      sejourMin: null,
      premierJour: null,
      dernierJour: null,
      leadMin: null,
      leadMax: null,
      remise: null,
      typeChambre: null,
      planTarifaire: null,
      dateDebutS: null,
      dateFinS: null,
      debutReserv: null,
      finReserv: null,
      planTarifaire: null,
      typeChambre: null
    },
    nom: '',
    planTarifaire: [],
    typeChambre: [],
    dateDebutS: '',
    dateFinS: '',
    weekDays: {
      lundi: 1,
      mardi: 1,
      mercredi: 1,
      jeudi: 1,
      vendredi: 1,
      samedi: 1,
      dimanche: 1,
    },
    sejourMin: '1',
    premierJour: '',
    dernierJour: '',
    isLeadHour: true,
    lead: { min: '', max: '' },
    isRemiseEuro: true,
    remise: '',
  })
  
  const [btnLoad, setBtnLoad] = useState(false)
  const [skeletonAffiche, setSkeleton] = useState(true)
  const [leadMaxInfini, setLeadMaxInfini] = useState(false);
  const [isLeadMaxDisabled, setIsLeadMaxDisabled] = useState(false);
  const [dateFinSejourInfini, setDateFinSejourInfini] = useState(false);
  const [reservAToutMoment, setReservAToutMoment] = useState(true);
  const [debutReserv, setDebutReserv] = useState("");
  const [finReserv, setFinReserv] = useState("");
  const [areDateReservDisabled, setAreDateReservDisabled] = useState(true);
  const [leadMinInfini, setLeadMinInfini] = useState(false);
  const [isLeadMinDisabled, setIsLeadMinDisabled] = useState(false);
  const [allRates, setAllRates] = useState(true);
  const [allRoomTypes, setAllRoomTypes] = useState(true);
  const [reservAllTime, setReservAllTime] = useState(false);
  const [allDays, setAllDays] = useState(true);
  const [isWithLead, setIsWithLead] = useState(true);
  const [withNbDaysGetProm, setWithNbDaysGetProm] = useState(false);

  const isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;
  
  const history = useHistory();

  const { _id } = useParams();

  function removeError(fields){
    let current = {...state};

  }

  function setAllRatesChecked(checked){
    let current = {...state};
    for(let i = 0; i < current.planTarifaire.length; i++){
      current.planTarifaire[i].checked = checked;
    }
    setState(current);
  }

  function setAllRoomTypesChecked(checked){
    let current = {...state};
    for(let i = 0; i < current.planTarifaire.length; i++){
      current.planTarifaire[i].checked = checked;
    }
    setState(current);
  }

  function setListTypeChambre(res) {
    let current = JSON.parse(JSON.stringify(state))
    for (let i = 0; i < res.listTypeChambre.length; i++) {
      res.listTypeChambre[i].checked = true;
    }
    current.typeChambre = res.listTypeChambre;

    for (let i = 0; i < res.listTarif.length; i++) {
      res.listTarif[i].checked = true;
    }
    current.planTarifaire = res.listTarif;

    setIsWithLead(!isWithLead);
    current.lead.min = "";
    current.lead.max = "";
    
    setState(current)

    setSkeleton(false)
    switchReservAllTime();
  }

  function setDetailsPromotion(data){
    let error = {...state.error};
    let current = JSON.parse(JSON.stringify(state));
    current = data.promotion;
    current.error = error;
    current.dateDebutS = getDate(current.dateDebutS);
    current.dateFinS = getDate(current.dateFinS);

    setDateFinSejourInfini(data.promotion.dateFinSejourInfini);
    setLeadMaxInfini(data.promotion.leadMaxInfini);
    setIsLeadMaxDisabled(data.promotion.leadMaxInfini ? true : false);
    setIsDateFinSejourDisabled(data.promotion.dateFinSejourInfini ? true : false);
    setReservAllTime(data.promotion.reservAllTime);
    setDebutReserv(data.promotion.debutReserv);
    setFinReserv(data.promotion.finReserv);
    setIsWithLead(data.promotion.isWithLead);
    setWithNbDaysGetProm(data.promotion.withNbDaysGetProm);
    console.log(data.promotion);

    let tmp = data.listTypeChambre;
    let tmpAllRoomTypes = true;
    for(let i = 0; i < tmp.length; i++){
      tmp[i].checked = false;
      let roomTypeFound = false;
      for(let u = 0; u < current.typeChambre.length; u++){
        if(tmp[i]._id == current.typeChambre[u]){
          tmp[i].checked = true;
          roomTypeFound = true;
          break;
        }
      }
      if(!roomTypeFound){
        tmpAllRoomTypes = false;
      }
    }
    current.typeChambre = tmp;
    setAllRoomTypes(tmpAllRoomTypes);

    let tmpAllRates = true;
    for(let i = 0; i < data.listTarif.length; i++){
      data.listTarif[i].checked = false;
      let rateFound = false;
      for(let u = 0; u < current.planTarifaire.length; u++){
        if(data.listTarif[i]._id === current.planTarifaire[u]){
          data.listTarif[i].checked = true;
          rateFound = true;
          break;
        }
      }
      if(!rateFound){
        tmpAllRates = false;
      }
    }
    current.planTarifaire = data.listTarif;
    setAllRates(tmpAllRates);

    let days = Object.keys(data.promotion.weekDays);
    let tmpAllDays = true;
    for(let i = 0; i < days.length; i++){
      if(data.promotion.weekDays[days[i]] === ""){
        tmpAllDays = false;
        break;
      }
    }
    setAllDays(tmpAllDays);

    setState(current);
    setSkeleton(false);
  }

  useEffect(() => {
    if(isInsert){
      callAPI('get', '/TCTarif/list', {}, setListTypeChambre);
    }else{
      callAPI('get', '/promotion/detail/' + _id, {}, setDetailsPromotion);
    }
  }, [])

  function handleCheckBoxPlanTarifaire(e, index) {
    let current = JSON.parse(JSON.stringify(state));
    current.planTarifaire[index].checked = e.target.checked;
    setState(current);

    let tmpAllRates = true;
    for(let i = 0; i < current.planTarifaire.length; i++){
      if(current.planTarifaire[i].checked === false){
        tmpAllRates = false;
      }
    }
    setAllRates(tmpAllRates);
  }

  function handleCheckBoxTypeChambre(e, index) {
    let current = JSON.parse(JSON.stringify(state))
    current.typeChambre[index].checked = e.target.checked
    setState(current);

    let tmpAllRoomTypes = true;
    for(let i = 0; i < current.typeChambre.length; i++){
      if(current.typeChambre[i].checked === false){
        tmpAllRoomTypes = false;
      }
    }
    setAllRoomTypes(tmpAllRoomTypes);
  }

  function handleFinReservChange(value){
    setFinReserv(value);
    let current = JSON.parse(JSON.stringify(state))
    current.error.finReserv = null;
    setState(current);
  }

  function tryRedirect(res) {
    let currentState = JSON.parse(JSON.stringify(state))
    let keys = Object.keys(currentState.error)
    keys.map((k) => {
      currentState.error[k] = null
    })
    if (res.status === 200) {
      history.push('/back/promotion')
    } else if (res.status === 401) {
      //Unauthorized
      history.push('/back/login')
    } else {
      setBtnLoad(false)
      console.log(res.errors);
      let keys = Object.keys(res.errors)
      keys.map((k) => {
        currentState.error[k] = res.errors[k]
      })
    }
    setState(currentState)
    setBtnLoad(false);
  }

  function insert(e) {
    e.preventDefault()
    setBtnLoad(true)
    let toSend = JSON.parse(JSON.stringify(state))
    let selectedPlan = []
    for (let i = 0; i < state.planTarifaire.length; i++) {
      if (state.planTarifaire[i].checked) {
        selectedPlan.push(state.planTarifaire[i]._id)
      }
    }
    toSend.planTarifaire = selectedPlan;

    let selectedTypeC = []
    for (let i = 0; i < state.typeChambre.length; i++) {
      if (state.typeChambre[i].checked) {
        selectedTypeC.push(state.typeChambre[i]._id)
      }
    }

    toSend.typeChambre = selectedTypeC;
    toSend.leadMinInfini = leadMinInfini;
    toSend.dateFinSejourInfini = dateFinSejourInfini;
    toSend.debutReserv = debutReserv;
    toSend.finReserv = finReserv;
    toSend.reservAToutMoment = reservAToutMoment;
    toSend.isWithLead = isWithLead;
    toSend.reservAllTime = reservAllTime;
    toSend.withNbDaysGetProm = withNbDaysGetProm;
    console.log(toSend);
    callAPI('post', '/promotion/create', toSend, tryRedirect);
  }

  function update(e){
    e.preventDefault();
    let toSend = JSON.parse(JSON.stringify(state));
    let planTarifaire = [];
    for(let i = 0; i < state.planTarifaire.length; i++){
      if(state.planTarifaire[i].checked){
          planTarifaire.push(state.planTarifaire[i]._id);
      }
    }
    toSend.planTarifaire = planTarifaire;

    let typeChambre = [];
    for(let i = 0; i < state.typeChambre.length; i++){
      if(state.typeChambre[i].checked){
        typeChambre.push(state.typeChambre[i]._id);
      }
    }
    
    toSend.typeChambre = typeChambre;
    toSend.leadMinInfini = leadMinInfini;
    toSend.dateFinSejourInfini = dateFinSejourInfini;
    toSend.debutReserv = debutReserv;
    toSend.finReserv = finReserv;
    toSend.reservAToutMoment = reservAToutMoment;
    toSend.isWithLead = isWithLead;
    toSend.reservAllTime = reservAllTime;
    toSend.withNbDaysGetProm = withNbDaysGetProm;
    setBtnLoad(true);

    callAPI('post', '/promotion/updateP', toSend, tryRedirect);
  }

  function handleInputChange(event, inputName) {
    const currentState = JSON.parse(JSON.stringify(state))
    currentState[inputName] = event.target.value
    currentState.error[inputName] = null
    setState(currentState)
  }

  function handleLeadMinChange(value){
    let current = JSON.parse(JSON.stringify(state));
    current.lead.min = value;
    current.error.leadMin = null;
    setState(current);
  }

  function handleLeadMaxChange(value){
    let current = JSON.parse(JSON.stringify(state));
    current.lead.max = value;
    current.error.leadMax = null;
    setState(current);
  }

  function handleInputChange3(e, name1, name2, isJourProm) {
    let current = JSON.parse(JSON.stringify(state))
    current[name1][name2] = e.target.checked ? 1 : "";
    if(isJourProm){
      let days = Object.keys(current.weekDays);
      let tmpAllDays = true;
      for(let i = 0; i < days.length; i++){
        if(current.weekDays[days[i]] === ""){
          tmpAllDays = false;
          break;
        }
      }
      setAllDays(tmpAllDays);
    }
    setState(current)
  }

  function handleInputRemiseChange(e, name1) {
    let current = JSON.parse(JSON.stringify(state))
    current[name1] = e.target.value
    current.error.remise = null;
    setState(current)
  }

  function handleIsLeadHourChange(value) {
    let temp = { ...state }
    temp.isLeadHour = value
    setState(temp)
  }

  function handleIsRemiseEuroChange(value) {
    let temp = { ...state }
    temp.isRemiseEuro = value
    setState(temp)
  }

  function switchIsWithLead(){
    setIsWithLead(!isWithLead);
    let current = {...state};
    current.lead.min = "";
    current.lead.max = "";
    setState(current);
  }

  function switchDateFinSejourInfini(){
    setDateFinSejourInfini(!dateFinSejourInfini);
    setIsDateFinSejourDisabled(!isDateFinSejourDisabled);
    let current = {...state};
    current.dateFinS = "";
    setState(current);
  }

  function switchReservAToutMoment(){
    let current = {...state};
    current.error.debutReserv = null;
    current.error.finReserv = null;
    setState(current);

    setReservAToutMoment(!reservAToutMoment);
    setAreDateReservDisabled(!areDateReservDisabled);
    setDebutReserv("");
    setFinReserv("");
  }

  function switchAllRatesSelected(){
    setAllRatesChecked(!allRates);
    setAllRates(!allRates);
  }

  function switchAllRoomTypesSelected(){
    let current = {...state};
    for(let i = 0; i < current.typeChambre.length; i++){
      current.typeChambre[i].checked = !allRoomTypes;
    }
    setState(current);
    setAllRoomTypes(!allRoomTypes);
  }

  function switchReservAllTime(){
    if(reservAllTime){
      setDebutReserv("");
      setFinReserv("");
    }else{
      setFinReserv(state.dateFinS);
      const now = getDate(new Date());
      setDebutReserv(now);
    }
    setReservAllTime(!reservAllTime);
  }

  function switchAllDays(){
    setAllDays(!allDays);
    let current = {...state};
    let days = Object.keys(current.weekDays);
    for(let i = 0; i < days.length; i++){
      current.weekDays[days[i]] = allDays ? '' : 1;
    }
    setState(current);
  }

  return (
    <>
      {/* <Navbar currentPage={3}/> */}
      <div className="block">
        {
          skeletonAffiche ? <SkelettonForm  heigth = {300} />  : <>
          <h4 id="title1">{isInsert ? "Ajouter une nouvelle promotion" : "Modifier une promotion"}</h4><br/>
          <h5>Détails de la promotion</h5>
            <div className="form-group" style={{marginTop:"15px"}}>
              <label id='bigLabel'>À quels plans tarifaires cette promotion s'appliquera-t-elle ?</label>
              <RadioGroup
                aria-label="Pourcentage"
                defaultValue="euro"
                name="radio-buttons-group"
              >
                <div>
                  <FormControlLabel 
                    checked={allRates}
                    onClick={(e) => switchAllRatesSelected()} 
                    control={<Radio />} 
                    label={
                    <span id='litleLabel'>
                      Tous les plans tarifaires
                    </span>}
                  />
                </div>
                <div>
                  <FormControlLabel  
                  checked={!allRates} 
                  onClick={(e) => switchAllRatesSelected()} 
                  control={<Radio />}
                  label={
                    <span id='litleLabel'>
                      Plans tarifaires séléctionnés
                    </span>} />
                </div>
              </RadioGroup>
              <p id='litleLabel' style={{marginLeft:"15px",marginTop:'5px'}}>Veuillez sélectionnez au moins 1 plan tarifaire</p>
              <div className="form-group"  style={{marginTop:"1px"}}>
                  <FormGroup>
                    <PlanTarifaire planTarifaire={state.planTarifaire} handleCheckBoxPlanTarifaire={handleCheckBoxPlanTarifaire}/>
                    {state.error.planTarifaire === null ? null : <div className="customError"><span>{state.error.planTarifaire}</span></div>}
                  </FormGroup>
              </div>
            </div>
            
            <label id='bigLabel'>
              À quels hébergements cette promotion s'appliquera-t-elle ?
            </label>
            <RadioGroup
              aria-label="Pourcentage"
              defaultValue="euro"
              name="radio-buttons-group"
            >
              <div>
                <FormControlLabel 
                checked={allRoomTypes}
                onClick={(e) => switchAllRoomTypesSelected()} 
                control={<Radio />} 
                label={
                <span id='litleLabel'>
                  Tous les hébergements des plans tarifaires sélectionnés
                </span>} />
              </div>
              <div>
                <FormControlLabel  
                checked={!allRoomTypes} 
                onClick={(e) => switchAllRoomTypesSelected()} 
                control={<Radio />}
                label={
                  <span id='litleLabel'>
                    Hébergements sélectionnés
                  </span>} />
              </div>
            </RadioGroup>
              <p id='litleLabel' style={{marginLeft:"15px",marginTop:'5px'}}>Veuillez sélectionner au moins 1 type d'hébergement.</p>
              <div className="form-group"  style={{marginTop:"5px"}}>
                <FormGroup>
                    <TypeChambre 
                        typeChambre={state.typeChambre} 
                        handleCheckBoxTypeChambre={handleCheckBoxTypeChambre}
                      />
                      {state.error.typeChambre === null ? null : <div className="customError"><span>{state.error.typeChambre}</span></div>}
                </FormGroup>    
              </div>
          <hr style={{width:'95%'}}></hr>
          <div style={{marginTop:'0px'}}>
              <div>
                <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px',marginLeft:'0px'}} >
                  Valeur de la promotion
                </label>
              </div>
              <div>
                <label style={{marginTop:"5px"}} id='bigLabel'>
                  Quelle réduction souhaitez-vous proposer ?
                </label>
              </div>
              <div>
                <label style={{marginTop:"5px"}} id='bigLabel'>
                  Sélectionnez le type et valeur de la réduction que vous voulez appliquer
                </label>
              </div>
              <RadioGroup
                aria-label="Pourcentage"
                defaultValue="euro"
                name="radio-buttons-group"
              >
                <div className ="row" style={{marginTop:'15px'}}>
                  <div className ="col">
                    <TextField
                      label="Remise"
                      type='number'
                      id=''
                      size='small'
                      value={state.remise}
                      onChange={(e) => handleInputRemiseChange( e, "remise")}
                      error={state.error.remise === null ? false : true}
                      helperText={state.error.remise === null ? null : state.error.remise}
                    />
                  </div>
                  <div className ="col">
                    <FormControlLabel
                    checked={state.isRemiseEuro ? true : false}
                    onClick={(e) => handleIsRemiseEuroChange(true)} 
                    control={<Radio />} 
                    label={
                    <span id='litleLabel'>
                    Euro
                    </span>} />
                  </div>
                  <div className ="col">
                      <FormControlLabel  
                      checked={state.isRemiseEuro ? false : true}
                      onClick={(e) => handleIsRemiseEuroChange(false)} 
                      control={<Radio />} 
                      label={
                        <span id='litleLabel'>
                          Pourcentage
                        </span>} />
                  </div>
                </div>
              </RadioGroup>
          </div>
          
          <div className="form-group">
            <h5>Dates de séjour</h5>
            <label style={{marginTop:"5px"}} id='bigLabel'>
              Quand les clients peuvent-ils séjourner chez vous en bénéficiant de cette promotion ?
            </label>
            <p id='litleLabel' style={{marginLeft:"15px",marginTop:'5px'}}>Sélectionner une période</p>
            <div className="form-group" style={{marginTop:"25px"}}>
            <p>
                        
              <TextField id="outlined-basic" 
                label="Du" 
                InputLabelProps={{
                shrink: true,
                }}
                variant="outlined" 
                className="form-control"  
                style={{width:"200px"}}
                type="date" 
                name="dateDebutS" 
                value={state.dateDebutS}
                onChange={(e) => handleInputChange(e, "dateDebutS")}
                size="small"
                error={state.error.dateDebutS === null ? false : true}
                helperText={state.error.dateDebutS === null ? null : state.error.dateDebutS}
              />

              <TextField id="outlined-basic"
                label="Au"
                InputLabelProps={{
                shrink: true,
                }}
                variant="outlined" 
                className="form-control"  
                style={{width:"200px",marginLeft:'20px'}}
                type="date" 
                name="dateFinS" 
                value={state.dateFinS}
                onChange={(e) => {handleInputChange(e, "dateFinS"); 
                setFinReserv(reservAllTime ? e.target.value : finReserv)}}
                size="small"
                error={state.error.dateFinS === null ? false : true}
                helperText={state.error.dateFinS === null ? null : state.error.dateFinS}
              />
            </p>
          </div>
          
          <div className="form-group">
            <h5>Période de réservation - facultatif</h5>
            <label style={{marginTop:"5px"}} id='bigLabel'>
              Quand les clients peuvent-ils réserver cette promotion?
            </label>
            <RadioGroup
              aria-label="Pourcentage"
              defaultValue="euro"
              name="radio-buttons-group"
            >
              <div>
                <FormControlLabel 
                checked={reservAllTime}
                onClick={(e) => switchReservAllTime()} 
                control={<Radio />}
                label={
                <span id='litleLabel'>
                  A tout moment
                </span>} />
              </div>
              <div>
                <FormControlLabel
                checked={!reservAllTime}
                onClick={(e) => switchReservAllTime()}
                control={<Radio />}
                label={
                  <span id='litleLabel'>
                    Sélectionner une période
                  </span>} />
              </div>
            </RadioGroup>
            <p>
              <TextField id="outlined-basic" 
                label="Du" 
                InputLabelProps={{
                shrink: true,
                }}
                variant="outlined"
                className="form-control"
                style={{width:"200px"}}
                type="date"
                name="debutReserv"
                value={debutReserv}
                onChange={(e) => setDebutReserv(e.target.value)}
                size="small"
                error={state.error.debutReserv === null ? false : true}
                helperText={state.error.debutReserv === null ? null : state.error.debutReserv}
                disabled={reservAllTime}
              />

              <TextField id="outlined-basic" 
                label="Au" 
                InputLabelProps={{
                shrink: true,
                }}
                variant="outlined" 
                className="form-control"  
                style={{width:"200px",marginLeft:'20px'}}
                type="date" 
                name="finReserv"
                value={finReserv}
                onChange={(e) => handleFinReservChange(e.target.value)}
                size="small"
                error={state.error.finReserv === null ? false : true}
                helperText={state.error.finReserv === null ? null : state.error.finReserv}
                disabled={reservAllTime}
              />
            </p>
          </div>
    </div>

   <div className="form-group" style={{marginTop:"30px"}}>
    <h5>Séjour minimum</h5>
    <label id='bigLabel'>
      Combien de temps les clients doivent-ils séjourner dans votre établissement pour bénéficier de cette promotion ?
    </label>
    <div className="adjacentInputLabel">
      <div className="col">
        <TextField 
          id="outlined-basic"
          variant="outlined"
          label="" 
          style={{width:"200px", marginTop:"15px"}}
          size="small"
          type="number" 
          name="sejourMin"
          value={state.sejourMin}
          onChange={(e) => handleInputChange(e, "sejourMin")}
          error={state.error.sejourMin === null ? false : true}
          helperText={state.error.sejourMin === null ? null : state.error.sejourMin}
          InputLabelProps={{shrink: false}}
        />
      </div>
      <div className="col">
        <span >nuits ou plus</span>
      </div>
    </div>
   </div>

   <div className="form-group" style={{marginTop:"30px"}}>
    <div>
      <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px',marginLeft:'0px'}} >
        Période réservable (Min lead et Max lead)
      </label>
    </div>

    <div>
      <FormControlLabel
        checked={isWithLead}
        onClick={(e) => switchIsWithLead()}
        control={<Radio />}
        label={<span id="litleLabel">Cette promotion est elle disponible uniquement pendant une plage de nombre de jour?</span>}
      />
    </div>
    <label id='bigLabel'>
      Si oui, la question suivante se pose
      Combien de temps à l'avance les clients doivent-ils réserver
      pour bénéficier de cette promotion ?
    </label>
    <RadioGroup
      aria-label="Lead"
      defaultValue="hour"
      name="radio-buttons-group"
    >
      <div className ="row" style={{marginTop:'15px'}}>
        <div className="col">
          <FormControlLabel
            value="hour"
            onClick={(e) => handleIsLeadHourChange(true)}
            control={<Radio />}
            label={<span id="litleLabel">Hour</span>}
          />
        </div>
        <div className="col">
          <FormControlLabel
            value="day"
            onClick={(e) => handleIsLeadHourChange(false)}
            control={<Radio />}
            label={<span id="litleLabel">Day</span>}
          />
        </div>
      </div>
    </RadioGroup>

    <div className="adjacentInputLabel fixAdjacentInputLabel">
      <div className="col">
        <TextField 
          id="outlined-basic"
          variant="outlined"
          label=""
          placeholder={isWithLead ? undefined : "99999"}
          type="number"
          size="small"
          value={state.lead.min}
          onChange={(e) => {handleLeadMinChange(e.target.value)}}
          error={state.error.leadMin === null ? false : true}
          helperText={ state.error.leadMin === null ? null : state.error.leadMin }
          disabled={!isWithLead}
          InputLabelProps={{shrink: false}}
        />
      </div>
      <div className="col">
        <span >jours minimum</span>
      </div>
    </div>

    <div className="adjacentInputLabel">
      <div className="col">
        <TextField 
          id="outlined-basic"
          variant="outlined"
          label=""
          placeholder={isWithLead ? undefined : "0"}
          type="number"
          size="small"
          value={state.lead.max}
          onChange={(e) => handleLeadMaxChange(e.target.value)}
          error={state.error.leadMax === null ? false : true}
          helperText={ state.error.leadMax === null ? null : state.error.leadMax }
          disabled={!isWithLead}
          InputLabelProps={{shrink: false}}
        />
      </div>
      <div className="col">
        <span >jours maximum avant l’arrivée</span>
      </div>
    </div>
  </div>
  <NbJoursAttribProm
    state={state}
    setState={setState}
    withNbDaysGetProm={withNbDaysGetProm}
    setWithNbDaysGetProm={setWithNbDaysGetProm}
    handleInputChange={handleInputChange} />
  
  <div className="form-group" style={{marginTop:"15px"}}> 
    <label id='bigLabel'>Jour d’attribution de la promotion</label>
    <div>
      <FormControlLabel
        checked={!allDays}
        onClick={(e) => switchAllDays()}
        control={<Radio />}
        label={<span id="litleLabel">Cette promotion est elle attribuée à des jours spécifiques du séjour?</span>}
      />
    </div>
   <p>
    <JoursPromotion state={state} handleInputChange3={handleInputChange3} setAllDays={setAllDays} />
  </p>
  </div>

   <div className="form-group" style={{}}>
    <h5>Nom de la promotion </h5>
      <label id='bigLabel'>
        Comment voulez-vous nommer cette promotion ?
      </label>
      <TextField 
        id="outlined-basic" 
        label="Nom"
        variant="outlined"
        className="form-control" 
        style={{width:"400px"}}
        size="small"
        type="text" 
        name="nom" 
        onChange={(e) => handleInputChange(e, "nom")} 
        value={state.nom}
        style={{marginTop:"15px"}}
        error={state.error.nom === null ? false : true}
        helperText={state.error.nom === null ? null : state.error.nom}
      /> 
   </div><br/>
   <div>
    <div class="bouton-aligne">
      {
        btnLoad
          ? <ButtonLoading />
          : <>{ isInsert
              ? <Button
                variant="contained"
                type="submit"
                style={{ textDecoration: 'none', backgroundColor: '#2ac4ea' }}
                onClick={(e) => insert(e)}
              >
                <span style={{ color: 'white' }}>Ajouter</span>
              </Button>
              :  <Button  
              variant="contained" 
              type='submit' 
              style={{backgroundColor:'#FA8072'}}
              onClick={(e) => update(e)}>
              <span style={{color:'white'}}>Modifier</span>
            </Button> } 
          </>
      }
    </div>
    <div class="bouton-aligne">
      <Link to={'/back/promotion'} style={{textDecoration:'none'}}>
        <Button variant="outlined" 
        id="btn2"
        >
        <span style={{color:'#1976d2'}}>Retour</span>
        </Button>
      </Link>
    </div>
   </div>
   </>
  }
</div>
</>
  );
}

export default function recherche_() {
  const isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;
  // const [titre, setTitre] = useState(false);
  let titre = "";
  isInsert ? titre = "Ajout nouvelle promotion" : titre = "Modifier promotion"
  // console.log("TRLALALA"+ JSON.stringify(props));
  return(
      <ResponsiveDrawer 
          title = {titre}
          getContent = {InsertPromotion} 
      />
      
  );
}