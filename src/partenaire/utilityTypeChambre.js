import { Checkbox } from "@mui/material";
import TextField from '@mui/material/TextField';

import FormControlLabel from '@mui/material/FormControlLabel';

import ReactPlayer from 'react-player'

function handleVideoChange(state, setState, e, index, context){
    let currentState = JSON.parse(JSON.stringify(state));
    try{
        currentState.videos[index] = e.target.value;
        setState(currentState);
    }catch(err){
        currentState.typeChambre.videos[index] = e.target.value;
        context.setState(currentState);
    }
}

function addInputVideo(state, setState, context){
    let currentState = JSON.parse(JSON.stringify(state));
    try{
        currentState.videos.push("");
    }catch(err){
        currentState.typeChambre.videos.push("");
    }
    if(context == undefined){
        setState(currentState);
    }else{
        context.setState(currentState);
    }
    
}

function removeInputVideo(state, setState, index){
    let currentState = JSON.parse(JSON.stringify(state));
    try{
        currentState.videos.splice(index, 1);
    }catch(err){
        currentState.typeChambre.videos.splice(index, 1);
    }
    setState(currentState);
}

export function Videos(props){
    let inputs = [];
    const btnAdd = <button onClick={(e) => addInputVideo(props.state, props.setState, props.context)}>+</button>
    let videos = props.state.videos == undefined ? props.state.typeChambre.videos : props.state.videos;
    for(let i = 0; i < videos.length; i++){
        let u = i;
        const add = u == videos.length - 1 ? btnAdd : null;
        const remove = videos.length > 1 ? 
            <button onClick={(e) => removeInputVideo(props.state, props.setState, u)}>-</button>
            : null;
        let input = 
        <div>
            <TextField id="standard-basic" label={"Video " + (u+1) } variant="standard" type="text"
            value={videos[u]}
            onChange={(e) => handleVideoChange(props.state, props.setState, e, u, props.context)}
            style={{width:'40%'}}/>
            {remove}
            {add}
            <ReactPlayer url={videos[u]} />
        </div> 
        inputs.push(input);
    }
    if(videos.length == 0){
        let currentState = JSON.parse(JSON.stringify(props.state));
        try{
            currentState.videos.push("");
        }catch(err){
            currentState.typeChambre.videos.push("");
        }
        try{
            props.setState(currentState);
        }catch(err){
            props.context.setState(currentState);
        }
        inputs.push(
            <div>
                <TextField id="standard-basic" label="Video 1" variant="standard" type="text"
                    value={videos[0]}
                    onChange={(e) => handleVideoChange(props.state, props.setState, e, 0, props.context)}
                    style={{width:'40%'}}/>
                {btnAdd}
            </div>
        );
    }
    return inputs;
}

export function Preview(props){
    let list = [];
    for(let i = 0; i < props.preview.length; i++){
      list.push(
        <img style={{maxWidth:'300px', maxHeight: '200px', width: 'auto', height: 'auto', margin: '2px 2px', padding: '0 0'}} src={props.preview[i]} />
      );
    }
    return list;
  }

export const FileInput = ({value, handlePhotoChange, text, accepts}) => {
    if(!text){
        text = "Cliquez pour choisir une photo...";
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