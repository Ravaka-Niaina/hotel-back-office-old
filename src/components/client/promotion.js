import React, {useEffect , useState} from 'react'
import GETaPI from "../../APiGet.js";

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function Promotions(props){
    let promo = "Aucun promotion pour le moment";
    if(props.context != null && props.context != null){
        promo = props.context.map(prom => {
            return(
                <div>
                    <li>  <strong>nom :</strong> {prom.nom}</li>
                    <li><strong>Remise : </strong> {prom.remiseEuro}</li>
                    <li style={{fontSize : "12px"}}> <strong>Sejour : </strong> {prom.dateDebutS} - {prom.dateFinS}</li>
                </div>
            )
        })
    }
    
    return  promo   
}

function Promotion (props){
    const [promotion , setPromotion] = useState([]);
    const [isPromReceived, setIsPromReceived] = useState(false);
    function functionAppelList(data){
        console.log(data);
        setPromotion(data.promotions);
        setIsPromReceived(true);
    }

    useEffect(() => {
        GETaPI("get", "/promotion" ,functionAppelList);
    }, []);

    return (
        <div>
            {isPromReceived ? 
                <Promotions context = {promotion}/> :
                <Stack spacing={1}>
                    <Skeleton variant="rectangular" width={300} height={118} />
                </Stack>
            }
        </div>

    );
}
export default Promotion;