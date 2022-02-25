import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import styles from './typeChambre.module.css'; 

function Equipements(props){
    let i = -1;
      let equipements = props.equipements.map(equipement => {
          i++;
          let u = i;
          return(
            <tr>
              <td style={{width: "25px"}}>
                <FormControlLabel
                  checked={equipement.checked}
                  control={<Checkbox/>}
                  label=""
                  onChange={(e) => props.handleCheckBoxEquipement(e, u)}
                  style={{marginLeft:"20px"}}
                  key={u}
                />
              </td>
              <td>
                {React.createElement(MuiIcons[equipement.tag])}
              </td>
              <td>
                {equipement.label}
              </td>
            </tr>
            
          );
      })
      const table = <table className={styles.equipement}>
        <tbody>
          {equipements}
        </tbody>
      </table>
    return table;
}

export default function Equipement({state, setState}){

    function handleCheckBoxEquipement(e, index){
        let current = JSON.parse(JSON.stringify(state));
        current.equipements[index].checked = e.target.checked;
        setState(current);
    }

    return(
        <div style={{marginTop:'40px'}}>
            <div>
                <label className="form-label-mt4" 
                style={{textDecoration: 'underline'}} 
                id='bigLabel'>
                    Equipements
                </label>
            </div>
            <FormGroup>
            <Equipements  
                equipements={state.equipements} 
                handleCheckBoxEquipement={handleCheckBoxEquipement}
            />
            </FormGroup>
        </div>
    );
}