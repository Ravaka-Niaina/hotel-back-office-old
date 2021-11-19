
import axios from "axios";

export function getReservation(idTarif ,  varProps ){
    let current = JSON.parse(JSON.stringify(varProps.state));
    current.reserver.reservation.push({idTarif : idTarif});
    varProps.setState(current);
    console.log(current.reserver)
}
export function haddleInputChange(e ,context , name){
    let current = JSON.parse(JSON.stringify(context.state));
    current.reserver.dateSejour[name]= e.target.value;
    context.setState(current);
    console.log(current.reserver);
}


export function callAPI(method, url, data, callback){
    axios({
        method: method,      
        url: process.env.REACT_APP_BACK_URL + url,
        withCredentials: true,
        data: data
    })
    .then(res => {  
        console.log("avec success");                                                
        callback(res.data)})
    .catch(err =>{console.log(err); console.log("erreur");} );
}