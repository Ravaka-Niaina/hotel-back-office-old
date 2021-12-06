import axios from "axios";

export default function APIGeT(method , url , callback){
    axios ({
        method : method,
        url : process.env.REACT_APP_BACK_URL + url,
        withCredentials: true
    })
    .then(res => { callback(res.data)})
    .catch(err => {console.log(err) })
}