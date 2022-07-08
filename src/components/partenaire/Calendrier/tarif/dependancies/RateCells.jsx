/* eslint-disable no-loop-func */
import React , { useState , useEffect} from 'react';
import {Box} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from '../CalendarComponent.module.css';
import DayCell from './DayCell.js';

function AvailabilityCell ({
    highlight,
    selectDay = () => {},
    deselectDay = () => {},
    selectOneDay = () => {},
    x,
    y,
    closed,
}) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#f5f5f5',
                selected: '#8ac0f5a8'
            },
        },
    })
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
                width: 59,
                height: 22.25,
                '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                },
                position: 'relative',
                }}
                onClick={() => {selectOneDay(x, y)}}
                onDragEnter={() => select(true)}
            >
                <div style={ {
                  height: "15px",
                  backgroundColor: ( highlight ? closed ? '#eb8383' : '#96ebac' : closed ? '#FF0000' : '#64E986' ),
                  marginTop: "-12px"
                } }></div>
            </Box>
        </ThemeProvider>
        </>
    );
}

function RateCells({ 
    typechambre: { 
        nbAdulte,
        nbEnfant,
        planTarifaire
    },
    rmSelection,
    addSelection,
    oneSelection,
    selecteds,
    selectedY,
    context,
}) {
    let ratecells = [];
    const nbOccupants = nbAdulte + nbEnfant;
    let y = 1;
    for(let i = 0; i < planTarifaire.length; i++){
      y++;
      const tmpY = y;
      const { prixTarif } = planTarifaire[i];
      ratecells.push(
        <tr key={`${planTarifaire[i]._id} ${prixTarif.date}`}>
          {
            prixTarif.map((prix, i) => <td>
              <AvailabilityCell
                highlight={selecteds.indexOf(i) >= 0 && selectedY === tmpY} 
                closed={prix.closed}
                data="temp"
                deselectDay={rmSelection.bind(context)} 
                selectDay={addSelection.bind(context)} 
                selectOneDay={oneSelection.bind(context)}
                x={i}
                y={tmpY}
              />
            </td>)
          }
        </tr>
      );

      for(let v = 0; v < nbOccupants; v++){
          let row = [];
          y++;
          for(let u = 0; u < prixTarif.length; u++){
              const minPrix = prixTarif[u].versions[v];
              row.push(
                  <td>
                      <DayCell
                          customize="toSell"
                          isprice={true} 
                          highlight={selecteds.indexOf(u) >= 0 && selectedY === y} 
                          key={u.toString()}
                          x={u}
                          y={y}
                          deselectDay={rmSelection.bind(context)} 
                          selectDay={addSelection.bind(context)} 
                          selectOneDay={oneSelection.bind(context)} 
                          data={minPrix.prix}
                          nbPers={minPrix.nbPers}
                          closed={prixTarif[u].closed} />
                  </td>
              );
          }
          ratecells.push(<tr>{row}</tr>);
      }
    }

    return ratecells;
}

export default RateCells;