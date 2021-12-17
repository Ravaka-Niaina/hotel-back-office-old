import React, {useEffect , useState} from 'react'
import GETaPI from "../../APiGet.js";

function Promotions(props){
    let promo = props.context.map(prom => {
        return(
            <div>
                <li>  <strong>nom :</strong> {prom.nom}</li>
                <li><strong>Remise : </strong> {prom.remiseEuro}</li>
                <li style={{fontSize : "12px"}}> <strong>Sejour : </strong> {prom.dateDebutS} - {prom.dateFinS}</li>
            </div>
        )
    })
    return  promo   
}

function Promotion (props){
    const [promotion , setPromotion] = useState([]);

    function functionAppelList(data){
        console.log(data);
        setPromotion(data.promotions);
    }

    useEffect(() => {
        GETaPI("get", "/promotion" ,functionAppelList);
    }, []);

    return (
        <div>
             <Promotions context = {promotion}/>
        </div>

    );
}
export default Promotion;