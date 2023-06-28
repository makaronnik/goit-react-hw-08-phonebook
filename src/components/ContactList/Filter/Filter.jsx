import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filter/filterSlice';
import { selectFilter } from 'redux/filter/filterSelectors';
import { IconButton, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectFilter);

  return (
    <TextField
      size="small"
      label="Find contacts by name"
      value={filter}
      onChange={e => dispatch(setFilter(e.target.value))}
      InputProps={{
        endAdornment: (
          <IconButton
            fontSize="small"
            sx={{ visibility: filter ? 'visible' : 'hidden', mr: -1 }}
            onClick={() => dispatch(setFilter(''))}
          >
            <ClearIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default Filter;
