import React  from "react";
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

//import callAPI from '../../utility';

import './filtre.css';

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
            filtre: this.filtreOpt[0],
            filtres: []
        };
        
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
        if(event.target.value == currentState.filtres[indexFiltre].value){
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
            if(filtres[i].name == filtreName){
                for(let u = 0; u < filtres[i].options.length; u++){
                    if(filtres[i].options[u].value == optValue){
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
        console.log('current state of things');
        console.log(res.filters);
    }

    componentDidMount(){
       // callAPI('get', '/typeChambre/filter', {}, this.setListFiltre);
    }

    render(){
        return (
            <div>
                <div className="form-content">
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
                                        <Select>
                                            <MenuItem value="chambre">Chambre</MenuItem>
                                            <MenuItem value="superficie">Superficie</MenuItem>
                                            <MenuItem value="vue">Vue</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div class="col">
                                    <FormControl fullWidth>
                                        <InputLabel>Trier par</InputLabel>
                                        <Select>
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
                                        <strong>32</strong> matching rooms
                                        <Button style={{marginLeft: '10px'}} onClick={(e) =>  console.log(e)} variant="contained">APPLY</Button>
                                    </div>
                                </div> : null}
                        </FormGroup>
                    </form>
                </div>
            </div>    
        );
    }
}
export default Filtre;