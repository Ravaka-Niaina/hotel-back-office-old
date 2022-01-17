import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import styles from './Register.module.css';

import callAPI from '../../../utility.js';

const Register = () => {
    const [isPartner, setIsPartner] = React.useState(false);
    const [nom, setNom] = React.useState("");
    const [errorNom, setErrorNom] = React.useState(null);
    const [prenom, setPrenom] = React.useState("");
    const [errorPrenom, setErrorPrenom] = React.useState(null);
    const [email, setEmail] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState(null);
    const [mdp, setMdp] = React.useState("");
    const [errorMdp, setErrorMdp] = React.useState(null);
    const [confirmMdp, setConfirmMdp] = React.useState("");
    const [errorConfirmMdp, setErrorConfirmMdp] = React.useState(null);
    const [companies, setCompanies] = React.useState([
        {
            value: "",
            label: ""
        }, 
        {
            value: "h1",
            label: "Colbert"
        },
        {
            value: "h2",
            label: "Colbert 2"
        },
        {
            value: "h3",
            label: "Carliton"
        },
        {
            value: "h4",
            label: "Carliton 2"
        }
    ]);
    const [companie, setCompanie] = React.useState(null);
    const [errorCompanie, setErrorCompanie] = React.useState(null);

    const history = useHistory();

    useEffect(() => {
        const regExp = new RegExp("/back/","i");
        if(regExp.test(window.location.href)){
            setIsPartner(true);
        }
    }, []);

    const interpretResponse = (data) => {
        if(data.status === 200){
            history.push(isPartner ? '/back/login' : '/front/login');
        }else{
            const setErrors = [
                {field: "nom", setter: setErrorNom},
                {field: "prenom", setter: setErrorPrenom},
                {field: "email", setter: setErrorEmail},
                {field: "mdp", setter: setErrorMdp},
                {field: "confirmMdp", setter: setErrorConfirmMdp},
                {field: "companie", setter: setErrorCompanie}
            ];
            let keys = Object.keys(data.errors);
            keys.map(field => {
                for(let i = 0; i < setErrors.length; i++){
                    if(setErrors[i].field === field){
                        setErrors[i].setter(data.errors[field]);
                    }
                }
            });
        }
    };

    const register = (e) => {
        e.preventDefault();
        const data = {
            isPartner: isPartner,
            nom: nom.trim(),
            prenom: prenom.trim(),
            email: email.trim(),
            mdp: mdp.trim(),
            confirmMdp: confirmMdp.trim()
        };
        if(isPartner){
            data.companie = companie;
        }
        callAPI('post', '/user/register', data, interpretResponse);
    };
    return(
      <div className={styles.auth}>
            <Paper 
                elevation={1}
                className={styles.auth}
                children={
                    <>
                        <h1>S'inscrire {isPartner ? "en tant que partenaire" : null}</h1>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Nom</p>}
                                type="text"
                                value={nom} onChange={(e) => {setErrorNom(null); setNom(e.target.value)}}
                                error={errorNom === null ? false : true}
                                helperText={errorNom === null ? null : errorNom}
                            /> 
                            <TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Prénoms</p>}
                                type="text"
                                value={prenom} onChange={(e) => {setErrorPrenom(null); setPrenom(e.target.value)}}
                                error={errorPrenom === null ? false : true}
                                helperText={errorPrenom === null ? null : errorPrenom}
                            /> 
                            
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Email</p>}
                                type="email"
                                value={email} onChange={(e) => {setErrorEmail(null); setEmail(e.target.value)}}
                                error={errorEmail === null ? false : true}
                                helperText={errorEmail === null ? null : errorEmail}
                            /> 
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Mot de passe</p>}
                                type="password"
                                value={mdp} onChange={(e) => {setErrorMdp(null); setMdp(e.target.value)}}
                                error={errorMdp === null ? false : true}
                                helperText={errorMdp === null ? null : errorMdp}
                            /> 
                            <TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Confirmation mot de passe</p>}
                                type="password"
                                value={confirmMdp} onChange={(e) => {setErrorConfirmMdp(null); setConfirmMdp(e.target.value)}}
                                error={errorConfirmMdp === null ? false : true}
                                helperText={errorConfirmMdp === null ? null : errorConfirmMdp}
                            />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                        {
                            isPartner ? 
                            <TextField
                                id="standard-select-currency-native"
                                select
                                label="Companie"
                                value={companie}
                                onChange={(e) => setCompanie(e.target.value)}
                                SelectProps={{
                                    native: true,
                                }}
                                error={errorCompanie === null ? false : true}
                                helperText={errorCompanie === null ? null : errorCompanie}
                            >
                                {companies.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                            : null
                        }
                        </Box>
                        <div className={styles.btn}>
                        <Button variant="contained" onClick={(e) => register(e)}>
                            <span style={{color:'white'}}>S'inscrire</span>
                        </Button>
                        </div>
                    </>
                } 
            />
      </div>
    );
  };
  
  export default Register;