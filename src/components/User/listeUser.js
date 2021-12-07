import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button'
import APiGet from '../../APiGet.js';
import Navbar from '../../Navbar/Navbar.js';

class ListeUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listeUser : []
        }
        this.setValue = this.setValue.bind(this);
        this.activation = this.activation.bind(this);
        this.deactivation = this.deactivation.bind(this);
    }
    

    setValue(data){
        console.log(data);
        let current =JSON.parse(JSON.stringify(this.state));
        current.listeUser = data.userModel;
        this.setState(current);
        console.log("data " + current);
    }

    activation(data){
        if(data.status == 200){
            this.props.history.push('/userList');
            this.componentDidMount();
        }
    }

    deactivation(data){
        if(data.status == 200){
            APiGet("get" , "/user/listePartenaire" , this.setValue)
            this.props.history.push("/userList")
        }
    }

    componentDidMount(){
        APiGet("get" , "/user/listePartenaire" , this.setValue)
    }

    activer(event , value){
        APiGet("get" , "/user/activate/"+value , this.activation)
    }

    desactiver(event , value){
        APiGet("get" , "/user/deactivate/"+value , this.deactivation)
    }

    render(){
        let listeU = null;
        listeU =  this.state.listeUser.map(liste => {
            return(
                <TableRow>
                    <TableCell align="center"><strong>{liste.nom}</strong></TableCell>
                    <TableCell align="center"><strong>{liste.prenom}</strong></TableCell>
                    <TableCell align="center"><strong>{
                            liste.active ? 
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
                         } </strong></TableCell>
                    <TableCell align="center">
                        <strong>
                            {
                                liste.active ? 
                                <button className="btn"  onClick = {(e) => this.desactiver(e , liste._id)}
                                    style={{textDecoration:'none',backgroundColor:' #2F4050',color:'white'}}>
                                    desactiver 
                                </button> :
                                <Button variant="contained" onClick = {(e) => this.activer(e , liste._id)}>Activer</Button>
                            }
                        </strong>
                    </TableCell>
                </TableRow>
            ); 
     })
        return (
            <>
            <Navbar currentPage={2}/>
            <div style ={{padding : "30px" , marginTop : "15px"}}>
                <div style ={{width  : "fit content" , margin : "0 auto"}}>
                    <h1>List Partenaire</h1> 
                </div> 
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor:' #2F4050', color :"white"}}>
                            <TableCell align="center"><strong>nom</strong></TableCell>
                            <TableCell align="center"><strong>prenom</strong></TableCell>
                            <TableCell align="center"><strong>active</strong></TableCell>
                            <TableCell align="center"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                            <TableBody>
                                {listeU}
                            </TableBody>
                </Table>
            </div>
            </>
        );
    }
}
export default ListeUser;