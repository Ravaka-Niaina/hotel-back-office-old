import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styles from './skeletonFacture.module.css';

const height = 30;
const SqueletonFacture = () => {
    const itineraire = <Stack>
        <Skeleton variant="rectangular" width={120} height={35} className={styles.title} />
        <Skeleton variant="text" height={height}/>
        <Skeleton variant="text" height={height}/>
        <Skeleton variant="text" height={height}/>
    </Stack>
    return(
        <div>
            {itineraire}
            <br/>
            {itineraire}
            <br/>
            <Stack>
                <Skeleton variant="rectangular" width={200} height={30} className={styles.title} />
            </Stack>
        </div>
    );
}

export default SqueletonFacture;