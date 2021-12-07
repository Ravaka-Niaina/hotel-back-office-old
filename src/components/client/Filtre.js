
import React from "react";
import MenuItem from '@mui/material/MenuItem';

import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';

import callAPI from '../../utility';

import './filtre.css';

import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

function ListOptCheckBox(props){
    let list = null;
    let u = -1;
    list = props.options.map(option => {
        u++;
        let indexOption = u;
        return(
            <FormControlLabel
                style={{padding: 0}}
                label={option.value}
                multipleChoice={props.multipleChoice}
                onChange={(e) => props.handleChange(e, props.indexFiltre, indexOption)}
                control={<Checkbox checked={option.checked} />}
            />
        );
    });
    return list;
}




function ListOptRadio(props){
    let list = null;
    let u = -1;
    list = props.options.map(option => {
        u++;
        let indexOption = u;
        return(
            <FormControlLabel
                style={{padding: 0}}
                value={option.value}
                label={option.value}
                control={<Radio onClick={(e) => props.handleRadioChange(e, props.indexFiltre, indexOption)}/>}
            />
        );
    });
    return list;
}

function ListOptions(props){
    if(props.multipleChoice){
        return(
            <FormGroup>
                <ListOptCheckBox 
                    indexFiltre={props.indexFiltre} 
                    handleChange={props.handleChange} 
                    options={props.options} 
                    multipleChoice={props.multipleChoice}/>
            </FormGroup>
        );
    }else{
        return(
            <div>
                <RadioGroup 
                    name={props.nameFiltre}
                    value={props.filtreValue}>
                    <ListOptRadio
                        indexFiltre={props.indexFiltre} 
                        nameFiltre={props.nameFiltre}
                        handleChange={props.handleChange}
                        handleRadioChange={props.handleRadioChange} 
                        options={props.options}
                        multipleChoice={props.multipleChoice} />
                </RadioGroup>
            </div>
            
        );
    }
}

function ListFiltres(props){
    let indexFiltre = 0;
    let list = [];
    for(let i = 0; i < props.filtre.length; i = i + 2){
        try{
            list.push(
                <div>
                    <div className="group-info d-flex">
                        <div className="info">
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                <FormControl component="fieldset" variant="standard">
                                    <FormLabel component="legend">
                                        <strong style={{color: "black"}}>
                                            {props.filtre[i].label}
                                        </strong>
                                    </FormLabel>
                                    <ListOptions 
                                        indexFiltre={indexFiltre} 
                                        multipleChoice={props.filtre[i].multipleChoice}
                                        handleChange={props.handleChange} 
                                        handleRadioChange={props.handleRadioChange} 
                                        options={props.filtre[i].options}
                                        nameFiltre={props.filtre[i].name}
                                        filtreValue={props.filtre[i].value} />
                                </FormControl>
                            </Box>
                        </div>
                        <div className="vr"></div>
                        <div className="info">
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                <FormControl component="fieldset" variant="standard">
                                    <FormLabel component="legend">
                                        <strong style={{color: "black"}}>
                                            {props.filtre[i + 1].label}
                                        </strong>
                                    </FormLabel>
                                    <ListOptions 
                                        indexFiltre={indexFiltre + 1}  
                                        multipleChoice={props.filtre[i + 1].multipleChoice}
                                        handleChange={props.handleChange}  
                                        handleRadioChange={props.handleRadioChange} 
                                        options={props.filtre[i + 1].options}
                                        nameFiltre={props.filtre[i + 1].name}
                                        filtreValue={props.filtre[i + 1].value} />
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <Divider />
                </div>
            );
        }catch(err){
            list.push(
                <div>
                    <div className="group-info">
                        <div className="info">
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                <FormControl component="fieldset" variant="standard">
                                    <FormLabel component="legend">
                                        <strong style={{color: "black"}}>
                                            {props.filtre[i].label}
                                        </strong>
                                    </FormLabel>
                                    <ListOptions 
                                        indexFiltre={indexFiltre} 
                                        multipleChoice={props.filtre[i].multipleChoice}
                                        handleChange={props.handleChange} 
                                        handleRadioChange={props.handleRadioChange} 
                                        options={props.filtre[i].options}
                                        nameFiltre={props.filtre[i].name}
                                        filtreValue={props.filtre[i].value} />
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <Divider />
                </div>
            );
        }
        indexFiltre = indexFiltre + 2;
    }
    return list;
}

class Filtre extends React.Component{
    
    constructor(props){
        super(props);
        this.IncrAdulte = this.IncrAdulte.bind(this);
        this.DecrAdulte = this.DecrAdulte.bind(this);
        this.IncrEnfant = this.IncrEnfant.bind(this);
        this.DecrEnfant = this.DecrEnfant.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.setListFiltre = this.setListFiltre.bind(this);
        this.filtreOpt = [
            {
                value: 0,
                backgroundColor: "white",
                textColor: "black",
                show: false,
                label: 'Afficher les filtres'
            },
            {
                value: 1,
                backgroundColor: "black",
                textColor: "white",
                show: true,
                label: 'Masquer les filtres'
            }
          
        ];
        this.state = {
            showAge: false,
            filtre: this.filtreOpt[0],
            filtres: [],
            result: [],
            nbAdulte:this.props.context.state.guests.nbAdulte,
            nbEnfant:this.props.context.state.guests.nbEnfant
        };
        this.setResult = this.setResult.bind(this);
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


    setResult(res){
        let currentState = JSON.parse(JSON.stringify(this.props.context.state));
        currentState.listTypeChambre = res.list;
        this.props.context.setState(currentState);
        console.log(this.props.context.state);
    }
    applyFilter(){
        console.log({filtres: this.state.filtres, guests: this.props.context.state.guests});
        
        if((this.props.context.state.guests.nbEnfant !== 0 || this.props.context.state.guests.nbAdulte !== 0)
            && (this.props.context.state.dateSejour.debut !== "" && this.props.context.state.dateSejour.fin !== "")){
                console.log('filtre en cours...');
                callAPI('post', '/typeChambre/', {filtres: this.state.filtres, guests: this.props.context.state.guests}, this.setResult);
        }else{
            this.props.context.handleChange("errFiltre", 'Veuillez remplir les champs Adulte, Enfant, Debut sejour et fin sejour au moins');
        }
        
    }

    handleFiltreChange(event){
        let currentState = JSON.parse(JSON.stringify(this.state));
        let i = this.state.filtre.value;
        i++;
        if(i > 1){
            i = 0;
        }
        currentState.filtre = this.filtreOpt[i];
        this.setState(currentState);
    }
    
    handleChange(event, indexFiltre, indexOption){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.filtres[indexFiltre].options[indexOption].checked = event.target.checked;
        this.setState(currentState);
    }
    handleRadioChange(event, indexFiltre, indexOption){
        let currentState = JSON.parse(JSON.stringify(this.state));
        if(event.target.value === currentState.filtres[indexFiltre].value){
            currentState.filtres[indexFiltre].value = '';
        }else{
            currentState.filtres[indexFiltre].value = event.target.value;
        }
        currentState.filtres[indexFiltre].options[indexOption].checked = 
            !currentState.filtres[indexFiltre].options[indexOption].checked;
        this.setState(currentState);
    }

    setFiltreDefaultValue(filtres, filtreName, optValue){
        for(let i = 0; i < filtres.length; i++){
            if(filtres[i].name === filtreName){
                for(let u = 0; u < filtres[i].options.length; u++){
                    if(filtres[i].options[u].value === optValue){
                        filtres[i].options[u].checked = true;
                        if(!filtres[i].multipleChoice){
                            filtres[i].value = filtres[i].options[u].value;
                        }
                        break;
                    }
                }
                break;
            }
        }
        return filtres;
    }

    setListFiltre(res){
        let currentState = JSON.parse(JSON.stringify(this.state));
        res.filters = this.setFiltreDefaultValue(res.filters, "affichage", "afficher par chambres");
        res.filters = this.setFiltreDefaultValue(res.filters, "trierpar", "Recommandé");

        currentState.filtres = res.filters;
        this.setState(currentState);
        console.log('filtres obtenus');
        console.log(res.filters);
    }

    componentDidMount(){
        callAPI('get', '/typeChambre/filter', {}, this.setListFiltre);
    }

    changeGuests(e, fieldName){
        let currentState = JSON.parse(JSON.stringify(this.props.context.state));
        currentState.fieldName = e.target.value;
        currentState.listTypeChambre = [];
        this.props.context.setState(currentState);
    }
    changeDateSejour(e, fieldName){
        let currentState = JSON.parse(JSON.stringify(this.props.context.state));
        currentState.dateSejour[fieldName] = e.target.value;
        currentState.listTypeChambre = [];
        this.props.context.setState(currentState);
    }

    render(){
        return (
            <div>
                <div></div>

                <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button {...bindToggle(popupState)} id='toggle'>
          <span></span>
          </Button>
          <div className='client'>
                <div id='client' className='PersonIcon'>
                <PersonIcon id='PersonIcon'/>
                </div>
                <div id='client' className='guests'>
                <p id='guests'>Guests</p>
                <p id='NbGuest'>{this.state.nbAdulte} Adult, {this.state.nbEnfant} children</p>
                </div>
                </div>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper id='modal1'>
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
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
                    

                    {/* <div className = "col"></div>
                    <TextField className="col"  id="standard-basic" label="Adulte" variant="standard" type="number"
                    style={{width:'20%'}} value={this.props.context.state.guests.nbAdulte} onChange={(e) => this.changeGuests(e, "nbAdulte")}/>
                    <div className = "col"></div>
                    <TextField className ="col" id="standard-basic" label="Enfant" variant="standard" type="number"
                        style={{width:'20%'}} value={this.props.context.state.guests.nbEnfant} onChange={(e) => this.changeGuests(e, "nbEnfant")}/>
                    <div className = "col"></div> */}


                { this.props.context.state.errFiltre != null 
                    ? <p style={{backgroundColor: "red"}}>{this.props.context.state.errFiltre}</p> 
                    : null }
          {/*   <div id='date'>
                    <p>Debut sejour</p>
                    <TextField id="standard-basic" label="" variant="standard" type="date"
                        style={{width:''}} value={this.props.context.state.dateSejour.debut} onChange={(e) => this.changeDateSejour(e, "debut")}/>
                    </div>
                    <div id='date'>
                    <p>Fin sejour</p>
                    <TextField id="standard-basic" label="" variant="standard" type="date"
                        style={{marginLeft:'15px'}} value={this.props.context.state.dateSejour.fin} onChange={(e) => this.changeDateSejour(e, "fin")}/>
            </div>
        */}
        { this.props.context.state.showFiltre ? 
                <div className="form-content" style = {{marginTop : "20px"}}>
                    <form>
                        <FormGroup>
                            <div class="row">
                                <div class=" col">
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="accessible" />
                                    <img src="accessible.svg" style={{width:'20%'}} ></img>
                                </div>
                                <div class="col">
                                    <FormControl fullWidth>
                                        <InputLabel>Afficher les résultats par</InputLabel>
                                        <Select size ="small">
                                            <MenuItem value="chambre">Chambre</MenuItem>
                                            <MenuItem value="superficie">Superficie</MenuItem>
                                            <MenuItem value="vue">Vue</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div class="col">
                                    <FormControl fullWidth>
                                        <InputLabel>Trier par</InputLabel>
                                        <Select size ="small">
                                            <MenuItem value="chambre">Chambre</MenuItem>
                                            <MenuItem value="superficie">Superficie</MenuItem>
                                            <MenuItem value="vue">Vue</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div class="col" style={{marginTop: '-6px'}}>
                                    <FormControl>
                                        <Button
                                            value={this.state.filtre.value} 
                                            style={{width:'180px', backgroundColor: this.state.filtre.backgroundColor, color: this.state.filtre.textColor}}
                                            onClick={(e) => this.handleFiltreChange()} >
                                            {this.state.filtre.label}
                                        </Button>
                                    </FormControl>
                                </div>
                            </div>
                            <Divider />
                            {this.state.filtre.show ? 
                                <div>
                                    <ListFiltres filtre={this.state.filtres} handleChange={this.handleChange} handleRadioChange={this.handleRadioChange} />
                                    <div className="apply">
                                        <strong>{ this.props.context.state.listTypeChambre.length }</strong> matching rooms
                                        <Button style={{marginLeft: '10px'}} onClick={(e) =>  this.applyFilter()} variant="contained">APPLY</Button>
                                    </div>
                                </div> : null}
                        </FormGroup>
                    </form>
                </div> : ""}
            </div>
        );
    }
}
export default Filtre;