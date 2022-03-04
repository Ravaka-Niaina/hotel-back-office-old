import {useState} from 'react';
import {Button,Stack,TextField,Radio,RadioGroup,FormControl,FormControlLabel} from '@mui/material';
import callAPI from '../../../../../../utility';

const days = [
    {
        "value": 1,
        "checked": true,
        "label": "Mon"
    },
    {
        "value": 2,
        "checked": true,
        "label": "Tue"
    },
    {
        "value": 3,
        "checked": true,
        "label": "Wed"
    },
    {
        "value": 4,
        "checked": true,
        "label": "Thu"
    },
    {
        "value": 5,
        "checked": true,
        "label": "Fri"
    },
    {
        "value": 6,
        "checked": true,
        "label": "Sat"
    },
    {
        "value": 7,
        "checked": true,
        "label": "Sun"
    }
];

const getDateYYYYMMDD = (dateString) => {
    let tmp = dateString.split("/");
    return tmp[2] + "-" + tmp[0] + "-" + tmp[1];
};

const RoomEditor = ({value, setValue, alldays, selecteds, idTypeChambre, closePopper}) => {
    const [roomsToSell, setRoomsToSell] = useState('0');
    const [changeStatusRoom, setChangeStatusRoom] = useState(false);

    const refresh = (data) => {
        console.log(data);
    };

    const saveChambresDispo = (e) => {
        e.preventDefault();
        const dateDebut = getDateYYYYMMDD(alldays[selecteds[0]]);
        const dateFin = getDateYYYYMMDD(alldays[selecteds[selecteds.length - 1]]);
        const data = {
            idTypeChambre: idTypeChambre,
            dateDebut: dateDebut,
            dateFin: dateFin,
            toSell: roomsToSell,
            isTypeChambreOpen: value === "open" ? true : false,
            forTypeChambre: true,
            forTarif: false,
            modifierOuvertureChambre: changeStatusRoom,
            days: days
        };
        console.log(data);
        callAPI('post', '/TCTarif/configPrix', data, refresh);
    };

    const switchChangeStatusRoom = () => {
        setChangeStatusRoom(!changeStatusRoom);
        setValue("");
    }

    return(
        <FormControl component="fieldset">
            <FormControlLabel
                checked={changeStatusRoom}
                control={<Radio />} label="Modifier ouverture de la chambre"
                onClick={() => switchChangeStatusRoom()}
            />
            <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                row
            >
                <FormControlLabel value="open" control={<Radio />} label="Open" disabled={!changeStatusRoom} />
                <FormControlLabel value="close" control={<Radio />} label="Close" disabled={!changeStatusRoom} />
            </RadioGroup>
            <br/>
            <TextField
                size="small"
                id="outlined-number"
                label="Rooms to sell"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={roomsToSell}
                onChange={(e) => setRoomsToSell(e.target.value.trim())}
            />
            <br/>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={(e) => saveChambresDispo(e)}>
                    Save
                </Button>
                <Button onClick={() => closePopper()} variant="contained">
                    Close
                </Button>
            </Stack>
        </FormControl>
    );
};

export default RoomEditor; 