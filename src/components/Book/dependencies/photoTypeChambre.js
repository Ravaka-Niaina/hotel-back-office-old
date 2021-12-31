import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import SimpleImageSlider from "react-simple-image-slider";

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));
  
  const PhotoTypeChambre = (props) => {
    let images = [];
    for(let i = 0; i < props.photos.length; i++){
        images.push({ url: process.env.REACT_APP_BACK_URL + "/" + props.photos[i].replace("\\","/") });
    }
    console.log(props.photos[0]);
    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <SimpleImageSlider
                        width={850}
                        height={504}
                        images={images}
                        showBullets={true}
                        showNavs={true}
                    />
                </React.Fragment>
            }
            placement="bottom-start"
        >
            <div style={{ backgroundImage: 'url(' + process.env.REACT_APP_BACK_URL + "/" + props.photos[0].replace("\\","/") + ")" }}></div>
        </HtmlTooltip>
    );
  }

  export default PhotoTypeChambre;