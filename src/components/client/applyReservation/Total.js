import {ChampsImportant, line} from '../../common/commonAssets.js';
  
function Total(props){
    return(
        <div class="big_total">
            {/* <ChampsImportant label="Total à payer" value={"€ " + props.toPay} /> */}
            <p class="prix">
                Total à payer
            </p>
            <p class="prix"> {  props.toPay+ " € "}</p>
        </div>
    ); 
}

export default Total;