import {Box} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from '../CalendarComponent.module.css';

const theme = createTheme({
  palette: {
      primary: {
          main: '#f5f5f5',
          selected: '#8ac0f5a8'
      },
  },
})

const Cell = ({
  x,
  y,
  selectDay,
  deselectDay,
  selectOneDay,
  highlight = false,
  cellWidth = 59,
  cellHeight = 50,
  cellContentStyle = {},
  content = null,
  removeDefaultColor = false,
}) => {

  const select = (next) => {
      if(next){
          selectDay(x, y);
      }else{
          deselectDay(x, y);
      }
  }

  return (
    <>
      <ThemeProvider
          theme={theme}
          >
          <Box
              className={styles.daycell}
              sx={{
              width: cellWidth,
              height: cellHeight,
              ...(!removeDefaultColor && { bgcolor: highlight ? '#8ac0f5a8' : '#f5f5f5' } ),
              '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
              },
              position: 'relative',
              }}
              onClick={() => {selectOneDay(x, y)}}
              onDragEnter={() => select(true)}
          >
            <div style={ cellContentStyle }>
              { content }
            </div>
          </Box>
      </ThemeProvider>
    </>
  );
}

export default Cell;