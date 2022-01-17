import React , {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import CheckboxAcces from "./CheckboxAcces.js"

function TableauAcces (props){
    let urlAccess = null;
    let i = -1;
        urlAccess = props.urlAccess.map(liste => {
            i++;
            let u = i;
            return (
            <TableRow style = {{textAlign : "left"}}>
                <TableCell align="center"><strong>{liste.nom}</strong></TableCell>
                <TableCell align="center"><strong>{liste.etat}</strong></TableCell>
                <TableCell align="center">
                    <CheckboxAcces style = {{textAlign : "left"}}  this = {props.this}  liste = {liste}  indice = {u}/>
                </TableCell>
            </TableRow> 
            );
        })
        return(
            <Table sx={{ minWidth: 350  }} aria-label="simple table" size = "small">
                    <TableHead >
                        <TableRow style={{backgroundColor:' #2F4050', color :"white"}}>
                            <TableCell align="center" style ={{color : "white"}}><strong>nom</strong></TableCell>
                            <TableCell align="center" style ={{color : "white"}}><strong>etat</strong></TableCell>
                            <TableCell align="center" style ={{color : "white"}}><strong>action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                            <TableBody>
                                {urlAccess}
                            </TableBody>
                </Table>
        )
    
}
export default TableauAcces;