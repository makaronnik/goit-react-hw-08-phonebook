import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, ListItem, ListItemText } from '@mui/material';

const ContactListItem = ({ contact, onRemove, onUpdate, isLast }) => {
  return (
    <ListItem
      sx={{ pr: 8 }}
      disableGutters
      disablePadding
      divider={!isLast}
      secondaryAction={
        <>
          <IconButton
            sx={{
              pr: 1,
              opacity: 0.3,
              transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': { opacity: 1 },
            }}
            edge="end"
            aria-label="update"
            onClick={() => onUpdate(contact)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              opacity: 0.3,
              transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',

              '&:hover': { opacity: 1 },
            }}
            edge="end"
            aria-label="delete"
            onClick={() => onRemove(contact)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={contact.name} secondary={contact.number} />
    </ListItem>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default ContactListItem;
