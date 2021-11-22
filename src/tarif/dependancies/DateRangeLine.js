import React from 'react';
import styles from '../CalendarComponent.module.css';
import moment from 'moment';

const DateRangeLine = (props) => {
    var days = [];
    for(var i = 0; i < props.daterange.length ; i++){
        days.push(
        <td className={ moment(props.daterange[i]).format('ddd').toLowerCase().indexOf('mon') >= 0 ? styles.limit : null}>
            <span>{ moment(props.daterange[i]).format('ddd') }</span>
            <br/>
            <span>{ moment(props.daterange[i]).format('D') }</span>
        </td>);
    }
    return(
        <div className={styles.rangeLine}>
        <table>
            <tbody>
                <tr>
                {days}
                </tr>
            </tbody>
        </table>
        </div>
    );
}

export default DateRangeLine;