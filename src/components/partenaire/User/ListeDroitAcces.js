import  React  from 'react';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import callAPI from '../../../utility.js';

const Liste = (props) => {

    const addAccessRight = (notAtribAR) => {
        props.setError(null);
        callAPI('post', '/user/addAccessRight', {idUser: props.idUser, idDroitAcces: notAtribAR._id}, (data) => {
            if(data.status === 401){
                window.location.href = "/back/login";
            }else if(data.status === 403){
                window.location.href = "/notEnoughAccessRight";
            }else if(data.status !== 200){
                props.setError(data.error);
            }else{
                console.log(data.atribAR);
                console.log(data.notAtribAR);
                props.setAtribAR(data.atribAR);
                props.setNotAtribAR(data.notAtribAR);
            }
        });
    }; 

    const removeAccessRight = (atribAR) => {
        props.setError(null);
        callAPI('post', '/user/removeAccessRight', {idUser: props.idUser, idDroitAcces: atribAR._id}, (data) => {
            if(data.status === 401){
                window.location.href = "/back/login";
            }else if(data.status === 403){
                window.location.href = "/notEnoughAccessRight";
            }else if(data.status !== 200){
                props.setError(data.error);
            }else{
                console.log(data.atribAR);
                console.log(data.notAtribAR);
                props.setAtribAR(data.atribAR);
                props.setNotAtribAR(data.notAtribAR);
            }
        });
    };

    let liste = [];
    console.log(props);
    const max = props.atribAR.length 
    > props.notAtribAR.length 
    ? props.atribAR.length 
    : props.notAtribAR.length;
    for(let i = 0; i < max; i++){
        const u = i;
        let tempNotAtrib = <>
            <td align="center"></td>
            <td border="1"></td>
        </>;
        let tempAtrib = <>
            <td border="1"></td>
            <td align="center"></td>
        </>;
        if(props.notAtribAR[u] !== undefined){
            tempNotAtrib = <>
            <td border="1">{props.notAtribAR[u].nom}</td>
                <td align="center">
                    <IconButton aria-label="delete" onClick={() => addAccessRight(props.notAtribAR[u])}>
                        <Add />
                    </IconButton>
                </td>
            </>;
        }
        if(props.atribAR[u] !== undefined){
            tempAtrib = <>
                <td align="center">
                    <IconButton aria-label="delete" onClick={() => removeAccessRight(props.atribAR[u])}>
                        <Remove />
                    </IconButton>
                </td>
                <td border="1">{props.atribAR[u].nom}</td>
            </>;
        }
        liste.push(<tr>{tempNotAtrib}{tempAtrib}</tr>);
    }
    return liste;
};

const ListeDroitAcces = (props) => {
    const [error, setError] = React.useState(null);
    return(
        <>
            <h2>Droits d'accès</h2>
            {error === null ? null : <Box><Alert severity="error">{ error }</Alert></Box>}
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colspan="2" width="50%">non attribués</th>
                            <th colspan="2">attribués</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Liste 
                            idUser={props.idUser }
                            error={error}
                            setError={setError}
                            atribAR={props.atribAR}
                            setAtribAR={props.setAtribAR}
                            notAtribAR={props.notAtribAR}
                            setNotAtribAR={props.setNotAtribAR}
                        />
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default ListeDroitAcces;