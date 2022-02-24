import Box from '@mui/material/Box';
import styles from '../Photo/PreviewPhotoChambre.module.css';

const removePhoto = (event, preview, setPreview, photo, setPhoto, indicePhoto) => {
  event.preventDefault();

  let tmpPreview = JSON.parse(JSON.stringify(preview));
  tmpPreview.splice(indicePhoto, 1);
  setPreview(tmpPreview);

  let tmpPhoto = JSON.parse(JSON.stringify(photo));
  tmpPhoto.splice(indicePhoto, 1);
  setPhoto(tmpPhoto);
};

export default function PreviewPhotoChambre({preview, setPreview, noImage, photo, setPhoto}){
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
        <div className={styles.conteneurPhoto}>
          <img className={styles.photo} src={noImage} />
        </div>
      );
      
    }
    return list;
}