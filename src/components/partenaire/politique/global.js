import React , {useState} from 'react';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert';
import {useEffect} from 'react';
import callAPI from '../../../utility.js';
import Navbar from '../Navbar/Navbar.js'
import { useParams, useHistory, Link } from 'react-router-dom'
import "./global.css";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SkelettonForm from '../../../SkeletonListe/SkeletonFormulaire.js';
import ButtonLoading from "../buttonLoading.js"

function Global(){
    const [datePrice , setDatePrice] = useState([{ date:"" , pourcentage: ""}]);
    const [dateTime , setType] = useState("jour")
    const [valueP , setVal] = useState(100);
    const [nom , setNom] = useState ("")
    const[description, setDescription] = useState('');
    const[show , setShow] = useState(false);
    const[message  , setMessage] = useState("");
    const [griseAdd , setGrise] = useState(true);
    const [skeletonAffiche , setSkeleton] = useState(true);

    const { _id } = useParams();      
    let [state , setState] = useState (
        {
            description : null ,
            type : null,
            pourcentage : null,
            vide : null
        }
    );  
    const [btnLoad, setBtnLoad] = useState(false); 
  
    
       
    let history = useHistory();
    const functionAppel=(res)=>{
        console.log(res);
        if(res.errors != null){
                let err = Object.keys(res.errors);
                let duplic = JSON.parse(JSON.stringify(state));
                for(let indice = 0 ; indice<err.length ; indice++){
                    duplic[err[indice]] = res.errors[err[indice]];
                }
            setState(duplic);
            setBtnLoad(false);
        }
        
        if(res.status == 500){
            setMessage(res.message);
            setBtnLoad(false);
        }else if(res.status == 200 ){
            history.push("/back/politique/list");
       }else{
            setBtnLoad(false);
           console.log("pas de reponse");
       }
           
    }
    /* handle input change*/
    const handleInputChange = (e, index) => {
        let existeVide = false;
        let temp = 0;
        const { name, value } = e.target;
        const list = [...datePrice];
       // setGrise(false);

        const errorS =JSON.parse(JSON.stringify(state));
        errorS.pourcentage = null;
        setState(errorS);
        
        if(value < 0){
            list[index][name] = 0;
        }else{
            list[index][name] = value;
        }
        setDatePrice(list);
        
        for (let i = 0; i < list.length ; i++){
            if(list[i].pourcentage != null){
                let convert = Number.parseFloat(list[i].pourcentage); 
                temp += convert;  
            }
            if((list[i].pourcentage +"").trim() === "" || (list[i].date  +"").trim() === ""){
                existeVide = true; 
            }
        }

        if(temp > 100 || existeVide){
            setGrise(true);
        }else{
            setGrise(false);
        }
        let rest = (100 - temp);
        setVal(rest);
        
    };
    
 
    const handleInputChange2 = (e , indice ,fieldname) => {
        const current = JSON.parse(JSON.stringify(datePrice));
        current[indice][fieldname] = e.target.value;

        let errorS = {...state};
        errorS.type = null;
        errorS.vide = null;
        setState(errorS);

        setDatePrice(current);
        let existeVide = false;
        for (let i = 0; i < current.length ; i++){
            if((current[i].pourcentage +"").trim() === "" || (current[i].date  +"").trim() === ""){
                existeVide = true; 
            }
        }
        if(existeVide){
            setGrise(true);
        }else{
            setGrise(false); 
        }
   }
   const handleRemoveClick = index => {
       let existeVide = false;
        const list = JSON.parse(JSON.stringify(datePrice));
        if(list[index].pourcentage !== null){
            let convert = Number.parseFloat(list[index].pourcentage);
            let convertValue = Number.parseFloat(valueP);
            setVal(convertValue+convert);
        }
        for (let i = 0; i < list.length ; i++){
            if((list[i].pourcentage +"").trim() === "" || (list[i].date  +"").trim() === ""){
                existeVide = true; 
            }
        }
        if(valueP > 100 || existeVide){
            setGrise(true);
        }else{
            setGrise(false);
        }
        list.splice(index , 1);
        setDatePrice(list);
   }
    // handle click event of the Add button
    const handleAddClick = () => {
        setDatePrice([...datePrice, { date: "", pourcentage: ""}]);
        setGrise(true);
    };

    const handlechangeType = (e) => {
        setType(e.target.value);
    };

    const handleInputChangeInputNom = (e , fieldname) =>{
        if(e.target.value.trim() === ""){
            setNom("");
        }else{
            setMessage("");
            setNom(e.target.value);
        }
    }
    const handleInputChangeInputDesc = (e , fieldname) =>{
        if(e.target.value.trim() === ""){
            setDescription("");
        }else{
            let errorS = JSON.parse(JSON.stringify(state));
            errorS.description = null;
            setState(errorS)
            setDescription(e.target.value);
        }
    }

    const setListPolitiqueAnnulation = (data) => {
        if(data.politique.nom != null){
                let currentNom = JSON.parse(JSON.stringify(nom));
                currentNom = data.politique.nom;
                setNom(currentNom);
                let currentDesc = JSON.parse(JSON.stringify(description));
                currentDesc = data.politique.description;
                setDescription(currentDesc);
            if(data.politique.datePrice.length != 0){
                let current = JSON.parse(JSON.stringify(datePrice));
                current = data.politique.datePrice;
                let temp = 0;
                for(let i = 0 ; i < data.politique.datePrice.length; i++){
                    temp += data.politique.datePrice[i].pourcentage;
                }
                let rest = (100 - temp);
                setVal(rest);
                setShow(true);
                setDatePrice(current);
 
            }else{
                console.log("datePriceVide")
            }
            setSkeleton(false);
        }else{
            console.log("setListPolitiqueAnnulation");
        }
        setGrise(false);
       
    }

    useEffect(() => {
        if(_id != null){
            callAPI('get', '/politique/detail/'+ _id, {}, setListPolitiqueAnnulation);
            console.log("modification")
        }else{
            console.log("insertion")
            setSkeleton(false);
        }  
    }, [_id])


    const insert = () => {
        setBtnLoad(true);
        for(let i = 0 ; i < datePrice.length ; i++){
            datePrice[i].date = Number.parseInt(datePrice[i].date);
            datePrice[i].pourcentage = Number.parseInt(datePrice[i].pourcentage); 
        }
        if(show){
            callAPI('post' , "/politique/insertionPolitique" ,{nom : nom ,description : description, type : dateTime , datePrice : datePrice , remboursable : true}, functionAppel)
        }else{
            callAPI('post' , "/politique/insertionPolitique" ,{nom : nom ,description : description,  remboursable : false}, functionAppel)
        }
      }

      const update = () => {
        setBtnLoad(true);
        let id1 = _id 
        for(let i = 0 ; i < datePrice.length ; i++){
            datePrice[i].date = Number.parseInt(datePrice[i].date);
            datePrice[i].pourcentage = Number.parseInt(datePrice[i].pourcentage); 
        }
        if(show){
            callAPI('post' , "/politique/updateP/"+ _id ,{ id : id1 , nom : nom ,description : description, type : dateTime , datePrice : datePrice , remboursable : true}, functionAppel)
        }else{
            callAPI('post' , "/politique/updateP/"+_id ,{ id : id1 , nom : nom ,description : description,  remboursable : false}, functionAppel)
        }
      }

    const date = datePrice.map( (x, i) => {   
        return (
            <div>
                <div>
                <TextField 
                    id="outlined-size-small"
                    placeholder ={dateTime}
                    size="small"
                    style={{width : "70px" , backgroundColor : "gainsboro" , fontSize :"12px"}}
                    disabled
                />
                <TextField 
                    id="outlined-size-small"
                    size="small" label = {dateTime}
                    type="number" helperText = {(state.type)||(state.vide)}
                    error = {(state.type !== null ? true : false)||(state.vide !== null ? true : false) }
                    name="date" required  value = {x.date}
                    onChange={e => handleInputChange2(e, i , "date")}
                />
                <TextField 
                    id="outlined-size-small"
                    placeholder="Pourcentage : "
                    size="small"
                    style={{width : "130px" , backgroundColor : "gainsboro" , fontSize :"10px"}}
                    disabled
                />
                <TextField
                    id="outlined-size-small" helperText = {(state.pourcentage) }
                    size="small"  name="pourcentage"  
                    error = {(state.pourcentage !== null ? true : false) }
                    type="number" label="pourcentage"
                    value = {x.pourcentage}
                    required
                    onChange={e => handleInputChange(e, i , "pourcentage")}
                />    
                {
                    datePrice.length !== 1 && 
                    <DeleteForeverIcon  style={{color : 'red'}} onClick={() => handleRemoveClick(i)} /> 
                }
                {
                    datePrice.length - 1 === i &&
                    (griseAdd ? <AddCircleIcon color="primary"  /> : 
                        <AddCircleIcon color="primary" onClick={() =>handleAddClick(i)}/>) 
                }
                </div><br/> 
            </div> 
                );
            })

        return (
            <>
                <Navbar currentPage={4}/>
                    
                        <div className ="politiqueContent">
                            {
                             skeletonAffiche ?  <SkelettonForm heigth = {300} />  : 
                             <>
                            <h4 id="title1">Politique d'annulation</h4><hr/>
                            <label>Concellation preference</label><br/>
                            <span id='litleLabel'>Y a-t-il une période pendant laquelle le client peut annuler gratuitement?</span><br/>
                            <RadioGroup
                                aria-label="gender"
                                value={show}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="true" label={<p id='label'>oui</p>} 
                                    control={<Radio onClick = {(e) => setShow(true) }/>}/>
                                <FormControlLabel value="false"  label={<p id='label'>non</p>}
                                    control={<Radio onClick = {(e) => setShow(false) }/>}/>
                            </RadioGroup>
                            <label>precisez les conditions</label>
                                {
                                    show ? 
                                        <div style = {{marginTop : "20px"}}>
                                            <div style = {{marginTop : "20px"}}>
                                                <FormControl component="fieldset">
                                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group"  value={dateTime}>
                                                <FormControlLabel value="jour" control={<Radio size="small"/>} 
                                                        label={<p id='litleLabel'>jour</p>} onClick={(e) => handlechangeType(e)}/>
                                                    <FormControlLabel value="heure" control={<Radio size="small" />} 
                                                        label={<p id='litleLabel'>heure</p>} onClick={(e) => handlechangeType(e)}/>
                                                </RadioGroup>
                                                </FormControl>
                                            </div><br/> 
                                            {date} 
                                           <br/>
                                            <div>
                                                <input
                                                    style={{width : "70px" , borderStyle: "none" , backgroundColor : "#F6F8FC" , minWidth : "0px"}}
                                                    disabled 
                                                />
                                                <TextField 
                                                    id="outlined-size-small"
                                                    size="small"
                                                    name="pourcentage"
                                                    type="number"
                                                    placeholder="dateSejour"
                                                    disabled
                                                />
                                                <TextField 
                                                    id="outlined-size-small"
                                                    placeholder="Pourcentage :"
                                                    size="small"
                                                    style={{width : "130px" , backgroundColor : "gainsboro" , fontSize :"10px"}}
                                                    disabled
                                                />
                                                <TextField
                                                    id="outlined-size-small"
                                                    size="small"
                                                    name="pourcentage"
                                                    type="number"
                                                    value={valueP}
                                                    disabled
                                                />    
                                            </div>
                                        </div>
                                    :  ""
                                } <br/>

                                <div style = {{marginTop :"15px"}}> 
                                    <label id='bigLabel' style={{marginRight:'10px',textDecoration:'underline'}}>Nom politique : </label><br/> 
                                        <TextField
                                                id="outlined-size-small"
                                                size="small" label ="nom"
                                                error = {message ? true : false}
                                                helperText={message}
                                                name="nom"
                                                type="text"
                                                style={{marginTop:'15px'}}
                                                value = {nom}
                                                onChange={e => handleInputChangeInputNom(e)}
                                            />
                                </div>
                                <div style = {{marginTop :"15px"}}> 
                                    <label id='bigLabel' style={{textDecoration:'underline'}}>Description : </label>
                                        <TextField
                                                id="outlined-size-small"
                                                size="small" label ="description"
                                                multiline helperText = {(state.description)}
                                                error = {(state.description !== null ? true : false)}
                                                rows={2} 
                                                rowsMax={4}
                                                style={{width:'100%',height:'50px',marginTop:'15px'}}
                                                name="description"
                                                type="text"
                                                value = {description}
                                                onChange={e => handleInputChangeInputDesc(e)}
                                            />
                                </div> <br/>
                                
                                   <div style = {{width : "fit-content" , margin : " 0 auto" }}>
                                        <div class="bouton-aligne">
                                       { 
                                        _id == null ? 
                                           <> 
                                               {
                                                    nom == "" ? 
                                                    <Button variant="contained"  disabled>
                                                        Sauvegarder
                                                    </Button> :
                                                    <> 
                                                        {
                                                            btnLoad ? <ButtonLoading /> :
                                                             <Button 
                                                                variant="contained" 
                                                                style={{backgroundColor:'#2ac4ea' }}
                                                                id='btn1' 
                                                                onClick={(e) => insert()} >
                                                                Sauvegarder
                                                            </Button>
                                                        }
                                                    </> 
                                                   
                                                }
                                            </> :
                                            <> 
                                                {
                                                     nom == "" ? 
                                                     <Button variant="contained" color="success"  disabled >
                                                        modifier
                                                    </Button> : 
                                                     <> 
                                                        {
                                                            btnLoad ? <ButtonLoading /> :
                                                            <Button variant="contained" 
                                                                style={{backgroundColor:'#FA8072'}}
                                                                onClick={(e) => update()} >
                                                                <span style={{color:'white'}}>modifier</span>
                                                            </Button>
                                                        }
                                                    </>

                                                }   
                                            </> 
                                            
                                        }
                                        </div> 
                                        <div class="bouton-aligne">                                       
                                            <Link to ="/back/politique/list" style={{textDecoration:'none'}}>
                                                <Button 
                                                variant="outlined" 
                                                id='btn2' 
                                                style={{marginLeft : "2px"}}>
                                                    retour
                                                </Button>
                                            </Link>
                                            </div>
                                    </div> <br/></>
                                }
                        </div>  
                          
            </>
        );
    
}

export default Global;