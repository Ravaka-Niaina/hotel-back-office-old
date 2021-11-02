import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DChambre from './listChambre'
import Fact from './fact'
import Home from './home'
//import { useCookies } from 'react-cookie';
//import { instanceOf } from 'prop-types';

import './Css.css'
class Scroll extends React.Component{
   

    constructor(props){
        super(props);
        this.state = {
            listTypeChambre: [],
            reservation: []
        }

    }
    incrementReservation(){
        console.log(this.state);
        let current = JSON.parse(JSON.stringify(this.state));
        current.reservation.push(this.state.reservation.length);
        this.setState(current);
    }

    
    render(){
        return(
            <div>
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