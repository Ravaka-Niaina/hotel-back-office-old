import { useState } from 'react';

import SkeletonPhotoChambre from './SkeletonPhotoChambre.js';
import PreviewPhotoChambre from './PreviewPhotoChambre.js';
import {FileInput} from '../../utilityTypeChambre.js';

const concat = (firstArray, secondArray) => {
    let tmpFirst = JSON.parse(JSON.stringify(firstArray));
    for(let i = 0; i < secondArray.length; i++){
        tmpFirst.push(secondArray[i]);
    }
    return tmpFirst;
};

export default function Photo({state, setState, noImage,
    photo, setPhoto, preview, setPreview,
    areImagesLoading, setAreImagesLoading}){

    const [nbImage, setNbImage] = useState(1);

    function handlePhotoChange(e){
        if(e.target.files.length > 0){
            setAreImagesLoading(true);
            let currentState = JSON.parse(JSON.stringify(state));
            let tmpPhoto = [];
            let tmpPreview = [];
            let finished = 0;
            setNbImage(e.target.files.length + photo.length);
            for(let i = 0; i < e.target.files.length; i++){
                const u = i;
                const img = e.target.files[i];
                const r = /^image/;
                if(r.test(img.type)){
                    const reader = new FileReader();
                    
                    reader.onload = (evt) => {
                        console.log("ON LOAD");
                        tmpPhoto[u] = evt.target.result;
                        tmpPreview[u] = evt.target.result;
                        finished++;
                        if(finished === e.target.files.length){
                            setPhoto(concat(photo, tmpPhoto));
                            setPreview(concat(preview, tmpPreview));
                            setAreImagesLoading(false);
                        }
                    }
                    reader.readAsDataURL(img);
                }else{
                    currentState.preview = [noImage];
                    setState(currentState);
                }
            }
        }
    }

    return(
        <>
            <div style={{marginTop:'15px'}}>
                <label className="form-label mt-4" style={{textDecoration:'underline'}} id='bigLabel'>Photos</label>
            </div>
            {areImagesLoading 
            ? <SkeletonPhotoChambre nbImage={nbImage} setNbImage={setNbImage} />
            : <div className="row">
                <PreviewPhotoChambre preview={preview} setPreview={setPreview} noImage={noImage} photo={photo} setPhoto={setPhoto} />
            </div>}
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