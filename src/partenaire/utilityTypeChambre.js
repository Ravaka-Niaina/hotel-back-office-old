import { Checkbox } from "@mui/material";

import FormControlLabel from '@mui/material/FormControlLabel';

export const FileInput = ({value, handlePhotoChange}) => {
    return(
        <div>
        <label>
            Cliquez pour choisir une photo...
            <input 
            style={{display: 'none'}}
            type="file"
            accept="image/*"
            onChange={(e) => handlePhotoChange()}
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