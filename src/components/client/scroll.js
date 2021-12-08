
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DChambre from './listChambre'
import Fact from './fact'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
import callAPI from '../../utility';
import './Css.css'
import moment from 'moment';


import Datee from "./date";
import DateSejour from "./DateSejour";
import BaeCalendar from "../../calendar/calendar.js";

function TestCookie(){
    const [cookies, setCookie] = useCookies(['name']);
    let pp = JSON.stringify({user: 'Norck', play: 999, totalPP: 1000, topPlays:['ascension to heaven', 'big black', 'atama no taisou']});
    setCookie('pp', pp, '/');
    //console.log(cookies.pp);
    return(
        null
    );
}

class Scroll extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            openChangeDateSejour: false,
            changeDateSejour: true, 
            resultApplyReservation: null,
            errFiltre: null,
            guests: {nbEnfant: 0, nbAdulte: 1},
            dateSejour: {debut: "", fin: ""},
            listTypeChambre: [],
            reservation: [],
            reservationEnCours: null,
            itineraires: [],
            showFiltre : false,
            open: false,
            err: null,
            email: "",
        };
        this.setReservationEnCours = this.setReservationEnCours.bind(this);
    }
    
    handleChange(fieldName, value){
        let current = JSON.parse(JSON.stringify(this.state));
        current[fieldName] = value;
        this.setState(current);
    }

    addNewItineraire(){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.changeDateSejour = true;
        currentState.dateSejour.debut = "";
        currentState.dateSejour.fin = "";
        currentState.listTypeChambre = [];
        currentState.showFiltre = false;
        //currentState.openChangeDateSejour = true;
        this.setState(currentState);
    }

    getConvert(number , value){
        value = value+"";
        let compteur = number - value.length;
        for( let i = 0 ; i < compteur ; i++){
            value = "0" + value;
        }
        return value;

    }
   
    getDateAndConvert(dateDebut , dateFin){
        dateDebut = moment(dateDebut).format("YYYY/MM/DD");
        dateFin = moment(dateFin).format("YYYY/MM/DD");
        let current = JSON.parse(JSON.stringify(this.state));
        current.dateSejour.debut = dateDebut; 
        current.dateSejour.fin = dateFin;
        //console.log(current.itineraires[current.itineraires.length - 1]);
        if(current.dateSejour.debut != null && current.dateSejour.fin != null){
            current.showFiltre = true;
            current.openChangeDateSejour = false;
            current.changeDateSejour = false;
            try{
                if(current.itineraires[current.itineraires.length - 1].tarifReserves.length > 0){
                    current.itineraires.push({ 
                        edit: false,
                        dateSejour: JSON.parse(JSON.stringify(current.dateSejour)),
                        tarifReserves: []
                    });
                }else{
                    current.itineraires[current.itineraires.length - 1].dateSejour.debut = dateDebut;
                    current.itineraires[current.itineraires.length - 1].dateSejour.fin = dateFin;
                }
            }catch(err){
                current.itineraires.push({ 
                        edit: false,
                        dateSejour: JSON.parse(JSON.stringify(current.dateSejour)),
                        tarifReserves: []
                    });
            }
        }else{
            current.showFiltre = false;
        }
        
        return this.setState(current);
    }

    getDateAndConvertMethode2(dateDebut , dateFin){
        dateDebut = new Date(dateDebut);
        let year1 = dateDebut.getFullYear();
        let month2 = this.getConvert(2 , dateDebut.getMonth() + 1);
        let jours3 = this.getConvert(2 , dateDebut.getDay());
        dateDebut = year1 +"/"+month2 +'/'+jours3;

        dateFin = new Date(dateFin);
        let year = dateFin.getFullYear();
        let month = this.getConvert(2 , dateFin.getMonth() + 1);
        let jours = this.getConvert(2 , dateFin.getDay());
        
        dateFin = year +"/"+month +'/'+jours;

        let current = JSON.parse(JSON.stringify(this.state));
        current.val[0] = dateDebut; 
        current.val[1] = dateFin;
        this.setState(current);
        console.log(current);
        return dateDebut; 
    }

    haddleChangeDate(value){
        if(value[0] != null && value[1] != null){
            this.getDateAndConvert(value[0] , value[1]);
        }else{
          console.log("error");
        }
      
    }
    setReservationEnCours(reservation){
        console.log(reservation);
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.reservationEnCours = reservation;
        currentState.itineraires = reservation.itineraires;
        this.setState(currentState);
    }

    validerReservation(){
        callAPI('post', '/reservation/apply', {_id: this.state.reservationEnCours._id}, this.setReservationEnCours);
    }

    incrementReservation(){
        console.log('STATE ITANY-------------');
        console.log(this.state);
        let current = JSON.parse(JSON.stringify(this.state));
        current.reservation.push(this.state.reservation.length);
        this.setState(current);
    }
    
    render(){
        return(
            <div>
                <TestCookie />
                <div className="scroll-bg" >
                    <div style ={{ width :"fit-content" , margin :"0 auto"}}>
                        <div style={{backgroundColor: "white"}}>
                            <BaeCalendar context = {this} />
                        </div>
                        {/*<Datee context = {this} style = {{marginLeft : "50px"}}/><hr/>*/}
                    </div >
                    <div class="row">
                        <div className="col">
                            <div className="scroll-div">
                                <div className="scroll-object">
                                    <DateSejour context= {this} /><hr/>
                                    <DChambre context = {this} />
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="divRight">
                                <Fact context = {this} />
                               </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Scroll