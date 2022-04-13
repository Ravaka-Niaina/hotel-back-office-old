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
        //console.log(arr[i]);
        if(arr[i].nbPers === 2 && arr[i].prix !== "" && arr[i].prix > 0){
            return arr[i];
        }else if(min > arr[i]){
            min = arr[i];
        }
    }
    return min;
}

function RateCells(props){
    let ratecells = [];
    const nbOccupants = props.typechambre.nbAdulte + props.typechambre.nbEnfant;
    let y = 1;
    for(let i = 0; i < props.typechambre.planTarifaire.length; i++){
        for(let v = 0; v < nbOccupants; v++){
            let row = [];
            y++;
            for(let u = 0; u < props.typechambre.planTarifaire[i].prixTarif.length; u++){
                const minPrix = props.typechambre.planTarifaire[i].prixTarif[u].versions[v];
                row.push(
                    <td>
                        <DayCell
                            customize="toSell"
                            isprice={true} 
                            highlight={props.selecteds.indexOf(u) >= 0 && props.selectedY == y} 
                            key={u.toString()}
                            x={u}
                            y={y}
                            deselectDay={props.rmSelection.bind(props.context)} 
                            selectDay={props.addSelection.bind(props.context)} 
                            selectOneDay={props.oneSelection.bind(props.context)} 
                            data={minPrix.prix}
                            nbPers={minPrix.nbPers}
                            closed={props.typechambre.planTarifaire[i].prixTarif[u].closed} />
                    </td>
                );
            }
            ratecells.push(<tr>{row}</tr>);
        }
        
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
        console.log(tmp);
        setSelecteds(tmp);
        setSelectedY(y);
        if(props.daterange[i] < bornesEditDate[0]){
            setBornesEditDate([ props.daterange[i] , bornesEditDate[0] ]);
        }else{
            setBornesEditDate([ bornesEditDate[0] , props.daterange[i] ]);
        }
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
        setBornesEditDate([props.daterange[i]]);
        setSelectedY(y);
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
        setSelectedY(-1);
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
                highlight={selecteds.indexOf(i) >= 0 && selectedY == 0} 
                key={i.toString()}
                x={i}
                y={0}
                deselectDay={rmSelection.bind(this)} 
                selectDay={addSelection.bind(this)} 
                selectOneDay={oneSelection.bind(this)}
                data={props.typechambre.statusDays[i].toSell} />
        </td>);
        bookedcell.push(
        <td>
            <DayCell 
                isprice={false} 
                highlight={selecteds.indexOf(i) >= 0 && selectedY == 1} 
                key={i.toString()}
                x={i}
                y={1}
                deselectDay={rmSelection.bind(this)} 
                selectDay={addSelection.bind(this)} 
                selectOneDay={oneSelection.bind(this)} day={i}
                data={props.typechambre.booked[i].value} />
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
    const calculateTopAnchor = (y) => {
        let r = (y * 50);
        if(y > 1){
            r += 6;
        }
        return r;
    }
    const calculateTop = (y) => {
        let r = 38 + (y * 50);
        if(y > 1){
            r += 6;
        }
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
                    typechambre={props.typechambre} 
                    fromto={bornesEditDate} 
                    closePopper={closePopper.bind(this)}
                    alldays={props.alldays}
                    selecteds={selecteds}
                    getPrix={props.getPrix}
                    value={props.value} />
            </Popper>
            <div className={styles.dayline}>
                <DateRangeLine daterange={props.daterange} />
                
                <div className={styles.tablelinediv}>
                    <div id={"anchorEl" + props.indice} style={{ height: '10px', backgroundColor: 'transparent', position: 'absolute', top: (calculateTopAnchor(selectedY)) + 'px', left: (min * 60) + 'px' ,width: ((max - min + 1) * 60) + 'px' }}></div>
                    { (selecteds.length > 0 && selectedY != -1) ? <Draggable top={calculateTop(selectedY)} pos={'left'} dragStart={dragStart.bind(this)} rightSelected={rightSelected.bind(this)} leftSelected={leftSelected.bind(this)} /> : null }
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
                                selectedY={selectedY}
                                rmSelection={rmSelection}
                                addSelection={addSelection}
                                oneSelection={oneSelection} />
                        </tbody>
                    </table>
                    { (selecteds.length > 0 && selectedY != -1) ? <Draggable top={calculateTop(selectedY)} pos={'right'} dragStart={dragStart.bind(this)} rightSelected={rightSelected.bind(this)} leftSelected={leftSelected.bind(this)} /> : null }
                </div>
            </div>
        </>
    );
}

export default DayLine;