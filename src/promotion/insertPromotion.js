import React from 'react';
import axios from 'axios';
import Select from 'react-select'
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import "../components/login/register.css";


export default class InsertPromotion extends React.Component {
  // state = {
  //   name: '',
  // }

  constructor(props){
    super(props);
    this.state = {
      selectTypeChambres : [],
      _id: "",
      nom: '',
        promotion: {
            nom: '',
            tarif: '',
            typeChambre: '',
            remise: '',
            dateDebutS: '',
            dateFinS: ''
        },
    };
}

  // handleChange = event => {
  //   this.setState({ name: event.target.value });
  // }

  async getTypeChambres(){
    const res = await axios.get('http://localhost:3000/typechambre')
    const data = res.data.list

    const typeChambres = data.map(d => ({
      "value" : d._id,
      "label" : d.nom
    }))
    this.setState({selectTypeChambres: typeChambres})
    console.log(this.state.selectTypeChambres)
  }

  handleInputChange(event, inputName){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.promotion[inputName] = event.target.value;
    this.setState(currentState);
}

//Une fonction qui gérera notre valeur sélectionnée
handleSelectChange(event, selectName){
  const currentState = JSON.parse(JSON.stringify(this.state));
  currentState.promotion[selectName] = {_id:event.value};
  this.setState(currentState)
 }

  handleSubmit = event => {
    event.preventDefault();
    axios.post(`http://localhost:3000/promotion/create`,  this.state.promotion )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  componentDidMount(){
    this.getTypeChambres()
}

  render() {
    return (
      <div className="base-container">
        <div className="header">promotion</div>
        <form onSubmit={this.handleSubmit}>
        <div className="content">
          <div className="form">
<div className="form-group" style={{paddingTop:"15px"}}>
<TextField id="standard-basic" className="form-control" label="Nom" variant="standard" style={{width:"400px"}}
type="text" name="nom" 
onChange={(e) => this.handleInputChange(e, "nom")}/>
</div>

<div className="form-group" style={{paddingTop:"15px"}}>
<label>
  Tarif:
<select className="form-select" name="tarif" 
onChange={(e) => this.handleInputChange(e, "tarif")}>
<option value="0">Veuillez choisir un tarif...</option>
<option value="tarif1">tarif1</option>
<option value="tarif2">tarif2</option>
<option value="tarif3">tarif3</option>
</select>
</label>
</div>

<div className="form-group" style={{paddingTop:"15px"}}>
<label>
  Type Chambre:
  {/* <input type="text" name="typeChambre" 
  onChange={(e) => this.handleInputChange(e, "typeChambre")} /> */}
<Select options={this.state.selectTypeChambres} name="typeChambre"  onChange={(e) => this.handleSelectChange(e, "typeChambre")} />
</label>
</div>

<div className="form-group" style={{paddingTop:"15px"}}>
<TextField id="standard-basic" className="form-control" label="Remise" variant="standard" style={{width:"400px"}}
type="number" name="remise" 
onChange={(e) => this.handleInputChange(e, "remise")}/>
</div>

<div className="form-group" style={{paddingTop:"15px"}}>
<TextField id="standard-basic" className="form-control" label="" variant="standard" style={{width:"400px"}}
type="date" name="dateDebutS" 
onChange={(e) => this.handleInputChange(e, "dateDebutS")} />
</div>
<div className="form-group" style={{paddingTop:"15px"}}>
<TextField id="standard-basic" className="form-control" label="" variant="standard" style={{width:"400px"}}
type="date" name="dateFinS" 
onChange={(e) => this.handleInputChange(e, "dateFinS")} />
</div>

          </div>
        </div>
    
        <div className="footer" style={{marginTop:'25px'}}> 
<Button variant="contained" color="success" type='submit'>
Ajouter
</Button><br/>
<Link to={'/promotion'}>
<Button variant="contained" style={{marginTop:'20px'}}>
Retour
</Button>
</Link>
        </div>
        </form>
      </div>
    )
  }
}