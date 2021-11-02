function CustomError(props){
    if(props.errors.length > 0){
        return(
        <div className="erreur">
        <p><strong>{ props.errors[0].message }</strong></p>
        </div>);
    }else{
        return(
        <div>

        </div>
        );
    }
}

export default CustomError;
