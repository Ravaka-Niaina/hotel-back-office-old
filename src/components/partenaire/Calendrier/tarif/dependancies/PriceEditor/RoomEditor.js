import * as React from 'react';
import {useState} from 'react';
import {Button,Stack,TextField,Radio,RadioGroup,FormControl,FormControlLabel} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment';

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

const RoomEditor = ({fromto, value, setValue, alldays, selecteds, idTypeChambre, closePopper, getPrix, typechambre}) => {
    const [roomsToSell, setRoomsToSell] = useState('0');
    const [changeStatusRoom, setChangeStatusRoom] = useState(false);
    const [loading, setLoading] = React.useState(false);

    const refresh = (data) => {
        console.log(data);
        const startLoad = () => setLoading(true);
        const endLoad = () => setLoading(false);
        if(data.status === 200){
            getPrix([moment(alldays[0], "MM-DD-YYYY"), moment(alldays[alldays.length - 1], "MM-DD-YYYY")], startLoad, endLoad);
        }else{
            console.log("prix non configuré");
            setLoading(false);
        }
    };

    const saveChambresDispo = (e) => {
        console.log(alldays);
        e.preventDefault();
        setLoading(true);
        const dateDebut = getDateYYYYMMDD(alldays[selecteds[0]]);
        const dateFin = getDateYYYYMMDD(alldays[selecteds[selecteds.length - 1]]);
        const data = {
            idTypeChambre: idTypeChambre,
            dateDebut: dateDebut,
            dateFin: dateFin,
            toSell: Number.parseInt(roomsToSell),
            isTypeChambreOpen: value === "open" ? true : false,
            forTypeChambre: true,
            forTarif: false,
            modifierOuvertureChambre: changeStatusRoom,
            days: days
        };
        callAPI('post', '/TCTarif/configPrix', data, refresh);
    };

    const switchChangeStatusRoom = () => {
        setChangeStatusRoom(!changeStatusRoom);
        setValue("");
    }
    console.log("nomTypeChambre = " + typechambre.nom);
    return(
        <FormControl component="fieldset">
            <span>{typechambre.nom}</span>
            <span>{moment(fromto[0]).format('ll') + ((fromto[1] != undefined) ?  ' - ' + moment(fromto[1]).format('ll') : "")}</span>
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
                        <LoadingButton
                            color="secondary"
                            onClick={(e) => saveChambresDispo(e)}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            Save
                        </LoadingButton>
                        <Button onClick={() => closePopper()} variant="contained">
                            Close
                        </Button>
                    </Stack>
        </FormControl>
    );
};

export default RoomEditor; 