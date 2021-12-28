// import CustomError from '../CustomError';
import CustomError from '../CustomError';
import axios from "axios";
import React, {useEffect} from "react";
import {Link} from 'react-router-dom';

import  Navbar  from "../Navbar/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';


import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import {setValue} from '../../src/utility2.js';
import callAPI from '../utility';

import {FileInput, Preview, Videos, Font} from '../partenaire/utilityTypeChambre.js';


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
            }
            , tarifs: []
            , typeChambres : []
            , previewPhoto: [this.noImage]
        }
        this.handleCheckBoxPlanTarifaire = this.handleCheckBoxPlanTarifaire.bind(this);
        this.handleCheckBoxEquipement = this.handleCheckBoxEquipement.bind(this);
        this.setDetailsPromotion = this.setDetailsPromotion.bind(this);
        this.setTarifs = this.setTarifs.bind(this);
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
            currentState.tarifs = res.list;
            this.setState(currentState);
        }
    }

    
    componentDidMount(){
        // axios({
        //     method: 'get',
        //     url: process.env.REACT_APP_BACK_URL +
        //         "/promotion/detail/" + this.props.match.params._id + '?id',
        //     withCredentials: true
        // })
        // .then(res => this.setDetailsPromotion(res.data))
        // .catch(err => console.log(err));
        callAPI('get', '/promotion/detail/'+this.props.match.params._id, {}, this.setDetailsPromotion);
    }

    update(e){
        e.preventDefault();
        console.log(this.state.promotion);
        let toSend = JSON.parse(JSON.stringify(this.state.promotion));
        let equipements = [];
        for(let i = 0; i < this.state.promotion.equipements.length; i++){
            if(this.state.promotion.equipements[i].checked){
                equipements.push(this.state.promotion.equipements[i]._id);
            }
        }
        toSend.equipements = equipements;
        let planTarifaire = [];
        for(let i = 0; i < this.state.promotion.planTarifaire.length; i++){
            if(this.state.promotion.planTarifaire[i].checked){
                planTarifaire.push(this.state.promotion.planTarifaire[i]._id);
            }
        }
        toSend.planTarifaire = planTarifaire;
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
    /*
    handlePhotoChange(event){
        let currentState = JSON.parse(JSON.stringify(this.state));
        if(event.target.files[0]){
            let img = event.target.files[0];
            const r = /^image/;
            if(r.test(img.type)){
                const reader = new FileReader();
                reader.onload = (evt) => {
                    currentState.typeChambre.photo = evt.target.result;
                    currentState.previewPhoto = evt.target.result;
                    this.setState(currentState);
                }
                reader.readAsDataURL(img);
            }else{
                currentState.previewPhoto = this.noImage;
                this.setState(currentState);
            }
        }
    }
    */

    handleCheckBoxPlanTarifaire(e, index){
        let current = JSON.parse(JSON.stringify(this.state));
        current.promotion.planTarifaire[index].checked = e.target.checked;
        this.setState(current);
    }
    
    handleCheckBoxEquipement(e, index){
        let current = JSON.parse(JSON.stringify(this.state));
        current.promotion.equipements[index].checked = e.target.checked;
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
{/* <TypeChambre typeChambre={this.state.typeChambre} handleCheckBoxTypeChambre={this.handleCheckBoxTypeChambre}/> */}
</FormGroup>    
  </div>

<hr style={{width:'95%'}}></hr>

  {/* <div className="form-group" style={{marginTop:"15px"}}>
<label id='bigLabel'>
Quelle remise voulez-vous offrir ?
</label>

<FormControl component="fieldset">
  <FormLabel component="legend"></FormLabel>
  <RadioGroup
    aria-label=""
    defaultValue=""
    name="radio-buttons-group"
  >
    <FormControlLabel 
    value="male" 
    control={<Radio />} 
    label={<p id='label'>Pourcentage</p>} 
    onClick={() => this.setState({HideShowE :false,HideShowP :true})}/>
    <FormControlLabel 
    value="female" 
    control={<Radio />} 
    label={<p id='label'>Euro</p>} 
    onClick={() => this.setState({HideShowP :false,HideShowE :true})}/>
  </RadioGroup>
</FormControl>

{
this.state.HideShowP ?
<TextField 
id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control" 
InputProps={{
startAdornment: <InputAdornment position="start">
    <strong>%</strong>
</InputAdornment>,
}}
style={{width:"100px",marginTop:"15px"}}
size="small"
type="number" 
name="remisePourcentage" 
onChange={(e) => this.handleInputChange(e, "remisePourcentage")}
/>
: null
}

{
this.state.HideShowE ?
<TextField 
id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control" 
InputProps={{
startAdornment: <InputAdornment position="start">
    <strong>£</strong>
</InputAdornment>,
}}
style={{width:"130px"}}
size="small"
type="number" 
name="remiseEuro" 
onChange={(e) => this.handleInputChange(e, "remiseEuro")}
/>
: null
}

  </div> */}
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
  
  {/* <div className="form-group" style={{marginTop:"40px"}}>
<label id='bigLabel'>
Lead hour ou day 
</label>
<FormControl component="fieldset">
  <FormLabel component="legend"></FormLabel>
  <RadioGroup
    aria-label=""
    defaultValue=""
    name="radio-buttons-group"
  >
    <FormControlLabel 
    value="mal" 
    control={<Radio />}  
    label={<p id='label'>Day</p>}
    onClick={() => this.setState({HideShowH :false,HideShowJ :true})}/>
    <FormControlLabel 
    value="female" 
    control={<Radio />} 
    label={<p id='label'>Hour</p>} 
    onClick={() => this.setState({HideShowJ :false,HideShowH :true})}/>
  </RadioGroup>
</FormControl>

{
this.state.HideShowJ ?
<TextField 
id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control" 
style={{width:"130px"}}
placeholder='Jour'
size="small"
type="number" 
name="leadDay" 
onChange={(e) => this.handleInputChange(e, "leadDay")}
/>

: null
}

{
this.state.HideShowH ?
<TextField 
id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control" 
style={{width:"130px"}}
placeholder='Heure'
size="small"
type="number" 
name="leadHour" 
onChange={(e) => this.handleInputChange(e, "leadHour")}
/>
: null
}

  </div> */}

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