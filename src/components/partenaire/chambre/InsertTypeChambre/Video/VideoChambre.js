import TextField from '@mui/material/TextField';
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

function removeInputVideo(state, setState, index, context){
    if(context != undefined){
        let currentState = JSON.parse(JSON.stringify(context.state));
        try{
            currentState.videos.splice(index, 1);
        }catch(err){
            currentState.typeChambre.videos.splice(index, 1);
        }
        context.setState(currentState);
    }else{
        let currentState = JSON.parse(JSON.stringify(state));
        try{
            currentState.videos.splice(index, 1);
        }catch(err){
            currentState.typeChambre.videos.splice(index, 1);
        }
        setState(currentState);
    }
    
}

function Videos(props){
    let inputs = [];
    const btnAdd = <button id='Plus' onClick={(e) => addInputVideo(props.state, props.setState, props.context)}>+</button>
    let videos = props.state.videos == undefined ? props.state.typeChambre.videos : props.state.videos;
    for(let i = 0; i < videos.length; i++){
        let u = i;
        const add = u == videos.length - 1 ? btnAdd : null;
        const remove = videos.length > 1 ? 
            <button onClick={(e) => removeInputVideo(props.state, props.setState, u, props.context)} id='Moins'>-</button>
            : null;
        let input = 
        <div>
            <TextField id="standard-basic" label={ (u+1) } variant="standard" type="text"
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

export default function VideoChambre({state, setState}){
    return(
        <div style={{marginTop:'15px'}}>
            <div className="row">
            <div style={{marginTop:'10px'}}>
                <label className="form-label mt-4" style={{textDecoration:'underline'}} id='bigLabel'>Videos  </label>
            </div>
            </div>
            <div className="row">
                <Videos state={state} setState={setState} />
            </div>
        </div>
    );
}