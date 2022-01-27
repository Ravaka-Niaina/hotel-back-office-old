import  React,{useEffect}  from 'react';
import { useHistory } from 'react-router-dom';
import  Navbar  from "../Navbar/Navbar";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

import styles from './InsertDroitAcces.module.css';
import callAPI from '../../../utility.js';
import {session} from '../../common/utilitySession.js';
import Login from '../../common/Authentification/Login.js';
import NotEnoughAccessRight from '../../common/NotEnoughAccessRight.js';

const InsertDroitAcces = () => {
    const [id, setId] = React.useState("");
    const [errorId, setErrorId] = React.useState(null);
    const [nom, setNom] = React.useState("");
    const [errorNom, setErrorNom] = React.useState(null);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const history = useHistory();

    const { _id } = useParams();

    useEffect(() => {
        const isConnected = session.getInstance().isConnected();
        const hasAR = session.getInstance().hasOneOfTheseAccessRights(["superAdmin"]);
        if(!isConnected){
            return(<Login urlRedirect={window.location.href} />);
        }
        if(!hasAR){
            return(<NotEnoughAccessRight />);
        }
        const regExp = new RegExp("/update","i");
        if(regExp.test(window.location.href)){
            setIsUpdate(true);
            getDetail(_id);
        }
    }, [_id]);

    const interpretResponse = (data) => {
        if(data.status === 401){
            window.location.href = "/back/login";
        }else if(data.status === 403){
            return(<NotEnoughAccessRight />);
        }else if(data.status !== 200){
            if(data.errors.id !== undefined){
                setErrorId(data.errors.id);
            }
            if(data.errors.nom !== undefined){
                setErrorNom(data.errors.nom);
            }
        }else{
            history.push("/back/accessRight/");
        }
    };

    const insert = (e) => {
        e.preventDefault();
        const data = {
            id: id,
            nom: nom
        };
        callAPI('post', '/droitAcces/insert', data, interpretResponse);
    };

    const getDetail = (id) => {
        callAPI('post', '/droitAcces/detail/' + id, {}, (data) => {
            if(data.status === 200){
                setId(data.droitAcces._id);
                setNom(data.droitAcces.nom);
            }else{
                setErrorId(data.error);
            }
        });
    };

    const update = (e) => {
        e.preventDefault();
        const data = {
            id: id,
            nom: nom
        };
        callAPI('post', '/droitAcces/update', data, interpretResponse);
    };

    return(
        <>
            <Navbar currentPage={8}/><br/>
            <Box sx={{ width: '100%', padding :"50px" }}>
                <Paper 
                    sx={{ overflow: "auto" }}
                    elevation={1}
                    children={
                        <div className={styles.accessRight}>
                            <h1>{isUpdate ? "Modifier un droit d'accès" : "Créer un droit d'accès"}</h1>
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
                                    label={<p>Id</p>}
                                    type="email"
                                    value={id} onChange={(e) => {setErrorId(null); setId(e.target.value)}}
                                    error={errorId === null ? false : true}
                                    helperText={errorId === null ? null : errorId}
                                />
                                <TextField 
                                    id="outlined-basic"
                                    variant="outlined"
                                    size='small'
                                    label={<p>Nom</p>}
                                    type="email"
                                    value={nom} onChange={(e) => {setErrorNom(null); setNom(e.target.value)}}
                                    error={errorNom === null ? false : true}
                                    helperText={errorNom === null ? null : errorNom}
                                /> 
                            </Box>
                            <Stack spacing={1}>
                                <Button sx={{width: 200}} variant="contained" onClick={(e) => isUpdate ? update(e) : insert(e)}>
                                    <span style={{color:'white'}}>{isUpdate ? "Modifier" : "Insérer"}</span>
                                </Button>
                            </Stack>
                        </div>
                    } 
                />
            </Box>
        </>
    );
};

export default InsertDroitAcces;