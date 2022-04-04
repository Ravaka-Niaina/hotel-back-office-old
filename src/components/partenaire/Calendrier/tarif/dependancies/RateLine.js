
import {Box} from '@mui/material';
import styles from '../CalendarComponent.module.css';
import DayLine from './DayLine.js';
import SideList from './SideList.js'

function getCombinaisonAdulteEnfant(nbAdulte, nbEnfant){
    let combinaisons = [];
    for(let i  = 0; i < nbAdulte; i++){
        for(let u = 0; u < nbEnfant + 1; u++){
            combinaisons.push({adultes: i + 1, enfants: u});
        }
    }
    return combinaisons;
}

const RateLine = (props) => {
    return(
        <Box
            sx={{
                height: 'auto',
            }}
            className={styles.sideline}
        >
            <SideList 
                typechambre={props.typechambre} 
                dateRange={props.fromto} 
                getPrix={props.getPrix} 
                openLoad={props.openLoad}
                dateMin={props.dateMin}
                setOpenLoad={props.setOpenLoad}
                value={props.value}
                setValue={props.setValue}
                customize={props.customize}
                getCombinaisonAdulteEnfant={getCombinaisonAdulteEnfant} />
            <DayLine 
                typechambre={props.typechambre} 
                indice={props.indice} 
                fromto={props.fromto} 
                daterange={props.daterange}
                getPrix={props.getPrix}
                alldays={props.alldays}
                value={props.value}
                setOpenLoad={props.setOpenLoad}
                getCombinaisonAdulteEnfant={getCombinaisonAdulteEnfant} />
        </Box>
    )
}

export default RateLine;