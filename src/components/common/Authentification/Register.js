import React, { useEffect, useState, } from "react";
import { useHistory } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import styles from './Register.module.css';

import callAPI from '../../../utility.js';

const CustomBox = ({content}) => {
    return(
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '250px' },
            }}
            noValidate
            autoComplete="off"
        >
            {content}
        </Box>
    );
};

const Register = () => {
    const [isPartner, setIsPartner] = useState(false);
    const [nom, setNom] = useState('');
    const [errorNom, setErrorNom] = useState(null);
    const [prenom, setPrenom] = useState('');
    const [errorPrenom, setErrorPrenom] = useState(null);
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(null);
    const [backupEmail, setBackupEmail] = useState('');
    const [errorBackupEmail, setErrorBackupEmail] = useState(null);
    const [mdp, setMdp] = useState('');
    const [errorMdp, setErrorMdp] = useState(null);
    const [confirmMdp, setConfirmMdp] = useState('');
    const [errorConfirmMdp, setErrorConfirmMdp] = useState(null);
    const [companies, setCompanies] = useState([
        {
            value: '',
            label: ''
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
    const [companie, setCompanie] = useState(null);
    const [errorCompanie, setErrorCompanie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorTel, setErrorTelephone] = useState(null);
    const [telephone, setTelephone] = useState('');


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
                { field: "backupEmail", setter: setErrorBackupEmail },
                {field: "mdp", setter: setErrorMdp},
                {field: "confirmMdp", setter: setErrorConfirmMdp},
                {field: "companie", setter: setErrorCompanie},
                {field: "telephone", setter: setErrorTelephone}
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
        setLoading(false);
    };

    const register = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            isPartner: isPartner,
            name: nom.trim(),
            first_name: prenom.trim(),
            email: email.trim(),
            backupEmail: backupEmail.trim(),
            password: mdp.trim(),
            confirmed_password: confirmMdp.trim(),
            phone:telephone.trim()
        };
        if(isPartner){
            data.companie = companie;
        }
        callAPI('post', '/user/register', data, interpretResponse);
    };

    const keyPress = (e) => {
        if(e.keyCode == 13){
            register(e);
        }
    }

    return(
      <div className={styles.auth}>
            <h1>S'inscrire {isPartner ? "en tant que partenaire" : null}</h1>
            <Paper 
                elevation={1}
                className={styles.auth}
                children={
                    <>
                        <CustomBox 
                            content={<TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Nom</p>}
                                type="text"
                                value={nom} onChange={(e) => {setErrorNom(null); setNom(e.target.value)}}
                                error={errorNom === null ? false : true}
                                helperText={errorNom === null ? null : errorNom}
                                onKeyDown={keyPress}
                            /> } />
                        <CustomBox 
                            content={<TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Prénoms</p>}
                                type="text"
                                value={prenom} onChange={(e) => {setErrorPrenom(null); setPrenom(e.target.value)}}
                                error={errorPrenom === null ? false : true}
                                helperText={errorPrenom === null ? null : errorPrenom}
                                onKeyDown={keyPress}
                            />} />
                        <CustomBox 
                            content={<TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Email</p>}
                                type="email"
                                value={email} onChange={(e) => {setErrorEmail(null); setEmail(e.target.value)}}
                                error={errorEmail === null ? false : true}
                                helperText={errorEmail === null ? null : errorEmail}
                                onKeyDown={keyPress}
                            /> } />
                        {
                            isPartner
                            ? <CustomBox 
                                content={<TextField 
                                    id="outlined-basic"
                                    variant="outlined"
                                    size='small'
                                    label={<p>Email de secours</p>}
                                    type="email"
                                    value={backupEmail} onChange={(e) => {setErrorBackupEmail(null); setBackupEmail(e.target.value)}}
                                    error={errorBackupEmail === null ? false : true}
                                    helperText={errorBackupEmail === null ? null : errorBackupEmail}
                                    onKeyDown={keyPress}
                                /> }
                            />
                            :  null
                        }
                        <CustomBox 
                            content={<TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>telephone</p>}
                                type="email"
                                value={telephone} onChange={(e) => {setErrorTelephone(null); setTelephone(e.target.value)}}
                                error={errorTel === null ? false : true}
                                helperText={errorTel === null ? null : errorTel}
                                onKeyDown={keyPress}
                            /> } />
                        <CustomBox 
                            content={<TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Mot de passe</p>}
                                type="password"
                                value={mdp} onChange={(e) => {setErrorMdp(null); setMdp(e.target.value)}}
                                error={errorMdp === null ? false : true}
                                helperText={errorMdp === null ? null : errorMdp}
                                onKeyDown={keyPress}
                            /> } />
                        <CustomBox 
                            content={<TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Confirmation mot de passe</p>}
                                type="password"
                                value={confirmMdp} onChange={(e) => {setErrorConfirmMdp(null); setConfirmMdp(e.target.value)}}
                                error={errorConfirmMdp === null ? false : true}
                                helperText={errorConfirmMdp === null ? null : errorConfirmMdp}
                                onKeyDown={keyPress}
                            />} />
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
                                style={{width: '250px' }}
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
                            <LoadingButton
                                sx={{width: 250}}
                                onClick={(e) => register(e)}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<HowToRegIcon />}
                                variant="contained"
                            >
                                    <span style={{color:'white'}}>S'inscrire</span>
                            </LoadingButton>
                        </div>
                    </>
                } 
            />
      </div>
    );
  };
  
  export default Register;