// import CustomError from '../CustomError';
import CustomError from '../CustomError';
import axios from "axios";
import React, {useEffect} from "react";
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import {setValue} from '../../src/utility2.js';
import callAPI from '../utility';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

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

const Input = styled('input')({
  display: 'none',
});

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
            label={<span id='litleLabel'>
            {tarif.nom}
                  </span>}
            style={{marginLeft:"20px"}}
          />
        );
    })
    return list;
  }

  function TypeChambre(props){
    let i = -1;
    let list = props.typeChambre.map(typeC => {
        i++;
        let u = i;
        return(
          <FormControlLabel 
            checked={typeC.checked}
            control={<Checkbox/>}
            onChange={(e) => props.handleCheckBoxTypeChambre(e, u)}
            label={<span id='label'>{typeC.nom}</span>}
            style={{marginLeft:"20px"}}
          />
        );
    })
    return list;
  }

class DetailsPromotions extends React.Component{
    changeState(tabFieldName, value){
        let current = JSON.parse(JSON.stringify(this.state));
        let temp = JSON.parse(JSON.stringify(this.state));
        for(let i = 0; i < tabFieldName.length; i++){
            temp = temp[tabFieldName[i]];
        }
    }
    constructor(props){
        super(props);
        this.noImage = '/no-image.jpg';
        this.state = {
            val: 1,
            newIcon: {font: "", nom: ""},
            errInsertEq: null,
            open: false
            ,errors: [],
            error: {
              nom: null,
              sejourMin:null,
              premierJour:null,
              dernierJour:null,
              remise:null,
              leadMin: null, 
              leadMax: null,
              typeChambre:null,
              planTarifaire:null,
              dateDebutS: null,
              dateFinS: null,
            },
            promotion: {
              nom: '',
              planTarifaire: [],
              typeChambre: [],
              dateDebutS: '',
              dateFinS: '',
              weekDays:{
                lundi: '',
                mardi: '',
                mercredi: '',
                jeudi: '',
                vendredi: '',
                samedi: '',
                dimanche: ''
                        },
              sejourMin:'',
              premierJour:'',
              dernierJour:''
              ,lead: {min: '', max: ''}
              ,remise:''
              ,isLeadHour:''
              ,isRemiseEuro: ''
            }
            ,isRemiseEuro: true
            ,isLeadHour: true
            , tarifs: []
            , typeChambres : []
            , previewPhoto: [this.noImage]
        }
        this.handleCheckBoxPlanTarifaire = this.handleCheckBoxPlanTarifaire.bind(this);
        this.handleCheckBoxTypeChambre = this.handleCheckBoxTypeChambre.bind(this);
        this.setDetailsPromotion = this.setDetailsPromotion.bind(this);
        this.setTarifs = this.setTarifs.bind(this);
        this.setListTypeChambre = this.setListTypeChambre.bind(this);
        this.handleIsRemiseEuroChange = this.handleIsRemiseEuroChange.bind(this);
    }

    setDetailsPromotion(data){
      console.log(data);
      let currentState = JSON.parse(JSON.stringify(this.state));
      currentState.promotion = data.promotion;
      currentState.promotion.dateDebutS = getDate(currentState.promotion.dateDebutS);
      currentState.promotion.dateFinS = getDate(currentState.promotion.dateFinS);

      currentState.typeChambres = data.listTypeChambre;
      for(let i = 0; i < currentState.typeChambres.length; i++){
        for(let u = 0; u < currentState.promotion.typeChambre.length; u++ ){
            if(currentState.typeChambres[i]._id == currentState.promotion.typeChambre[u]){
              currentState.typeChambres[i].checked = true;
            }
        }
    }

      currentState.tarifs = data.listTarif;
      for(let i = 0; i < currentState.tarifs.length; i++){
        for(let u = 0; u < currentState.promotion.planTarifaire.length; u++ ){
          if(currentState.tarifs[i]._id == currentState.promotion.planTarifaire[u]){
            currentState.tarifs[i].checked = true;
          }
        }
      }

      this.setState(currentState);
    }

     tryRedirect(res){
      console.log(res);
      let currentState = JSON.parse(JSON.stringify(this.state));
      let keys = Object.keys(currentState.error);
      keys.map((k) => {
        currentState.error[k] = null;
      });
      if(res.status === 200){
        this.props.history.push('/promotion');
      }else if(res.status === 401){//Unauthorized
        this.props.history.push('/login');
      }else{
        currentState.errors = res.errors;
        keys = Object.keys(res.errors);
        keys.map((k) => {
            currentState.error[k] = res.errors[k];
        });
      }
      this.setState(currentState);
    }

    setTarifs(res){
        console.log(res);      
        if(res.status === 200){
            let currentState = JSON.parse(JSON.stringify(this.state));
            for(let i = 0; i < res.list.length; i++){
                for(let u = 0; u < currentState.promotion.planTarifaire.length; u++ ){
                    if(res.list[i]._id == currentState.promotion.planTarifaire[u]){
                        res.list[i].checked = true;
                        break;
                    }
                    console.log("nadalo");
                     res.list[i].checked = false;
                }
            }
            currentState.tarifs = res.list;
            this.setState(currentState);
            console.log(currentState);
        }    
    }

setListTypeChambre(res){
      if(res.status === 200){
        let currentState = JSON.parse(JSON.stringify(this.state));
        console.log(currentState);
        for(let i = 0; i < res.list.length; i++){
            for(let u = 0; u < currentState.promotion.typeChambre.length; u++ ){
                if(res.list[i]._id == currentState.promotion.typeChambre[u]){
                    res.list[i].checked = true;
                    break;
                }
                console.log("nadalo");
                 res.list[i].checked = false;
            }
        }
        currentState.typeChambres = res.list;
        this.setState(currentState);
        console.log(currentState);
    }
  }

    componentDidMount(){
        callAPI('get', '/promotion/detail/'+this.props.match.params._id, {}, this.setDetailsPromotion);
    }

    update(e){
        e.preventDefault();
        console.log(this.state.promotion);
        let toSend = JSON.parse(JSON.stringify(this.state.promotion));
        let planTarifaire = [];
        for(let i = 0; i < this.state.tarifs.length; i++){
            if(this.state.tarifs[i].checked){
                planTarifaire.push(this.state.tarifs[i]._id);
            }
        }
        toSend.planTarifaire = planTarifaire;

        let typeChambre = [];
        for(let i = 0; i < this.state.typeChambres.length; i++){
            if(this.state.typeChambres[i].checked){
              typeChambre.push(this.state.typeChambres[i]._id);
            }
        }
        toSend.typeChambre = typeChambre;

        console.log(toSend);
        
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + "/promotion/updateP",
            withCredentials: true,
            data: toSend
        })
        .then(res => this.tryRedirect(res.data))
        .catch(err => console.log(err));
        
    }

    handleInputChange(event, inputName){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.promotion[inputName] = event.target.value;
        currentState.error[inputName] = null;
        this.setState(currentState);
    }

    handleInputRemiseChange( e, name1){
      console.log(e.target.value);
      let current = JSON.parse(JSON.stringify(this.state));
      current.promotion[name1] = e.target.value;
      this.setState(current)
      }

    handleIsRemiseEuroChange(value,index){
        let temp = {...this.state};
        temp.promotion[index] = value;
        this.setState(temp);
            }

    handleInputChange2( e, name1, name2){
      console.log(e.target.value);
      let current = JSON.parse(JSON.stringify(this.state));
      current.promotion[name1][name2] = e.target.value;
      this.setState(current)
      }

    handleInputChange3( e, name1, name2){
      console.log(e.target.value);
      let current = JSON.parse(JSON.stringify(this.state));
      current.promotion[name1][name2]= e.target.checked ? 1 : "";
      this.setState(current)
      }

    // handleInputChange3( e, name1, name2){
    //     console.log(e.target.value);
    //     let current = JSON.parse(JSON.stringify(this.state));
    //     current.promotion[name1][name2] = Number.parseInt(e.target.value);
    //     this.setState(current)
    //     }
      
    handleIsLeadHourChange(value,index){
      let temp = {...this.state};
      temp.promotion[index] = value;
      this.setState(temp);
          }

    handleCheckBoxPlanTarifaire(e, index){
        let current = JSON.parse(JSON.stringify(this.state));
        current.tarifs[index].checked = e.target.checked;
        this.setState(current);
    }

    handleCheckBoxTypeChambre(e, index){
      let current = JSON.parse(JSON.stringify(this.state));
      current.typeChambres[index].checked = e.target.checked;
      this.setState(current);
  }


    changeStateValue(tabFieldName, value){
        let currentState = setValue(this.state, tabFieldName, value);
        this.setState(currentState);
    }

    handleNewEqChange(e, fieldName){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.newIcon[fieldName] = e.target.value;
        this.setState(currentState);
    }
  
    render(){
        return(
<div className="block">
<form>
<h4 className='entete'>Ajouter une nouvelle promotion</h4>
<CustomError errors={this.state.errors} />
  <div className="block1">
  <h6>Détails de la promotion</h6>
   <div className="form-group" style={{marginTop:"15px"}}>
<label id='bigLabel'>
À quels plans tarifaires cette promotion s'appliquera-t-elle ?
</label>
<p id='litleLabel' style={{textDecoration:'underline',marginLeft:'12px'}}>Sélectionnez au moins 1 plan tarifaire</p>
<div className="form-group"  style={{marginTop:"1px"}}>
<FormGroup>
<PlanTarifaire planTarifaire={this.state.tarifs} handleCheckBoxPlanTarifaire={this.handleCheckBoxPlanTarifaire}/>
{this.state.error.planTarifaire === null ? null : <div className="customError"><span>{this.state.error.planTarifaire}</span></div>}
</FormGroup> 
  </div>    
   </div>
<label id='bigLabel'>
Quelles chambres ?
</label>
<p id='litleLabel' style={{textDecoration:'underline',marginLeft:'12px'}}>Sélectionnez au moins 1 type de chambre</p>
  <div className="form-group"  style={{marginTop:"5px"}}>
  <FormGroup>
<TypeChambre typeChambre={this.state.typeChambres} handleCheckBoxTypeChambre={this.handleCheckBoxTypeChambre}/>
{this.state.error.typeChambre === null ? null : <div className="customError"><span>{this.state.error.typeChambre}</span></div>}
</FormGroup>    
  </div>

<hr style={{width:'95%'}}></hr>

<div style={{marginTop:'0px'}}>
      <div>
          <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px',marginLeft:'0px'}} >
              Remise {this.state.isRemiseEuro ? "Euro" : "Pourcentage"} 
          </label>
      </div>
      <RadioGroup
          aria-label="euro"
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
                  value={this.state.promotion.remise}
                  placeholder='Hour/Date'
                  onChange={(e) => this.handleInputRemiseChange( e, "remise")}
                  error={this.state.error.remise === null ? false : true}
                  helperText={this.state.error.remise === null ? null : this.state.error.remise}
                  />
              </div>
              {console.log()}
              <div className ="col">
                  <FormControlLabel 
                  value="euro" 
                  checked={this.state.promotion.isRemiseEuro ? true : false}
                  onClick={(e) => this.handleIsRemiseEuroChange(true,'isRemiseEuro')}
                  control={<Radio />}
                  label={
                  <span id='litleLabel'>
                  Euro
                  </span>} />
              </div>
              <div className ="col">
                  <FormControlLabel  
                  value="pourcentage" 
                  checked={this.state.promotion.isRemiseEuro ? false : true}
                  onClick={(e) => this.handleIsRemiseEuroChange(false,'isRemiseEuro')} 
                  control={<Radio />} 
                  label={
                      <span id='litleLabel'>
                        Pourcentage
                      </span>} /> 
              </div>
          </div>
      </RadioGroup>
  </div>

  </div>

  <div className='block2' style={{marginTop:"30px"}}>
<h6>Dates de séjour</h6>
<label id='bigLabel' style={{marginTop:"5px"}}>
Quand les clients peuvent-ils profiter de cette promotion ?
</label>
<p id='litleLabel' style={{textDecoration:'underline',marginLeft:'12px'}}>Sélectionnez au moins 1 date</p>
  <div className="form-group" style={{marginTop:"25px"}}>
   <p>
<TextField id="outlined-basic" 
label="Date debut" 
InputLabelProps={{
shrink: true,
}}
variant="outlined" 
className="form-control"  
style={{width:"200px"}}
type="date" 
name="dateDebutS" 
value={this.state.promotion.dateDebutS}
onChange={(e) => this.handleInputChange(e, "dateDebutS")}
error={this.state.error.dateDebutS === null ? false : true}
helperText={this.state.error.dateDebutS === null ? null : this.state.error.dateDebutS}
size="small"
/>

  <TextField id="outlined-basic" 
label="Date fin" 
InputLabelProps={{
  shrink: true,
  }}
variant="outlined" 
className="form-control"  
style={{width:"200px",marginLeft:'20px'}}
type="date" 
name="dateFinS" 
value={this.state.promotion.dateFinS}
onChange={(e) => this.handleInputChange(e, "dateFinS")}
error={this.state.error.dateFinS === null ? false : true}
helperText={this.state.error.dateFinS === null ? null : this.state.error.dateFinS}
size="small"
/>
   </p>
  </div>

   <div className="form-group" style={{marginTop:"30px"}}>
<label id='bigLabel'>
Sejour minimum
</label>
<TextField 
id="outlined-basic" 
label="Sejour minimum"
variant="outlined"
className="form-control" 
style={{width:"400px",height:'20px'}}
size="small"
type="text" 
name="sejourMin" 
value={this.state.promotion.sejourMin}
onChange={(e) => this.handleInputChange(e, "sejourMin")} 
style={{marginTop:"15px"}}
error={this.state.error.sejourMin === null ? false : true}
helperText={this.state.error.sejourMin === null ? null : this.state.error.sejourMin}
/>
   </div>

   <div style={{marginTop:'0px'}}>
      <div>
          <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px',marginLeft:'0px'}} >
              Lead { this.state.isLeadHour ? "hour" : "day"} 
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
                  label="Min"
                  type='number'
                  size='small'
                  value={this.state.promotion.lead.min}
                  placeholder='Hour/Date'
                  onChange={(e) => this.handleInputChange2( e, "lead", "min")}
                  error={this.state.error.leadMin === null ? false : true}
                  helperText={this.state.error.leadMin === null ? null : this.state.error.leadMin}
                  /> 
              </div>
              <div className ="col">
                  <TextField
                  label="Max"
                  type='number'
                  size='small'
                  value={this.state.promotion.lead.max}
                  placeholder='Hour/Date'
                  onChange={(e) => this.handleInputChange2( e, "lead", "max")}
                  error={this.state.error.leadMax === null ? false : true}
                  helperText={this.state.error.leadMax === null ? null : this.state.error.leadMax}
                  /> 
              </div>
              <div className ="col">
                {console.log(this.state.isLeadHour)}
                  <FormControlLabel 
                  value="hour" 
                  checked={this.state.promotion.isLeadHour ? true : false}
                  onClick={(e) => this.handleIsLeadHourChange(true,"isLeadHour")} 
                  control={<Radio />} 
                  label={
                  <span id='litleLabel'>
                  Hour
                  </span>} />
              </div>
              <div className ="col">
                  <FormControlLabel  
                  value="day" 
                  checked={this.state.promotion.isLeadHour ? false : true}
                  onClick={(e) => this.handleIsLeadHourChange(false,"isLeadHour")} 
                  control={<Radio />} 
                  label={
                      <span id='litleLabel'>
                        Day
                      </span>} /> 
              </div>
          </div>
      </RadioGroup>
  </div>
  
  <div className="form-group" style={{marginTop:"40px"}}>
<label id='bigLabel'>
Nombre de jour d'attribution de la promotion
</label>

<div className="form-group" style={{marginTop:"25px"}}>
<p>
<TextField id="outlined-basic" 
label="Premier jour" 
variant="outlined" 
className="form-control"  
style={{width:"200px"}}
type="number" 
name="premierJour" 
value={this.state.promotion.premierJour}
onChange={(e) => this.handleInputChange(e, "premierJour")}
size="small"
error={this.state.error.premierJour === null ? false : true}
helperText={this.state.error.premierJour === null ? null : this.state.error.premierJour}
/>

  <TextField id="outlined-basic" 
label="Dernier jour" 
variant="outlined" 
className="form-control"  
style={{width:"200px",marginLeft:'20px'}}
type="number" 
name="dernierJour"
value={this.state.promotion.dernierJour}
onChange={(e) => this.handleInputChange(e, "dernierJour")}
size="small"
error={this.state.error.dernierJour === null ? false : true}
helperText={this.state.error.dernierJour === null ? null : this.state.error.dernierJour}
/>
   </p>
   </div>
  </div>

   <div className="form-group" style={{marginTop:"15px"}}>
<label id='bigLabel'>
Tarif réduit disponible uniquement pendant :

</label>
   <p>
<FormControlLabel  
label={<p id='label'>Lundi</p>}
value='1'
checked={this.state.promotion.weekDays.lundi === 1 ? true : false}
name="lundi"
control={<Checkbox/>}
onChange={(e) => this.handleInputChange3( e, "weekDays", "lundi")} 
/>


<FormControlLabel  
label={<p id='label'>Mardi</p>}
value='1'
checked={this.state.promotion.weekDays.mardi === 1 ? true : false}
name="mardi"  
control={<Checkbox/>}
onChange={(e) => this.handleInputChange3( e, "weekDays", "mardi")} 
/>

<FormControlLabel  
label={<p id='label'>Mercredi</p>}
value='1'
checked={this.state.promotion.weekDays.mercredi === 1 ? true : false}
name="mercredi"  
control={<Checkbox/>}
onChange={(e) => this.handleInputChange3( e, "weekDays", "mercredi")} 
/>

<FormControlLabel  
label={<p id='label'>Jeudi</p>}
value='1'
checked={this.state.promotion.weekDays.jeudi === 1 ? true : false}
name="jeudi"  
control={<Checkbox/>}
onChange={(e) => this.handleInputChange3( e, "weekDays", "jeudi")} 
/>

<FormControlLabel  
label={<p id='label'>Vendredi</p>}
value='1'
checked={this.state.promotion.weekDays.vendredi === 1 ? true : false}
name="vendredi"  
control={<Checkbox/>}
onChange={(e) => this.handleInputChange3( e, "weekDays", "vendredi")} 
/>

<FormControlLabel  
label={<p id='label'>Samedi</p>}
value='1'
checked={this.state.promotion.weekDays.samedi === 1 ? true : false}
name="samedi"  
control={<Checkbox/>}
onChange={(e) => this.handleInputChange3( e, "weekDays", "samedi")} 
/>

<FormControlLabel  
label={<p id='label'>Dimanche</p>}
value='1'
checked={this.state.promotion.weekDays.dimanche === 1 ? true : false}
name="dimanche"  
control={<Checkbox/>}
onChange={(e) => this.handleInputChange3( e, "weekDays", "dimanche")} 
/>
   </p> 
  </div>

  </div>

  <div className="block3">
   <div className="form-group" style={{}}>
<h6>Nom de la promotion </h6>
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
onChange={(e) => this.handleInputChange(e, "nom")} 
value={this.state.promotion.nom}
style={{marginTop:"15px"}}
error={this.state.error.nom === null ? false : true}
helperText={this.state.error.nom === null ? null : this.state.error.nom}
/>
   </div>     
   </div>    
    
  <div className="pied" style={{marginTop:'25px'}}>   
   <div class="bouton-aligne">  
<Button  
variant="contained" 
type='submit' 
style={{backgroundColor:'#FA8072'}}
onClick={(e) => this.update(e)}>
<span style={{color:'white'}}>Modifier</span>
</Button>
   </div>
   <div class="bouton-aligne">
    <Link to={'/promotion'} style={{textDecoration:'none'}}>
       <Button variant="outlined" 
       id="btn2"
       >
<span style={{color:'#1976d2'}}>Retour</span>
       </Button>
    </Link>
   </div>
  </div>
 </form>
</div>
        );
    }
}

export default DetailsPromotions;