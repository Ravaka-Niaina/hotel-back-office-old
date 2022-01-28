function getDateNotEspace(date){
    date = new Date(date);
    let year = date.getFullYear()+"";
    let milliSeconde = date.getMilliseconds();
    let annee = '';
    for (let i = year.length-1; i > 1 ; i--){
        annee = annee+year[i];   
    }
    return {annee:annee,milliSeconde:milliSeconde};
}

function NumeroConfirmation(nbrRadom , nameHotel , TChambre){
    const min = 1;
    const max = 100;
    let rand = min + Math.random() * (max - min);
    rand = Number.parseInt(rand);
    let now = new Date();
    let date = getDateNotEspace(now);
    let hotel = '';
    const nameTC = TChambre.split(" ");
    for(let i = 0; i < 3 ; i++){
        hotel = hotel + nameHotel[i] ;
    }
    try{// A revoir
        return (nbrRadom+rand)+date.annee+hotel+nameTC[0][0]+nameTC[1][0]+date.milliSeconde;
    }catch(err){
        return (nbrRadom+rand)+date.annee+hotel+nameTC[0][0]+nameTC[0][0]+date.milliSeconde;
    }
}
export default NumeroConfirmation;