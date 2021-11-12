import CustomError from '../../CustomError';
import { useState } from 'react';
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../typeChambre.css';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useEffect } from 'react'
import callAPI from '../../utility';

function Equipements(props){
    let i = -1;
    let list = props.equipements.map(equipement => {
        i++;
        let u = i;
        console.log(i);
        return (
            <FormControlLabel 
                value={equipement.checked} 
                control={<Checkbox/>}
                onChange={(e) => props.handleEquipementChange(e, u)} 
                label={equipement.nom}
                label={equipement.nom}
                style={{marginLeft:"20px"}}/>
        );
    });
    return list;
}

function InsertChambre(){
    const [errors, setErrors] = useState([]);
    const [equipements, setEquipements] = useState([]);
    const [chambre, setChambre] = 
    useState(
        {
            nom: '', 
            description: '', 
            superficie: '', 
            equipements: []
        }
    );

    function handleInputChange(e, inputName){
        let current = JSON.parse(JSON.stringify(chambre));
        current[inputName] = e.target.value;
        setChambre(current);
    }

    function setListEquipement(res){
        for(let i = 0; i < res.equipements.length; i++){
            res.equipements[i].checked = false;
        }
        setEquipements(res.equipements);
    }
    useEffect(() => {
        callAPI('get', '/equipement', {}, setListEquipement);
    }, [])

    function getRetour(res){
        if(res.status === 200){
            this.props.history.push('/');
        }else{
            errors = res.errors;
        }
        console.log(res);
    }

    function insert(e){
        let idEquipements = [];
        for(let i = 0; i < equipements.length; i++){
            if(equipements[i].checked){
                idEquipements.push(equipements[i]._id);
            }
        }
        chambre.equipements = idEquipements;
        callAPI('post', '/chambre/insert', chambre, getRetour);
    }
    function handleEquipementChange(e, index){
        console.log('checked = ' + e.target.checked + ", index = " + index);
        let current = JSON.parse(JSON.stringify(equipements));
        current[index].checked = e.target.checked;
        console.log(current);
        setEquipements(current);
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                    <div className="col-md-9">
                        <div className="jumbotron" 
                            style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)',marginTop:'-60px'}}>
                            <h1 className="text-center" id='title1'>Ajouter chambre</h1>
                            <hr></hr>
                            <CustomError errors={errors} />
                            <form className="needs-validation">
                                <Box>
                                    <div style={{marginTop:'40px',display:'inline'}}>
                                        <TextField 
                                            id="standard-basic" 
                                            label="Nom" 
                                            variant="standard" 
                                            style={{width:'40%'}}
                                            type="text" 
                                            value={chambre.nom} 
                                            onChange={(e) => handleInputChange(e, "nom")}
                                        />
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <TextField 
                                            id="standard-basic" 
                                            label="Description" 
                                            variant="standard" 
                                            type="text"
                                            multiline
                                            rows={2}
                                            rowsmax={4}
                                            style={{width:'40%',marginLeft:'0'}}
                                            value={chambre.description} 
                                            onChange={(e) => handleInputChange(e, "description")}
                                        />
                                    </div>
                                    <div style={{marginTop:'30px'}}>
                                        <TextField 
                                            id="standard-basic" 
                                            label="Superficie" 
                                            variant="standard" 
                                            style={{width:'40%'}}
                                            type="number" 
                                            value={chambre.superficie} 
                                            onChange={(e) => handleInputChange(e, "superficie")}
                                        />
                                    </div>
                                    <div style={{marginTop:'20px'}}>
                                        <div style={{}}>
                                            <label className="form-label mt-4" style={{textDecoration:'underline'}}>Equipements: </label>
                                        </div>
                                        <div>
                                            <Equipements 
                                                equipements={equipements}
                                                handleEquipementChange={handleEquipementChange} />
                                        </div>
                                    </div>
                                </Box>
                                <div style={{marginTop:'50px'}}>
                                    <Button variant="contained" color="success" onClick={(e) => insert(e)}>
                                        Créer
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default InsertChambre;