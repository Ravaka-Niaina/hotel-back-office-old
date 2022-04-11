import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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