import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

const NotEnoughAccessRight = () => {
    let history = useHistory();
    function redirection(){
        history.push("/back");
    }
    return(
        <>
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Desole il y a eu une erreur <strong>Vous n'avez pas acces a cette page</strong>
            </Alert>
            <Button size="medium" onClick={() => redirection()}>Retour a l'accueil</Button>
        </Stack>
        </>
    );
};
export default NotEnoughAccessRight;