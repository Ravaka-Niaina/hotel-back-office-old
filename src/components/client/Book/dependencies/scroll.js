import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DChambre from './listChambre'
import Fact from './fact.js';
import { useCookies,Cookies,withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import callAPI from '../../../../utility';
import './Css.css'
import moment from 'moment';
import NavBarClient from '../BookComponent.js';

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Promotions from "./promotion";

import styles from '../Book.module.css';
import Footer from "./Footer.js";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



function TestCookie(){
    const [cookies, setCookie] = useCookies(['name']);
    let pp = JSON.stringify({user: 'Norck', play: 999, totalPP: 1000, topPlays:['ascension to heaven', 'big black', 'atama no taisou']});
    setCookie('pp', pp, '/');
    return(
        null
    );
}

function getDateCreationPanier(){
    
    function getNDigits(number, digit){
        digit = digit + '';
        const remain = number - digit.length;
        for(let i = 0; i < remain; i++){
            digit = "0" + digit;
        }
        return digit;
    }

    let d = new Date();
    const dateString = d.getFullYear() + "-" + getNDigits(2, d.getMonth() + 1) + "-" + getNDigits(2, d.getDate()) + " " 
    + getNDigits(2, d.getHours()) + ":" + getNDigits(2, d.getMinutes()) + ":" + getNDigits(2, d.getSeconds()) + "." + d.getMilliseconds();
    return{date: dateString, timeZoneOffset: d.getTimezoneOffset()};
}

const name_cookies='reservation-real';
const empty_reservation={_id:"62026a7908b6947750fba0ff",idUtilisateur: "SIl56KMCom4UdHRpGrpsbooTKW8Lw5IJ",dateValidation: null,etat: 1,itineraires:[{ edit: false,
    dateSejour: {debut: "", fin: ""},
    tarifReserves: []}]
};

const duree_cookie=2;
let isFirstRender = true;
class Scroll extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);
        const { cookies } = props;
        let datenow =Date.now();
        
        let expiration = new Date(datenow + duree_cookie*60000);
    
        this.state = {
            err: null,
            openChangeDateSejour: false,
            changeDateSejour: true, 
            resultApplyReservation: null,
            errFiltre: null,
            guests: {nbEnfant: 0, nbAdulte: 1},
            dateSejour: {debut: "", fin: ""},
            listTypeChambre: [],
            reservation: [],
            reservationEnCours: cookies.get(name_cookies) || empty_reservation,
            expirationCookie:expiration,
            itineraires: [],
            showFiltre : false,
            open: false,
            email: "",
            reload: true,
            openCalendar: false,
            openChangeNbGuest: false,
            openLoad: false,
            isListTarifDispoReceived: false,
            isFactureReceived: false,
            nameHotel : "COLBERT",
            random : 0,
            user_session : {
                id:""
            },
            isDebut: true
        };
        this.setReservationEnCours = this.setReservationEnCours.bind(this);
        this.setResult = this.setResult.bind(this);
        let that =this;
        this.handleChange = this.handleChange.bind(this);
        const intervalId = setInterval(() => {
            that.checkExpirationCookie();
        }, 30000);
    }
    
    clearCookies(){
        console.log("Clear cookies");
        const dateCreationPanier = getDateCreationPanier();
        let datenow =Date.now();
        let currentState = JSON.parse(JSON.stringify(this.state));
        let expiration =datenow + duree_cookie*60000;
        currentState.expirationCookie =new Date(expiration);
        empty_reservation.dateCreationPanier = dateCreationPanier;
        currentState.reservationEnCours=empty_reservation;
        currentState.itineraires = [ { edit: false,
            dateSejour: JSON.parse(JSON.stringify(currentState.dateSejour)),
            tarifReserves: []}];
        const { cookies } = this.props;
        cookies.set(name_cookies, empty_reservation, { path: '/' ,expires:new Date(expiration)});
        this.setState(currentState);
        
    }
    checkExpirationCookie(){
        let datenow =Date.now();
        let currentState = JSON.parse(JSON.stringify(this.state));
        let dateexpiration =new Date(currentState.expirationCookie);
        // 
        if(datenow>dateexpiration.getTime()){
            this.clearCookies();
            
          
        }
    }
    
    handleChangeCookies(reservation,expirationTime) {
        const { cookies } = this.props;
        cookies.set(name_cookies, reservation, { path: '/' ,expires:new Date(expirationTime)});
        
        //  this.setState({ reservationEnCours:reservation });
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
        //currentState.openChangeDateSejour = true;
        this.setState(currentState);
    }

    removeErr(){
        let temp = {...this.sate};
        temp.err = null;
        this.setState(temp);
    }

    setResult(res){
        //verif raha misy ny cookie
        //eto
        
        let temp = {...this.state};
        temp.listTypeChambre = res.list;
        for(let i = 0; i < temp.listTypeChambre.length; i++){
            temp.listTypeChambre[i].show = false;
        }
        temp.isListTarifDispoReceived = true;
        setTimeout(()=>{this.setState(temp)}, 1500);
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
            current.openChangeDateSejour = false;
            current.changeDateSejour = false;
            try{
                if(current.itineraires[current.itineraires.length - 1].tarifReserves.length > 0){
                    current.itineraires.push({ 
                        edit: false,
                        dateSejour: JSON.parse(JSON.stringify(current.dateSejour)),
                        tarifReserves: []
                    });
                    empty_reservation.itineraires[0] ={ 
                        edit: false,
                        dateSejour: JSON.parse(JSON.stringify(current.dateSejour)),
                        tarifReserves: []
                    }
                }else{
                    current.itineraires[current.itineraires.length - 1].dateSejour.debut = dateDebut;
                    current.itineraires[current.itineraires.length - 1].dateSejour.fin = dateFin;
                    empty_reservation.itineraires[0] ={ 
                        edit: false,
                        dateSejour: JSON.parse(JSON.stringify(current.dateSejour)),
                        tarifReserves: []
                    }
                }
            }catch(err){
                current.itineraires.push({ 
                        edit: false,
                        dateSejour: JSON.parse(JSON.stringify(current.dateSejour)),
                        tarifReserves: []
                    });
                    empty_reservation.itineraires[0] ={ 
                        edit: false,
                        dateSejour: JSON.parse(JSON.stringify(current.dateSejour)),
                        tarifReserves: []
                    }
            }
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
    
    setReservationEnCours(reservation, isFactureReceived,isFirstTarif){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.reservationEnCours = reservation;
    
        currentState.reload = true;
        let expiration=currentState.expirationCookie;
        if(isFactureReceived){
            currentState.isFactureReceived = true;
        }
        
        if(reservation === null){
            const { cookies } = this.props;
            let reservationCookies=cookies.get(name_cookies);
            
            empty_reservation.dateCreationPanier = getDateCreationPanier();
            empty_reservation.itineraires[0] ={ 
                edit: false,
                dateSejour: JSON.parse(JSON.stringify(currentState.dateSejour)),
                tarifReserves: []
            } ;
            if(reservationCookies==null || reservationCookies==undefined){
               
                reservationCookies =empty_reservation;
                let datenow =Date.now();
        
                expiration = new Date(datenow + duree_cookie*60000);
                currentState.expirationCookie = expiration;
            }
            currentState.reservationEnCours=reservationCookies;
            currentState.itineraires = reservationCookies.itineraires;
            
        }else{
            if(isFirstTarif){
                
                currentState.err="Votre réservation expirera dans "+duree_cookie+ " minutes";
                let datenow =Date.now();
        
                expiration = new Date(datenow + duree_cookie*60000);
            }
            currentState.itineraires = reservation.itineraires;
            currentState.expirationCookie = expiration;
        }
        
        this.handleChangeCookies(currentState.reservationEnCours,expiration);
        this.setState(currentState);
    }

    validerReservation(){
        //callAPI('post', '/reservation/apply', {_id: this.state.reservationEnCours._id}, this.setReservationEnCours);
    }
    incrementReservation(){
        let current = JSON.parse(JSON.stringify(this.state));
        current.reservation.push(this.state.reservation.length);
        this.setState(current);
    }

    changeOpenFiltre(open){
        let temp = {...this.state};
        temp.showFiltre = open;
        this.setState(temp);
    }
    
    render(){
       
        return(
            <div>
                <div style={{filter: "blur(" + (this.state.openLoad ? "2" : "0") + "px)"}}>
                    <NavBarClient context={this} />
                    <Box sx={{ flexGrow: 1, padding :"5px" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Item>
                                    <Promotions />
                                </Item>
                            </Grid>
                            <Grid className={styles.tarifChambre} item xs={6}>
                                <DChambre context = {this} />
                            </Grid>
                            <Grid item xs={3}>
                                <Item>
                                    <Fact context = {this}  />
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                    <Footer/>
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.openLoad}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        );
    }
}
export default withCookies(Scroll);
