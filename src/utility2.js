export function setValue(obj, field, value){
    let save = [];
    for(let i = 0; i < field.length; i++){
        if(i === 0){
            save.push(JSON.parse(JSON.stringify(obj[field[0]])));
        }else{
            save.push(JSON.parse(JSON.stringify(save[i - 1][field[i]])));
        }
    }
    for(let i = field.length - 1; i > -1; i--){
        if(i === field.length - 1){
            save[i] = value;
        }else{
            save[i][field[i + 1]] = save[i + 1];
        }
    }
    obj[field[0]] = save[0];
    return obj;
}