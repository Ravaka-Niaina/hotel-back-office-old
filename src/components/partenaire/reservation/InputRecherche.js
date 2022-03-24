import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export default function InputRecherche({debut, setDebut, fin, setFin, etat, setEtat,
    errorEtat, setErrorEtat, arrayEtat, setArrayEtat, 
    searchDateOfWhich, setSearchDateOfWich, rechercher}){

    function handleChangeDateCateg(categChoice, checked){
        let tmp = {...searchDateOfWhich};
        let keys = Object.keys(tmp);
        for(let i = 0; i < keys.length; i++){
            tmp[keys[i]] = false;
        }
        tmp[categChoice] = checked;
        setSearchDateOfWich(tmp);
    }

    return(
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField 
                        id="outlined-size-small"
                        size="small" label ="Date début"
                        name="Search"
                        type="date"
                        value={debut}
                        onChange={(e) => setDebut(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        id="outlined-size-small"
                        size="small" label ="Date fin"
                        name="Search"
                        type="date"
                        value={fin}
                        onChange={(e) => setFin(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </div>
            </Box>

            <div style={{marginLeft: "10px"}}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Valeur à rechercher</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel checked={searchDateOfWhich.checkIn} onChange={(e) => handleChangeDateCateg("checkIn", e.target.checked)} control={<Checkbox/>} label="Date d'arrivée" />
                        <FormControlLabel checked={searchDateOfWhich.checkOut} onChange={(e) => handleChangeDateCateg("checkOut", e.target.checked)} control={<Checkbox/>} label="Date de départ" />
                        <FormControlLabel checked={searchDateOfWhich.reservation} onChange={(e) => handleChangeDateCateg("reservation", e.target.checked)} control={<Checkbox/>} label="Date de réservation" />
                    </RadioGroup>
                </FormControl>
            </div>
                

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="standard-select-currency-native"
                    select
                    label="Statut"
                    value={etat}
                    onChange={(e) => setEtat(e.target.value)}
                    SelectProps={{
                        native: true,
                    }}
                    error={errorEtat === null ? false : true}
                    helperText={errorEtat === null ? null : errorEtat}
                >
                    {arrayEtat.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </Box>
            <Box>
                <Button variant="contained" onClick={(e) => rechercher()}>
                        Rechercher
                </Button>
            </Box>

        </>
    );
}