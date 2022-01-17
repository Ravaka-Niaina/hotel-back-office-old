import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {Paper} from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './skeletonTarifDispo.module.css';

const prix = {width: 475, height: 50};
const heightText = 30;

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const SkeletonTarifDispo = () => {
    return(
        <div className={styles.item}>
            <Item>
                <Stack spacing={1} className={styles.squeletonTarifDispo}>
                    <div className="row">
                        <div className="col">
                            <Skeleton variant="rectangular" width={320} height={160} />
                        </div>
                        <div className="col">
                            <Skeleton variant="text" height={40} />
                            <Skeleton variant="text" height={heightText} />
                            <Skeleton variant="text" height={heightText} />
                            <div></div>
                            <Skeleton variant="rectangle" width={150} height={30} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Skeleton variant="rectangle" width={prix.width} height={prix.height} />
                            <div></div>
                            <Skeleton variant="rectangle" width={prix.width} height={prix.height} />
                        </div>
                        <div className="col">
                            <Skeleton variant="rectangle" className={styles.bookNow} width={95} height={38} />
                        </div>
                    </div>
                </Stack>
            </Item>
        </div>
    );
};

export default SkeletonTarifDispo;