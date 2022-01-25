import React from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import styles from './Register.module.css';
const Register = () => {
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
    const [companies, setCompanies] = React.useState([]);
    return(
      <div className={styles.auth}>
            <Paper 
                elevation={1}
                className={styles.auth}
                children={
                    <>
                        <h1>Inscription</h1>
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
                                value={nom} onChange={(e) => setNom(e.target.value.trim())}
                                error={errorNom === null ? false : true}
                                helperText={errorNom === null ? null : errorNom}
                            /> 
                            <TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Prénoms</p>}
                                type="text"
                                value={prenom} onChange={(e) => setPrenom(e.target.value.trim())}
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
                                value={email} onChange={(e) => setEmail(e.target.value.trim())}
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
                                value={mdp} onChange={(e) => setMdp(e.target.value.trim())}
                                error={errorMdp === null ? false : true}
                                helperText={errorMdp === null ? null : errorMdp}
                            /> 
                            <TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Confirmation mot de passe</p>}
                                type="password"
                                value={confirmMdp} onChange={(e) => setConfirmMdp(e.target.value.trim())}
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

                        </Box>
                    </>
                } 
            />
      </div>
    );
  };
  
  export default Register;