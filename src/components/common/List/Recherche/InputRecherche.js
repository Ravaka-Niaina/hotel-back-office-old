import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function InputRecherche({rechercher, toSearch, setToSearch}){

    return(
        <div style={{float : 'right'}}>
            <TextField 
                id="outlined-size-small"
                size="small" label ="Search"
                name="Search"
                type="text"
                value={toSearch}
                onChange={(e) => setToSearch(e.target.value)}
                InputProps={{ endAdornment: 
                <InputAdornment position="end">
                    <SearchIcon style={{color:"blue"}} onClick={(e) => rechercher(1)} />
                </InputAdornment>
                }}
            />
        </div>
    );
}