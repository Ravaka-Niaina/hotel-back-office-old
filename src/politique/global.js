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
import callAPI from '../utility.js';
import Navbar from '../Navbar/Navbar.js'
import { useParams, useHistory, Link } from 'react-router-dom'
import "./global.css";
import axios from "axios";

function Global(){
    const [datePrice , setDatePrice] = useState([{ date:"" , pourcentage: ""}]);
    const [dateTime , setType] = useState("jour")
    const [valueP , setVal] = useState(100);
    const [nom , setNom] = useState ("")
    const[description, setDescription] = useState('');
    const[show , setShow] = useState(false);
    const[message  , setMessage] = useState("");
    const [griseAdd , setGrise] = useState(false);

    const { _id } = useParams();        
    
       
    let history = useHistory();
    const functionAppel=(res)=>{
        console.log(res.status);
        if(res.status == 500){
            setMessage(res.message);
        }else if(res.status == 200 ){
            console.log(res);
            history.push("/politique/list");
       }else{
           console.log("pas de reponse");
       }
           
    }
    /* handle input change*/
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...datePrice];
        list[index][name] = value;
        setDatePrice(list);

        let temp = 0;
        for (let i = 0; i < list.length ; i++){
            if(list[i].pourcentage != null){
                let convert = Number.parseFloat(list[i].pourcentage); 
                temp += convert;  
            }
        }
        if(temp > 100 ){
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
    setDatePrice(current);
   }
   const handleRemoveClick = index => {
        const list = JSON.parse(JSON.stringify(datePrice));
        if(list[index].pourcentage !== null){
            let convert = Number.parseFloat(list[index].pourcentage);
            let convertValue = Number.parseFloat(valueP);
            setVal(convertValue+convert);
        }
        if(valueP > 100){
            setGrise(true);
        }else{
            setGrise(false);
        }
        list.splice(index , 1);
        setDatePrice(list);
   }
    /*const handleRemoveClick = index => {
        const list = [...datePrice];
        list.splice(index, 1);
        setDatePrice(list);
        
        
    };*/
    
    // handle click event of the Add button
    const handleAddClick = () => {
        setDatePrice([...datePrice, { date: "", pourcentage: ""}]);
    };

    const handlechangeType = (e) => {
        setType(e.target.value);
    };

    const handleInputChangeInputNom = (e , fieldname) =>{
        if(e.target.value.trim() === ""){
            setNom("");
        }else{
            setNom(e.target.value);
        }
    }
    const handleInputChangeInputDesc = (e , fieldname) =>{
        if(e.target.value.trim() === ""){
            setDescription("");
        }else{
            setDescription(e.target.value);
        }
    }

    const setListPolitiqueAnnulation = (data) => {
        console.log(data);
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
            console.log(show);
        }else{
            console.log("setListPolitiqueAnnulation");
        }
       
    }

    useEffect(() => {
        if(_id != null){
            callAPI('get', '/politique/detail/'+ _id, {}, setListPolitiqueAnnulation);
            console.log("modification")
        }else(
            console.log("insertion")
        )
        
    }, [_id])


    const insert = () => {
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
        for(let i = 0 ; i < datePrice.length ; i++){
            datePrice[i].date = Number.parseInt(datePrice[i].date);
            datePrice[i].pourcentage = Number.parseInt(datePrice[i].pourcentage); 
        }
        if(show){
            callAPI('post' , "/politique/updateP/"+ _id ,{nom : nom ,description : description, type : dateTime , datePrice : datePrice , remboursable : true}, functionAppel)
        }else{
            callAPI('post' , "/politique/updateP/"+_id ,{nom : nom ,description : description,  remboursable : false}, functionAppel)
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
                    type="number"
                    name="date"
                    required
                    value = {x.date}
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
                    id="outlined-size-small"
                    size="small"
                    name="pourcentage"
                    type="number"
                    value = {x.pourcentage}
                    label="pourcentage"
                    required
                    onChange={e => handleInputChange(e, i)}
                />    
                {
                    datePrice.length !== 1 && 
                    <DeleteForeverIcon  style={{color : 'red'}} onClick={() => handleRemoveClick(i)} /> 
                }
                </div><br/> 
            </div> 
                );
            })

        return (
            <>
            <Navbar currentPage={2}/>
            <div className="container" style={{marginTop : "100px"}}>
                <div className ="row">
                    <div className ="col-md-2"></div>
                        <div className ="col-md-8" style ={{boxShadow : '0 0 20px 0 rgb(0 0 0 / 20%), 0 5px 5px 0 rgb(0 0 0 / 25%)'}} ><br/>
                            <h4 style={{textAlign : 'center'}}>Politique d'annulation</h4><hr/>
                            <strong>Concellation preference</strong><br/>
                            <span>Y a-t-il une période pendant laquelle le client peut annuler gratuitement?</span><br/>
                            <RadioGroup
                                aria-label="gender"
                                value={show}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="true" label="oui" 
                                    control={<Radio onClick = {(e) => setShow(true) }/>}/>
                                <FormControlLabel value="false"  label="non"
                                    control={<Radio onClick = {(e) => setShow(false) }/>}/>
                            </RadioGroup>
                            <strong>precisez les conditions</strong>
                                {
                                    show ? 
                                        <div style = {{marginTop : "20px"}}>
                                            <div style = {{marginTop : "20px"}}>
                                                <FormControl component="fieldset">
                                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group"  value={dateTime}>
                                                <FormControlLabel value="jour" control={<Radio size="small"/>} 
                                                        label="jour" onClick={(e) => handlechangeType(e)}/>
                                                    <FormControlLabel value="heure" control={<Radio size="small" />} 
                                                        label="heure" onClick={(e) => handlechangeType(e)}/>
                                                </RadioGroup>
                                                </FormControl>
                                            </div><br/> 
                                            {date} 
                                           <br/>
                                        <div>
                                            <input
                                                style={{width : "70px" , borderStyle: "none" , backgroundColor : "white" , minWidth : "0px"}}
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
                                        { 
                                            griseAdd ?
                                            <Button variant="contained" endIcon={<AddIcon />} disabled
                                                    onClick={handleAddClick}><span style ={{color : "white"}} >Add</span>
                                            </Button>  : 
                                             <Button variant="contained" endIcon={<AddIcon />} 
                                                    onClick={handleAddClick}><span style ={{color : "white"}} >Add</span>
                                            </Button>
                                        }  
                                        </div>
                                    :  ""
                                } <br/>
                                {message !== "" ? <Alert severity="error">{message}</Alert> : " " }<br/> 
                                <div style = {{marginTop :"15px"}}> 
                                    <strong >Nom politique : </strong>
                                        <TextField
                                                id="outlined-size-small"
                                                size="small" label ="nom"
                                                name="nom"
                                                type="text"
                                                value = {nom}
                                                onChange={e => handleInputChangeInputNom(e)}
                                            />
                                </div>
                                <div style = {{marginTop :"15px"}}> 
                                    <strong >Description : </strong>
                                        <TextField
                                                id="outlined-size-small"
                                                size="small" label ="description"
                                                multiline
                                                rows={2}
                                                rowsMax={4}
                                                style={{width:'100%',height:'50px'}}
                                                name="description"
                                                type="text"
                                                value = {description}
                                                onChange={e => handleInputChangeInputDesc(e)}
                                            />
                                </div> <br/>
                                
                                   <div style = {{width : "fit-content" , margin : " 0 auto" }}>
                                       { 
                                        _id == null ? 
                                           <> 
                                               {
                                                    nom == "" ? 
                                                    <Button variant="contained" color="success" onClick={(e) => insert()} disabled>
                                                        Sauvegarder
                                                    </Button> :
                                                    <Button variant="contained" color="success" onClick={(e) => insert()} >
                                                        Sauvegarder
                                                    </Button>
                                                }
                                            </> :
                                            <> 
                                                {
                                                     nom == "" ? 
                                                     <Button variant="contained" color="success" onClick={(e) => update()} disabled >
                                                        modifier
                                                    </Button> : 
                                                    <Button variant="contained" color="success" onClick={(e) => update()} >
                                                        modifier
                                                    </Button>

                                                }   
                                            </> 
                                            
                                        }
                                            <Link to ="/politique/list">
                                                <Button variant="contained" style={{marginLeft : "2px"}}>retour</Button>
                                            </Link>
                                    </div> <br/>
                                              
                        </div>
                        <div className ="col-md-2"></div>
                </div>
            </div>
            </>
        );
    
}

export default Global;