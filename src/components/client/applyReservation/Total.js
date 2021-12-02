import {ChampsImportant, line} from './commonAssets.js';
  
function Total(props){
    return(
        <div style={line}>
            <ChampsImportant label="Prix total" value="€ 200" />
        </div>
    ); 
}

export default Total;