export function removeErrorConfigPrix(error, setError){
    let tempError = {...error};
    const keysError = Object.keys(tempError);
    keysError.map((k) => {
        if(k === "versions"){
            const keysVersions = Object.keys(tempError.versions);
            keysVersions.map((k) => {
                tempError.versions[k] = null;
            });
        }else{
            tempError[k] = null;
        }
    });
    setError(tempError);
}

export function handleErrorConfigPrix(incomingErrors, error, setError){
    let tempError = {...error};
    const keysError = Object.keys(tempError);
    keysError.map((k) => {
        if(k === "versions"){
            const keysVersions = Object.keys(tempError.versions);
            keysVersions.map((k) => {
                tempError.versions[k] = null;
            });
        }else{
            tempError[k] = null;
        }
    });

    const keys = Object.keys(incomingErrors);
    keys.map((k) => {
        if( k === "versions"){
            const keysVersions = Object.keys(incomingErrors.versions);
            keysVersions.map((kv) => {
                const details = Object.keys(incomingErrors.versions[kv]);
                tempError.versions[kv] = incomingErrors.versions[kv][details[0]];
            })
        }else{
            tempError[k] = incomingErrors[k];
        }
    });
    setError(tempError);
}

export function getChosenRateError(error, idTarif){
    if(error.tarifs === undefined || error.tarifs === null || error.tarifs.length === 0){
        return null;
    }
    for(let i = 0; i < error.tarifs.length; i++){
        if(error.tarifs[i]._id === idTarif){
            return error.tarifs[i].desc;
        }
    }
    return null;
}  

export function removeChosenRateError(error, setError){
    let tmp = {...error};
    tmp.tarifs = null;
    setError(tmp);
}