import React, {useEffect , useState} from 'react'
import GETaPI from "../../../../APiGet.js";
import styles from '../Book.module.css';
import {Avatar, CardHeader, Card} from '@mui/material';
import {Visibility} from '@mui/icons-material';

import { getDate } from '../../../../utility/utilityDate.js';

function Promotions(props){
    let promo = "Aucun promotion pour le moment";
    if(props.tab != null){
        promo = props.tab.map(prom => {
            return(
                <Card className={styles.promotion}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="promotion">
                        {"-" + prom.remise + (prom.isRemiseEuro ? " EUR" : "%")}
                    </Avatar>
                    }
                    title={prom.nom}
                    subheader={getDate(prom.dateDebutS) + " - " + getDate(prom.dateFinS)}
                />
                </Card>
            )
        })
    }
    
    return  promo;
}

function Promotion (props){
    const [promotion , setPromotion] = useState([]);

    function functionAppelList(data){
        setPromotion(data.promotions);
    }

    useEffect(() => {
        GETaPI("get", "/promotion" ,functionAppelList);
    }, []);

    return (
        <div>
             <Promotions tab = {promotion}/>
        </div>

    );
}
export default Promotion;