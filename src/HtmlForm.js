import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Button,Stack,TextField,Box,Radio,RadioGroup, Checkbox, FormLabel} from '@mui/material';

import './HtmlForm.css';

import callAPI from './utility';

const minWidth = 250;

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: 'green',
    borderWidth: 2,
    minWidth: minWidth
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
    minWidth: minWidth
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
    minWidth: minWidth
  },
});

/*
const infoForm = {
  urlSubmit: "/typeChambre/testInsert",
  urlRedirectSuccess: "/typeChambre",
  infoFields: [
    { field: "id", type: "String", value: "", error: null, required: true, maxCharacters: 5},
    { field: "nom", type: "String", value: "", error: null, required: true},
    { field: "nbAdulte", type: "Integer", value: "", error: null, required: true, min: 0, max: 20 },
    { field: "creation", type: "Date", value: "", error: null, required: true },
    { field: "Password", type: "Password", value: "", error: null, required: true},
    { label: "Equipements", field: "Eqpt", type: "Checkbox", options: [
      {label: "Television", value: "TV", checked: false}, 
      {value: "Wifi", checked: false}, 
      {label: "Climatiseur", value: "clim", checked: false}]
      , error: null, minToSelect: 1
    },
    { field: "Remboursable", type: "Radio", options: [{label: "Oui", value: "yes", checked: true}, {value: "no", checked: false}], error: null }
  ]
}
*/


export default class HtmlForm{
  constructor(infoForm, disposition, state, setState, history){
    this.state = state;
    this.setState = setState;
    this.title = infoForm.title;
    this.urlSubmit = infoForm.urlSubmit;
    this.urlRedirectSuccess = infoForm.urlRedirectSuccess;
    this.state.disableBtn = false;
    this.state.infoFields = infoForm.infoFields;
    this.checkAllFields();
    this.disposition = disposition;
    this.history = history;

    this.interpretResponse = this.interpretResponse.bind(this);
    this.updateStateField = this.updateStateField.bind(this);
}

  resetError(){
    for(let i = 0; i < this.state.infoFields.length; i++){
      this.state.infoFields[i].error = null;
    }
  }
  
  addError(fieldName, error){
    for(let i = 0; i < this.state.infoFields.length; i++){
      if(this.state.infoFields[i].field === fieldName){
        this.state.infoFields[i].error = error;
      }
    }
  }

  controlNumber(field, value){
    const isInteger = field.type === "Integer" ? true : false;
    const isFloat = field.type === "Float" ? true : false;
    if(isInteger || isFloat){
      if(isInteger){
        field.value = Number.parseInt(value);
      }
      if(isFloat){
        field.value = Number.parseFloat(value);
      }
      field.error = null;
      if(field.value + "" === "NaN"){
        field.error = "";
      }
      if(field.value + "" != "NaN" && field.min !== undefined && field.value < field.min){
          field.value = field.min;
      }
      if(field.value + "" != "NaN" && field.max !== undefined && field.value > field.max){
          field.value = field.max;
      }
    }
  }

  isNumber(type){
    return type === "Integer" || type === "Float" ? true : false;
  }

  handleInputChange(indexField, value, infoFields){
    let temp = {...this.state};
    let field = temp.infoFields[indexField];
    field.value = value;
    field.error = null;
    if(this.isNumber(field.type)){
      this.controlNumber(field, value);
    }
    else{
      const trimed = (field.value + "").trim();
      console.log("trimed = " + trimed);
      if(field.required && trimed === ""){
        field.error = "";
      }
      if(field.maxCharacters && trimed.length > field.maxCharacters){
        field.value = field.value.split("").slice(0, field.maxCharacters);
        let tempVal = "";
        field.value.map((char) => {
          tempVal += char;
        });
        field.value = tempVal;
      }
    }
    this.setState(temp);
  }

  handleCheckBoxChange(indexField, indexOption, checked){
    let temp = {...this.state};
    let field = temp.infoFields[indexField];
    field.options[indexOption].checked = checked;
    field.error = null;
    if(field.minToSelect && field.minToSelect > 0){
      let nbChecked = 0;
      field.options.map((opt) => {
        if(opt.checked){
          nbChecked++;
        }
      });
      if(nbChecked < field.minToSelect){
        field.error = "Veuillez selectionner au moins " + field.minToSelect + " elements";
      }
    }
    this.setState(temp);
  }

  checkAllFields(){
    let infoFields = {...this.state}.infoFields;
    for(let i = 0; i < infoFields.length; i++){
      if(infoFields[i].type === "Checkbox" || infoFields[i].type === "Radio"){
        for(let u = 0; u < infoFields[i].options.length; u++){
          this.handleCheckBoxChange(i, u, infoFields[i].options[u].checked);
        }
      }else{
        this.handleInputChange(i, infoFields[i].value);
      }
    }
  }

  getTypeFormInput(field){
    let type = null;
    if(field.type === "String"){
      type = "text";
    }else if(field.type === "Integer" || field.type === "Float"){
      type = "number";
    }else if(field.type === "Date"){
      type = "date";
    }else if(field.type === "Password"){
      type = "password";
    }else{
      type = field.type;
    }
    return type;
  }

  getInputCheckbox(field, indexField, inputs){
    let options = [];
    let u = 0;
    field.options.map((opt) => {
      const indexOption = u;
      options.push(
        <FormControlLabel 
          className="checkbox"
          checked={opt.checked}
          control={<Checkbox/>}
          label={opt.label ? opt.label : opt.value}
          onChange={(e) => this.handleCheckBoxChange(indexField, indexOption, e.target.checked)}
        />
      );
      u++;
    });
    inputs.push({
        field: field.field,
        content: <div className="containerCheckbox">
            <FormLabel component="legend">{field.label ? field.label : field.field}</FormLabel> 
            <FormGroup>
            {options}
            </FormGroup>
        </div>
    });
  }

  getInputRadio(field, indexField, inputs){
    let options = [];
    let i = 0;
    field.options.map((opt) => {
      const indexOption = i;
      options.push(
        <FormControlLabel
          className="checkbox"
          label={opt.label ? opt.label : opt.value}
          value={opt.value}
          control={<Radio />}
          onClick={(e) => this.handleCheckBoxChange(indexField, indexOption, e.target.checked)} />
      );
      i++;
    });

    inputs.push({
        field: field.field,
        content: <div className="containerCheckbox">
            <FormLabel component="legend">{field.label ? field.label : field.field}</FormLabel> 
            <RadioGroup
                aria-label="gender" 
                name={field.field} >
                {options}
            </RadioGroup>
        </div>
    });
  }

  getInputGeneral(field, indexField, inputs, type){
    let error = true;
    let color = "error";
    let helperText = field.error;
    if(field.error === null){
      error = false;
      color = "success";
      helperText = field.error;
    }
    inputs.push({
        field: field.field,
        content: 
            <div className="textField">
                <ValidationTextField
                    error={error}
                    color={color}
                    helperText={helperText}
                    id="outlined-basic"
                    variant="outlined"
                    size='small'
                    label={field.label ? field.label : field.field}
                    type={type}
                    value={field.value} 
                    onChange={(e) => this.handleInputChange(indexField, e.target.value)}
                />
            </div>
            
    });
  }

  getDataToSubmit(){
    const data = {};
    let infos = JSON.parse(JSON.stringify(this.state.infoFields));
    infos.map((info) => {
      if(info.type === "Integer"){
        info.value = Number.parseInt(info.value);
      }else if(info.type === "Float"){
        info.value = Number.parseFloat(info.value);
      }else if(info.type === "Checkbox"){
        let temp = [];
        info.options.map((opt) => {
          if(opt.checked){
            temp.push(opt.value);
          }
        });
        info.value = temp;
      }else if(info.type === "Radio"){
        for(let i = 0; i < info.options.length; i++){
          if(info.options[i].checked){
            info.value = info.options[i].value;
            break;
          }
        }
      }
      data[info.field] = info.value;
    });

    return data;
  }

  updateStateField(field, newVal){
    let temp = {...this.state};
    temp[field] = newVal;
    this.setState(temp);
  }

  interpretResponse(res){
    this.state.disableBtn = false;
    if(res.status === 200){
      this.history.push(this.urlRedirectSuccess);
    }else if(res.errors.length > 0){
      let temp = {...this.state};
      res.errors.map((err) => {
        temp.infoFields.map((info) => {
          if(info.field === err.field){
            info.error = err.error;
          }
        });
      });
      this.setState(temp);
    }
  }

  submit(event){
    event.preventDefault();
    this.state.disableBtn = true;
    console.log("avant = " + this.state.disableBtn);
    const data = this.getDataToSubmit();
    // console.log(data);
    callAPI("post", this.urlSubmit, data, this.interpretResponse);
  }

  followDisposition(inputs){
    let rows = [];
    for(let i = 0; i < this.disposition.length; i++){
        let columns = [];
        for(let u = 0; u < this.disposition[i].length; u++){
            for(let v = 0; v < inputs.length; v++){
                if(this.disposition[i][u] === inputs[v].field){
                    columns.push(inputs[v].content);
                    break;
                }
            }
        }
        rows.push(
            <Box style={{marginTop: "10px", marginBottom: "10px"}}>
                {columns}
            </Box>
        );
    }
    return rows;
  }

  generateForm(){
    let inputs = [];
    let i = 0;
    let errorExists = false;
    this.state.infoFields.map((field) => {
      let type = this.getTypeFormInput(field);
      const indexField = i;
      if(field.error !== null && field.error !== undefined){
        errorExists = true;
      }
      if(type === "Checkbox"){
        this.getInputCheckbox(field, indexField, inputs);
      }else if(type === "Radio"){
        this.getInputRadio(field, indexField, inputs);
      }else{
        this.getInputGeneral(field, indexField, inputs, type);
      }
      i++;
    });
    inputs = this.followDisposition(inputs);

    let form =
        <div className="container">
            <h1>{this.title}</h1>
            <form className="needs-validation" className='forms' style={{marginTop:'15px'}}>
                {inputs}
                <div className="btn">
                    <Button disabled={errorExists || this.state.disableBtn ? true : false} variant="contained" onClick={(e) => this.submit(e)}>
                        Valider
                    </Button>
                </div>
            </form>
        </div> 
    return form;
  }
}