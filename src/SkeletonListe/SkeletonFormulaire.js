import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants(props) {
    const width = '100%';
    const heigth = "100%"
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" sx={{ width: "100%", mb: 2 }} height={40} />
      <Skeleton variant="rectangular" sx={{ width: '100%', mb: 2 }} height={118} />
      <Skeleton variant="rectangular" sx={{ width: '100%', mb: 2 }} height={40} />
    </Stack>
  );
}