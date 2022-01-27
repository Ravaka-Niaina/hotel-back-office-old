import React from "react";

import {Stack, FormGroup, FormControl, FormControlLabel, Box, Checkbox, FormLabel, Divider, Radio, RadioGroup, Button, Backdrop, Modal, Fade} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import callAPI from '../../../../utility';
import styles from '../Book.module.css';



function ListOptCheckBox(props){
    let list = null;
    let u = -1;
    list = props.options.map(option => {
        u++;
        let indexOption = u;
        return(
            <FormControlLabel
                style={{padding: 0}}
                label={<span id='litleLabel'>{option.value}</span>}
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
                label={<span id='litleLabel'>{option.value}</span>}
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
            closePopper: true,
            showAge: false,
            filtre: this.filtreOpt[0],
            filtres: [],
            result: [],
            nbAdulte:this.props.context.state.guests.nbAdulte,
            nbEnfant:this.props.context.state.guests.nbEnfant
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

    changeOpenCalendar(){
        let temp = {...this.state};
        temp.openCalendar = !temp.openCalendar;
        this.setState(temp);
    }

    render(){
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={this.props.context.state.showFiltre}
                onClose={(e) => this.props.context.changeOpenFiltre()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
                className={styles.filterModal}
            >
                <Fade in={this.props.context.state.showFiltre}>
                    <Box>
                        { this.props.context.state.errFiltre != null ? <p style={{backgroundColor: "red"}}>{this.props.context.state.errFiltre}</p> : null }
                        <div className="form-content" style = {{ backgroundColor: "white", width: "700px"}}>
                            <form>
                                <FormGroup>
                                    <div class="row">
                                        <ListFiltres filtre={this.state.filtres} handleChange={this.handleChange} handleRadioChange={this.handleRadioChange} />
                                    </div>
                                    <Stack direction="row" spacing={2}>
                                        <LoadingButton
                                            onClick={(e) => this.props.applyFilter(this.state.filtres)}
                                            loading={this.props.loadingFilter}
                                            variant="contained"
                                        >
                                            Apply
                                        </LoadingButton>
                                        <Button size="small" variant="contained" onClick={(e) => this.props.context.changeOpenFiltre()}>
                                            Close
                                        </Button>
                                    </Stack>
                                </FormGroup>
                            </form>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        );
    }
}
export default Filtre;