import { useState } from 'react';
import {FileInput} from '../utilityHotel.js';
import PreviewPhotoHotel from './PreviewPhotoHotel.js';

export default function Photo({state, setState, noImage,setIsModifImg}){

    const [nbImage, setNbImage] = useState(1);

    function handlePhotoChange(e){
        let currentState = JSON.parse(JSON.stringify(state));
        currentState.photo = [];
        currentState.preview = [];
        setIsModifImg(true);
        let finished = 0;
        for(let i = 0; i < e.target.files.length; i++){
            const u = i;
            const img = e.target.files[i];
            const r = /^image/;
            if(r.test(img.type)){
            const reader = new FileReader();
            reader.onload = (evt) => {
                currentState.photo[u] = evt.target.result;
                currentState.preview[u] = evt.target.result;
                finished++;
                setNbImage(finished);
                if(finished === e.target.files.length){
                setState(currentState);
                }
            }
            reader.readAsDataURL(img);
            }else{
            currentState.preview = [noImage];
            setState(currentState);
            }
        }
    }

    return(
        <>
            <div style={{marginTop:'15px'}}>
                <label className="form-label mt-4" style={{textDecoration:'underline'}} id='bigLabel'>Photos</label>
            </div>
            <div className="row">
                <PreviewPhotoHotel preview={state.preview} />
            </div>
            <div className="row">
                <FileInput
                    id='InputFile'
                    style={{marginTop: '5px'}}
                    value=""
                    handlePhotoChange={handlePhotoChange} />
                    {state.error.photo === null ? null : <div className="customError"><span>{state.error.photo}</span></div>}
            </div>
        </>
    );
}