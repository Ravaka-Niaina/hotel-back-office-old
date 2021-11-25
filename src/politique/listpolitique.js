import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const utility = require("./utility.js");

function DatePrice(props){
    let datePrice = [];
        datePrice = props.context.datePrice.map(list =>{
            return (
                <div align="center">
                    <TableCell align="center">{list.date}</TableCell>
                    <TableCell align="center">{list.type}</TableCell>
                    <TableCell align="center">{list.pourcentage} % </TableCell>
                </div>
            );
        })
        return datePrice;
}

class ListPolitique extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            politique : []
        };
        this.functionAppelList = this.functionAppelList.bind(this);
        
    }
    
    functionAppelList(data){
         let current = JSON.parse(JSON.stringify(this.state));
         current.politique = data.politique;
         this.setState(current);

     }
    
    componentDidMount(){
       let url = '/politique/list', method ='get';
       utility.APIGeT(method, url , this.functionAppelList);
    }

    deletePolitiqueAnnulation(id , nom ){
        //utility.APIGeT("get" ,"/politique/"+id , this.functionAppelDelete(nom));
        alert("delete")
    }

    render(){
        let list = null ;
        list = this.state.politique.map(liste =>{
            return (
                <TableRow> 
                    <TableCell align="center">{liste.nom}</TableCell>
                    <TableCell align="center">
                        { 
                            liste.remboursable ? 
                                <FormControlLabel 
                                    control={<Checkbox defaultChecked/>}
                                    label = ""
                                    disabled
                                /> : 
                                <FormControlLabel 
                                    control={<Checkbox/>}
                                    label = ""
                                    disabled
                                />
                         } 
                    </TableCell>
                    <TableCell align="center"><DatePrice context = {liste}/></TableCell>
                    <TableCell align="center" colspan ="2">
                        <Link to={'/politique/detail/' + liste._id}> 
                            <button className="btn" 
                                style={{textDecoration:'none',backgroundColor:' #2F4050',color:'white'}}>
                                modifier
                            </button>
                        </Link>
                    </TableCell>
                </TableRow>
            );
        });
        
 
        return(
            <div style = {{padding :"5%"}}>
                <Link to={'/politique'}>
                    <Button variant ="contained">Insert Politique</Button> 
                </Link>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor:' #2F4050', color :"white"}}>
                            <TableCell align="center"><strong>nom</strong></TableCell>
                            <TableCell align="center"><strong>remboursable</strong></TableCell>
                            <TableCell align="center">
                                <strong>Conditions</strong><br/>
                                <strong align="center">
                                    <TableCell align="center"><strong>DateTime</strong></TableCell>
                                    <TableCell align="center"><strong>type</strong></TableCell>
                                    <TableCell align="center"><strong>%</strong></TableCell>
                                </strong>
                            </TableCell>
                            <TableCell align="center"><strong>Actions</strong></TableCell>
                        </TableRow>
                        {/*<TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <div align="center">
                                <TableCell align="center"><strong>DateTime</strong></TableCell>
                                <TableCell align="center"><strong>type</strong></TableCell>
                                <TableCell align="center"><strong>%</strong></TableCell>
                            </div>
                            <TableCell align="center"><strong></strong></TableCell>
                        </TableRow>*/}
                    </TableHead>
                            <TableBody>
                                { list }   
                            </TableBody>
                </Table>
            </div>
        );
    }
}
export default ListPolitique;