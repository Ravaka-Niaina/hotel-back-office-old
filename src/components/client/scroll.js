import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DChambre from './listChambre'
import Fact from './fact'

import './Css.css'

class Scroll extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reservation :[]
        }
    }

    
    render(){
        return(
            <div className="scroll-bg">
                <div class="row">
                    <div className="col">
                        <div className="scroll-div">
                            <div className="scroll-object">
                                <DChambre reservation ={this.state.reservation}/>

                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="divRight">
                            <Fact reservation = {this.state.reservation}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Scroll