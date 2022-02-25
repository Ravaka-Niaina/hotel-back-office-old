import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const utility = require('../utility.js');

export default function InsertTarifDateReservation({reservAToutMoment, setReservAToutMoment, error, setError,
    areDateReservDisabled, setAreDateReservDisabled, planTarifaire, setPlanTarifaire}){

    function switchReservAToutMoment(){
        let errorTmp = {...error};
        errorTmp.dateReservationDebut = null;
        errorTmp.dateReservationFin = null;
        setError(errorTmp);
    
        setReservAToutMoment(!reservAToutMoment);
        setAreDateReservDisabled(!areDateReservDisabled);

        let tarifTmp = {...planTarifaire};
        if(reservAToutMoment){
            tarifTmp.dateReservation = {debut: "", fin: ""};
        }else{
            tarifTmp.dateReservation = {debut: tarifTmp.dateSejour.debut, fin: tarifTmp.dateSejour.fin};
        }
        setPlanTarifaire(tarifTmp);
    }

    return(
        <div style={{marginTop:'60px'}}>
            <div>
                <label className="" style={{textDecoration: 'underline'}} id='bigLabel'>Date de réservation </label> 
            </div>
            <div>
                <label>Quand les clients peuvent-ils réserver chez vous pour bénéficier de ce tarif?</label>
            </div>
            <div className="form-group" style={{ marginTop: '25px' }}>
                <p><FormControlLabel
                    checked={reservAToutMoment}
                    onClick={(e) => switchReservAToutMoment()}
                    control={<Radio />}
                    label={<span id="litleLabel">A tout moment</span>}
                /></p>
                <p><FormControlLabel
                    checked={!reservAToutMoment}
                    onClick={(e) => switchReservAToutMoment()}
                    control={<Radio />}
                    label={<span id="litleLabel">Sélectionner une période</span>}
                /></p>
            </div>
            <div className="row" style={{marginTop:'20px'}}>
                <div className="col">
                    <TextField
                    label="Du"
                    type='date'
                    InputLabelProps={{
                        shrink: true,
                        }}
                    size='small'
                    value={planTarifaire.dateReservation.debut}
                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "dateReservation", "debut")}
                    error={error.dateReservationDebut === null ? false : true}
                    helperText={error.dateReservationDebut === null ? null : error.dateReservationDebut}
                    disabled={areDateReservDisabled}
                    />

                </div>
                <div className="col">
                    <TextField
                    label="Au"
                    type='date'
                    InputLabelProps={{
                        shrink: true,
                        }}
                    size='small'
                    value={planTarifaire.dateReservation.fin}
                    onChange={(e) => utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "dateReservation", "fin")}
                    error={error.dateReservationFin === null ? false : true}
                    helperText={error.dateReservationFin === null ? null : error.dateReservationFin}
                    disabled={areDateReservDisabled}
                    /> 

                </div>
            </div>
        </div>
    );
}