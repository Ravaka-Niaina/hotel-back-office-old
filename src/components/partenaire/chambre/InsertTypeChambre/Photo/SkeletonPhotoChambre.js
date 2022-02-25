import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import {Stack, Box , Paper} from '@mui/material';

import styles from "./SkeletonPhotoChambre.module.css";

export default function SkeletonPhotoChambre ({nbImage, setNbImage}) {
    let tmpNbImage = nbImage > 1 ? nbImage : 1;
    let skeletons = [];
    for(let i = 0; i < tmpNbImage; i++){
        skeletons.push(
            <div>
                <Skeleton variant="rectangular" sx={{ width: "300px", height: "200px", margin: "2px 2px", display: "inline-block" }} style={{margin :"0 auto"}}/>
            </div>
        )
    }
    return (
        <div className={styles.photo}>
            {skeletons}
        </div>
    );
}