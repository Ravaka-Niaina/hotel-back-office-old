import  React,{useEffect}  from 'react';
import { useParams } from 'react-router-dom'
import callAPI from '../../../utility.js';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Paper from '@mui/material/Paper';

import  Navbar  from "../Navbar/Navbar";
import {Champs} from '../../common/commonAssets';
import {session} from '../../common/utilitySession.js';
import NotEnoughAccessRight from '../../common/NotEnoughAccessRight';
import styles from './DetailsUser.module.css';


const DetailsUser = () => {
    const [nom, setNom] = React.useState("");
    const [prenom, setPrenom] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [dateInscription, setDateInscription] = React.useState("");
    const [companie, setCompanie] = React.useState("");
    const { _id } = useParams();

    const hasAR = session.getInstance().hasOneOfTheseAccessRights(["getPartenaire", "updatePartenaire", "superAdmin"]);
    const setDetailsUser = (data) => {
        console.log(data);
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
        }
    }

    useEffect(() => {
        if(hasAR){
        callAPI('get', '/user/details/' + _id, {}, setDetailsUser);
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
                                <div>
                                    <Champs label="Nom" value={nom} />
                                    <Champs label="Prénoms" value={prenom} />
                                </div>
                                <div>
                                    <Champs label="Email" value={email} />
                                    <Champs label="Date d'inscription" value={dateInscription} />
                                </div>
                                <div>
                                    <Champs label="Companie" value={companie} />
                                </div>
                            </div>
                            <h2>Droits d'accès</h2>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th colspan="2" width="50%">non attribués</th>
                                            <th colspan="2">attribués</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td border="1">Insertion type chambre</td>
                                            <td align="center">
                                                <IconButton aria-label="delete">
                                                    <Add />
                                                </IconButton>
                                            </td>
                                            <td align="center">
                                                <IconButton aria-label="delete">
                                                    <Remove />
                                                </IconButton>
                                            </td>
                                            <td border="1">Insertion type chambre</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    } 
                />
            </Box>
        </>
    );
};
export default DetailsUser;