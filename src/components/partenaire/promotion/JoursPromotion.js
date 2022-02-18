import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from "@mui/material";

export default function JoursPromotion({state, handleInputChange3, setAllDays}){
    const dayNames = Object.keys(state.weekDays);
    let inputDays = [];
    const labelDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    let tmpAllDays = true;
    for(let i = 0; i < labelDays.length; i++){
        inputDays.push(
            <FormControlLabel
                control={<Checkbox />}
                type="number"
                label={<p id="label">{labelDays[i]}</p>}
                checked={state.weekDays[dayNames[i]] === 1 ? true : false}
                name={dayNames[i]}
                onChange={(e) => handleInputChange3(e, 'weekDays', dayNames[i], true)}
            />
        );
    }

    return inputDays;
};