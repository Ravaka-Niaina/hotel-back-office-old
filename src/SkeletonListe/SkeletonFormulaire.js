import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import {Stack, Box , Paper} from '@mui/material';

export default function Variants(props) {
    const test = props.heigth;
    const heigth = "100%"
  return (
    <Stack spacing={1}>
     <Skeleton variant="text" width={200} height={50} style={{margin :"0 auto"}} /> <br/>
      <Skeleton variant="rectangular" sx={{ width: "40%", mb: 2 }} height={40} style={{margin :"0 auto"}}/><br/>
    </Stack>
  );
}