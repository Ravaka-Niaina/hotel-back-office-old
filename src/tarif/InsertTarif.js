import CustomError from '../CustomError';
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import './insertTarif.css';

import  Navbar  from "../Navbar/Navbar";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

class InsertTarif extends React.Component{
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

    componentDidMount(){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.tarif.idTypeChambre = 
            this.props.match.params.idTypeChambre;
        this.setState(currentState);
    }

    tryRedirect(res){
        console.log(this.state.tarif);
        console.log('resultat recu');
        console.log(res);
        if(res.status === 200){
            this.props.history.push('/typeChambre/details/' 
                + this.props.match.params.idTypeChambre);
        }else if(res.status === 401){//Unauthorized
            this.props.history.push('/login');
        }else{
            let currentState = JSON.parse(JSON.stringify(this.state));
            currentState.errors = res.errors;
            this.setState(currentState);
        }
    }

    insert(e){
        e.preventDefault();
        console.log('Insertion en cours');
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + "/tarif/insert",
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
                
            <div className="container" style={{}}> 
             <div className="row">
              <div className="col-md-12">
                <div className="jumbotron" 
                style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)',marginLeft:'310px',marginTop:'-60px'}}>
                    <h1 className="text-center" id='title1'>Créer tarif</h1>
                    <hr></hr>
                    <CustomError errors={this.state.errors}/>
                    <form className="needs-validation">
                        <p style={{fontFamily:'Arial',fontSize:'18px'}}>
                            Type chambre: {this.props.match.params.nomTypeChambre}
                        </p>
                        {/*
                        <div>
                             <label className="form-label mt-2">Nom: </label>
                            <input className="form-control" 
                                type="text" 
                                value={this.state.tarif.nom}
                                onChange={(e) => this.handleInputChange(e, "nom")}/>
                        </div>
                        <div>
                            <label className="form-label mt-2">Prix journalier: </label>
                            <input className="form-control"
                                type="number" 
                                value={this.state.tarif.prixParJour}
                                onChange={(e) => this.handleInputChange(e, "prixParJour")}/>
                        </div>
                        <div>
                            <label className="form-label mt-3">Services: </label>
                            <textarea className="form-control"
                                style={{height:'100px'}}
                                value={this.state.tarif.services}
                                onChange={(e) => this.handleInputChange(e, "services")}></textarea>
                        </div>
                        <div>
                            <label className="form-label mt-3">Conditions d'annulation: </label>
                            <textarea className="form-control"
                                style={{height:'100px'}}
                                value={this.state.tarif.conditionsAnnulation}
                                onChange={(e) => this.handleInputChange(e, "conditionsAnnulation")}></textarea>
                        </div>
                        <div>
                            <button type="button" className="btn btn-success mt-4"
                            style={{backgroundColor:'#32CD32'}}
                            onClick={(e) => this.insert(e)}>
                                Créer
                            </button>
                        </div> */}

<div style={{marginTop:'20px'}}>
<TextField id="standard-basic" label="Nom" variant="standard" style={{width:'40%'}}
type="text" 
value={this.state.tarif.nom}
onChange={(e) => this.handleInputChange(e, "nom")}/>

<TextField id="standard-basic" label="Prix journalier" variant="standard" style={{width:'40%',marginLeft:'140px'}}
type="text"
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

<div style={{marginTop:'60px'}} onClick={(e) => this.insert(e)}>
<Button variant="contained" color="success">
Créer
</Button>
</div>
<div style={{marginTop:'20px'}}>
<Link to={'/typeChambre/details/' + this.props.match.params.idTypeChambre} style={{textDecoration:'none'}}>
<Button variant="contained" style={{backgroundColor:'#293846',color:'white'}}>
Retour
</Button>
</Link>
</div>


                        {/* <Link to={'/typeChambre/details/' + this.props.match.params.idTypeChambre}>
                            <button type="button"
                            className="btn mt-4" 
                            style={{backgroundColor:'#293846',color:'white'}}
                            >Retour</button>
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

export default InsertTarif;