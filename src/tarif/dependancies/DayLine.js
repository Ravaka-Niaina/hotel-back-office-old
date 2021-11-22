import React , { useState } from 'react';
import {Popper} from '@mui/material';
import styles from '../CalendarComponent.module.css';

import DayCell from './DayCell.js';
import Draggable from './Draggable.js';
import PriceEditor from './PriceEditor.js'
import CloseLine from './CloseLine.js';
import DateRangeLine from './DateRangeLine.js';

const DayLine = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [min,setMin] = useState(0);
    const [max,setMax] = useState(0);
    const openPopper = (target) => {
        setAnchorEl(target);
    };
    const open = Boolean(anchorEl);
    const daycells = [];
    const ratecells = [];
    const [selecteds, setSelecteds] = useState([]);
    const [from, setFrom] = useState('none');
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
    const addSelection = (i) => {
        var min = getMin(selecteds);
        var max = getMax(selecteds);
       // console.log('from : ' + min + ' => ' + max);
        if((i <= min || (i > min && i <= max)) && from == 'left'){
            min = i;
        }
        if((i >= max || (i >= min && i < max)) && from == 'right'){
            max = i;
        }
        var tmp = [];
        //console.log('to : ' + min + ' => ' + max);
        for(var j = min; j <= max; j++) {
            tmp.push(j);
        }
        setSelecteds(tmp);
    }
    const rmSelection = (i) => {
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
    const oneSelection = (i) => {
        setSelecteds([i]);
        let anchorEl = document.getElementById('anchorEl' + props.indice);
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
    }
    
    const bookedcell = [];
    const closelines = [];
    for(var i = 0; i < props.daterange.length ; i++){
        daycells.push(
        <td>
            <DayCell isprice={false} highlight={selecteds.indexOf(i) >= 0} key={i.toString()} deselectDay={rmSelection.bind(this)} selectDay={addSelection.bind(this)} selectOneDay={oneSelection.bind(this)} day={i} />
        </td>);
        bookedcell.push(
            <td>
                <span>{Math.floor(Math.random() * 10)}</span>
            </td>
        )
        ratecells.push(
        <td>
            <DayCell isprice={true} highlight={selecteds.indexOf(i) >= 0} key={i.toString()} deselectDay={rmSelection.bind(this)} selectDay={addSelection.bind(this)} selectOneDay={oneSelection.bind(this)} day={i} />
        </td>);
        closelines.push(
            <td>
                <CloseLine/>
            </td>
        )
    }
    return(
        <>
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement='top'
            disableRestoreFocus
            className={styles.popper}
        >
        <PriceEditor typechambre={props.typechambre} fromto={props.fromto} closePopper={closePopper.bind(this)} />
        </Popper>
        <div className={styles.dayline}>
        <DateRangeLine daterange={props.daterange} />
        
        <div className={styles.tablelinediv}>
        <div id={"anchorEl" + props.indice} style={{ height: '10px', backgroundColor: 'transparent', position: 'absolute', top: '-11px', left: (min * 60) + 'px' ,width: ((max - min + 1) * 60) + 'px' }}></div>
        { (selecteds.length > 0) ? <Draggable pos={'left'} dragStart={dragStart.bind(this)} rightSelected={rightSelected.bind(this)} leftSelected={leftSelected.bind(this)} /> : null }
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
                <tr>
                    {ratecells}
                </tr>
            </tbody>
        </table>
        { (selecteds.length > 0) ? <Draggable pos={'right'} dragStart={dragStart.bind(this)} rightSelected={rightSelected.bind(this)} leftSelected={leftSelected.bind(this)} /> : null }
        </div>
        </div>
        </>
    );
}

export default DayLine;