import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import { NorthWest } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Filtre from './Filtre';
import {useHistory} from 'react-router-dom';

//importer ilai function rehetra ani anatin ilai utility.js
const utility = require('./utility.js');   


function ListServiceTarif(props){
    let services = props.services.map(service =>{
        return (
            <div classname="row">
                <span style={{fontSize:'12px'}}><i classname="fa fa-desktop" aria-hidden="true"></i>
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
                <i className="fa fa-wifi"></i>&nbsp;{props.equipements[i]}
                </li>
            );
        }
    }catch(err){}
    
    return list;
}

function ListTarif(props){
   const history = useHistory();
   function functionAppel(res){
       
       if(res !== null || res.status === 201){
           console.log(res);
           history.push("/client");
       }else{
        console.log("pas de reponse");
       }
        
    }

    function addReserv(e , idTarifaire , varProps){
        let current = utility.getReservation(idTarifaire , varProps);
        utility.callAPI('post', '/reservations/insert', props.context.state.reserver, functionAppel);
        console.log("tonga");
    }

    //miincremente valeur 
    function addReservation(e ,id, nom){
        let currentState = JSON.parse(JSON.stringify(props.context.state));
        let tarifExists = false;
        for(let i = 0; i < currentState.reservation.length; i++){
            if(currentState.reservation[i].idTarif == id){
                currentState.reservation[i].nombre++;
                tarifExists = true;
                break;
            }
        }
        if(!tarifExists){
            currentState.reservation.push({idTarif : id , nom: nom, dateDebut : "2021-11-23" , datefin : "2021-11-29", nombre: 1}); 
        }
        props.context.setState(currentState);
        console.log(props.context.state.reservation);
    
    }
    let tarifs = props.tarifs.map(tarif => {
             return (
                    <div>
                        <div classname="row">
                            <div className="col" style={{marginTop:'-10px'}} >
                                <ul style={{marginLeft:'20%'}}>
                                    <li style={ {  listStyle : 'none' , width : '500px',
                                                    padding :"1px" ,border : '2px solid gainsboro'} }>
                                        <div className="row mb-4" style={{margin:"10px"}}>
                                            <div className="col"> 
                                                <strong style={{fontSize:'13px'}}>
                                                    <u>{tarif.nom}</u>
                                                </strong><br/>

                                                {tarif.conditionsAnnulation !== "" 
                                                    ?   <span style={{fontSize:'12px' , color : 'green'}}>
                                                            <i classname="fa fa-check" aria-hidden="true">
                                                                &nbsp;&nbsp;{tarif.conditionsAnnulation} 
                                                            </i>
                                                        </span> : ""
                                                } <br/>

                                                <ListServiceTarif services={tarif.services} />
                                            </div>

                                            <div className="col"> 
                                                <strong style={{fontSize:'20px'}}>&nbsp;{tarif.prixParJour} 
                                                </strong><span style={{fontSize:'14px'}}>Per Night</span><br/>
                                                <span style={{fontSize:'10px'}} >including Taxes & Fees</span>
                                            </div>
                                            <div className="col"> 
                                                <button className="btn btn-primary btn-sm" 
                                                    style={{marginTop:'7px' , marginLeft:'10px'}} 
                                                    onClick = {(e) => addReserv(e,tarif._id,props.context)}>BOOK NOW
                                                </button>
                                            </div>
                                        </div>
                                    </li><br/>
                                
                                </ul> 
                            </div>
                            <div classNme="col"> </div> 
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
        console.log(data);
        currentState.listTypeChambre = data.list;                                         // lasa currentState ilai data (this.state) ilai data
        this.props.context.setState(currentState);  
        console.log(currentState);                 //modifier ilai state ho lasa donnee json
    }

    componentDidMount(){
        axios({                                                     // webService
            method: 'get',                                           //methode get       
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
                <div classaNme="Chambre1">
                <div className="row mb-4">
                    <div className="col">
                        <img style={{width:'300px', height: '150px'}} src={ process.env.REACT_APP_BACK_URL + "/" + typeChambre.photo} />
                    </div>
                    <div className="col">
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
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col">
                        <ul>
                            <Equipements equipements={typeChambre.equipements}/>
                        </ul>
                    </div>
                    <div className="col">
                        <ListTarif context={this.props.context} tarifs={typeChambre.tarifs}/>
                    </div>
                    <div className="col"></div>
                </div>  
            </div>      
            <hr/>
        </div>
            )
        }); 
        return (
            <div>
                <Filtre />
                <hr></hr>
                
                
                <div className="inputDate" style = {{ backgroundColor : "rgb(246, 248, 252)"}}>
                <b>dateSejour :</b> 
                    <TextField id="input-with-sx"  
                        variant="standard" 
                        name="dateDebut"
                        type="date" style={{width : "150px"}}
                        value={this.props.context.state.reserver.dateSejour.dateDebut}
                        onChange={(e) => utility.haddleInputChange(e ,this.props.context, "dateDebut")}
                    />  
                    <TextField id="input-with-sx"  
                        variant="standard" 
                        name="dateFin"
                        type="date" style={{width : "150px"}}
                        value={this.props.context.state.dateFin}
                        onChange={(e) => utility.haddleInputChange(e,this.props.context,"dateFin")}
                    />
                </div><br/>
                 {listChambre}
            </div>
        );
        this.addReservation()
    }
}
export default DChambre
