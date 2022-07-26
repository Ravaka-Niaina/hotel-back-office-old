
import { Checkbox } from "@mui/material";
import TextField from '@mui/material/TextField';

import FormControlLabel from '@mui/material/FormControlLabel';

export const FileInput = ({value, handlePhotoChange, text, accepts, error}) => {
    if(!text){
        text =<p id='bigLabel'>Cliquez pour choisir une photo...</p>;
    }
    if(!accepts){
        accepts = "image/*"
    }
    return(
        <div>
            <label>
                {text}
                <input 
                style={{display: 'none'}}
                type="file"
                accept= {accepts}
                multiple="multiple"
                onChange={(e) => handlePhotoChange(e)}
                />
            </label>
        </div>
    );
}

export function handlePhotoChange(context, event){
    let currentState = JSON.parse(JSON.stringify(context.state));
    if(event.target.files[0]){
        let img = event.target.files[0];
        const r = /^image/;
        if(r.test(img.type)){
            const reader = new FileReader();
            reader.onload = (evt) => {
                currentState.hotel.photo = evt.target.result;
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
