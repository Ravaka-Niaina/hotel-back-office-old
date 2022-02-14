import useEffect from 'react'
import { useState } from 'react'
import { Checkbox } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import ButtonLoading from '../buttonLoading.js'
import SkelettonForm from '../../../SkeletonListe/SkeletonFormulaire.js'

import './promotion.css'
import callAPI from '../../../utility.js'
import  Navbar  from "../Navbar/Navbar";

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

function PlanTarifaire(props) {
  let i = -1
  let list = props.planTarifaire.map((tarif) => {
    i++
    let u = i
    return (
      <FormControlLabel
        checked={tarif.checked}
        control={<Checkbox />}
        onChange={(e) => props.handleCheckBoxPlanTarifaire(e, u)}
        label={<span id="label">{tarif.nom}</span>}
        style={{ marginLeft: '20px' }}
      />
    )
  })
  return list
}

function TypeChambre(props) {
  console.log(props.typeChambre)
  let i = -1
  let typeChambre = props.typeChambre.map((typeC) => {
    i++
    let u = i
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
  return typeChambre
}

export default function InsertPromotion() {
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
      finReserv: null
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
    sejourMin: '',
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

  const isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;
  
  const history = useHistory();

  const { _id } = useParams();

  function setListTypeChambre(res) {
    let current = JSON.parse(JSON.stringify(state))
    for (let i = 0; i < res.listTypeChambre.length; i++) {
      res.listTypeChambre[i].checked = false
    }
    current.typeChambre = res.listTypeChambre

    for (let i = 0; i < res.listTarif.length; i++) {
      res.listTarif[i].checked = false
    }
    current.planTarifaire = res.listTarif
    setState(current)
    setSkeleton(false)
  }

  function setDetailsPromotion(data){
    let current = JSON.parse(JSON.stringify(state));
    let error = {...state.error};
    current = data.promotion;
    current.error = error;
    current.dateDebutS = getDate(current.dateDebutS);
    current.dateFinS = getDate(current.dateFinS);
    setDateFinSejourInfini(data.promotion.dateFinSejourInfini);
    setLeadMaxInfini(data.promotion.leadMaxInfini);
    setIsLeadMaxDisabled(data.promotion.leadMaxInfini ? true : false);
    setIsDateFinSejourDisabled(data.promotion.dateFinSejourInfini ? true : false);

    let tmp = data.listTypeChambre;
    for(let i = 0; i < tmp.length; i++){
      for(let u = 0; u < current.typeChambre.length; u++){
        if(tmp[i]._id == current.typeChambre[u]){
          tmp[i].checked = true;
        }
      }
    }
    current.typeChambre = tmp;
    console.log(current);

    setState(current);
    setSkeleton(false);
  }

  useEffect(() => {
    if(isInsert){
      callAPI('get', '/TCTarif/list', {}, setListTypeChambre)
    }else{
      callAPI('get', '/promotion/detail/'+ _id, {}, setDetailsPromotion);
    }
  }, [])

  function handleCheckBoxPlanTarifaire(e, index) {
    let current = JSON.parse(JSON.stringify(state))
    current.planTarifaire[index].checked = e.target.checked
    setState(current)
  }

  function handleCheckBoxTypeChambre(e, index) {
    let current = JSON.parse(JSON.stringify(state))
    current.typeChambre[index].checked = e.target.checked
    setState(current)
  }

  function tryRedirect(res) {
    console.log(res)
    let currentState = JSON.parse(JSON.stringify(state))
    let keys = Object.keys(currentState.error)
    keys.map((k) => {
      currentState.error[k] = null
    })
    if (res.status === 200) {
      history.push('/back/promotion')
    } else if (res.status === 401) {
      //Unauthorized
      setBtnLoad(false)
      history.push('/back/login')
    } else {
      setBtnLoad(false)
      console.log(res.errors)
      let keys = Object.keys(res.errors)
      keys.map((k) => {
        currentState.error[k] = res.errors[k]
      })
    }
    setState(currentState)
  }

  function insert(e) {
    e.preventDefault()
    console.log('Envoie en attente...')
    setBtnLoad(true)
    let toSend = JSON.parse(JSON.stringify(state))
    let selectedPlan = []
    for (let i = 0; i < state.planTarifaire.length; i++) {
      if (state.planTarifaire[i].checked) {
        selectedPlan.push(state.planTarifaire[i]._id)
      }
    }
    toSend.planTarifaire = selectedPlan

    let selectedTypeC = []
    for (let i = 0; i < state.typeChambre.length; i++) {
      if (state.typeChambre[i].checked) {
        selectedTypeC.push(state.typeChambre[i]._id)
      }
    }
    toSend.typeChambre = selectedTypeC;
    toSend.leadMaxInfini = leadMaxInfini;
    toSend.dateFinSejourInfini = dateFinSejourInfini;
    toSend.debutReserv = debutReserv;
    toSend.finReserv = finReserv;
    toSend.reservAToutMoment = reservAToutMoment;
    callAPI('post', '/promotion/create', toSend, tryRedirect);
  }

  function handleInputChange(event, inputName) {
    const currentState = JSON.parse(JSON.stringify(state))
    currentState[inputName] = event.target.value
    currentState.error[inputName] = null
    setState(currentState)
  }

  function handleInputChange2(e, name1, name2) {
    console.log(e.target.value)
    let current = JSON.parse(JSON.stringify(state))
    current[name1][name2] = e.target.value
    setState(current)
  }

  function handleInputChange3(e, name1, name2) {
    console.log(e.target.checked);
    let current = JSON.parse(JSON.stringify(state))
    current[name1][name2] = e.target.checked ? 1 : "";
    console.log(current)
    setState(current)
  }

  function handleInputRemiseChange(e, name1) {
    console.log(e.target.value)
    let current = JSON.parse(JSON.stringify(state))
    current[name1] = e.target.value
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

  function switchInfini(){
    setLeadMaxInfini(!leadMaxInfini);
    setIsLeadMaxDisabled(!isLeadMaxDisabled);
    let current = {...state};
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

  return (
    <>
      <Navbar currentPage={8}/><br/>
      <div className="block">
        <form>
          <h4 className="enteteP">Ajouter une nouvelle promotion</h4>
          <div className="block1">
            {skeletonAffiche ? (
              <SkelettonForm heigth={300} />
            ) : (
              <>
                <h5>Détails de la promotion</h5>
                <div className="form-group" style={{ marginTop: '15px' }}>
                  <label id="bigLabel">
                    À quels plans tarifaires cette promotion s'appliquera-t-elle ?
                  </label>
                  <p
                    id="litleLabel"
                    style={{ marginLeft: '15px', marginTop: '5px' }}
                  >
                    Sélectionnez au moins 1 plan tarifaire
                  </p>
                  <div className="form-group" style={{ marginTop: '1px' }}>
                    <FormGroup>
                      <PlanTarifaire
                        planTarifaire={state.planTarifaire}
                        handleCheckBoxPlanTarifaire={handleCheckBoxPlanTarifaire}
                      />
                      {state.error.planTarifaire === null ? null : (
                        <div className="customError">
                          <span>{state.error.planTarifaire}</span>
                        </div>
                      )}
                    </FormGroup>
                  </div>
                </div>
                <label id="bigLabel">Quelles chambres ?</label>
                <p
                  id="litleLabel"
                  style={{ marginLeft: '15px', marginTop: '5px' }}
                >
                  Sélectionnez au moins 1 type de chambre
                </p>
                <div className="form-group" style={{ marginTop: '5px' }}>
                  <FormGroup>
                    <TypeChambre
                      typeChambre={state.typeChambre}
                      handleCheckBoxTypeChambre={handleCheckBoxTypeChambre}
                    />
                    {state.error.typeChambre === null ? null : (
                      <div className="customError">
                        <span>{state.error.typeChambre}</span>
                      </div>
                    )}
                  </FormGroup>
                </div>

                <hr style={{ width: '95%' }}></hr>

                <div style={{ marginTop: '0px' }}>
                  <div>
                    <label
                      className=""
                      style={{
                        textDecoration: 'underline',
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        marginLeft: '0px',
                      }}
                    >
                      Remise {state.isRemiseEuro ? 'Euro' : 'Pourcentage'}
                    </label>
                  </div>
                  <RadioGroup
                    aria-label="Pourcentage"
                    defaultValue="euro"
                    name="radio-buttons-group"
                  >
                    <div className="row" style={{ marginTop: '15px' }}>
                      <div className="col">
                        <TextField
                          label="Remise"
                          type="number"
                          id=""
                          size="small"
                          value={state.remise.euro}
                          placeholder="Hour/Date"
                          onChange={(e) => handleInputRemiseChange(e, 'remise')}
                          error={state.error.remise === null ? false : true}
                          helperText={
                            state.error.remise === null
                              ? null
                              : state.error.remise
                          }
                        />
                      </div>
                      <div className="col">
                        <FormControlLabel
                          value="euro"
                          onClick={(e) => handleIsRemiseEuroChange(true)}
                          control={<Radio />}
                          label={<span id="litleLabel">Euro</span>}
                        />
                      </div>
                      <div className="col">
                        <FormControlLabel
                          value="pourcentage"
                          onClick={(e) => handleIsRemiseEuroChange(false)}
                          control={<Radio />}
                          label={<span id="litleLabel">Pourcentage</span>}
                        />
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}
          </div>
          <div className="block2" style={{ marginTop: '30px' }}>
            <h5>Dates de séjour</h5>
            <label style={{ marginTop: '5px' }} id="bigLabel">
            Quand les clients peuvent-ils séjourner chez vous pour bénéficier de ce tarif ?
            </label>
            <p id="litleLabel" style={{ marginLeft: '15px', marginTop: '5px' }}>
            Sélectionner une période
            </p>
            <div className="form-group" style={{ marginTop: '25px' }}>
              <p>
                <TextField
                  id="outlined-basic"
                  label="Du"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  className="form-control"
                  style={{ width: '200px' }}
                  type="date"
                  name="dateDebutS"
                  value={state.dateDebutS}
                  onChange={(e) => handleInputChange(e, 'dateDebutS')}
                  size="small"
                  error={state.error.dateDebutS === null ? false : true}
                  helperText={
                    state.error.dateDebutS === null
                      ? null
                      : state.error.dateDebutS
                  }
                />

                <TextField
                  id="outlined-basic"
                  label="Au"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  className="form-control"
                  style={{ width: '200px', marginLeft: '20px' }}
                  type="date"
                  name="dateFinS"
                  value={state.dateFinS}
                  onChange={(e) => handleInputChange(e, 'dateFinS')}
                  size="small"
                  error={state.error.dateFinS === null ? false : true}
                  helperText={
                    state.error.dateFinS === null ? null : state.error.dateFinS
                  }
                  disabled={isDateFinSejourDisabled}
                />
              </p>
              <p><FormControlLabel
                  checked={dateFinSejourInfini}
                  onClick={(e) => switchDateFinSejourInfini()}
                  control={<Radio />}
                  label={<span id="litleLabel">Pas de fin</span>}
              /></p>
            </div>

            <h5>Date de réservation</h5>
            <label style={{ marginTop: '5px' }} id="bigLabel">
              Quand les clients peuvent-ils réserver chez vous pour bénéficier de ce tarif ?
            </label>
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
            <div className="form-group" style={{ marginTop: '25px' }}>
              <p>
                <TextField
                  id="outlined-basic"
                  label="Du"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  className="form-control"
                  style={{ width: '200px' }}
                  type="date"
                  name="debutReserv"
                  value={debutReserv}
                  onChange={(e) => setDebutReserv(e.target.value)}
                  size="small"
                  error={state.error.debutReserv === null ? false : true}
                  helperText={
                    state.error.debutReserv === null
                    ? null
                    : state.error.debutReserv
                  }
                  disabled={areDateReservDisabled}
                />

                <TextField
                  id="outlined-basic"
                  label="Au"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  className="form-control"
                  style={{ width: '200px', marginLeft: '20px' }}
                  type="date"
                  name="finReserv"
                  value={finReserv}
                  onChange={(e) => setFinReserv(e.target.value)}
                  size="small"
                  error={state.error.finReserv === null ? false : true}
                  helperText={
                    state.error.finReserv === null ? null : state.error.finReserv
                  }
                  disabled={areDateReservDisabled}
                />
              </p>
            </div>
            
            <div className="form-group" style={{ marginTop: '30px', marginRight: '25px' }}>
              <label id="bigLabel">Sejour minimum</label>
              <TextField
                id="outlined-basic"
                label="Sejour minimum"
                variant="outlined"
                className="form-control"
                size="small"
                type="number"
                name="sejourMin"
                value={state.sejourMin}
                onChange={(e) => handleInputChange(e, 'sejourMin')}
                style={{ marginTop: '15px' }}
                error={state.error.sejourMin === null ? false : true}
                helperText={
                  state.error.sejourMin === null ? null : state.error.sejourMin
                }
              />
            </div>

            <div style={{ marginTop: '0px' }}>
              <div>
                <label
                  className=""
                  style={{
                    textDecoration: 'underline',
                    fontFamily: 'Roboto',
                    fontSize: '15px',
                    marginLeft: '0px',
                  }}
                >
                  Lead {state.isLeadHour ? 'hour' : 'day'}
                </label>
              </div>
              <div>
                <FormControlLabel
                  checked={leadMaxInfini}
                  onClick={(e) => switchInfini()}
                  control={<Radio />}
                  label={<span id="litleLabel">Lead max infini</span>}
                />
              </div>
              <RadioGroup
                aria-label="Lead"
                defaultValue="hour"
                name="radio-buttons-group"
              >
                <div className="row" style={{ marginTop: '15px' }}>
                  <div className="col">
                    <TextField
                      label="Min"
                      type="number"
                      id="lead"
                      size="small"
                      value={state.lead.min}
                      placeholder="Hour/Date"
                      onChange={(e) => handleInputChange2(e, 'lead', 'min')}
                      error={state.error.leadMin === null ? false : true}
                      helperText={
                        state.error.leadMin === null ? null : state.error.leadMin
                      }
                    />
                  </div>
                  <div className="col">
                    <TextField
                      label="Max"
                      type="number"
                      id="lead"
                      size="small"
                      value={state.lead.max}
                      placeholder="Hour/Date"
                      onChange={(e) => handleInputChange2(e, 'lead', 'max')}
                      error={state.error.leadMax === null ? false : true}
                      helperText={
                        state.error.leadMax === null ? null : state.error.leadMax
                      }
                      disabled={isLeadMaxDisabled}
                    />
                  </div>
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
            </div>

            <div className="form-group" style={{ marginTop: '40px' }}>
              <label id="bigLabel">
                Nombre de jour d'attribution de la promotion
              </label>

              <div className="form-group" style={{ marginTop: '25px' }}>
                <p>
                  <TextField
                    id="outlined-basic"
                    label="Premier jour"
                    variant="outlined"
                    className="form-control"
                    style={{ width: '200px' }}
                    type="number"
                    name="premierJour"
                    value={state.premierJour}
                    onChange={(e) => handleInputChange(e, 'premierJour')}
                    size="small"
                    error={state.error.premierJour === null ? false : true}
                    helperText={
                      state.error.premierJour === null
                        ? null
                        : state.error.premierJour
                    }
                  />

                  <TextField
                    id="outlined-basic"
                    label="Dernier jour"
                    variant="outlined"
                    className="form-control"
                    style={{ width: '200px', marginLeft: '20px' }}
                    type="number"
                    name="dernierJour"
                    value={state.dernierJour}
                    onChange={(e) => handleInputChange(e, 'dernierJour')}
                    size="small"
                    error={state.error.dernierJour === null ? false : true}
                    helperText={
                      state.error.dernierJour === null
                        ? null
                        : state.error.dernierJour
                    }
                  />
                </p>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '15px' }}>
              <label id="bigLabel">
                Tarif réduit disponible uniquement pendant :
              </label>
              <p>
                <FormControlLabel
                  control={<Checkbox />}
                  type="number"
                  label={<p id="label">Lundi</p>}
                  checked={state.weekDays.lundi === 1 ? true : false}
                  name="lundi"
                  onChange={(e) => handleInputChange3(e, 'weekDays', 'lundi')}
                />

                <FormControlLabel
                  control={<Checkbox />}
                  type="number"
                  label={<p id="label">Mardi</p>}
                  checked={state.weekDays.mardi === 1 ? true : false}
                  name="mardi"
                  onChange={(e) => handleInputChange3(e, 'weekDays', 'mardi')}
                />

                <FormControlLabel
                  control={<Checkbox />}
                  type="number"
                  label={<p id="label">Mercredi</p>}
                  checked={state.weekDays.mercredi === 1 ? true : false}
                  name="mercredi"
                  onChange={(e) => handleInputChange3(e, 'weekDays', 'mercredi')}
                />

                <FormControlLabel
                  control={<Checkbox />}
                  type="number"
                  label={<p id="label">Jeudi</p>}
                  checked={state.weekDays.jeudi === 1 ? true : false}
                  name="jeudi"
                  onChange={(e) => handleInputChange3(e, 'weekDays', 'jeudi')}
                />

                <FormControlLabel
                  control={<Checkbox />}
                  type="number"
                  label={<p id="label">Vendredi</p>}
                  checked={state.weekDays.vendredi === 1 ? true : false}
                  name="vendredi"
                  onChange={(e) => handleInputChange3(e, 'weekDays', 'vendredi')}
                />

                <FormControlLabel
                  control={<Checkbox />}
                  type="number"
                  label={<p id="label">Samedi</p>}
                  checked={state.weekDays.samedi === 1 ? true : false}
                  name="samedi"
                  onChange={(e) => handleInputChange3(e, 'weekDays', 'samedi')}
                />

                <FormControlLabel
                  control={<Checkbox />}
                  type="number"
                  label={<p id="label">Dimanche</p>}
                  checked={state.weekDays.dimanche === 1 ? true : false}
                  name="dimanche"
                  onChange={(e) => handleInputChange3(e, 'weekDays', 'dimanche')}
                />
              </p>
            </div>
          </div>

          <div className="block3">
            <div className="form-group" style={{marginRight: '25px'}}>
              <h5>Nom de la promotion </h5>
              <label id="bigLabel">
                Comment voulez-vous nommer cette promotion ?
              </label>

              <TextField
                id="outlined-basic"
                label="Nom"
                variant="outlined"
                className="form-control"
                style={{ width: '400px' }}
                size="small"
                type="text"
                name="nom"
                onChange={(e) => handleInputChange(e, 'nom')}
                value={state.nom}
                style={{ marginTop: '15px' }}
                error={state.error.nom === null ? false : true}
                helperText={state.error.nom === null ? null : state.error.nom}
              />
            </div>
          </div>

          <div className="pied" style={{ marginTop: '25px' }}>
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
                      onClick={(e) => this.update(e)}>
                      <span style={{color:'white'}}>Modifier</span>
                    </Button> } 
                  </>
              }
            </div>
            <div class="bouton-aligne">
              <Link to={'/back/promotion'} style={{ textDecoration: 'none' }}>
                <Button variant="outlined" id="btn2">
                  <span style={{ color: '#1976d2' }}>Retour</span>
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}