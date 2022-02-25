import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

export default function InsertTarifDateSejour({planTarifaire, setPlanTarifaire, error, setError, 
    aucunFinDateSejour, setAucunFinDateSejour, reservAToutMoment}){

    function switchAucunFinDateSejour(){
        let tmp = {...planTarifaire};
        tmp.dateSejour.fin = "";
        if(reservAToutMoment){
            tmp.dateReservation.fin = "";
        }
        setPlanTarifaire(tmp);
        setAucunFinDateSejour(!aucunFinDateSejour);
    }

    function handleChangeDateSejour(newValue, borne){
        let tmpPlanTarifaire = {...planTarifaire};
        tmpPlanTarifaire.dateSejour[borne] = newValue;
        if(reservAToutMoment){
            tmpPlanTarifaire.dateReservation[borne] = newValue;
        }
        setPlanTarifaire(tmpPlanTarifaire);

        let tmpError = {...error};
        tmpError[borne === "debut" ? "dateSejourDebut": "dateSejourFin"] = null;
        setError(tmpError);
    }

    return(
        <div style={{marginTop:'10px'}}>
            <div>
                <label className="" style={{textDecoration: 'underline',marginLeft:'0px'}} id='bigLabel'>Date de séjour</label> 
            </div>
            <div>
                <label>Quand les clients peuvent-ils séjourner chez vous pour bénéficier de ce tarif ?</label>
            </div>
            <div>
                <label>Sélectionner une période</label>
            </div>
            <div className="row" style={{marginTop:'15px'}}>
                <div className="col">
                    <TextField
                    label="Du"
                    type='date'
                    InputLabelProps={{
                        shrink: true,
                        }}
                    size='small'
                    value={planTarifaire.dateSejour.debut}
                    onChange={(e) => handleChangeDateSejour(e.target.value, "debut") /*utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "dateSejour", "debut")*/}
                    error={error.dateSejourDebut === null ? false : true}
                    helperText={error.dateSejourDebut === null ? null : error.dateSejourDebut}
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
                    value={planTarifaire.dateSejour.fin}
                    onChange={(e) => { 
                        handleChangeDateSejour(e.target.value, "fin") 
                        /*utility.handleInputChange2(planTarifaire, setPlanTarifaire, error, setError, e, "dateSejour", "fin", true)*/}}
                    error={error.dateSejourFin === null ? false : true}
                    helperText={error.dateSejourFin === null ? null : error.dateSejourFin}
                    disabled={aucunFinDateSejour}
                    /> 
                </div>
            </div>
            <div>
                <FormControlLabel
                    checked={aucunFinDateSejour}
                    onClick={(e) => switchAucunFinDateSejour()}
                    control={<Radio />}
                    label={<span id="litleLabel">Pas de fin</span>}
                />
            </div>
        </div>
    );
}