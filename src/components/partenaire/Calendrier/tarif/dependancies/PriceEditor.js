import React from 'react';
import {Button,Stack,TextField,Radio,RadioGroup,FormControl,FormControlLabel} from '@mui/material';
import moment from 'moment';
import RoomEditor from './PriceEditor/RoomEditor.js';
import RateEditor from './PriceEditor/RateEditor.js';

const PriceEditor = (props) => {
    const [value, setValue] = React.useState('open');
    const closePopper = () => {
        props.closePopper(null);
    }
    return(
        <>
            <br/>
            {props.isPrice ?
                <RateEditor
                    nomPlanTarifaire={props.typechambre.planTarifaire[props.selected].nom}
                    fromto={props.fromto}
                    value={value}
                    setValue={setValue}
                    closePopper={closePopper} />
            : ""}
            {!props.isPrice && props.selected == -2  ?
                <RoomEditor
                    fromto={props.fromto}
                    value={value}
                    setValue={setValue}
                    alldays={props.alldays} 
                    selecteds={props.selecteds} 
                    idTypeChambre={props.typechambre._id}
                    closePopper={closePopper}
                    getPrix={props.getPrix}
                    typechambre={props.typechambre}
                />
            : ""}
        </>
    )
}

export default PriceEditor;