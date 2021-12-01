import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';

import FormControlLabel from '@mui/material/FormControlLabel';

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
                label={day.label}
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
                label={chambre.nom}
                style={{marginLeft:"20px"}}
            />
        );
    })
    return list;
}
    
export function PolitiqueAnnulAtrb(props){
    let i = -1;
    let list = props.politiqueAnnulAtrb.map(politique => {
        i++;
        let u = i;
        return(
            <FormControlLabel 
                checked={politique.checked}
                control={<Checkbox/>}
                onChange={(e) => props.handleCheckBoxChange(props.planTarifaire, props.setPlanTarifaire, e, "politiqueAnnulAtrb", u, "checked")}
                label={politique.nom}
                style={{marginLeft:"20px"}}
            />
        );
    })
    return list;
}

export function getPlan(planTarifaire, isLeadHour, lead){
    let current = JSON.parse(JSON.stringify(planTarifaire));
    current.lead = {isLeadHour: isLeadHour, valeur: lead};
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

export function handleInputChange1(planTarifaire, setPlanTarifaire, e, name){
    let current = JSON.parse(JSON.stringify(planTarifaire));
    current[name] = e.target.value;
    setPlanTarifaire(current); 
}

export function handleInputChange2(planTarifaire, setPlanTarifaire, e, name1, name2){
    console.log(e.target.value);
    let current = JSON.parse(JSON.stringify(planTarifaire));
    current[name1][name2] = e.target.value;
    setPlanTarifaire(current); 
}
    
export function handleInputChange3(planTarifaire, setPlanTarifaire, e, name1, name2, name3){
    let current = JSON.parse(JSON.stringify(planTarifaire));
    current[name1][name2][name3] = e.target.value;
    setPlanTarifaire(current); 
}
    
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

