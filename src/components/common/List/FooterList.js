import Pagination from './Pagination.js';
import styles from './FooterList.module.css';

export default function FooterList(props){

    const handleChangeNbContent = (newNbContent) => {
        props.setCurrentNumPage(1);
        props.setNbContent(newNbContent);
        props.rechercher(1, newNbContent);
    }

    return(
        <div className={styles.footer}>
            <div>
                <span>Résultats:</span><strong>{props.nbResult}</strong>
            </div>
            <div>
                <span>Résultats par page</span>
                <select name="nbContent" onChange={(e) => handleChangeNbContent(Number.parseInt(e.target.value))}>
                    {props.rowsPerPageOptions.map(opt => {
                        return(<>{props.nbContent === opt ? 
                            <option value={opt} selected>{opt}</option> : 
                            <option value={opt}>{opt}</option>
                        }</>);
                    })}
                </select>
            </div>
            <div>
                <Pagination 
                    currentNumPage={props.currentNumPage} 
                    setCurrentNumPage={props.setCurrentNumPage}
                    pagine={props.nbPage}
                    rechercher={props.rechercher} 
                />
            </div> 
        </div>
    );
}