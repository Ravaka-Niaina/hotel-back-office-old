import axios from "axios";
import {session} from "./components/common/utilitySession.js"; 

export default function callAPI(method, url, data, callback){
    axios({
        method: method,      
        url: process.env.REACT_APP_BACK_URL + url,
        withCredentials: true,
        data: data,
        headers: {
            idsession: session.getInstance().getId(),
            ispartner: session.getInstance().getIsPartner()
        }
    })
    .then(res => {                                           
        callback(res.data, res.headers)})
    .catch(err =>{console.log(err); console.log("erreur");} );
}

