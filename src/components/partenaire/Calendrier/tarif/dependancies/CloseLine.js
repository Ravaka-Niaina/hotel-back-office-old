import styles from '../CalendarComponent.module.css';
import {Box} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import callAPI from '../../../../../utility';
const utility = require('../utility.js');

const LoadingButton = () => {
  return (
    <div className={styles.loadingButton}>
      <CircularProgress size={15} color="inherit" />
    </div>
  );
}

const CloseLine = (props) => {
    const { typeChambres, setTypeChambres, indice, indexStatus, } = props;
    const [isLoading, setIsLoading] = useState(false);


    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF0000',
                opened: '#64E986'
            },
        },
    })

    function callbackCloseTypeChambre(res){
        if(res.status === 200){
            props.setOpenLoad(false);
            const statusDay = typeChambres[indice].statusDays[indexStatus];
            statusDay.closed = !statusDay.closed;
            setTypeChambres([ ...typeChambres ]);
        }
        setIsLoading(false);
    }

    function closeTypeChambre(){
        setIsLoading(true);
        const data = {
            _id: props.idTypeChambre, 
            dateDebut: utility.getDate(props.statusDay.date),
            dateFin: utility.getDate(props.statusDay.date)
        };
        callAPI('post', '/typeChambre/close', data, callbackCloseTypeChambre );
    }

    return (
        <>
          <ThemeProvider
            theme={theme}
          >
              { 
                isLoading
                ? <LoadingButton />
                : <Box
                  className={styles.closedline}
                  sx={{
                  width: 59,
                  bgcolor: typeChambres[indice].statusDays[indexStatus].closed ? 'primary.main' : 'primary.opened',
                  '&:hover': {
                      opacity: [0.9, 0.8, 0.7],
                  },
                  position: 'relative',
                  }}
                  onClick={closeTypeChambre}
                >
                </Box>
              }
          </ThemeProvider>
        </>
    );
}

export default CloseLine;