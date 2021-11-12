
import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import { NorthWest } from '@mui/icons-material';
import Filtre from './Filtre';
import TextField from '@mui/material/TextField';
import callAPI from '../../utility';

function ListConditionAnnulation(props){
    let services = props.politiqueAnnulAtrb.map(condition =>{
        return (
            <div class="row">
                <span style={{fontSize:'12px' , color : 'green'}}>
                    <i class="fa fa-check" aria-hidden="true">
                        &nbsp;&nbsp;{condition.nom} 
                    </i>
                </span>
            </div>
        );
    }) ;
    return services;
}

function ListServiceTarif(props){
    let services = props.services.map(service =>{
        return (
            <div class="row">
                <span style={{fontSize:'12px'}}><i class="fa fa-desktop" aria-hidden="true"></i>
                    &nbsp;{service}
                </span><br/>
            </div>
        );
    }) ;
    return services;
}

function Equipements(props){
    let list = [];
    try{
        for(let i = 0; i < props.equipements.length; i++){
            list.push(
                <li style={ {marginLeft : 10 , listStyle : 'none', width: '150px'} }>
                <i class="fa fa-wifi"></i>&nbsp;{props.equipements[i].nom}
                </li>
            );
        }
    }catch(err){}
    
    return list;
}

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

function ListTarif(props){
    function addReservation(e ,id, nom){
        axios({
            method: 'post',      
            url: process.env.REACT_APP_BACK_URL + '/reservation/insert',
            withCredentials: true,
            data: {
                reservation: {
                    idTarif: id, 
                    dateSejour: props.context.state.dateSejour,
                    dateReservation: getDate(Date.now())
                }
            }
        })
        .then(res => {                                                  
            props.context.setReservationEnCours(res.data)})
        .catch(err => console.log(err));
    }
    let tarifs = props.tarifs.map(tarif => {
             return (
                    <div>
                        
                        <div class="row">
                            <div class="col"></div>
                            <div class="col" style={{marginTop:'-30px'}} >
                                <ul style={{marginLeft:'25%'}}>
                                    <li style={ {  listStyle : 'none' , width : '500px',
                                                    padding :"1px" ,background : 'gainsboro'} }>
                                        <div className="row mb-4" style={{margin:"10px"}}>
                                        <div class="col"> 
                                            <strong style={{fontSize:'13px'}}>
                                                <u>{tarif.nom}</u>
                                            </strong><br/>

                                            {/*
                                                {tarif.politiqueAnnulAtrb !== "" 
                                                ?   <span style={{fontSize:'12px' , color : 'green'}}>
                                                        <i class="fa fa-check" aria-hidden="true">
                                                            &nbsp;&nbsp;{tarif.politiqueAnnulAtrb} 
                                                        </i>
                                                    </span> : ""
                                                } <br/>
                                            */}
                                            
                                            <ListConditionAnnulation politiqueAnnulAtrb={tarif.politiqueAnnulAtrb} />
                                            {/*<ListServiceTarif services={tarif.services} />*/}
                                        </div>

                                        </div>
                                        
                                        <div class="col"> 
                                            <strong style={{fontSize:'20px'}}>&nbsp;{tarif.prix + " "}
                                            </strong><span style={{fontSize:'14px'}}>Per Night</span><br/>
                                            <span style={{fontSize:'10px'}} >including Taxes & Fees</span>
                                        </div>
                                        <div class="col"> 
                                            <button className="btn btn-primary btn-sm" 
                                                style={{marginTop:'7px' , marginLeft:'10px'}} 
                                                onClick = {(e) => addReservation(e,tarif._id, tarif.nom)}>BOOK NOW
                                            </button>
                                        </div>
                                    </li><br/>
                                
                                </ul> 
                            </div>
                        <div class="col">
                    </div> 
                </div>
            </div> 
        ) ;
    });
    return tarifs;
}


class DChambre extends React.Component{
    constructor(props){
        super(props);
    }

    setListTypeChambre(data){   
        let currentState = JSON.parse(JSON.stringify(this.props.context.state));  //mamadika donne ho lasa json
        currentState.listTypeChambre = data.list;                                         // lasa currentState ilai data (this.state) ilai data
        this.props.context.setState(currentState);  
        console.log(this.props.context.state);
    }

    componentDidMount(){
        axios({                                                     // webService
            method: 'post',                                           //methode get       
            url: process.env.REACT_APP_BACK_URL + "/typeChambre",     //miants ilai url ani amin back
            withCredentials: true                                      //type boolean 
        })                  
        .then(res => {                                                  
            this.setListTypeChambre(res.data)})
        .catch(err => console.log(err));
        
    }

    addReservation(e ,id, nom){
        let currentState = JSON.parse(JSON.stringify(this.props.context.state));
        currentState.reservation.push({idTarif : id , dateDebut : "2021-11-23" , datefin : "2021-11-29" });  
        this.props.context.setState(currentState);
    }

    render(){
        let listChambre = this.props.context.state.listTypeChambre.map(typeChambre => {
            return (
            <div className="DChambre1">
                <div class="Chambre1">
                <div class="row mb-4">
                    <div className="col">
                        <img style={{width:'300px', height: '150px'}} src={ process.env.REACT_APP_BACK_URL + "/" + typeChambre.photo[0]} />
                    </div>
                    <div class="col">
                      <span style={{fontSize:'30px'}}> {typeChambre.nom} </span><br/>
                        <span style={{fontSize:'12px'}}>Sleeps 4 | 1 Double | 90 to 102m²</span><br/>
                        <span style={{fontSize:'12px'}}>Capacité max : 
                            {typeChambre.nbAdulte} Adultes +
                            {typeChambre.nbEnfant} enfants de moins de 12 ans.
                        </span><br/> <br/>
                    <Link  to ="/detail">   
                        <li style={ {marginLeft : 10 , listStyle : 'none' , color : 'blue'} }>
                            <u>Detail de la Chambre</u>
                        </li>
                    </Link>
                    
                    </div>
                    <div class="col"></div>
                </div>
                <div class="row">
                    <div class="col">
                        <ul>
                            <Equipements equipements={typeChambre.equipements}/>
                        </ul>
                    </div>
                    <div class="col">
                        <ListTarif context={this.props.context} tarifs={typeChambre.tarifs} />
                    </div>
                    <div class="col"></div>
                </div>  
            </div>      
            <hr/>
        </div>
            )
        }); 
        return (
            <div>
                <Filtre context={this.props.context} />
                <hr></hr>
                 {listChambre}
            </div>
        );
        this.addReservation()
    }
}
export default DChambre
>>>>>>> 83972e344490857afa3b4280c50f1a5289141842
