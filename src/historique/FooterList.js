import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from '../components/common/List/FooterList.module.css';

export default function FooterList(props){

    return(
        <div className={styles.footer}>
            <div>
                <span>Résultats:</span><strong>{props.nbResult}</strong>
            </div>
            <div>
                <span>Résultats par page</span>
                <select name="nbContent"onChange={(e) => props.handleChange(e)} >
                    {props.rowsPerPageOptions.map(opt => {
                        return(<>{props.nbContent === opt ? 
                            <option value={opt} selected>{opt}</option> : 
                            <option value={opt}>{opt}</option>
                        }</>);
                    })}
                </select>
            </div>
            <div >
            <Pagination
                page={props.currentNumPage} 
                onChange={props.handleChangePagination}
                count={props.nbPage}
            />
            </div>
        </div>
    );
}