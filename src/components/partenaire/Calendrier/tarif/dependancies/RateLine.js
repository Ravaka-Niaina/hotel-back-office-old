
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

const RateLine = ({
  typeChambres,
  setTypeChambres,
  typechambre,
  fromto,
  getPrix,
  openLoad,
  dateMin,
  setOpenLoad,
  value,
  setValue,
  customize,
  indice,
  daterange,
  alldays
}) => {
    return(
        <Box
            sx={{
                height: 'auto',
            }}
            className={styles.sideline}
        >
          <SideList
              typechambre={typechambre} 
              dateRange={fromto} 
              getPrix={getPrix} 
              openLoad={openLoad}
              dateMin={dateMin}
              setOpenLoad={setOpenLoad}
              value={value}
              setValue={setValue}
              customize={customize}
              getCombinaisonAdulteEnfant={getCombinaisonAdulteEnfant}
          />
            <DayLine
                typeChambres={typeChambres}
                setTypeChambres={setTypeChambres}
                typechambre={typechambre} 
                indice={indice} 
                fromto={fromto} 
                daterange={daterange}
                getPrix={getPrix}
                alldays={alldays}
                value={value}
                setOpenLoad={setOpenLoad}
                getCombinaisonAdulteEnfant={getCombinaisonAdulteEnfant} />
        </Box>
    )
}

export default RateLine;