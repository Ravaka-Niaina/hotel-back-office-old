import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import callAPI from '../../../utility';
import styles from './Galerie.module.css';
import UploadPhoto from './UploadPhoto.js';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '600px',
    overflow: 'scroll',
    overflowX: 'hidden',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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

const Galerie = ({showGalerie, setShowGalerie, photoSortie, setPhotoSortie, nbPhotoBeforeSortie, previewSortie, setPreviewSortie , imageCrop, setImageCrop}) => {
    const [photo, setPhoto] = useState([]);
    const [preview, setPreview] = useState([]);
    const [areImagesLoading, setAreImagesLoading] = useState(false);
    const [nbImage, setNbImage] = useState(0);
    const [selectImage, setSelectImage] = useState(false);
    const [imageSelected, setImageSelected] = useState([]);
    const [showUpload, setShowUpload] = useState(false);


    function displayResult(data){
        if(data.status === 200){
            let tmpPreview = [];
            let tmpPhoto = [];
            let tmpImageSelected = [];
            for(let i = 0; i < data.photos.length; i++){
                tmpPreview[i] =  process.env.REACT_APP_BACK_URL + "/" + data.photos[i]._id;
                tmpPhoto[i] = data.photos[i]._id;
                imageSelected[i] = false;
            }
            setPreview(tmpPreview);
            setPhoto(tmpPhoto);
            setImageSelected(tmpImageSelected);
        }
    }

    function getContentGalerie(){
        callAPI('get', '/galerie', {}, displayResult);
    }

    useEffect(() => {
        getContentGalerie();
    }, []);

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
                            //savePhotoToBack(tmpPhoto);
                            setPhoto(concat(photo, tmpPhoto));
                            setPreview(concat(preview, tmpPreview));
                        }
                    }
                    reader.readAsDataURL(img);
                }
            }
        }
    }

    function closeGalerie(){
        setShowGalerie(false);
        setImageSelected(new Array(imageSelected.length).fill(false));
        if(imageCrop === null){
            setImageCrop(null)
        }
        
    }

    function ShowGalerie(){
        setShowGalerie(true);
        setPreviewSortie([]);
    }

    function choosePhotos(e){
        e.preventDefault();

        nbPhotoBeforeSortie.value = photoSortie.length;
        let photosToTake = [];
        let previewToTake = [];
        for(let i = 0; i < imageSelected.length; i++){
            if(imageSelected[i]){
                photosToTake.push(photo[i]);
                previewToTake.push(process.env.REACT_APP_BACK_URL + "/" + photo[i]);
            }
        }
     
        setPhotoSortie(photoSortie.concat(photosToTake));
        setPreviewSortie(previewSortie.concat(previewToTake));
        closeGalerie();
        console.log(previewToTake);
        
        
    }

    function switchSelectImage(e){
        e.preventDefault();
        if(selectImage){
            setImageSelected(new Array(imageSelected.length).fill(false))
        }
        setSelectImage(!selectImage);
    }
    
    function changeImageSelected(i, e , img){
        let tmp = JSON.parse(JSON.stringify(imageSelected));
        if(selectImage){
            tmp[i] = !tmp[i];
        }
        setImageSelected(tmp);
    }
    
    function switchShowUpload(e){
        e.preventDefault();
        setShowUpload(!showUpload);
    }

    return(
        <>
            <Modal
                open={showGalerie}
                onClose={closeGalerie}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {preview.map((imgSrc, i) => {
                        // console.log(imgSrc + " -- " + i);
                        return(
                            <div 
                                className={selectImage 
                                    ? imageSelected[i] 
                                        ? styles.conteneurPhoto + " " + styles.conteneurPhoto1 + " " + styles.photoSelected
                                        : styles.conteneurPhoto + " " + styles.conteneurPhoto1 
                                    : styles.conteneurPhoto + " " + styles.conteneurPhoto1}
                                onClick={(e) => changeImageSelected(i, e , imgSrc)} >
                                    <div className={styles.close}><button onClick={(e) => removePhoto(e, preview, setPreview, photo, setPhoto, i)}><span>X</span></button></div>
                                    <img className={styles.photo} src={imgSrc} />
                            </div>
                        )
                    })}
                    {preview.length === 0 ? <div>Aucune photo</div> : null}
                    <div>
                        <Button 
                            variant="outlined"
                            type="submit"
                            id="upload"
                            startIcon={<UploadFileIcon />}
                            onClick={switchShowUpload}
                        >
                            Upload
                        </Button>
                        <Button  
                            variant="contained" 
                            type='submit' 
                            id='btn1'
                            onClick={choosePhotos}
                            style={{backgroundColor:'#2ac4ea' }}>Selectionner image</Button>
                        <Button  
                            variant="contained" 
                            type='submit' 
                            id='btn1'
                            onClick={switchSelectImage}
                            style={{backgroundColor:'#2ac4ea' }}>Choisir images</Button>
                    </div>
                </Box>
            </Modal>
            <UploadPhoto 
                showUpload={showUpload} 
                switchShowUpload={switchShowUpload}
                removePhotoLocal={removePhotoLocal}
                getContentGalerie={getContentGalerie}
            />
    
        </>
    );
};

export default Galerie;