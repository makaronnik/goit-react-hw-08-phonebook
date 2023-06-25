import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filter/filterSlice';
import { getFilter } from 'redux/filter/filterSelectors';

import FormGroup from 'components/UI/FormGroup/FormGroup';

const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(getFilter);

  return (
    <FormGroup>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        type="text"
        id="filter"
        name="filter"
        value={filter}
        onChange={({ target }) => dispatch(setFilter(target.value))}
      />
    </FormGroup>
  );
};

export default Filter;
