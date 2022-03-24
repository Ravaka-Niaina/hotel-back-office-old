import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './typeChambre.css';

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

export function Font(props){
    return props.font.startsWith("https://") ?
        <img src={props.font} style={{maxWidth:'20px', maxHeight: '200px', width: 'auto', height: 'auto', padding: '0 0'}}/>
        : <i class={props.font}></i>
}