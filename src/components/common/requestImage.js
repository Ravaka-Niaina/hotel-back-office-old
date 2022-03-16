import axios from "axios";
import { base64ToBlob } from 'base64-blob';

import {session} from "./utilitySession.js";

export function uploadImage(method, url, data, callback){
    let formData = new FormData();
    base64ToBlob(data.file).then((blob) => {
        formData.append("image", blob);
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        
        let headers = {
            idsession: session.getInstance().getId(),
            ispartner: session.getInstance().getIsPartner(),
            "Content-Type": "multipart/form-data; boundary=&"
        };

        const session_temp = localStorage.getItem("session_temp");
        if(session_temp !== null){
            headers.session_temp = session_temp;
        }
        
        axios({
            method: method,      
            url: process.env.REACT_APP_BACK_URL + url,
            withCredentials: true,
            data: formData,
            headers: headers,
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                console.log("completed = " + percentCompleted + "%")
            }
        })
        .then(res => {                                           
            callback(res.data, res.headers)})
        .catch(err =>{console.log(err); console.log("erreur");} );
    });
    
}