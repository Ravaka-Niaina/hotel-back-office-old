import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function handleCheckBoxChange(props , event , indice , field , checked){
    let current = JSON.parse(JSON.stringify(props.state));
    current[field][indice][checked] = event.target.checked;
    props.setState(current);
    console.log(current);
}

function CheckboxAcces(props){
        return (
            <FormControlLabel
                checked={props.liste.checked}
                control={<Checkbox/>}
                onChange={(e) => handleCheckBoxChange(props.this , e , props.indice , "urlAccess" ,"checked")}
                label=''
                style={{marginLeft:"20px"}}
            />
        );
}
export default CheckboxAcces;