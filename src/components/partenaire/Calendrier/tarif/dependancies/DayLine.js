import React , { useState } from 'react';
import {Popper} from '@mui/material';
import styles from '../CalendarComponent.module.css';

import DayCell from './DayCell.js';
import Draggable from './Draggable.js';
import PriceEditor from './PriceEditor.js'
import CloseLine from './CloseLine.js';
import DateRangeLine from './DateRangeLine.js';
import RateCells from './RateCells';

import { useEffect } from 'react';

const heightAvailabilityCell = 22;
const heightPriceCell = 50;

const DayLine = ({
  typeChambres,
  setTypeChambres,
  typechambre,
  daterange,
  indice,
  setOpenLoad,
  getPrix,
  alldays,
  value
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [min,setMin] = useState(0);
    const [max,setMax] = useState(0);
    const openPopper = (target) => {
        setAnchorEl(target);
    };
    let daycells = [];
    const [selecteds, setSelecteds] = useState([]);
    const [selectedY,setSelectedY] = useState(-1);
    const [from, setFrom] = useState('none');
    const [bornesEditDate, setBornesEditDate] = useState([]);
    const [typeSelected, setTypeSelected] = useState("");
    //typechambre.planTarifaire[0].prixTarif[i].date

    const getMin = (arr) => {
        var min = arr[0];
        for(var i = 1; i < arr.length; i++) {
            if(min > arr[i]){
                min = arr[i];
            }
        }
        setMin(min);
        return min;
    }
    const getMax = (arr) => {
        var max = arr[0];
        for(var i = 1; i < arr.length; i++) {
            if(max < arr[i]){
                max = arr[i];
            }
        }
        setMax(max);
        return max;
    }
    const addSelection = (i, y, type) => {
        setTypeSelected(type);
        var min = getMin(selecteds);
        var max = getMax(selecteds);
        // console.log('from : ' + min + ' => ' + max);
        if((i <= min || (i > min && i <= max)) && from === 'left'){
            min = i;
        }
        if((i >= max || (i >= min && i < max)) && from === 'right'){
            max = i;
        }
        var tmp = [];
        //console.log('to : ' + min + ' => ' + max);
        for(var j = min; j <= max; j++) {
            tmp.push(j);
        }
        setSelecteds(tmp);
        // setBornesEditDate([ daterange[tmp[0]], daterange[tmp.length - 1] ]);
        setSelectedY(y);
        console.log(tmp);
        setBornesEditDate([ daterange[tmp[0]], daterange[tmp[tmp.length - 1]] ]);
        // if(daterange[i] < bornesEditDate[0]){
        //     setBornesEditDate([ daterange[i] , bornesEditDate[0] ]);
        // }else{
        //     setBornesEditDate([ bornesEditDate[0] , daterange[i] ]);
        // }
    }
    const rmSelection = (i, y) => {
        // const tmp = [...selecteds];
        // const r = selecteds.indexOf(i);
        // tmp.splice(r, 1);
        // if(tmp.length > 0){
        //     var min = tmp[0];
        //     var max = tmp[0];
        //     for(var j = 1; j < tmp.length; j++){
        //         if(tmp[j] < min){
        //             min = tmp[j];
        //         }
        //         if(tmp[j] > max){
        //             max = tmp[j];
        //         }
        //     }
            
        // }else{
        //     setSelecteds(tmp);
        // }
    }
    const oneSelection = (i, y) => {
        setSelecteds([i]);
        setBornesEditDate([daterange[i]]);
        setSelectedY(y);
        let anchorEl = document.getElementById('anchorEl' + indice);
        openPopper(anchorEl);
    }
    const leftSelected = () => {
        if(selecteds.length > 0){
            var min = getMin(selecteds);
            return (min * 60) - 10;
        }
        return false;
    }

    const rightSelected = () => {
        if(selecteds.length > 0){
            var max = getMax(selecteds);
            max++;
            return (max * 60) - 10;
        }
        return false;
    }
    const dragStart = (ev) => {
        setFrom(ev.target.dataset.pos);
        var img = document.getElementsByTagName('canvas')[0];
        document.body.appendChild(img);
        ev.dataTransfer.setDragImage(img, -50, -50);
    }
    const closePopper = (ev) => {
        setAnchorEl(null);
        setSelecteds([]);
        setSelectedY(-1);
    }
    
    const bookedcell = [];
    const closelines = [];

    useEffect(() => {
        
    }, []);

    for(let i = 0; i < typechambre.statusDays.length; i++){
      closelines.push(
          <td>
              <CloseLine 
                  closed={typechambre.statusDays[i].closed}
                  statusDay={typechambre.statusDays[i]}
                  typeChambres={typeChambres}
                  setTypeChambres={setTypeChambres}
                  idTypeChambre={typechambre._id}
                  setOpenLoad={setOpenLoad}
                  getPrix={getPrix}
                  indice={indice}
                  indexStatus={i}
              />
          </td>
      )
  }

    for(var i = 0; i < typechambre.statusDays.length ; i++){
        daycells.push(
        <td key={`${i} 0`}>
            <DayCell 
                isprice={false} 
                highlight={selecteds.indexOf(i) >= 0 && selectedY == 0} 
                key={i.toString()}
                x={i}
                y={0}
                deselectDay={rmSelection.bind(this)} 
                selectDay={addSelection.bind(this)} 
                selectOneDay={oneSelection.bind(this)}
                data={typechambre.statusDays[i].toSell} />
        </td>);
        bookedcell.push(
        <td key={`${i} $1`}>
            <DayCell 
                isprice={false} 
                highlight={selecteds.indexOf(i) >= 0 && selectedY == 1} 
                key={i.toString()}
                x={i}
                y={1}
                deselectDay={rmSelection.bind(this)} 
                selectDay={addSelection.bind(this)} 
                selectOneDay={oneSelection.bind(this)} day={i}
                data={typechambre.booked[i].value} />
        </td>);
    }
    const calculateTopAnchor = (y) => {
        let r = (y * 50);
        if(y > 1){
            r += 6;
        }
        return r;
    }
    const calculateTop = (y) => {
        const { nbAdulte, nbEnfant, planTarifaire } = typechambre;

        const occupantNum = nbAdulte + nbEnfant;
        const indexesPlanTarifaire = [];
        let tmpIndexPlanTarifaire = 2;
        for (let i = 0; i < planTarifaire.length; i++) {
          indexesPlanTarifaire.push(tmpIndexPlanTarifaire);
          tmpIndexPlanTarifaire += occupantNum + 1;
        }

        let r = 0;
        // calculate height sum of cells above
        let indexStartCompare = 0;
        for (let i = 0; i < y; i++) {
          let isIndexPlanTarifaire = false;
          for (let u = indexStartCompare; u < indexesPlanTarifaire.length; u++) {
            if (i === indexesPlanTarifaire[u]) {
              isIndexPlanTarifaire = true;
              indexStartCompare = u + 1;
              break;
            }
          }
          r += isIndexPlanTarifaire ? heightAvailabilityCell : heightPriceCell;
        }

        // add height to center vertically the draggable button
        let isIndexPlanTarifaire = false;
        for (let i = indexStartCompare; i < indexesPlanTarifaire.length; i++) {
          if (y === indexesPlanTarifaire[i]) {
            isIndexPlanTarifaire = true;
            break;
          }
        }
        
        r = r - 3 * indexStartCompare;
        r += isIndexPlanTarifaire ? 22 : 38;
        // r += y > 1 ? 6 : 0;
        return r;
    }

    return(
        <>
            <Popper
                open={anchorEl === null ? false : true}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
                placement='top'
                disableRestoreFocus
                className={styles.popper}
            >
                <PriceEditor 
                    isPrice={selectedY > 1} 
                    selected={selectedY - 2} 
                    selectedY={selectedY} 
                    typechambre={typechambre} 
                    fromto={bornesEditDate} 
                    closePopper={closePopper.bind(this)}
                    alldays={alldays}
                    selecteds={selecteds}
                    getPrix={getPrix}
                    value={value} />
            </Popper>
            <div className={styles.dayline}>
                <DateRangeLine daterange={daterange} />
                
                <div className={styles.tablelinediv}>
                    <div 
                      id={"anchorEl" + indice}
                      style={{
                        height: '10px',
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        top: (calculateTopAnchor(selectedY)) + 'px',
                        left: (min * 60) + 'px',
                        width: ((max - min + 1) * 60) + 'px'
                      }}
                    ></div>

                    { 
                      (selecteds.length > 0 && selectedY != -1)
                      ? <Draggable 
                          top={calculateTop(selectedY)}
                          pos={'left'}
                          dragStart={dragStart.bind(this)}
                          rightSelected={rightSelected.bind(this)}
                          leftSelected={leftSelected.bind(this)}
                        />
                      : null
                    }
                    <table className={styles.table}>
                        <thead>

                        </thead>
                        <tbody>
                            <tr>
                                {closelines}
                            </tr>
                            <tr>
                                {daycells}
                            </tr>
                            <tr>
                                {bookedcell}
                            </tr>
                            <RateCells
                                typechambre={typechambre} 
                                context={this}
                                selecteds={selecteds}
                                selectedY={selectedY}
                                rmSelection={rmSelection}
                                addSelection={addSelection}
                                oneSelection={oneSelection}
                            />
                        </tbody>
                    </table>
                    { (selecteds.length > 0 && selectedY != -1) ? <Draggable top={calculateTop(selectedY)} pos={'right'} dragStart={dragStart.bind(this)} rightSelected={rightSelected.bind(this)} leftSelected={leftSelected.bind(this)} /> : null }
                </div>
            </div>
        </>
    );
}

export default DayLine;