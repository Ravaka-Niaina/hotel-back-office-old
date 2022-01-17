import React from 'react';
import styles from '../CalendarComponent.module.css';
import moment from 'moment';

let monthsName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const DateRangeLine = (props) => {
    var months = [];
    var days = [];
    for(var i = 0; i < props.daterange.length ; i++){
        console.log(monthsName[new Date(props.daterange[i]).getMonth()]);
        months.push(
            <td style={{height: "30px"}}><div style={{ marginTop: "-10px"}}>{ monthsName[new Date(props.daterange[i]).getMonth()] }</div></td>
        );
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
                        {months}
                    </tr>
                    <tr>
                        {days}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DateRangeLine;