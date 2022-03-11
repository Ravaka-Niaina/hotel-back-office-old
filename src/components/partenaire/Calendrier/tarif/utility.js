import { Checkbox } from "@mui/material";

import FormControlLabel from '@mui/material/FormControlLabel';
import {Radio,RadioGroup} from '@mui/material';

import './insertTarif.css';

export function mirrorDateReservationFin(planTarifaire, setPlanTarifaire, value, error, setError){
    if(planTarifaire.isDateReservAuto){
        let copy = {...planTarifaire};
        copy.dateReservation.fin = value;
        setPlanTarifaire(copy);

        
    }
}

export function DateReservAuto(props){
    return(
        <FormControlLabel
            checked={props.planTarifaire.isDateReservAuto}
            control={<Checkbox/>}
            onChange={(e) => {
                let copy = {...props.planTarifaire};
                copy.isDateReservAuto = !copy.isDateReservAuto;
                copy.dateReservation.fin = copy.dateSejour.fin;
                props.setPlanTarifaire(copy);
            }}
            label="A partir d'aujourd'hui"
        />
    );
};

export function LeadDay(props){
    let i = -1;
    let list = props.days.map(day => {
        i++;
        let u = i;
        console.log(day.checked);
        return(
            <FormControlLabel 
                checked={day.checked}
                control={<Checkbox/>}
                onChange={(e) => props.handleCheckBoxChange(props.planTarifaire, props.setPlanTarifaire, e, "LeadDay", u, "checked")}
                label={<span id='litleLabel'>
                {day.label}
                      </span>}
                style={{marginLeft:"20px"}}
            />
        );
    })
    return list;
}
    
export function ChambresAtrb(props){
    let i = -1;
    let list = props.chambresAtrb.map(chambre => {
        i++;
        let u = i;
        return(
            <FormControlLabel
                checked={chambre.checked}
                control={<Checkbox/>}
                onChange={(e) => props.handleCheckBoxChange(props.planTarifaire, props.setPlanTarifaire, e, "chambresAtrb", u, "checked")}
                label={<span id='litleLabel'>
                {chambre.nom}
                      </span>}
                style={{marginLeft:"20px"}}
            />
        );
    })
    return list;
}

function changePolitiqueChecked(planTarifaire, setPlanTarifaire, u){
    let copy = {...planTarifaire};
    for(let i = 0; i < copy.politiqueAnnulAtrb.length; i++){
        copy.politiqueAnnulAtrb[i].checked = false;
    }
    copy.politiqueAnnulAtrb[u].checked = true;
    setPlanTarifaire(copy);
}
    
export function PolitiqueAnnulAtrb(props){
    let i = -1;
    let list = props.politiqueAnnulAtrb.map(politique => {
        i++;
        let u = i;
        return(
            
                <FormControlLabel 
                    checked={politique.checked}
                    control={<Radio />}
                    onChange={(e) => changePolitiqueChecked(props.planTarifaire, props.setPlanTarifaire,u)}
                    label={<span id='litleLabel'>
                    {politique.nom}
                        </span>}
                    style={{marginLeft:"20px"}}
                />
        );
    })
    let radios = <RadioGroup
        aria-label="gender" 
        name="politiqueAnnulAtrb">
            {list}
    </RadioGroup>
    return radios;
}

export function getPlan(planTarifaire){
    let current = JSON.parse(JSON.stringify(planTarifaire));
    let listChambres = [];
    for(let i = 0; i < current.chambresAtrb.length; i++){
        if(current.chambresAtrb[i].checked){
            listChambres.push(current.chambresAtrb[i]._id);
        }
    }
    current.chambresAtrb = listChambres;

    let listPolitiques = [];
    for(let i = 0; i < current.politiqueAnnulAtrb.length; i++){
        if(current.politiqueAnnulAtrb[i].checked){
            listPolitiques.push(current.politiqueAnnulAtrb[i]._id);
        }
    }
    current.politiqueAnnulAtrb = listPolitiques;

    return current;
}

export function handleIsLeadHourChange(planTarifaire, setPlanTarifaire, value){
    let temp = {...planTarifaire};
    temp.isLeadHour = value;
    setPlanTarifaire(temp);
}

export function handleInputChange1(planTarifaire, setPlanTarifaire, error, setError, e, name){
    let current = JSON.parse(JSON.stringify(planTarifaire));
    current[name] = e.target.value;
    setPlanTarifaire(current); 

    let tempErr = {...error};
    tempErr[name] = null;
    setError(tempErr);
}

function toUpperCase0(string){
    string = string.split("");
    string[0] = string[0].toUpperCase();
    let newString = "";
    string.map((s) => {
        newString = newString + s;
    });
    return newString;
}

export function handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, name1, name2, isDateSejourFin){
    let current = JSON.parse(JSON.stringify(planTarifaire));
    current[name1][name2] = e.target.value;

    let tempErr = {...error};
    tempErr[name1 + toUpperCase0(name2)] = null;

    if(isDateSejourFin && current.isDateReservAuto){
        current.dateReservation.fin = e.target.value;
        tempErr.dateReservationFin = null;
    }

    setPlanTarifaire(current); 
    setError(tempErr);
}
    
export function handleInputChange3(planTarifaire, setPlanTarifaire, e, name1, name2, name3){
    let current = JSON.parse(JSON.stringify(planTarifaire));
    current[name1][name2][name3] = e.target.value;
    setPlanTarifaire(current); 
}
    //(props.planTarifaire, props.setPlanTarifaire, e, "chambresAtrb", u, "checked")
export function handleCheckBoxChange(planTarifaire, setPlanTarifaire, e, name1, name2, name3){
    let current = JSON.parse(JSON.stringify(planTarifaire));
    current[name1][name2][name3] = e.target.checked;
    setPlanTarifaire(current);
    console.log(planTarifaire);
}

function getNDigits(number, digit){
    digit = digit + '';
    const remain = number - digit.length;
    for(let i = 0; i < remain; i++){
        digit = "0" + digit;
    }
    return digit;
}

export function getDate(date){
    date = new Date(date);
    let year = date.getFullYear();
    let month = getNDigits(2, date.getMonth() + 1);
    let day = getNDigits(2, date.getDate());
    date = year + '-' + month + '-' + day;
    return date;
}