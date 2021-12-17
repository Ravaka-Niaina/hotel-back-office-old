//import "./register.css";
import {Link} from 'react-router-dom';
import React from "react";
import CustomError from '../../CustomError';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TableauAccess from "./tableauAccess.js"

import APIGeT from "./utility.js";
import APIPoST from "../../utility.js";

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hotelDescription: false,
        description:'',
        email: '',
        mdp: '',
        confirmMdp: '',
        type: '',
        status: '',
        errors: [],
        nom : "",
        prenom :"",
        typeU : [] , 
        urlAccess : [],
        id : this.props.match.params._id
    };
    this.CallBackListRole = this.CallBackListRole.bind(this);
    this.AppelAccess = this.AppelAccess.bind(this);
    this.tryRedirectLogin = this.tryRedirectLogin.bind(this);
    this.AppelUserDetails = this.AppelUserDetails.bind(this);
    this.tryRedirectList = this.tryRedirectList.bind(this);
  }

  CallBackListRole(data){
    let current = JSON.parse(JSON.stringify(this.state));
    current.typeU = data.roles;
    this.setState(current);
  }
  
  AppelAccess(data){
    let current = JSON.parse(JSON.stringify(this.state));
    for(let i = 0; i < data.model.length; i++){
      data.model[i].checked= false;
    }
    current.urlAccess = data.model;
    this.setState(current);
  }

  AppelUserDetails(data){
    let current = JSON.parse(JSON.stringify(this.state));
    current.email = data.userModel.email;
    current.type = data.userModel.type;
    current.nom = data.userModel.nom;
    current.prenom = data.userModel.prenom;

    for(let i = 0; i < data.modelAccess.length; i++){
      for(let u = 0; u < data.userModel.urlAccess.length; u++){
          if(data.userModel.urlAccess[u] == data.modelAccess[i]._id){
            data.modelAccess[i].checked = true;
              break;
         }else{
            data.modelAccess[i].checked = false;
         }
      }      
  }
    current.urlAccess = data.modelAccess;
    this.setState(current);
  }

  componentDidMount(){
    APIGeT("get" , "/roles/find" , this.CallBackListRole);
    APIGeT('get' , "/access/findAll" , this.AppelAccess);
      if(this.state.id){
        APIGeT('get' , "/user/detail/"+ this.state.id , this.AppelUserDetails);
      }

    }

  
  tryRedirectLogin(res){
    if(res.status === 200){
      this.props.history.push('/login');
    }else{
      
      this.componentDidMount();
      let currentState = JSON.parse(JSON.stringify(this.state));
      currentState.errors = res.errors;
      this.setState(currentState);
      console.log(currentState.errors[0].message);
    }
  }
  tryRedirectList(res){
    if(res.status === 200){
      this.props.history.push('/userList');
    }else{
      this.componentDidMount();
      let currentState = JSON.parse(JSON.stringify(this.state));
      currentState.errors = res.errors;
      this.setState(currentState);
      console.log(currentState.errors[0].message);
    }
  }

  pushURL(constructor){
    let current = JSON.parse(JSON.stringify(constructor));
    let urlAccess = [];
    for(let i = 0; i < current.urlAccess.length; i++){
      if(current.urlAccess[i].checked){
        urlAccess.push(current.urlAccess[i]._id);
      }
    }
    current.urlAccess = urlAccess;
    let data = {nom : current.nom , prenom : current.prenom , email : current.email , 
                type : current.type , mdp : current.mdp , confirmMdp : current.confirmMdp, dateInscription : new Date().now ,
                urlAccess : current.urlAccess}
                
    return data;
  }

  register(e){
    let current = this.pushURL(this.state);
   APIPoST('post' , '/user/' , current , this.tryRedirectLogin);
  }

  update(e , id){
    let current = this.pushURL(this.state);
    APIPoST('post' , '/user/update/'+ id , current , this.tryRedirectList);
  }

    handleDescriptionChange(event){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState.description = event.target.value;
    this.setState(currentState);
  }
  handleTypeChange(event , fieldname){
    const currentState = JSON.parse(JSON.stringify(this.state));
    currentState[fieldname] = event.target.value;
    this.setState(currentState);
  }

  render(){
    let typeUser = this.state.typeU.map(typeA => {
      return(
        <MenuItem value={typeA._id}> <span>{typeA.name}</span></MenuItem>
      )
    });

    return (
      <div className="body"> 
        <div className="register" style = {{padding : "12px"}}>
          { this.state.id ? 
            <div className="header" 
              style={{width : 'fit-content' , margin : "0 auto " , 
                  fontSize : "24px" , textDecoration: "underline" , 
                  fontFamily : 'roboto'}}>
              modification utilisateur 
            </div> :
            <div className="header" 
              style={{width : 'fit-content' , margin : "0 auto " , 
                  fontSize : "24px" , textDecoration: "underline" , 
                  fontFamily : 'roboto'}}>
                  Register
            </div>
            }
            
            <CustomError errors={this.state.errors}/>
              <div style = {{padding : "30px"}}>
                <Box
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                >
                  <TextField
                    size = "small"
                    label="nom"style={{width:"300px"}}
                    name="nom" value={this.state.nom}
                    onChange={(e) =>this.handleTypeChange(e , "nom")}
                  />
                    <TextField 
                      size = "small"
                      label="Prenom"style={{width:"300px"}}
                      name="type" value={ this.state.prenom}
                      onChange={(e) =>this.handleTypeChange(e , "prenom")}
                    />
                    <TextField 
                      size = "small" type = "email"
                      label="email"style={{width:"300px"}}
                      name="email" value={ this.state.email}
                      onChange={(e) =>this.handleTypeChange(e , "email")}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Type utilisateur</InputLabel>
                      <Select style = {{width:"300px"}}
                        size = "small" onChange={(e) =>this.handleTypeChange(e , "type")}
                        labelId="demo-simple-select-label" id="demo-simple-select"
                        value={this.state.type} name ="type"
                        label="Type utilisateur"
                      >
                      {typeUser} 
                      </Select>
                    </FormControl>
                  </Box>
                  <Box
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                  >
                  <TextField
                    size = "small"
                    label="password"style={{width:"300px"}}
                    type="password"
                    name="password" value={ this.state.mdp}
                    onChange={(e) =>this.handleTypeChange(e , "mdp")}
                  />
                  <TextField 
                    size = "small"
                    label="confirm password"style={{width:"300px"}}
                    name="confirmMdp" value={ this.state.confirmMdp} type="password"
                    onChange={(e) =>this.handleTypeChange(e , "confirmMdp")}
                  />
                   </Box>
                {
                  this.state.hotelDescription ?
                    <TextField 
                    size = "small"
                    id="outlined-basic" variant="outlined"
                    multiline rows={2} rowsMax={4}
                    style={{width:'300px',height:'50px',marginTop:'15px'}}
                    type="text" name="description" 
                    value={this.state.description}
                    onChange={(e) =>this.handleDescriptionChange(e)}
                    />
                    : null
                }
              </div>
              <TableauAccess urlAccess = {this.state.urlAccess} this = {this}/>
              <div className="footer">
                {this.state.id ? 
                  <Button variant="contained" color="primary" 
                    onClick={(e) => this.update(e , this.state.id)} style={{textDecoration:'none'}}>
                    <span style={{color:'white'}}>Modifier</span>
                  </Button> : 
                  <Button variant="contained" color="primary" 
                    onClick={(e) => this.register(e)} style={{textDecoration:'none'}}>
                    <span style={{color:'white'}}>S'inscrire</span>
                  </Button>
                }
                
              </div>
        </div>
        
    </div>
    
    );
  }
  
}

export default Register;
