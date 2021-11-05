import React from 'react';
import axios from 'axios';
import Select from 'react-select'
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./promotion.css";
import InputAdornment from '@mui/material/InputAdornment';


export default class InsertPromotion extends React.Component {
  // state = {
  //   name: '',
  // }

  constructor(props){
    super(props);
    this.state = {
      typeChambres: [],
      tarifs: [],
        promotion: {
            nom: '',
            tarif: '',
            typeChambre: '',
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


        },
    };
}

  // handleChange = event => {
  //   this.setState({ name: event.target.value });
  // }

  async getTypeChambres(){
    axios.get('http://localhost:3000/typechambre')
    .then(res => {
      const typeChambres ={typeChambres: res.data.list} ;
      
      this.setState( typeChambres );
      console.log(this.state);
    })
  }

    async getTarifs(){
    axios.get('http://localhost:3000/tarif')
    .then(res => {
      const tarifs ={tarifs: res.data.list} ;
      
      this.setState( tarifs );
      console.log(this.state);
    })
  }

  handleInputChange(event, inputName){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.promotion[inputName] = event.target.value;
    this.setState(currentState);
}

//Une fonction qui gérera notre valeur sélectionnée
// handleSelectChange(event, selectName){
//   const currentState = JSON.parse(JSON.stringify(this.state));
//   currentState.promotion[selectName] = {_id:event.value};
//   this.setState(currentState)
//  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post(`http://localhost:3000/promotion/create`,  this.state.promotion )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  componentDidMount(){
    this.getTarifs()
    this.getTypeChambres()
}

  render() {
    return (
<div className="block">
 <form onSubmit={this.handleSubmit}>
<h4 className='entete'>Ajouter une nouvelle promotion</h4>
  <div className="block1">
  <h5>Détails de la promotion</h5>
   <div className="form-group" style={{marginTop:"15px"}}>
<label>
À quels plans tarifaires cette promotion s'appliquera-t-elle ?
</label>
<p>Sélectionnez au moins 1 plan tarifaire</p>
<div className="form-group"  style={{marginTop:"1px"}}>
{this.state.tarifs.map((tarif) => (  
<p>
  <Checkbox   
  value={tarif.nom}
  name="tarif"  
  onChange={(e) => this.handleInputChange(e, "tarif")}
  />
  {tarif.nom}
  </p>  
              ))}  
  </div>
   </div>

<label>
Quelles chambres ?
</label>
<p>Sélectionnez au moins 1 type de chambre</p>
  <div className="form-group"  style={{marginTop:"5px"}}>
{this.state.typeChambres.map((typeChambre) => (  
<p>
  <Checkbox   
  value={typeChambre.nom}
  name="typeChambre"  
  onChange={(e) => this.handleInputChange(e, "typeChambre")}
  />
  {typeChambre.nom}
  </p>  
              ))}
     
  </div>

<hr style={{width:'95%'}}></hr>

  <div className="form-group" style={{marginTop:"15px"}}>
<label>
Quelle remise voulez-vous offrir ?
</label>
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

<p style={{marginTop:'13px',marginLeft:'30px'}}><strong>OU</strong></p>

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
  </div>
  </div>
  <div className='block2' style={{marginTop:"30px"}}>
<h5>Dates de séjour</h5>
<label style={{marginTop:"5px"}}>
Quand les clients peuvent-ils profiter de cette promotion ?
</label>
<p>Sélectionnez au moins 1 date</p>
  <div className="form-group" style={{marginTop:"25px"}}>
   <p>
<TextField id="outlined-basic" 
label="" 
variant="outlined" 
className="form-control"  
style={{width:"200px"}}
type="date" 
name="dateDebutS" 
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
onChange={(e) => this.handleInputChange(e, "dateFinS")}
size="small"
/>
   </p>
  </div>
  
  <div className="form-group" style={{marginTop:"40px"}}>
<label>
Cochez les jours de la semaine pour appliquer du calendrier de cette promotion
</label>
   <p>
<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Lun</p>} 
value="1"
name=""  
onChange={(e) => this.handleInputChange(e, "lundi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Mar</p>} 
value="1"
name="mardi"  
onChange={(e) => this.handleInputChange(e, "mardi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Mer</p>} 
value="1"
name="mercredi"  
onChange={(e) => this.handleInputChange(e, "mercredi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Jeu</p>}
value="1"
name="jeudi"  
onChange={(e) => this.handleInputChange(e, "jeudi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Ven</p>} 
value="1"
name="vendredi"  
onChange={(e) => this.handleInputChange(e, "vendredi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Sam</p>} 
value="1"
name="samedi"  
onChange={(e) => this.handleInputChange(e, "samedi")}
/>

<FormControlLabel 
control={<Checkbox/>} 
label={<p id='label'>Dim</p>} 
value="1"
name="dimanche"  
onChange={(e) => this.handleInputChange(e, "dimanche")}
/>
   </p> 
  </div>

  <div className="form-group" style={{marginTop:"15px"}}>
<label>
Tarif réduit disponible uniquement pendant :
</label>
   <p>
<FormControlLabel 
control={<Checkbox />} 
label={<p id='label'>Novembre</p>}
value="1"
name="novembre"  
onChange={(e) => this.handleInputChange(e, "novembre")}
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
<h5>Nom de la promotion </h5>
<label>
Comment voulez-vous nommer cette promotion ?
</label>
<TextField 
id="outlined-basic" 
label=""
variant="outlined"
className="form-control" 
style={{width:"400px",height:'20px'}}
size="small"
type="text" 
name="nom" 
onChange={(e) => this.handleInputChange(e, "nom")} 
style={{marginTop:"15px"}}
/>
   </div>     
   </div>     
    
  <div className="pied" style={{marginTop:'25px'}}>   
   <div class="bouton-aligne">  
<Button  
variant="contained" 
type='submit' 
style={{textDecoration:'none',color:'black'}}>
<span style={{color:'white'}}>Ajouter</span>
</Button>
   </div>
   <div class="bouton-aligne">
    <Link to={'/promotion'} style={{textDecoration:'none'}}>
       <Button variant="outlined" 
       id="btn2">
<span style={{color:'#1976d2'}}>Retour</span>
       </Button>
    </Link>
   </div>
  </div>
 </form>
</div>
    )
  }
}