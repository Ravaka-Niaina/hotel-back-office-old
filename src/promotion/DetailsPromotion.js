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


const Input = styled('input')({
  display: 'none',
});

function PlanTarifaire(props){
  console.log(props.planTarifaire);
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
    console.log(props.typeChambre);
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
            open: false,
            errors: [],
            promotion: {
              errors: [],
              nom: '',
              planTarifaire: [],
              typeChambre: [],
              remisePourcentage: '',
              remiseEuro: '',
              dateDebutS: '',
              dateFinS: '',
              lundi: '',
              mardi: '',
              mercredi: '',
              jeudi: '',
              vendredi: '',
              samedi: '',
              dimanche: '',
              novembre: '',
              decembre: '',
              janvier: '',
              fevrier: '',
              mars: '',
              avril: '',
              sejourMin:'',
              leadHour:'',
              leadDay:'',
              premierJour:'',
              dernierJour:'',
              equipements:[]
              ,isLeadHour: true
              ,lead: {min: '', max: ''}
              ,remise:''
            }
            ,isRemiseEuro: true
            , tarifs: []
            , typeChambres : []
            , previewPhoto: [this.noImage]
        }
        this.handleCheckBoxPlanTarifaire = this.handleCheckBoxPlanTarifaire.bind(this);
        this.handleCheckBoxTypeChambre = this.handleCheckBoxTypeChambre.bind(this);
        this.setDetailsPromotion = this.setDetailsPromotion.bind(this);
        this.setTarifs = this.setTarifs.bind(this);
        this.setListTypeChambre = this.setListTypeChambre.bind(this);
    }

    setDetailsPromotion(data){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.promotion = data.promotion;
        this.setState(currentState);
        console.log(this.state.promotion);
    }

    tryRedirect(res){
        console.log(res);
        if(res.status === 200){
          this.props.history.push('/promotion');
        }else if(res.status === 401){//Unauthorized
            this.props.history.push('/login');
        }else{
          let currentState = JSON.parse(JSON.stringify(this.state));
          currentState.errors = res.errors;
          this.setState(currentState);
        }
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
         callAPI('post', '/planTarifaire', {}, this.setTarifs);
         callAPI('post', '/TCTarif', {}, this.setListTypeChambre);
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
        this.setState(currentState);
    }

    handleInputRemiseChange( e, name1){
      console.log(e.target.value);
      let current = JSON.parse(JSON.stringify(this.state));
      current.promotion[name1] = e.target.value;
      this.setState(current)
      }

    handleIsRemiseEuroChange(value){
        let temp = {...this.state};
        temp.isRemiseEuro = value;
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
                  value={this.state.promotion.remise}
                  placeholder='Hour/Date'
                  onChange={(e) => this.handleInputRemiseChange( e, "remise")}
                  /> 
              </div>
              {console.log()}
              <div className ="col">
                  <FormControlLabel 
                  value="euro" 
                  onClick={(e) => this.handleIsRemiseEuroChange(true)}
                  control={<Radio />}
                  label={
                  <span id='litleLabel'>
                  Euro
                  </span>} />
              </div>
              <div className ="col">
                  <FormControlLabel  
                  value="pourcentage" 
                  onClick={(e) => this.handleIsRemiseEuroChange(false)} 
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
label="" 
variant="outlined" 
className="form-control"  
style={{width:"200px"}}
type="date" 
name="dateDebutS" 
value={this.state.promotion.dateDebutS}
onChange={(e) => this.handleInputChange(e, "dateDebutS")}
size="small"
/>

  <TextField id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control"  
style={{width:"200px",marginLeft:'20px'}}
type="date" 
name="dateFinS" 
value={this.state.promotion.dateFinS}
onChange={(e) => this.handleInputChange(e, "dateFinS")}
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
label=""
variant="outlined"
className="form-control" 
style={{width:"400px",height:'20px'}}
size="small"
type="text" 
name="sejourMin" 
value={this.state.promotion.sejourMin}
onChange={(e) => this.handleInputChange(e, "sejourMin")} 
style={{marginTop:"15px"}}
/>
   </div>
  


  <div className="form-group" style={{marginTop:"40px"}}>
<label id='bigLabel'>
Nombre de jour d'attribution de la promotion
</label>

<div className="form-group" style={{marginTop:"25px"}}>
<p>
<TextField id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control"  
style={{width:"200px"}}
type="text" 
name="premierJour" 
InputProps={{
  endAdornment: <InputAdornment position="end">
      premier jour
  </InputAdornment>,
  }}
value={this.state.promotion.premierJour}
onChange={(e) => this.handleInputChange(e, "premierJour")}
size="small"
/>

  <TextField id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control"  
style={{width:"200px",marginLeft:'20px'}}
type="text" 
name="dernierJour"
InputProps={{
  endAdornment: <InputAdornment position="end">
      dernier jour
  </InputAdornment>,
  }} 
value={this.state.promotion.dernierJour}
onChange={(e) => this.handleInputChange(e, "dernierJour")}
size="small"
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
control={<Checkbox />} 
label={<p id='label'>Novembre</p>}
value="1"
name="novembre" 
onChange={(e) => this.handleInputChange(e, "decembre")}
/> 

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Decembre</p>}
value="1"
name="decembre"  
onChange={(e) => this.handleInputChange(e, "decembre")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Janvier</p>}
value="1"
name="janvier"  
onChange={(e) => this.handleInputChange(e, "janvier")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Fevrier</p>}
value="1"
name="fevrier"   
onChange={(e) => this.handleInputChange(e, "fevrier")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Mars</p>}
value="1"
name="mars"  
onChange={(e) => this.handleInputChange(e, "mars")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Avril</p>} 
value="1"
name="avril"  
onChange={(e) => this.handleInputChange(e, "avril")}
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
label=""
variant="outlined"
className="form-control" 
style={{width:"400px"}}
size="small"
type="text" 
name="nom" 
onChange={(e) => this.handleInputChange(e, "nom")} 
value={this.state.promotion.nom}
style={{marginTop:"15px"}}
/>
   </div>     
   </div>    
    
  <div className="pied" style={{marginTop:'25px'}}>   
   <div class="bouton-aligne">  
<Button  
variant="contained" 
type='submit' 
style={{textDecoration:'none',backgroundColor:'#2ac4ea'}}
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