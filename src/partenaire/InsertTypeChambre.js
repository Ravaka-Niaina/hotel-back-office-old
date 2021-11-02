// import { TextField } from "@mui/material";
import CustomError from '../CustomError';
import axios from "axios";
import React from "react";
import  Sidebar  from "../Sidebar/Sidebar";
import  Navbar  from "../Navbar/Navbar";
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import './typeChambre.css';
class InsertTypeCHambre extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        errors: [],
        nom: '',
        equipements: '',
        nbAdulte: '',
        nbEnfant: '',
        photo: ''
    }
}

tryRedirect(res){
    console.log(res);
    if(res.status === 200){
      this.props.history.push('/typeChambre');
    }else if(res.status === 401){//Unauthorized
        this.props.history.push('/');
    }else{
      let currentState = JSON.parse(JSON.stringify(this.state));
      currentState.errors = res.errors;
      this.setState(currentState);
    }
  }

insert(e){
    e.preventDefault();
    /*
    let formData = new FormData();
    formData.set('nom', this.state.nom);
    formData.set('equipements', this.state.equipements);
    formData.set('nbAdulte', this.state.nbAdulte);
    formData.set('nbEnfant', this.state.nbEnfant);
    formData.set('photo', this.state.photo);
    console.log(formData);
    */
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACK_URL + "/typeChambre/insert",
        withCredentials: true,
        data: this.state
    })
    .then(res => this.tryRedirect(res.data))
    .catch(err => console.log(err));
}

handleInputChange(event, inputName){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState[inputName] = event.target.value;
    this.setState(currentState);
}
handlePhotoChange(event){
    let currentState = JSON.parse(JSON.stringify(this.state));
    currentState.photo = event.target.files[0];
    this.setState(currentState);
}
  render(){
    return (
        <div> 
        <Navbar/>
        <Sidebar/>
        <div className="container" style={{marginLeft:'340px',marginTop:'80px'}}>
        <div className="jumbotron1" 
        style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)'}}>
        <h1 className="text-center" id='title1'>Ajouter Type chambre</h1>
        <hr></hr>
        <CustomError errors={this.state.errors} />
        <form className="needs-validation">
            <div>
                <label className="form-label">Nom: </label>
                <input className="form-control" type="text" value={this.state.nom}
                    onChange={(e) => this.handleInputChange(e, "nom")}/>
            </div>
            <div>
                <label className="form-label mt-3">Equipements: </label>
                <textarea className="form-control" value={this.state.equipements}
                    onChange={(e) => this.handleInputChange(e, "equipements")}></textarea>
            </div>
            <div>
            <div>
                <label className="form-label mt-3">Photo: </label>
                <input className="form-control" type="file" value={this.state.photo}
                    onChange={(e) => this.handleInputChange(e, "photo")}/>
            </div>
                <div>
                    <label className="form-label mt-4" style={{textDecoration:'underline'}}>Capacité: </label>
                </div>
                <label className="form-label mt-3">Adulte: </label>
                <input className="form-control" type="number" value={this.state.nbAdulte}
                    onChange={(e) => this.handleInputChange(e, "nbAdulte")}/>
                <label className="form-label mt-3">Enfant: </label>
                <input className="form-control" type="number" value={this.state.nbEnfant}
                    onChange={(e) => this.handleInputChange(e, "nbEnfant")}/>
            </div>
            <div>
                <button 
                style={{backgroundColor:'#32CD32'}}
                type="button" 
                className="btn btn-success mt-4" onClick={(e) => this.insert(e)}>
                    Céer
                </button>
            </div>
        </form>

    </div>
    </div>
    </div>

              );
  }
}
  
  export default InsertTypeCHambre;