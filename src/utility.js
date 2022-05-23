import axios from "axios";
import {session} from "./components/common/utilitySession.js"; 

export default function callAPI(method, url, data, callback, errorHandler){
    let headers = {
        idsession: session.getInstance().getId(),
        ispartner: session.getInstance().getIsPartner(),
        //"Content-Type": "multipart/form-data"
    };
    const session_temp = localStorage.getItem("session_temp");
    if(session_temp !== null){
        headers.session_temp = session_temp;
    }
    axios({
        method: method,      
        url: process.env.REACT_APP_BACK_URL + url,
        withCredentials: true,
        data: data,
        headers: headers
    })
    .then(res => {                                           
        callback(res.data, res.headers)})
    .catch(err =>{
        console.log(err);
        if(errorHandler){
           return errorHandler();
        }
        throw(err);
    } );
}