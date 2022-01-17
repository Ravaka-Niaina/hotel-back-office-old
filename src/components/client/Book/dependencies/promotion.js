import React, {useEffect , useState} from 'react'
import GETaPI from "../../../../APiGet.js";
import styles from '../Book.module.css';
import {Avatar, CardHeader, Card} from '@mui/material';
import {Visibility} from '@mui/icons-material';

function Promotions(props){
    let promo = "Aucun promotion pour le moment";
    if(props.context != null && props.context != null){
        promo = props.context.map(prom => {
            return(
                // <div>
                //     <li>  <strong>nom :</strong> {prom.nom}</li>
                //     <li><strong>Remise : </strong> {prom.remiseEuro}</li>
                //     <li style={{fontSize : "12px"}}> <strong>Sejour : </strong> {prom.dateDebutS} - {prom.dateFinS}</li>
                // </div>

                <Card className={styles.promotion}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="promotion">
                        -50% {/* {prom.remiseEuro} */}
                    </Avatar>
                    }
                    title={prom.nom}
                    subheader={prom.dateDebutS + " - " + prom.dateFinS}
                />
                </Card>
            )
        })
    }
    
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