import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';

export default function NbJourAttribProm({state, setState, withNbDaysGetProm, setWithNbDaysGetProm, handleInputChange}){
    
    function switchWithNbDaysGetProm(){
        let tmpState = {...state};
        if(withNbDaysGetProm){
            tmpState.premierJour = "";
            tmpState.dernierJour = "";
        }else{
            tmpState.premierJour = "1";
            tmpState.dernierJour = "0";
        }
        setState(tmpState);
        setWithNbDaysGetProm(!withNbDaysGetProm);
    }
    
    return(
        <div style={{marginTop:"40px"}}>
            <h5>Nombre de jour d'attribution de la promotion</h5>
            <div>
                <div><span>Par défaut, la promotion est attribuée à tous les jours.</span></div>
                <FormControlLabel
                    checked={withNbDaysGetProm}
                    onClick={(e) => switchWithNbDaysGetProm()}
                    control={<Radio />}
                    label={<span id="litleLabel">
                    Cette promotion est-elle attribuée à des jours spécifiques du séjour?</span>}
                />
            </div>
            <div className="form-group" style={{marginTop:"25px"}}>
                <p>
                    <TextField id="outlined-basic" 
                    label="Premier jour" 
                    variant="outlined" 
                    className="form-control"  
                    style={{width:"200px"}}
                    type="number" 
                    name="premierJour" 
                    value={state.premierJour}
                    onChange={(e) => handleInputChange(e, "premierJour")}
                    size="small"
                    error={state.error.premierJour === null ? false : true}
                    helperText={state.error.premierJour === null ? null : state.error.premierJour}
                    disabled={!withNbDaysGetProm}
                    />

                    <TextField id="outlined-basic" 
                    label="Dernier jour" 
                    variant="outlined" 
                    className="form-control"  
                    style={{width:"200px",marginLeft:'20px'}}
                    type="number" 
                    name="dernierJour"
                    value={state.dernierJour}
                    onChange={(e) => handleInputChange(e, "dernierJour")}
                    size="small"
                    error={state.error.dernierJour === null ? false : true}
                    helperText={state.error.dernierJour === null ? null : state.error.dernierJour}
                    disabled={!withNbDaysGetProm}
                    />
                </p>
            </div>
        </div>
    );
}