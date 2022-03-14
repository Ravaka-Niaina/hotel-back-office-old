import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

import callAPI from '../../../utility';
import styles from '../chambre/InsertTypeChambre/Photo/PreviewPhotoChambre.module.css';
import {FileInput} from '../chambre/utilityTypeChambre.js';

const concat = (firstArray, secondArray) => {
    let tmpFirst = JSON.parse(JSON.stringify(firstArray));
    for(let i = 0; i < secondArray.length; i++){
        tmpFirst.push(secondArray[i]);
    }
    return tmpFirst;
};

const removePhotoLocal = (preview, setPreview, photo, setPhoto, indicePhoto) => {
    let tmpPreview = JSON.parse(JSON.stringify(preview));
    tmpPreview.splice(indicePhoto, 1);
    setPreview(tmpPreview);
  
    let tmpPhoto = JSON.parse(JSON.stringify(photo));
    tmpPhoto.splice(indicePhoto, 1);
    setPhoto(tmpPhoto);
};

const removePhoto = (event, preview, setPreview, photo, setPhoto, indicePhoto) => {
    event.preventDefault();
    if(photo[indicePhoto].startsWith("galerie\\")){
        callAPI('post', '/galerie/remove', {_id: photo[indicePhoto]}, (data) => {
        if(data.status === 200){
          removePhotoLocal(preview, setPreview, photo, setPhoto, indicePhoto);
        }
    });
    }else{
        removePhotoLocal(preview, setPreview, photo, setPhoto, indicePhoto);
    }
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Galerie = ({showGalerie, setShowGalerie}) => {
    const [photo, setPhoto] = useState([]);
    const [preview, setPreview] = useState([]);
    const [areImagesLoading, setAreImagesLoading] = useState(false);
    const [nbImage, setNbImage] = useState(0);

    function displayResult(data){
        if(data.status === 200){
            let tmpPreview = [];
            let tmpPhoto = [];
            for(let i = 0; i < data.photos.length; i++){
                tmpPreview[i] =  process.env.REACT_APP_BACK_URL + "/" + data.photos[i]._id;
                tmpPhoto[i] = data.photos[i]._id;
            }
            setPreview(tmpPreview);
            setPhoto(tmpPhoto);
        }
    }

    useEffect(() => {
        callAPI('get', '/galerie', {}, displayResult);
    }, []);

    function savePhotoToBack(photo){
        let done = 0;
        for(let i = 0; i < photo.length; i++){
            callAPI('post', '/galerie/add', {photo: photo[i]}, (data) => {
                done++;
                if(done === photo.length){
                    setAreImagesLoading(false);
                }
            });
        }
    }

    function handlePhotoChange(e){
        if(e.target.files.length > 0){
            setAreImagesLoading(true);
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
                            savePhotoToBack(tmpPhoto);
                            setPhoto(concat(photo, tmpPhoto));
                            setPreview(concat(preview, tmpPreview));
                        }
                    }
                    reader.readAsDataURL(img);
                }
            }
        }
    }

    let list = [];
    for(let i = 0; i < preview.length; i++){
      list.push(
        <div className={styles.conteneurPhoto}>
          <div className={styles.close}><button onClick={(e) => removePhoto(e, preview, setPreview, photo, setPhoto, i)}><span>X</span></button></div>
          <img className={styles.photo} src={preview[i]} />
        </div>
      );
    }
    if(list.length === 0){
      list.push(
        <div>Aucune photo</div>
      );
    }

    return(
        <Modal
            open={showGalerie}
            onClose={(e) => setShowGalerie(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {list}
                <div>
                    <FileInput
                        id='InputFile'
                        style={{marginTop: '5px'}}
                        value=""
                        handlePhotoChange={handlePhotoChange} />
                </div>
            </Box>
        </Modal>
    );
};

export default Galerie;