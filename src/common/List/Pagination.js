import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Pagine(props) {
  return (
    <Stack spacing={2}>
      <Pagination
        page={props.currentNumPage} 
        count={props.pagine}
        onChange={(e, val) => {props.setCurrentNumPage(val); props.rechercher(val)}}
      />
    </Stack>
  );
}