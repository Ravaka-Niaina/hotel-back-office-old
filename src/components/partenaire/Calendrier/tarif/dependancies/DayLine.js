import React , { useState } from 'react';
import {Popper} from '@mui/material';
import styles from '../CalendarComponent.module.css';

import DayCell from './DayCell.js';
import Draggable from './Draggable.js';
import PriceEditor from './PriceEditor.js'
import CloseLine from './CloseLine.js';
import DateRangeLine from './DateRangeLine.js';

import { useEffect } from 'react';

function getMin2(arr){
    var min = arr[0];
    for(var i = 1; i < arr.length; i++) {
        console.log(arr[i]);
        if(arr[i].nbPers === 2 && arr[i].prix !== "" && arr[i].prix > 0){
            return arr[i];
        }else if(min > arr[i]){
            min = arr[i];
        }
    }
    return min;
}

function getMinPrix(versions){
    let prixValid = [];
    for(let i = 0; i < versions.length; i++){
        if(versions[i].prix != ""){
            prixValid.push(versions[i]);
        }
    }
    if(prixValid.length > 0){
        return getMin2(prixValid);
    }
    return {nbPers: null, prix: null};
}

function RateCells(props){
    let rows = [];
    for(let i = 0; i < props.typechambre.planTarifaire.length; i++){
        let row = [];
        for(let u = 0; u < props.typechambre.planTarifaire[i].prixTarif.length; u++){
            const minPrix = getMinPrix(props.typechambre.planTarifaire[i].prixTarif[u].versions);
            // console.log(minPrix);
            row.push(
                <td>
                    <DayCell 
                        isprice={true} 
                        highlight={props.selecteds.indexOf(i) >= 0} 
                        key={i.toString()} 
                        deselectDay={props.rmSelection.bind(props.context)} 
                        selectDay={props.addSelection.bind(props.context)} 
                        selectOneDay={props.oneSelection.bind(props.context)} 
                        day={minPrix.prix}
                        nbPers={minPrix.nbPers}
                        closed={props.typechambre.planTarifaire[i].prixTarif[u].closed} />
                </td>
            );
        }
        rows.push(row);
    }
    let ratecells = [];
    for(let i = 0; i < rows.length; i++){
        const a = i;
        ratecells.push(
            <tr>{rows[a]}</tr>
        );
    }
    return ratecells;
}

const DayLine = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [min,setMin] = useState(0);
    const [max,setMax] = useState(0);
    const openPopper = (target) => {
        setAnchorEl(target);
    };
    let open = Boolean(anchorEl);
    let daycells = [];
    const [selecteds, setSelecteds] = useState([]);
    const [from, setFrom] = useState('none');
    const [bornesEditDate, setBornesEditDate] = useState([]);
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
    const addSelection = (i) => {
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
        setBornesEditDate([ props.typechambre.planTarifaire[0].prixTarif[min].date, props.typechambre.planTarifaire[0].prixTarif[max].date ]);
        console.log(bornesEditDate);
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

    useEffect(() => {
        
    }, []);

    for(var i = 0; i < props.typechambre.statusDays.length ; i++){
        daycells.push(
        <td>
            <DayCell 
                isprice={false} 
                highlight={selecteds.indexOf(i) >= 0} 
                key={i.toString()} 
                deselectDay={rmSelection.bind(this)} 
                selectDay={addSelection.bind(this)} 
                selectOneDay={oneSelection.bind(this)} day={i}
                day={props.typechambre.statusDays[i].toSell} />
        </td>);
        bookedcell.push(
        <td>
            <DayCell 
                isprice={false} 
                highlight={selecteds.indexOf(i) >= 0} 
                key={i.toString()} 
                deselectDay={rmSelection.bind(this)} 
                selectDay={addSelection.bind(this)} 
                selectOneDay={oneSelection.bind(this)} day={i}
                day={props.typechambre.booked[i].value} />
        </td>);
    }

    for(let i = 0; i < props.typechambre.statusDays.length; i++){
        closelines.push(
            <td>
                <CloseLine 
                    closed={props.typechambre.statusDays[i].closed} 
                    statusDay={props.typechambre.statusDays[i]}
                    idTypeChambre={props.typechambre._id}
                    setOpenLoad={props.setOpenLoad}
                    getPrix={props.getPrix} />
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
                <PriceEditor typechambre={props.typechambre} fromto={bornesEditDate} closePopper={closePopper.bind(this)} />
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
                            <RateCells 
                                typechambre={props.typechambre} 
                                context={this}
                                selecteds={selecteds}
                                rmSelection={rmSelection}
                                addSelection={addSelection}
                                oneSelection={oneSelection} />
                        </tbody>
                    </table>
                    { (selecteds.length > 0) ? <Draggable pos={'right'} dragStart={dragStart.bind(this)} rightSelected={rightSelected.bind(this)} leftSelected={leftSelected.bind(this)} /> : null }
                </div>
            </div>
        </>
    );
}

export default DayLine;