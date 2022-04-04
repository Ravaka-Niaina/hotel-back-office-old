import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
//import ReplayIcon from '@mui/icons-material/Replay';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import {uploadImage} from '../../common/requestImage.js';
import styles from './UploadPhoto.module.css';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    minHeight: '60px',
    lineHeight: '60px',
}));
const elevation = 3;

function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
}
LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

const removePhotoLocal = (preview, setPreview, photo, setPhoto, indicePhoto) => {
    let tmpPreview = JSON.parse(JSON.stringify(preview));
    tmpPreview.splice(indicePhoto, 1);
    setPreview(tmpPreview);
  
    let tmpPhoto = JSON.parse(JSON.stringify(photo));
    tmpPhoto.splice(indicePhoto, 1);
    setPhoto(tmpPhoto);
};

let increment = 1;
const PreviewPhotoToUpload = ({imgSrc, preview, setPreview, photo, setPhoto, i, functionUploadPhoto}) => {
    const [id, setId] = useState('default');
    const [progress, setProgress] = useState(0);
    const [isUploadCompleted, setIsUploadCompleted] = useState(false);
    const [isUploadInProgress, setIsUploadInProgress] = useState(false);
    const [error, setError] = useState(undefined);
    const [progressBarColor, setProgressBarColor] = useState("primary");

    useEffect(() => {
        console.log("createdId = " + increment);
        setId(increment);
        increment++;
        functionUploadPhoto[i] = { function: savePhotoToBack, args: {photo: photo[i], isUploadCompleted: isUploadCompleted} };
    }, []);

    function removePhoto(i){
        removePhotoLocal(preview, setPreview, photo, setPhoto, i);
        functionUploadPhoto.splice(i, 1);
        console.log(isUploadCompleted);
    }

    function callbackUpload(){
        setIsUploadCompleted(true);
        setIsUploadInProgress(false);
        //removePhoto(i);
    }
    function errorCallbackUpload(){
        setIsUploadInProgress(false);
        setProgressBarColor("error");
        setError("Connection error");
    }

    function savePhotoToBack(photo, isUploadCompleted){
        setIsUploadInProgress(true);
        setProgressBarColor("primary");
        setError(undefined);
        if(!isUploadCompleted){
            console.log(id + " , " + isUploadCompleted);
            uploadImage({
                method: 'post', 
                url: '/galerie/add', 
                data: {file: photo}, 
                callback: callbackUpload, 
                setProgress: setProgress,
                errorCallback: errorCallbackUpload
            });
        }
    }
    
    console.log(isUploadCompleted);
    return(
        <div className={styles.listPhoto}>
            <div style={{ backgroundImage: 'url(' + imgSrc + ')' }}></div>
            <div>
                <div><span>{error}</span></div>
                <LinearProgressWithLabel sx={{height: "15px" }} variant="determinate" value={progress} color={progressBarColor} />
            </div>
            <div>
                {isUploadCompleted 
                ?<Button 
                    variant="contained"
                    id="upload"
                    startIcon={<DoneIcon />}
                    onClick={() => removePhoto(i)}
                >
                    Completed
                </Button>
                : <Button 
                    variant="contained"
                    id="upload"
                    startIcon={<CancelIcon />}
                    onClick={() => removePhoto(i)}
                    disabled={isUploadInProgress}
                >
                    Cancel
                </Button>}
                
            </div>
        </div>
    );
}

let functionUploadPhoto = [];
const UploadPhoto = ({showUpload, switchShowUpload, removePhotoLocal, getContentGalerie}) => {
    const [photo, setPhoto] = useState([]);
    const [preview, setPreview] = useState([]);
    

    function closeUpload(e){
        switchShowUpload(e);
        setPhoto([]);
        setPreview([]);
        getContentGalerie();
    }

    function resetUploadList(){
        setPhoto([]);
        setPreview([]);
        functionUploadPhoto = [];
    }

    function handlePhotoChange(e){
        if(e.target.files.length > 0){
            let tmpPhoto = [];
            let tmpPreview = [];
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
                        if(finished === e.target.files.length){
                            setPhoto(photo.concat(tmpPhoto));
                            setPreview(preview.concat(tmpPreview));
                        }
                    }
                    reader.readAsDataURL(img);
                    functionUploadPhoto.push({});
                }
            }
        }
    }

    function uploadAllPhotos(){
        console.log("fupload = " + functionUploadPhoto.length + " , photos = " + photo.length);
        for(let i = 0; i < functionUploadPhoto.length; i++){
            const f = functionUploadPhoto[i];
            f.function(f.args.photo, f.args.isUploadCompleted);
        }
    }

    return(
        <Modal
            open={showUpload}
            onClose={closeUpload}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
              sx={{
                gap: 2,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '600px',
                overflowY: 'scroll',
                overflowX: 'hidden',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
                <div className={styles.close}><button onClick={closeUpload}><span>X</span></button></div>
                <div className={styles.upload}>
                    <Paper elevation={3} children={
                        <div>
                            <div>
                                <h3>Images</h3>
                                <div>
                                    <Stack direction="row" spacing={1}>
                                    <Button 
                                        variant="contained"
                                        id="add"
                                        startIcon={<AddIcon />}
                                        component="label"
                                    >
                                        Add
                                        <input 
                                            type="file"
                                            hidden
                                            accept= "image/*"
                                            multiple="multiple"
                                            onChange={handlePhotoChange}
                                        />
                                    </Button>
                                        <Button 
                                            variant="contained"
                                            id="upload"
                                            startIcon={<UploadFileIcon />}
                                            onClick={uploadAllPhotos}
                                        >
                                            Upload
                                        </Button>
                                        <Button 
                                            variant="contained"
                                            id="upload"
                                            startIcon={<CancelIcon />}
                                            onClick={resetUploadList}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                </div>
                            </div>
                            <p>Click the "Add" button to add files, then click on the "Upload" button to upload to the library.</p>
                        </div>
                    } />
                    <Paper elevation={3} children={
                        <div>
                            <h3>Upload</h3>
                            {preview.map((imgSrc, i) => {
                                return(
                                    <PreviewPhotoToUpload 
                                        imgSrc={imgSrc}
                                        removePhotoLocal={removePhotoLocal}
                                        preview={preview}
                                        setPreview={setPreview}
                                        photo={photo}
                                        setPhoto={setPhoto}
                                        i={i}
                                        functionUploadPhoto={functionUploadPhoto}
                                    />
                                )
                            })}
                        </div>
                    } />
                </div>
            </Box>
        </Modal>
    );
};

export default UploadPhoto;