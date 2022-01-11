import axios from "axios";

export default function callAPI(method, url, data, callback){
    axios({
        method: method,      
        url: process.env.REACT_APP_BACK_URL + url,
        // withCredentials: true,
        data: data
    })
    .then(res => {                                           
        callback(res.data)})
    .catch(err =>{console.log(err); console.log("erreur");} );
}

