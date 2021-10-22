import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import { NorthWest } from '@mui/icons-material';
import Filtre from './Filtre';

class DChambre extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: '',
            message: '',
            list: [],
            reservation : this.props.reservation
        };
    }

    setListTypeChambre(data){
        console.log("list="+JSON.stringify(data));
        let currentState = JSON.parse(JSON.stringify(this.state));   //mamadika donne ho lasa json 
        currentState = data;                                         // lasa currentState ilai data (this.state) ilai data
        this.setState(currentState);                                  //modifier ilai state ho lasa donnee json
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

    addReservation(e ,id){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.reservation.push({idTarif : id , dateDebut : "2021-11-23" , datefin : "2021-11-29" });  
        console.log("tonga"); 
    }

    


    render(){
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

        function ListTarif(props){
            
            let tarifs = props.tarifs.map(tarif => {
                function addReservation(e ,id){
                    axios({
                method: 'post',
                url: process.env.REACT_APP_BACK_URL + "/reservation/insert",
                withCredentials: true,
                data: {idTarif : id , dateDebut : "2021-11-23" , datefin : "2021-11-29" }
            })
            .then(res => {console.log("mety")})
            .catch(err => console.log(err));

            axios({                                                     // webService
                method: 'get',                                           //methode get       
                url: process.env.REACT_APP_BACK_URL + "/reservation/encours",     //miants ilai url ani amin back
                withCredentials: true                                      //type boolean 
            })                  
            .then(res => {                                                  
                this.setListTypeChambre(res.data)})
            .catch(err => console.log(err));
                }
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

                                                    {tarif.conditionsAnnulation !== "" 
                                                        ?   <span style={{fontSize:'12px' , color : 'green'}}>
                                                                <i class="fa fa-check" aria-hidden="true">
                                                                    &nbsp;&nbsp;{tarif.conditionsAnnulation} 
                                                                </i>
                                                            </span> : ""
                                                    } <br/>

                                                    <ListServiceTarif services={tarif.services} />
                                                </div>

                                                </div>
                                                
                                                <div class="col"> 
                                                    <strong style={{fontSize:'20px'}}>&nbsp;{tarif.prixParJour} 
                                                    </strong><span style={{fontSize:'14px'}}>Per Night</span><br/>
                                                    <span style={{fontSize:'10px'}} >including Taxes & Fees</span>
                                                </div>
                                                <div class="col"> 
                                                    <button className="btn btn-primary btn-sm" 
                                                        style={{marginTop:'7px' , marginLeft:'10px'}} 
                                                        onClick = {(e) => addReservation(e,tarif._id)}>BOOK NOW
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

        let listChambre = null;
        listChambre = this.state.list.map(typeChambre => {
            return (
            <div className="DChambre1">
                <div class="Chambre1">
                <div class="row mb-4">
                    <div class="col">
                        <img src="im2.jpg" />
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
                            <li style={ {marginLeft : 10 , listStyle : 'none'} }>
                                <i class="fa fa-wifi"></i>&nbsp;wifi
                            </li>
                            <li style={ {marginLeft : 10 , listStyle : 'none'} }>
                                <i class="fa fa-bath"></i>&nbsp;Bathtub
                            </li>
                            <li style={ {marginLeft : 10 , listStyle : 'none'} }>
                                <i class="fa fa-shower"></i>&nbsp;Shower
                            </li>
                            <li style={ {marginLeft : 10 , listStyle : 'none'} }><i class="fa fa-thermometer-half"></i>&nbsp;Air</li>
                        </ul>
                    </div>
                    <div class="col">
                        <ListTarif tarifs={typeChambre.tarifs}/>
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
                <Filtre />
                <hr></hr>
                 {listChambre}
            </div>
        );
        this.addReservation()
    }
}
export default DChambre
