import CircularProgress from '@mui/material/CircularProgress';
import styles from './RefreshDay.module.css';

export default function RefreshDay() {
    return (
        <div className={styles.day}>
            <div>
                <CircularProgress size={30} color="inherit" />
            </div>
        </div>
    );
}