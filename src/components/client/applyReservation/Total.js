import {ChampsImportant, line} from '../../../common/commonAssets.js';
  
function Total(props){
    return(
        <div style={line}>
            <ChampsImportant label="Total à payer" value={"€ " + props.toPay} />
        </div>
    ); 
}

export default Total;