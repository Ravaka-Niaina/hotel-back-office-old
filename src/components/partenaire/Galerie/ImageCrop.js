import Box from '@mui/material/Box';
import React, {useState, useCallback} from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import Cropper from 'react-easy-crop'

let fileData = null;


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


const ImageCrop = ({switchShowImageCrop,showImageCrop,srcImg,setImageCrop,imageCrop ,ShowGalerie,setIsModifImgCrop}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea]= useState(null);
    const [image, setImage]= useState(null);

    /*image Crop
    const [crop, setCrop] = useState({aspect: 16 / 9});
    const [crop, setCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
    }) */
    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
      }

    const createImage = url =>
    new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') 
    image.src = url
    })

    const getCroppedImg = async (e,imageSrc, pixelCrop) => {
        try {
            const image = await createImage(imageSrc)
            const canvas = document.createElement('canvas')
            canvas.width = pixelCrop.width
            canvas.height = pixelCrop.height
            const ctx = canvas.getContext('2d')
        
            ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
            )
        
            // Base64
            let base64 =  canvas.toDataURL('image/jpeg');
            setImageCrop(base64);
            switchShowImageCrop(e, false);
            setIsModifImgCrop(true);

        } catch (e) {
            console.log("crop the image");
        }
    };

    /* rogner image 
     const getCroppedImg = async (e) => {
        try {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / croppedArea.width;
            const scaleY = image.naturalHeight / croppedArea.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                croppedArea,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL("image/jpeg", 1);
            setImageCrop(base64Image);

            switchShowImageCrop(e, false);
            // console.log(result);
        } catch (e) {
            console.log("crop the image");
        }
    };
    */

    return(
        <>
            <Modal
                open={showImageCrop}
                onClose={(e) => {switchShowImageCrop(e, false); ShowGalerie()}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        {srcImg && (
                            <div>
                                {/* <ReactCrop
                                    style={{maxWidth: "50%"}}
                                    src={srcImg}
                                    onImageLoaded={setImage}
                                    crop={crop}
                                    onChange={setCrop}
                                /> */}
                                <Cropper
                                    image={srcImg}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={4 / 3}
                                    onImageLoaded={setImage}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                                
                                <Button  
                                    variant="contained" 
                                    type='submit' 
                                    id='btn1'
                                    onClick={(e) => getCroppedImg(e, srcImg,croppedArea)}
                                    style={{backgroundColor:'#2ac4ea' }}
                                >
                                    Download
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="controls">
                        <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => {
                            setZoom(e.target.value)
                        }}
                        className="zoom-range"
                        />
                    </div>
                                
                    
                </Box>
            </Modal>
        </>
    );
};

export default ImageCrop;