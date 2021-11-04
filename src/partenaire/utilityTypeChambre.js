import { Checkbox } from "@mui/material";

import FormControlLabel from '@mui/material/FormControlLabel';

export function Preview(props){
    let list = [];
    console.log(props.preview.length);
    for(let i = 0; i < props.preview.length; i++){
      list.push(
        <img style={{maxWidth:'300px', maxHeight: '200px', width: 'auto', height: 'auto', margin: '2px 2px', padding: '0 0'}} src={props.preview[i]} />
      );
    }
    return list;
  }

export const FileInput = ({value, handlePhotoChange}) => {
    return(
        <div>
        <label>
            Cliquez pour choisir une photo...
            <input 
            style={{display: 'none'}}
            type="file"
            accept="image/*"
            multiple="multiple"
            onChange={(e) => handlePhotoChange(e)}
            />
        </label>
        </div>
    );
}

export function handleInputChange(context, event, inputName){
    const currentState = JSON.parse(JSON.stringify(context.state));
    currentState.typeChambre[inputName] = event.target.value;
    context.setState(currentState);
}

export function handlePhotoChange(context, event){
    let currentState = JSON.parse(JSON.stringify(context.state));
    if(event.target.files[0]){
        let img = event.target.files[0];
        const r = /^image/;
        if(r.test(img.type)){
            const reader = new FileReader();
            reader.onload = (evt) => {
                currentState.typeChambre.photo = evt.target.result;
                currentState.previewPhoto = evt.target.result;
                this.setState(currentState);
            }
            reader.readAsDataURL(img);
        }else{
            currentState.previewPhoto = this.noImage;
            context.setState(currentState);
        }
    }
}