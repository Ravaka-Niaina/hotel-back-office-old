import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={1600} height={40} />
      <Skeleton variant="rectangular" width={1600} height={118} />
      <Skeleton variant="rectangular" width={1600} height={40} />
    </Stack>
  );
}