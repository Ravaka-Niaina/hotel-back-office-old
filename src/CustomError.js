import Alert from '@mui/material/Alert';

function CustomError(props){
    if(props.errors.length > 0){
        return(
        <div className="erreur">
            <Alert severity="error">{ props.errors[0].message }</Alert>
        </div>);
    }else{
        return(
        <div>

        </div>
        );
    }
}

export default CustomError;
