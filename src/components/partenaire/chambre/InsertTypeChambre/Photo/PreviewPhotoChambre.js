import Box from '@mui/material/Box';
import styles from '../../InsertTypeChambre/Photo/PreviewPhotoChambre.module.css';
import callAPI from '../../../../../utility';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import React , {useState} from "react";
import "./cssTest.css";

const removePhotoLocal = (preview, setPreview, photo, setPhoto, indicePhoto) => {
  let tmpPreview = JSON.parse(JSON.stringify(preview));
  tmpPreview.splice(indicePhoto, 1);
  setPreview(tmpPreview);

  let tmpPhoto = JSON.parse(JSON.stringify(photo));
  tmpPhoto.splice(indicePhoto, 1);
  setPhoto(tmpPhoto);
};

const removePhoto = (event, preview, setPreview, photo, setPhoto, indicePhoto, state, isInsert) => {
  event.preventDefault();
  console.log(photo[indicePhoto]);
  if(isInsert){
    removePhotoLocal(preview, setPreview, photo, setPhoto, indicePhoto);
  }else{
    callAPI('post', '/typeChambre/photo/delete', {path: photo[indicePhoto], idTypeChambre: state._id}, (data) => {
      if(data.status === 200){
        removePhotoLocal(preview, setPreview, photo, setPhoto, indicePhoto);
      }
    });
  }
};

function ButtonOnclick(indicePhoto, switchShowImageCrop,setImageCrop,setAlertRedirect){
  return (
      <Button  
        variant="contained" 
        type='submit' 
        onClick={(e => {switchShowImageCrop(e, true , indicePhoto )})}>
        <span style={{color:'white'}}>definir comme photo de profil</span>
      </Button>
  );
}
export default function PreviewPhotoChambre({preview, setPreview, noImage, photo, setPhoto, state, isInsert,switchShowImageCrop,setAlertRedirect }){
  let list = [];
  for(let i = 0; i < preview.length; i++){
    list.push(
      <div className={styles.conteneurPhoto}>
        <div className={styles.close}><button onClick={(e) => removePhoto(e, preview, setPreview, photo, setPhoto, i, state, isInsert)}><span>X</span></button></div>
        <Tooltip title={ButtonOnclick(preview[i],switchShowImageCrop,setAlertRedirect)}>
            <img className={styles.photo}  src={preview[i]} id='Imghover' />
        </Tooltip>
      </div>
    );
  }
  if(list.length === 0){
    list.push(
      <div className={styles.conteneurPhoto}>
        <img className={styles.photo} src={noImage} />
      </div>
    );
    
  }
  return list;
}