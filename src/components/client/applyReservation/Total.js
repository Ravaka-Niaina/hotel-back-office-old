import {ChampsImportant, line} from '../../common/commonAssets.js';
  
function Total(props){
    return(
        <div class="big_total">
            {/* <ChampsImportant label="Total à payer" value={"€ " + props.toPay} /> */}
            <p class="prix">
                Total à payer
            </p>
            {/* FIX ME: toPay est undefined, ne peut appelet toFixed sur undefined */}
            <p class="prix"> {  props.toPay ? props.toPay.toFixed(2) : props.toPay+ "  " + props.devise}</p>
        </div>
    ); 
}

export default Total;