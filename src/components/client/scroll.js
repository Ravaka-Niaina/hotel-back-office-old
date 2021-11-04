import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DChambre from './listChambre'
import Fact from './fact'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
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
            listTypeChambre: [],
            reservation: []
        }

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