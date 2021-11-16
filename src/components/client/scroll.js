
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DChambre from './listChambre'
import Fact from './fact'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
import callAPI from '../../utility';
import './Css.css'

function TestCookie(){
    const [cookies, setCookie] = useCookies(['name']);
    let pp = JSON.stringify({user: 'Norck', play: 999, totalPP: 1000, topPlays:['ascension to heaven', 'big black', 'atama no taisou']});
    setCookie('pp', pp, '/');
    console.log(cookies.pp);
    return(
        null
    );
}

class Scroll extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guests: {nbEnfant: 0, nbAdulte: 0},
            dateSejour: {debut: "", fin: ""},
            listTypeChambre: [],
            reservation: [],
            reservationEnCours: null,
            open: false,
            err: null,
            email: ""
        };
        this.setReservationEnCours = this.setReservationEnCours.bind(this);
    }

    handleChange(fieldName, value){
        let current = JSON.parse(JSON.stringify(this.state));
        current[fieldName] = value;
        this.setState(current);
    }

    setReservationEnCours(res){
        if(res.status == 401){// Acces non autorise
            console.log("Access non autorise");
            this.handleChange("open", true);
        }else if(res.status == 200){
            let currentState = JSON.parse(JSON.stringify(this.state));
            currentState.reservationEnCours = res.reservation;
            this.setState(currentState);
        }
        console.log(res);
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
                <div className="scroll-bg">
                    <div class="row">
                        <div className="col">
                            <div className="scroll-div">
                                <div className="scroll-object">
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