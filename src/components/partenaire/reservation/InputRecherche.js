import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function InputRecherche({debut, setDebut, fin, setFin, etat, setEtat,
    errorEtat, setErrorEtat, arrayEtat, setArrayEtat}){
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
                        type="text"
                        value={debut}
                        onChange={(e) => setDebut(e.target.value)}
                    />
                    <TextField
                        id="outlined-size-small"
                        size="small" label ="Date fin"
                        name="Search"
                        type="text"
                        value={fin}
                        onChange={(e) => setFin(e.target.value)}
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
                        <FormControlLabel value="female" control={<Radio />} label="Date d'arrivée" />
                        <FormControlLabel value="male" control={<Radio />} label="Date de départ" />
                        <FormControlLabel value="other" control={<Radio />} label="Date de réservation" />
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
                    label="Etat de la réservation"
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

        </>
    );
}