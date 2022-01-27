import  React,{useEffect}  from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import callAPI from '../../../utility.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import  Navbar  from "../Navbar/Navbar";
import {Champs} from '../../common/commonAssets';
import {session} from '../../common/utilitySession.js';
import NotEnoughAccessRight from '../../common/NotEnoughAccessRight';
import styles from './DetailsUser.module.css';
import ListeDroitAcces from './ListeDroitAcces.js';
import {getDateTime} from '../../../utility/utilityDate.js';

const SwitchableEditValue = ({isEditable, type, label, value, setValue, err, setErr}) => {
    return(
        <>
            {isEditable 
            ? <TextField 
                id="outlined-basic"
                variant="outlined"
                size='small'
                label={<p>{label}</p>}
                type={type}
                value={value} onChange={(e) => {setErr(null); setValue(e.target.value)}}
                error={err === null ? false : true}
                helperText={err === null ? null : err}
            /> : <Champs label={label} value={value} />}
        </>
    );
}

const DetailsUser = () => {
    const [otherError, setOtherError] = React.useState(null);
    const [nom, setNom] = React.useState("");
    const [errorNom, setErrorNom] = React.useState(null);
    const [prenom, setPrenom] = React.useState("");
    const [errorPrenom, setErrorPrenom] = React.useState(null);
    const [email, setEmail] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState(null);
    const [dateInscription, setDateInscription] = React.useState("");
    const [companie, setCompanie] = React.useState("");
    const [atribAR, setAtribAR] = React.useState([]);
    const [notAtribAR, setNotAtribAR] = React.useState([]);
    const [isInfoEditable, setIsInfoEditable] = React.useState(false);

    const { _id } = useParams();
    const history = useHistory();

    const hasAR = session.getInstance().hasOneOfTheseAccessRights(["getPartenaire", "updatePartenaire", "superAdmin"]);
    const canUpdate = session.getInstance().hasOneOfTheseAccessRights(["updatePartenaire", "superAdmin"]);
    const setDetailsUser = (data) => {
        if(data.status === 401){
            window.location.href = "/back/login";
        }else if(data.status === 403){
            return(<NotEnoughAccessRight />);
        }else{
            setNom(data.user.nom);
            setPrenom(data.user.prenom);
            setEmail(data.user.email);
            setDateInscription(data.user.dateInscription);
            setCompanie(data.user.companie);
            setAtribAR(data.atribAR);
            setNotAtribAR(data.notAtribAR);
        }
    }

    const interpretUpdateResponse = (data) => {
        if(data.status === 203){
            const setErrors = [
                {field: "other", setter: setOtherError},
                {field: "nom", setter: setErrorNom},
                {field: "prenom", setter: setErrorPrenom},
                {field: "email", setter: setErrorEmail}
            ];
            let keys = Object.keys(data.errors);
            keys.map(field => {
                for(let i = 0; i < setErrors.length; i++){
                    if(setErrors[i].field === field){
                        setErrors[i].setter(data.errors[field]);
                    }
                }
            });
        }else{
            history.push("/back/user/");
        }
    };

    const update =(e) => {
        e.preventDefault();
        const data = {
            _id: _id,
            nom: nom,
            prenom: prenom,
            email: email,
            isPartner: true
        };
        callAPI('post', '/user/update', data, interpretUpdateResponse);
    }

    useEffect(() => {
        if(hasAR){
        callAPI('get', '/user/details/' + _id, {}, setDetailsUser);
        if(canUpdate){
            setIsInfoEditable(true);
        }
    }
    }, [_id]);

    if(!hasAR){
        return(
        <NotEnoughAccessRight />
        );
    }

    return(
        <>
            <Navbar currentPage={8}/><br/>
            <Box sx={{ width: '100%', padding :"50px" }}>
                <Paper 
                    sx={{ overflow: "auto" }}
                    elevation={1}
                    children={
                        <div className={styles.infoUser}>
                            <div>
                                <h1>Détails partenaire</h1>
                                {otherError === null ? null : <Alert severity="error">{otherError}</Alert>}
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <SwitchableEditValue 
                                        isEditable={isInfoEditable} type="text" 
                                        label="Nom" value={nom} setValue={setNom}
                                        err={errorNom} setErr={setErrorNom} />
                                    <SwitchableEditValue 
                                        isEditable={isInfoEditable} type="text" 
                                        label="Prénoms" value={prenom} setValue={setPrenom}
                                        err={errorPrenom} setErr={setErrorPrenom} />
                                </Box>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <SwitchableEditValue 
                                        isEditable={isInfoEditable} type="email" 
                                        label="Email" value={email} setValue={setEmail}
                                        err={errorEmail} setErr={setErrorEmail} />
                                    <Champs label="Date d'inscription" value={getDateTime(dateInscription)} />
                                </Box>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <Champs label="Companie" value={companie} />
                                </Box>
                                { canUpdate
                                ? <Stack sx={{ width: 'fit-content', marginLeft: '10px' }} spacing={2}>
                                    <Button variant="contained" onClick={(e) => update(e)}>Modifier</Button>
                                </Stack>
                                : null }
                                
                            </div>
                            <ListeDroitAcces
                                idUser={_id}
                                atribAR={atribAR} 
                                setAtribAR={setAtribAR}
                                notAtribAR={notAtribAR}
                                setNotAtribAR={setNotAtribAR}     
                            />
                            
                        </div>
                    } 
                />
            </Box>
        </>
    );
};
export default DetailsUser;