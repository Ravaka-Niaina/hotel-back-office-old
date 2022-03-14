import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import "../../../promotion/promotion.css";

const utility = require('../utility.js');

export default function InsertTarifLead({planTarifaire, setPlanTarifaire, leadMinInfini
    , setLeadMinInfini, isLeadMinDisabled, setIsLeadMinDisabled,
    error, setError}){

    function switchInfini(){
        setLeadMinInfini(!leadMinInfini);
        setIsLeadMinDisabled(!isLeadMinDisabled);
        let current = {...planTarifaire};
        current.lead.min = "";
        current.lead.max = 0;
        if(leadMinInfini){
            current.lead.max = "";
        }
        setPlanTarifaire(current);
    }

    return(
        <div style={{marginTop:'0px'}}>
            <div>
                <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px',marginLeft:'0px'}} >
                    Lead { planTarifaire.isLeadHour ? "hour" : "day"} 
                </label>
            </div>
            <div>
                <FormControlLabel
                    checked={leadMinInfini}
                    onClick={(e) => switchInfini()}
                    control={<Radio />}
                    label={<span id="litleLabel">Pas de fin</span>}
                />
            </div>
            <RadioGroup
                aria-label="Lead"
                defaultValue="hour"
                name="radio-buttons-group"
            >
                <div className="adjacentInputLabel fixAdjacentInputLabel">
                    <div className="col">
                        <TextField 
                        id="outlined-basic"
                        variant="outlined"
                        label=""
                        value={planTarifaire.lead.min}
                        placeholder={isLeadMinDisabled ? "99999" : undefined}
                        type="number"
                        size="small"
                        onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "lead", "min")}
                        error={error.leadMin === null ? false : true}
                        helperText={error.leadMin === null ? null : error.leadMin}
                        disabled={isLeadMinDisabled}
                        InputLabelProps={{shrink: false}}
                        />
                    </div>
                    <div className="col">
                        <span >lead minimum</span>
                    </div>
                </div>

                <div className="adjacentInputLabel fixAdjacentInputLabel">
                    <div className="col">
                        <TextField 
                        id="outlined-basic"
                        variant="outlined"
                        label=""
                        value={planTarifaire.lead.max}
                        placeholder={isLeadMinDisabled ? "0" : undefined}
                        type="number"
                        size="small"
                        onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "lead", "max")}
                        error={error.leadMax === null ? false : true}
                        helperText={error.leadMax === null ? null : error.leadMax}
                        disabled={isLeadMinDisabled}
                        InputLabelProps={{shrink: false}}
                        />
                    </div>
                    <div className="col">
                        <span >lead maximum avant l’arrivée</span>
                    </div>
                </div>

                <div className ="col">
                    <FormControlLabel 
                    value="hour" 
                    onClick={(e) => utility.handleIsLeadHourChange(planTarifaire, setPlanTarifaire, true)} 
                    control={<Radio />} 
                    label={
                    <span id='litleLabel'>
                    Hour
                    </span>} />
                </div>
                <div className ="col">
                    <FormControlLabel  
                    value="day" 
                    onClick={(e) => utility.handleIsLeadHourChange(planTarifaire, setPlanTarifaire, false)} 
                    control={<Radio />} 
                    label={
                        <span id='litleLabel'>
                        Day
                        </span>} /> 
                </div>
            </RadioGroup>
        </div>
    );
}