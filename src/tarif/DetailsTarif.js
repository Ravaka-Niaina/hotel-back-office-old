import CustomError from '../CustomError';
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import  Sidebar  from "../Sidebar/Sidebar";
import  Navbar  from "../Navbar/Navbar";

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

class DetailsTarif extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: [],
            tarif: {
                _id: '',
                nom: '',
                idTypeChambre: '',
                prixParJour: '',
                services: [], 
                conditionsAnnulation: '',
                
                sejourMinimum:'',
                description:''
            }
        };
    }

    setTarif(data){
        console.log(data);
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.errors = data.errors;
        if(data.tarif != null){
            currentState.tarif = data.tarif;
        }
        this.setState(currentState);
    }

    componentDidMount(){
        console.log('idTypeChambre = ' + this.props.match.idTypeChambre);
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + 
                "/tarif/details/" + this.props.match.params._id,
            withCredentials: true
        })
        .then(res => this.setTarif(res.data))
        .catch(err => console.log(err));
    }

    tryRedirect(res){
        console.log('resultat recu');
        console.log(res);
        if(res.status === 200){
            this.props.history.push('/typeChambre/details/' 
                + this.props.match.params.idTypeChambre);
        }else if(res.status === 401){//Unauthorized
            this.props.history.push('/');
        }else{
            let currentState = JSON.parse(JSON.stringify(this.state));
            currentState.errors = res.errors;
            this.setState(currentState);
        }
    }

    modifier(e){
        e.preventDefault();
        console.log('Insertion en cours');
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + "/tarif/update",
            withCredentials: true,
            data: this.state.tarif
        })
        .then(res => this.tryRedirect(res.data))
        .catch(err => console.log(err));
    }

    handleInputChange(event, inputName){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.tarif[inputName] = event.target.value;
        this.setState(currentState);
    }

    render(){
        return(
            <div> 
                <Navbar/>
                <Sidebar/>
            <div className="container" style={{}}>
             <div className="row" style={{}}>
              <div className="col-md-12">
                <div className="jumbotron" 
                 style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)',marginLeft:'315px',marginTop:'-60px'}}>
                    <h1 className="text-center" id='title1'>Détails tarif</h1>
                    <hr></hr>
                    <CustomError errors={this.state.errors}/>
                    <form className="needs-validation">
                        <p style={{fontFamily:'Arial',fontSize:'18px'}}
                        >Type chambre: {this.props.match.params.nomTypeChambre}</p>
                        {/* <div>
                            <label  className="form-label mt-2">Nom: </label>
                            <input 
                                className="form-control"
                                type="text" 
                                value={this.state.tarif.nom}
                                onChange={(e) => this.handleInputChange(e, "nom")}/>
                        </div>
                        <div>
                            <label  className="form-label mt-2">Prix journier: </label>
                            <input
                                className="form-control" 
                                type="number" 
                                value={this.state.tarif.prixParJour}
                                onChange={(e) => this.handleInputChange(e, "prixParJour")}/>
                        </div>
                        <div>
                            <label  className="form-label mt-2">Services: </label>
                            <textarea 
                                className="form-control"
                                value={this.state.tarif.services}
                                onChange={(e) => this.handleInputChange(e, "services")}></textarea>
                        </div>
                        <div>
                            <label  className="form-label mt-2">Conditions d'annulation: </label>
                            <textarea 
                                className="form-control"
                                value={this.state.tarif.conditionsAnnulation}
                                onChange={(e) => this.handleInputChange(e, "conditionsAnnulation")}></textarea>
                        </div> */}

<div style={{marginTop:'20px'}}>
<TextField id="standard-basic" label="Nom" variant="standard" style={{width:'40%'}}
type="text"
value={this.state.tarif.nom}
onChange={(e) => this.handleInputChange(e, "nom")}/>

<TextField id="standard-basic" label="Prix journalier" variant="standard" style={{width:'40%',marginLeft:'140px'}}
type="text"
type="number" 
value={this.state.tarif.prixParJour}
onChange={(e) => this.handleInputChange(e, "prixParJour")}/>
</div>

<div style={{marginTop:'20px'}}>
<TextField id="standard-basic" label="Séjours minium" variant="standard" style={{width:'40%'}}
type="text"
value={this.state.tarif.sejourMinimum}
onChange={(e) => this.handleInputChange(e, "sejourMinimum")}/>
</div>

<div style={{marginTop:'20px'}}>
<div style={{}}>
<label className="form-label mt-4" style={{textDecoration:'underline'}}>Description: </label>
</div>
<TextField id="outlined-basic" variant="outlined" type='text'
  placeholder=""
  multiline
  rows={2}
  rowsMax={4}
  style={{width:'100%',height:'50px'}}
  value={this.state.tarif.description}
onChange={(e) => this.handleInputChange(e, "description")}
/>
</div>

<div style={{marginTop:'20px'}}>
<div style={{}}>
<label className="form-label mt-4" style={{textDecoration:'underline'}}>Services: </label>
</div>
<TextField id="outlined-basic" variant="outlined"
  placeholder=""
  multiline
  rows={2}
  rowsMax={4}
  style={{width:'100%',height:'50px'}}
  type='text'
  value={this.state.tarif.services}
  onChange={(e) => this.handleInputChange(e, "services")}
/>
</div>

<div style={{marginTop:'20px'}}>
<div style={{}}>
<label className="form-label mt-4" style={{textDecoration:'underline'}}>Conditions d'annulation: </label>
</div>
<TextField id="outlined-basic" variant="outlined"
  placeholder=""
  multiline
  rows={2}
  rowsMax={4}
  style={{width:'100%',height:'50px'}}
  value={this.state.tarif.conditionsAnnulation}
  onChange={(e) => this.handleInputChange(e, "conditionsAnnulation")}
/>
</div>

<div style={{marginTop:'60px'}}>
<Button variant="contained"  style={{backgroundColor:'#FA8072'}} onClick={(e) => this.modifier(e)}>
Modifier
</Button>
</div>
<div style={{marginTop:'20px'}}>
<Link to={'/typeChambre/details/' + this.props.match.idTypeChambre} style={{textDecoration:'none'}}>
<Button variant="contained" style={{backgroundColor:'#293846',color:'white'}}>
Retour
</Button>
</Link>
</div>

                        {/* <div>
                            <button className="btn mt-4" 
                            style={{backgroundColor:'#FF7F50'}} onClick={(e) => this.modifier(e)}>Modifier</button>
                        </div>
                        <Link to={'/typeChambre/details/' + this.props.match.idTypeChambre}>
                            <button className="btn mt-4" 
                            style={{backgroundColor:'#293846',color:'white'}}>Retour</button>
                        </Link> */}
                    </form>

                </div>
                </div>
              </div>
            </div>
            </div>
        );
    }
}

export default DetailsTarif;