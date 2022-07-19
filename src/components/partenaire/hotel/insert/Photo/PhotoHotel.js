import { useState } from 'react';
import {FileInput} from '../utilityHotel.js';
import PreviewPhotoHotel from './PreviewPhotoHotel.js';

export default function Photo({
    photo,
    setPhoto,
    photoError,
    setPhotoError,
    preview,
    setPreview,
    noImage,
    setIsModifImg
}){

    const [nbImage, setNbImage] = useState(1);

    function handlePhotoChange(e){
        const tmpPhoto = [];
        const tmpPreview = [];
        setPhotoError(null);
        setIsModifImg(true);
        let finished = 0;
        
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
                setNbImage(finished);

                if(finished === e.target.files.length){
                    setPhoto(tmpPreview);
                    setPreview(tmpPreview);
                }
            }
            reader.readAsDataURL(img);
            }else{
                setPreview([noImage]);
            }
        }
    }

    return(
        <>
            <div style={{marginTop:'15px'}}>
                <label className="form-label mt-4" style={{textDecoration:'underline'}} id='bigLabel'>Photos</label>
            </div>
            <div className="row">
                <PreviewPhotoHotel preview={ preview } />
            </div>
            <div className="row">
                <FileInput
                    id='InputFile'
                    style={{marginTop: '5px'}}
                    value=""
                    handlePhotoChange={ handlePhotoChange } />
                    { photoError ? <div className="customError"><span>{ photoError }</span></div> : null }
            </div>
        </>
    );
}