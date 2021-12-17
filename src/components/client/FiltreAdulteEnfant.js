
import React from "react";
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';

import './filtre.css';

import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

class FiltreAdulteEnfant extends React.Component{

    constructor(props){
        super(props);
        this.IncrAdulte = this.IncrAdulte.bind(this);
        this.DecrAdulte = this.DecrAdulte.bind(this);
        this.IncrEnfant = this.IncrEnfant.bind(this);
        this.DecrEnfant = this.DecrEnfant.bind(this);

        this.state = {
            closePopper: true,
            showAge: false,
            nbAdulte:this.props.context.state.guests.nbAdulte,
            nbEnfant:this.props.context.state.guests.nbEnfant
        };
    }

    IncrAdulte() {         
        let current = JSON.parse(JSON.stringify(this.props.context.state));
        current.guests.nbAdulte = current.guests.nbAdulte + 1;
        this.props.context.setState(current);
        
        // addOne as HandleClick
        this.setState((preState) => {
          return {
            nbAdulte : preState.nbAdulte + 1
            };
         });
        
       }
      
      DecrAdulte() {        
        let current = JSON.parse(JSON.stringify(this.props.context.state));
        current.guests.nbAdulte = current.guests.nbAdulte - 1;
        this.props.context.setState(current);                      
        // addOne as HandleClick
        this.setState((preState) => {
          if (this.state.nbAdulte !== 0) {
          return {
            nbAdulte : preState.nbAdulte - 1
            };
          }
         });
       }

       IncrEnfant() {          
        let current = JSON.parse(JSON.stringify(this.props.context.state));
        current.guests.nbEnfant = current.guests.nbEnfant + 1;
        this.props.context.setState(current);                      // addOne as HandleClick
        this.setState((preState) => {
          return {
            nbEnfant : preState.nbEnfant + 1,
            };
         });
       }
 
       
      DecrEnfant() {        
        let current = JSON.parse(JSON.stringify(this.props.context.state));
        current.guests.nbEnfant = current.guests.nbEnfant - 1;
        this.props.context.setState(current);                       // addOne as HandleClick
        this.setState((preState) => {
          if (this.state.nbEnfant !== 0) {
          return {
            nbEnfant : preState.nbEnfant - 1,
            };
          }
         });
       }

    render(){
        return (
            <div style={{marginLeft: "500px", marginTop: "75px", zIndex: "5", position: "absolute", backgroundColor: "white", padding: "10px 10px", borderRadius: "5px"}}>
                <span id="adultes">Adultes</span><div class='guest1' id='adulte1' onClick={this.DecrAdulte}><p id='moins'>-</p></div>
                <div class='guest1'>
                    <input value={this.state.nbAdulte} onChange={(e) => this.changeGuests(e, "nbAdulte")} class='adulte' type=""/>
                </div>
                <div class='guest1' id='adulte11' onClick={this.IncrAdulte}><p id='add'>+</p></div>
                    <br/>
                    <span id="enfants">Enfants</span><div class='guest2' id='enfant1' onClick={this.DecrEnfant}><p id='moins'>-</p></div>
                    <div class='guest2'>
                    <input value={this.state.nbEnfant} onChange={(e) => this.changeGuests(e, "nbEnfant")} class='enfant' type=""/>
                </div>
                <div class='guest2' id='enfant11' onClick={this.IncrEnfant}>
                    <p id='add'>+</p>
                </div>
                {
                    this.state.showAge ?
                    <select value="" name="" class="age">
                    <option value="">0</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                    <option value="">6</option>
                    <option value="">7</option>
                    <option value="">8</option>
                    <option value="">9</option>
                    <option value="">10</option>
                    <option value="">11</option>
                    </select>
                    : null
                }
            </div>
        );
    }
}
export default FiltreAdulteEnfant;