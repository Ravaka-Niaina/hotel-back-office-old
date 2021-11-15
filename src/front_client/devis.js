import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
class Devis extends React.Component{ 
    render(){
        return (
<div className="">
 <div className="text-center" id='titre1'>
<p></p>
<p id='title1'> DEMANDER UN <span>DEVIS</span></p>
<p id='title2'>Demandez un devis ici et obtenez les meilleures offres.</p>
 </div>
 <div className="jumbotron">
  <form>
   <select class="form-select" aria-label="">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <select class="form-select" aria-label="">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <select class="form-select" aria-label="">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <div class="form-group">
    <input type="email" class="form-control" id="" />
   </div>
   <div class="form-group">
    <input type="email" class="form-control" id="" />
   </div>
   <div class="form-group">
    <input type="email" class="form-control" id="" />
   </div>
   <div class="form-group">
    <input type="email" class="form-control" id="" />
   </div>
   <div class="form-group">
    <input type="email" class="form-control" id="" />
   </div>
   <select class="form-select" aria-label="">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <div class="form-group">
    <input type="email" class="form-control" id="" />
   </div>
   <select class="form-select" aria-label="">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <select class="form-select" aria-label="">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <select class="form-select" aria-label="">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <select class="form-select" aria-label="">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <select class="form-select" aria-label="">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <select class="form-select" aria-label="">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <select class="form-select" aria-label="">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <div class="form-group">
    <input type="email" class="form-control" id="" />
   </div>
   <div class="form-group purple-border">
  <label for="exampleFormControlTextarea4">Colorful border</label>
  <textarea class="form-control" id="exampleFormControlTextarea4" rows="3"></textarea>
   </div>
   <div>
   <FormControlLabel 
    control={<Checkbox/>} 
    label={
    <p id='label'>
J'accepte de recevoir des nouvelles et du contenu de Heritage Resorts
    </p>
         }
    value="1"
    name="fevrier"  
    onChange={(e) => this.handleInputChange(e, "fevrier")}
  />
   </div>
   <button type="button" class="btn btn-secondary">Envoyer</button>
  </form>
 </div>
</div>
        );
      }
      
    }
  
  export default Devis;