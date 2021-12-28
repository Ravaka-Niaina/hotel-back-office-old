
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DChambre from './listChambre'
import Fact from '../../client/fact'
import { useCookies } from 'react-cookie';
import callAPI from '../../../utility';
import './Css.css'
import moment from 'moment';
import NavBarClient from '../BookComponent.js';

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Promotions from "../../client/promotion";

import styles from '../Book.module.css';

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
            reload: true,
            openCalendar: false,
            openChangeNbGuest: false,
            openLoad: false,
            isListTarifDispoReceived: false,
            isFactureReceived: false
        };
        this.setReservationEnCours = this.setReservationEnCours.bind(this);
        this.setResult = this.setResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(fieldName, value){
        console.log("ok");
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
        console.log("here");
        let temp = {...this.state};
        temp.listTypeChambre = res.list;
        temp.isListTarifDispoReceived = true;
        this.setState(temp);
        console.log(res);
    }

    componentDidMount(){
        callAPI('get', '/TCTarif/all', {}, this.setResult);
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
        currentState.reload = true;
        if(reservation === null){
            currentState.itineraires = [];
        }else{
            currentState.itineraires = reservation.itineraires;
        }
        this.setState(currentState);
    }

    validerReservation(){
        callAPI('post', '/reservation/apply', {_id: this.state.reservationEnCours._id}, this.setReservationEnCours);
    }
    incrementReservation(){
        let current = JSON.parse(JSON.stringify(this.state));
        current.reservation.push(this.state.reservation.length);
        this.setState(current);
    }

    changeOpenFiltre(){
        let temp = {...this.state};
        temp.showFiltre = !temp.showFiltre;
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
                                    <Fact context = {this} />
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
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
export default Scroll
