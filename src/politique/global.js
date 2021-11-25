import React , {useState} from 'react';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import InputAdornment from '@mui/material/InputAdornment';
import {useEffect} from 'react';
import callAPI from '../utility.js';
import { useParams, useHistory } from 'react-router-dom'
import "./global.css";

function Global(){
    const [datePrice , setDatePrice] = useState([{ date:"" , pourcentage: "" , type : "jour"}]);

    const [nom , setNom] = useState ("")
    const[show , setShow] = useState(false);
    const[message  , setMessage] = useState("");
    const[messageErrPourC , setmessageErrPourC] = useState("");
    const[messageErrDate , setmessageErrDate] = useState("");
    const { _id } = useParams();        
    
       
    let history = useHistory();
    const functionAppel=(res)=>{
        if(res.status == 500){
            setmessageErrPourC(res.messageErrPourC);
            setmessageErrDate(res.messageErrDate);
        }else if(res.status == 200 ){
            console.log(res);
            history.push("/politique/list");
       }else{
           console.log("pas de reponse");
       }
           
    }
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...datePrice];
        list[index][name] = value;
        setDatePrice(list);
    };
    
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...datePrice];
        list.splice(index, 1);
        setDatePrice(list);
    };
    
    // handle click event of the Add button
    const handleAddClick = () => {
        setDatePrice([...datePrice, { date: "", pourcentage: "" ,type :"jour"}]);
    };

    const handlechange = (e , z) => {
        const copie = JSON.parse(JSON.stringify(datePrice));
        if(copie[z].type === "time"){
            copie[z].type = 'jour';
        }else{
            copie[z].type = 'heure';
        }
        setDatePrice(copie);
    };
    const handlechangeHeure = (e , z) => {
        const copie = JSON.parse(JSON.stringify(datePrice));
            copie[z].type = 'heure';
        setDatePrice(copie);
    };
    const handlechangeJour = (e , z) => {
        const copie = JSON.parse(JSON.stringify(datePrice));
            copie[z].type = 'jour';
        setDatePrice(copie);
    };

    const handleInputChangeInput = (e) =>{
        if(e.target.value.trim() === ""){
            setNom("");
        }else{
            setNom(e.target.value);
        }
    }

    const setListPolitiqueAnnulation = (data) => {
        console.log(data);
        if(data.politique.nom != null){
                let currentNom = JSON.parse(JSON.stringify(nom));
                currentNom = data.politique.nom;
                setNom(currentNom);
            if(data.politique.datePrice.length != 0){
                let current = JSON.parse(JSON.stringify(datePrice));
                current = data.politique.datePrice;
                setDatePrice(current);
                setShow(true);
            }else{
                console.log("datePriceVide")
            }
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
            callAPI('post' , "/politique/insertionPolitique" ,{nom : nom , datePrice : datePrice , remboursable : true}, functionAppel)
        }else{
            callAPI('post' , "/politique/insertionPolitique" ,{nom : nom ,  remboursable : false}, functionAppel)
        }
      }

      const update = () => {
        for(let i = 0 ; i < datePrice.length ; i++){
            datePrice[i].date = Number.parseInt(datePrice[i].date);
            datePrice[i].pourcentage = Number.parseInt(datePrice[i].pourcentage); 
        }
        if(show){
            callAPI('post' , "/politique/updateP/"+ _id ,{nom : nom , datePrice : datePrice , remboursable : true}, functionAppel)
        }else{
            callAPI('post' , "/politique/updateP/"+_id ,{nom : nom ,  remboursable : false}, functionAppel)
        }
      }

    const date = datePrice.map( (x, i) => {   
        return (
            <tr>
                <td colspan="2">
                    <TextField id="input-with-sx"  
                        variant="standard" 
                        name="date"
                        type="number" style={{width : "150px"}}
                        value={x.date}
                        onChange={e => handleInputChange(e, i)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><strong>{x.type}</strong></InputAdornment>,
                          }}
                    />
                    
                </td>
                <td>
                    <TextField
                        id="outlined-size-small"
                        defaultValue="Small"
                        size="small"
                        name="pourcentage"
                        type="number"
                        placeholder="pourcentage"
                        value={x.pourcentage}
                        onChange={e => handleInputChange(e, i)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><strong >%</strong></InputAdornment>,
                          }}
                    />
                    
                </td>
            <td>
                {
                    datePrice.length !== 1 && 
                    <DeleteForeverIcon  style={{color : 'red' , fontSize:"50px"}} onClick={() => handleRemoveClick(i)} /> 
                }
            </td>
            <td>
                <FormControl component="fieldset">
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group"  defaultValue={x.type}>
                <FormControlLabel value="jour" control={<Radio size="small"/>} 
                        label="jour" onClick={(e) => handlechangeJour(e , i)}/>
                    <FormControlLabel value="heure" control={<Radio size="small" />} 
                        label="heure" onClick={(e) => handlechangeHeure(e , i)}/>
                </RadioGroup>
                </FormControl>
            </td>
        </tr> 
                   
                );
            })

        return (
            <div className="container" style={{marginTop : "50px"}}>
                <div className ="row">
                    <div className ="col-md-2"></div>
                        <div className ="col-md-8" style ={{boxShadow : '0 0 20px 0 rgb(0 0 0 / 20%), 0 5px 5px 0 rgb(0 0 0 / 25%)'}} ><br/>
                            <h4 style={{textAlign : 'center'}}>Politique d'annulation</h4><hr/>
                            <h5 style={{textAlign : 'center' , color :"red"}}>{message}</h5>
                            <strong>Concellation preference</strong><br/>
                            <span>Y a-t-il une période pendant laquelle le client peut annuler gratuitement?</span><br/>
                            <RadioGroup
                                aria-label="gender"
                                defaultValue="false"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="true" checked={show.checkedOui}  label="oui" 
                                    control={<Radio onClick = {(e) => setShow(true) }/>}/>
                                <FormControlLabel value="false"  label="non" checked={show.checkedNon}
                                    control={<Radio onClick = {(e) => setShow(false) }/>}/>
                            </RadioGroup>
                            <strong>precisez les conditions</strong>
                                {
                                    show ? 
                                    <div style = {{marginTop : "20px"}}>
                                        <table className="table">
                                            {date}
                                            <tr>
                                                <th colspan="2" id="error"> {messageErrDate}</th>
                                                <th colspan ="2" id="error"> {messageErrPourC}</th>
                                                <th ></th><th></th>
                                            </tr>    
                                        </table> <br/>
                                        <Button variant="contained" endIcon={<AddIcon />} onClick={handleAddClick}><span style ={{color : "white"}} >Add</span></Button>
                                        <br/>
                                        <div style={{width:"fit-content",margin :"auto"}}>
                                        
                                         </div>
                                    </div>
                                    :  ""
                                } 
                                <div style = {{marginTop :"15px"}}> 
                                    <strong >Nom politique : </strong>
                                        <TextField
                                                id="outlined-size-small"
                                                size="small"
                                                name="nom"
                                                type="text"
                                                value = {nom}
                                                placeholder="nom"
                                                onChange={e => handleInputChangeInput(e)}
                                            />
                                </div> <br/>
                                
                                   <div style = {{width : "fit-content" , margin : "0 auto"}}>
                                       { 
                                        _id == null ? 
                                           <div> 
                                               {
                                                    nom == "" ? 
                                                    <Button variant="contained" color="success" onClick={(e) => insert()} disabled>
                                                        Sauvegarder
                                                    </Button> :
                                                    <Button variant="contained" color="success" onClick={(e) => insert()} >
                                                        Sauvegarder
                                                    </Button>
                                                }
                                            </div> :
                                            <div> 
                                                {
                                                     nom == "" ? 
                                                     <Button variant="contained" color="success" onClick={(e) => update()} disabled >
                                                        modifier
                                                    </Button> : 
                                                    <Button variant="contained" color="success" onClick={(e) => update()} >
                                                        modifier
                                                    </Button>

                                                }   
                                            </div> 
                                            
                                        }
                                    </div> <br/>
                                              
                        </div>
                    <div className ="col-md-2">
                        
                    </div>
                </div>
            </div>
        );
    
}

export default Global;