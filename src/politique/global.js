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

function Global(){
    const [datePrice , setDatePrice] =  useState([{ date: "", pourcentage: "" , type:"number" , jour : "jours" }]);
    const[show , setShow] = useState(false);
    const[jours  , setJour] = useState("");
    //
        useEffect( () => {
            
        }, []);

    const functionAppel=(res)=>{
        console.log(res);
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
        setDatePrice([...datePrice, { date: "", pourcentage: "" , type:"number" , jour :"jours" }]);
    };

    const handlechange = (e , z) => {
        const copie = JSON.parse(JSON.stringify(datePrice));
        if(copie[z].type === "time"){
            copie[z].type = 'number';
            copie[z].jour = "jours"
        }else{
            copie[z].type = 'time';
            copie[z].jour = ""
        }
        setDatePrice(copie);
    };
    const handlechangeHeure = (e , z) => {
        const copie = JSON.parse(JSON.stringify(datePrice));
            copie[z].type = 'time';
            copie[z].jour = "";
        setDatePrice(copie);
    };
    const handlechangeJour = (e , z) => {
        const copie = JSON.parse(JSON.stringify(datePrice));
            copie[z].type = 'number';
            copie[z].jour = "jours"
        setDatePrice(copie);
    };

    const insert = () => {
        callAPI('post' , "/politique/insertionPolitique" ,datePrice,functionAppel)
    }

            //let v = -1;
    const date = datePrice.map( (x, i) => {
                //v++;
                //let z = v ;
                
        return (
            <tr>
                <td colspan="2">
                    <TextField id="input-with-sx"  
                        variant="standard" 
                        name="date"
                        type={x.type} style={{width : "150px"}}
                        value={x.date}
                        onChange={e => handleInputChange(e, i)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><strong>{x.jour}</strong></InputAdornment>,
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
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group"  defaultValue="jours">
                <FormControlLabel value="jours" control={<Radio size="small"/>} 
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
            <div className="container" ><br/>
                <div className ="row">
                    <div className ="col-md-2"></div>
                        <div className ="col-md-8" style ={{boxShadow : '0 0 20px 0 rgb(0 0 0 / 20%), 0 5px 5px 0 rgb(0 0 0 / 25%)'}} ><br/>
                            <h4 style={{textAlign : 'center'}}>Politique d'annulation</h4><hr/>
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

                            <strong>precisez les conditions</strong><br/><br/>
                                {
                                show ? 
                                <div>
                                    <table className="table table-striped">
                                        {date}
                                    </table> <br/>
                                    <Button variant="contained" endIcon={<AddIcon />} onClick={handleAddClick}>Add</Button>
                                    <br/><br/><br/>
                                    <div style={{width:"fit-content",margin :"auto"}}>
                                    <Button variant="contained" color="success" onClick={(e) => insert()}>Sauvegarder</Button>
                                    </div>
                                </div>
                                : null
                                }
                        </div>
                    <div className ="col-md-2">
                        
                    </div>
                </div>
            </div>
        );
    
}

export default Global;