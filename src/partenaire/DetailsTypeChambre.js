// import CustomError from '../CustomError';
import CustomError from '../CustomError';
import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom';
import  Sidebar  from "../Sidebar/Sidebar";
import  Navbar  from "../Navbar/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import './typeChambre.css';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Input = styled('input')({
  display: 'none',
});

const FileInput = ({value, handlePhotoChange}) => {
    return(
      <div>
        <label>
          Cliquez pour choisir une photo...
          <input 
            style={{display: 'none'}}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </label>
      </div>
    );
  }

function Equipements(props){
    console.log(props.equipements);
    let i = -1;
    let equipements = props.equipements.map(equipement => {
        i++;
        let u = i;
        return(
        <FormControlLabel
            checked={equipement.checked}
            control={<Checkbox/>}
            onChange={(e) => props.handleCheckBoxEquipement(e, u)}
            label={equipement.nom}
            style={{marginLeft:"20px"}}
        />
        );
    })
    return equipements;
}

function PlanTarifaire(props){
    let i = -1;
    console.log(props.planTarifaire);
    let list = props.planTarifaire.map(tarif => {
        i++;
        let u = i;
        return(
          <FormControlLabel 
            checked={tarif.checked}
            control={<Checkbox/>}
            onChange={(e) => props.handleCheckBoxPlanTarifaire(e, u)}
            label={tarif.nom}
            style={{marginLeft:"20px"}}
          />
        );
    })
    return list;
  }

class DetailsTypeCHambre extends React.Component{
    constructor(props){
        super(props);
        this.noImage = '/no-image.jpg';
        this.state = {
            errors: [],
            typeChambre: {
                _id: '',
                nom: '',
                nbAdulte: '',
                nbEnfant: '',
                photo: '',
                
                chambreTotal:'',
                etage:'',
                superficie:'',
                description:'',
                equipements: [],
                planTarifaire: []
            }
            , tarifs: []
            , previewPhoto: this.noImage
        }
        this.handleCheckBoxPlanTarifaire = this.handleCheckBoxPlanTarifaire.bind(this);
        this.handleCheckBoxEquipement = this.handleCheckBoxEquipement.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.setDetailsTypeChambre = this.setDetailsTypeChambre.bind(this);
    }

    setDetailsTypeChambre(data){
        console.log(data);
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState = data;
        if(currentState.typeChambre.photo != '' || 
            currentState.typeChambre.photo != undefined ||
            currentState.typeChambre.photo != null){
                currentState.previewPhoto = process.env.REACT_APP_BACK_URL + "/" + currentState.typeChambre.photo;
            }
        this.setState(currentState);
    }

    tryRedirect(res){
        console.log(res);
        if(res.status === 200){
          this.props.history.push('/typeChambre');
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
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL +
                "/typeChambre/details/" + this.props.match.params._id + '?id',
            withCredentials: true
        })
        .then(res => this.setDetailsTypeChambre(res.data))
        .catch(err => console.log(err));
    }

    update(e){
        e.preventDefault();
        console.log(this.state.typeChambre);
        let toSend = JSON.parse(JSON.stringify(this.state.typeChambre));
        let equipements = [];
        for(let i = 0; i < this.state.typeChambre.equipements.length; i++){
            if(this.state.typeChambre.equipements[i].checked){
                equipements.push(this.state.typeChambre.equipements[i]._id);
            }
        }
        toSend.equipements = equipements;
        let planTarifaire = [];
        for(let i = 0; i < this.state.typeChambre.planTarifaire.length; i++){
            if(this.state.typeChambre.planTarifaire[i].checked){
                planTarifaire.push(this.state.typeChambre.planTarifaire[i]._id);
            }
        }
        toSend.planTarifaire = planTarifaire;
        console.log(toSend);
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + "/typeChambre/update",
            withCredentials: true,
            data: toSend
        })

        .then(res => this.tryRedirect(res.data))
        .catch(err => console.log(err));
    }

    handleInputChange(event, inputName){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.typeChambre[inputName] = event.target.value;
        this.setState(currentState);
    }

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

    handleCheckBoxPlanTarifaire(e, index){
        let current = JSON.parse(JSON.stringify(this.state));
        current.typeChambre.planTarifaire[index].checked = e.target.checked;
        this.setState(current);
    }
    
    handleCheckBoxEquipement(e, index){
        let current = JSON.parse(JSON.stringify(this.state));
        current.typeChambre.equipements[index].checked = e.target.checked;
        this.setState(current);
    }

    render(){
        let list = null;
        list = this.state.tarifs.map(tarif => {
            return <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{tarif.nom}</TableCell>
              <TableCell align="center">{tarif.prixParJour}</TableCell>
              <TableCell align="center">{tarif.services}</TableCell>
              <TableCell align="center">{tarif.conditionsAnnulation}</TableCell>
              <TableCell align="center">
              <Link to={"/tarif/details/" + tarif._id + "/" + this.state.typeChambre._id} style={{textDecoration:'none'}}>
                <Button variant="contained" style={{backgroundColor:'#4682B4'}}>
                    Modifier
                </Button>    
                </Link>
              </TableCell>
            </TableRow>
        });
        return(
            <div> 
                <Navbar/>
                <Sidebar/>
            <div className="container">
             <div className="row">
              <div className="col-md-12">
                <div className="jumbotron1" 
                    style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)',marginLeft:'180px',marginTop:'-60px'}}>
                    <h1 className="text-center" id='title1'>Détails type chambre</h1>
                    <hr></hr>
                    <CustomError errors={this.state.errors} />
                    <form className="needs-validation">
                        <Box>
                            <div style={{marginTop:'40px'}}>
                                
                                <TextField id="standard-basic" label="Nom" variant="standard" style={{width:'40%'}} 
                                    value={this.state.typeChambre.nom} onChange={(e) => this.handleInputChange(e, "nom")}/>
                                {
                                    //console.log('yes')
                                }
                                <div style={{marginTop:'30px'}}>
                                    <div className="row">
                                        <div id="img-preview"><img style={{width:'300px', height: '150px'}} src={this.state.previewPhoto} /></div>
                                    </div>
                                    <div className="row">
                                        <FileInput 
                                            style={{marginTop: '5px'}}
                                            value=""
                                            handlePhotoChange={this.handlePhotoChange} />
                                    </div>
                                </div>

                                <div style={{marginTop:'30px'}}>
                                    <TextField id="standard-basic" label="chambre totale" variant="standard" type="number"
                                        style={{width:'40%'}} value={this.state.typeChambre.chambreTotal} onChange={(e) => this.handleInputChange(e, "chambreTotal")}/>
                                </div>

                                <div style={{marginTop:'30px'}}>
                                    <TextField id="standard-basic" label="Etage" variant="standard" type="text"
                                        style={{width:'40%'}} value={this.state.typeChambre.etage} onChange={(e) => this.handleInputChange(e, "etage")}/>
                                    <TextField id="standard-basic" label="Superficie" variant="standard" type="number" 
                                        style={{width:'40%',marginLeft:'152px'}} value={this.state.typeChambre.superficie} onChange={(e) => this.handleInputChange(e, "superficie")}/>
                                </div>

                            </div>

                            <div style={{marginTop:'20px'}}>
                                <label className="form-label mt-4" style={{textDecoration:'underline'}}>Occupation : </label>
                            </div>
                            <div style={{marginTop:'5px'}}>
                                <TextField id="standard-basic" label="Adulte" variant="standard" type="number" style={{width:'40%'}}
                                    value={this.state.typeChambre.nbAdulte} onChange={(e) => this.handleInputChange(e, "nbAdulte")}/>
                                <TextField id="standard-basic" label="Enfant" variant="standard" type="number" style={{width:'40%',marginLeft:'152px'}}
                                    value={this.state.typeChambre.nbEnfant} onChange={(e) => this.handleInputChange(e, "nbEnfant")}/>
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
                                    value={this.state.typeChambre.description} onChange={(e) => this.handleInputChange(e, "description")}
                                />
                            </div>
                            <div style={{marginTop:'30px'}}>
                                <div>
                                    <label className="form-label-mt4" style={{textDecoration: 'underline'}} >Equipements: </label>
                                </div>
                                <FormGroup>
                                    <Equipements  equipements={this.state.typeChambre.equipements} handleCheckBoxEquipement={this.handleCheckBoxEquipement} />
                                </FormGroup>
                            </div>
                            <div style={{marginTop:'30px'}}>
                                <div>
                                    <label className="form-label-mt4" style={{textDecoration: 'underline'}} >Plan tarifaire attribué: </label>
                                </div>
                                <FormGroup>
                                    <PlanTarifaire planTarifaire={this.state.typeChambre.planTarifaire} handleCheckBoxPlanTarifaire={this.handleCheckBoxPlanTarifaire}/>
                                </FormGroup>
                            </div>
                        </Box>

                    <div style={{marginTop:'50px'}}>

                    <Button variant="contained"  style={{backgroundColor:'#FA8072'}} onClick={(e) => this.update(e)}>
                        Modifier
                    </Button>
                    <Link to='/typeChambre' style={{textDecoration:'none'}}>
                        <Button variant="contained" style={{backgroundColor:'#293846',color:'white',marginLeft:'20px'}}>
                            Retour
                        </Button>
                    </Link>
                </div>
            </form>
            {/*
                    <h2 className="mt-5" style={{textDecoration:'underline',textAlign:'center'}}>Liste tarifs</h2>

                <TableContainer component={Paper} style={{marginTop:'40px'}}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center"><strong>Nom</strong></TableCell>
                            <TableCell align="center"><strong>Prix par jour</strong></TableCell>
                            <TableCell align="center"><strong>Services</strong></TableCell>
                            <TableCell align="center"><strong>Conditions d'annulation</strong></TableCell>
                            <TableCell align="center"><strong>Actions</strong></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        { list }
                        </TableBody>
                    </Table>
                    </TableContainer>
            */}

            </div>
            </div>
                {/* <div className="col-md-2"></div> */}
            </div>
            </div>
            </div>
        );
    }
}

export default DetailsTypeCHambre;