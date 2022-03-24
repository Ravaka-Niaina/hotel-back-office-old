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
    const nbPers = props.typechambre.nbAdulte + props.typechambre.nbEnfant;
    const getIndicePlanTarifaire = (selectedY) => {
        let y = 1;
        const nbOccupants = props.typechambre.nbAdulte + props.typechambre.nbEnfant;
        for(let i = 0; i < props.typechambre.planTarifaire.length; i++){
            for(let u = 0; u < nbOccupants; u++){
                y++;
                if(y === selectedY){
                    return i
                }
            }
        }
    };
    const indicePlanTarifaire = getIndicePlanTarifaire(props.selectedY);

    return(
        <>
            <br/>
            {props.isPrice ?
                <RateEditor
                    nomPlanTarifaire={props.typechambre.planTarifaire[indicePlanTarifaire].nom}
                    idPlanTarifaire={props.typechambre.planTarifaire[indicePlanTarifaire]._id}
                    fromto={props.fromto}
                    value={value}
                    setValue={setValue}
                    closePopper={closePopper}
                    idTypeChambre={props.typechambre._id}
                    alldays={props.alldays}
                    getPrix={props.getPrix}
                    nbPers={nbPers}  />
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