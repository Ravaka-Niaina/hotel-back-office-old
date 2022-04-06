import React, {useEffect , useState} from 'react'
import GETaPI from "../../../../APiGet.js";
import styles from '../Book.module.css';
import {Avatar, CardHeader, Card} from '@mui/material';
import {Visibility} from '@mui/icons-material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getDate } from '../../../../utility/utilityDate.js';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 850,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    },
}));
function Promotions(props){
    let promo = "Aucun promotion pour le moment";
    
    if(props.tab != null){
        promo = props.tab.map(prom => {
            console.log(prom)
            return(
                <HtmlTooltip  title={prom.nom} placement="right-start">
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
                </HtmlTooltip>
                
            )
        })
    }
    
    return  promo   
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