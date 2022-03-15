import { useState } from 'react';
import {useEffect} from "react";

import SkeletonPhotoChambre from './SkeletonPhotoChambre.js';
import PreviewPhotoChambre from './PreviewPhotoChambre.js';
import {FileInput} from '../../utilityTypeChambre.js';

import callAPI from '../../../../../utility';
import { Button } from '@mui/material';

const concat = (firstArray, secondArray) => {
    let tmpFirst = JSON.parse(JSON.stringify(firstArray));
    for(let i = 0; i < secondArray.length; i++){
        tmpFirst.push(secondArray[i]);
    }
    return tmpFirst;
};

export default function PhotoChambre({state, setState, noImage,
    photo, setPhoto, preview, setPreview,
    areImagesLoading, setAreImagesLoading,
    showGalerie, setShowGalerie, switchShowGalerie,
    nbPhotoBefore}){

    const [nbImage, setNbImage] = useState(1);

    useEffect(() => {
        if(nbPhotoBefore < photo.length){
            nbPhotoBefore.value = (photo.length);
            let tmp = JSON.parse(JSON.stringify(photo));
            let tmpPreview = JSON.parse(JSON.stringify(preview));
            for(let i = nbPhotoBefore; i < photo.length; i++){
                tmp.push(photo[i]);
                tmpPreview.push(process.env.REACT_APP_BACK_URL + "/" + photo[i]);
            }
            try{
                let newPhoto = photo.concat(tmp);
                let newPreview = preview.concat(tmpPreview);
                setPhoto(newPhoto);
                setPreview(newPreview);
            }catch(err){console.log(err)}
        }
    });

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
                        tmpPhoto[u] = evt.target.result;
                        tmpPreview[u] = evt.target.result;
                        finished++;
                        if(finished === e.target.files.length){
                            //savePhotoToBack(tmpPhoto);
                            setPhoto(concat(photo, tmpPhoto));
                            setPreview(concat(preview, tmpPreview));
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
                <PreviewPhotoChambre preview={preview} setPreview={setPreview} noImage={noImage} photo={photo} setPhoto={setPhoto}
                    state={state} />
            </div>}
            <div className="row">
                <Button  
                    variant="contained" 
                    type='submit' 
                    id='btn1'
                    onClick={switchShowGalerie}
                    style={{backgroundColor:'#2ac4ea' }}>
                    <span style={{color:'white'}}>Choisir parmis les images de la librairie</span>
                </Button>
                {state.error.photo === null ? null : <div className="customError"><span>{state.error.photo}</span></div>}
            </div>
        </>
    );
}