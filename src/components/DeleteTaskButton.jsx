import { useContext } from 'react';
import { DispatchContext } from '../App';
import { Box, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const deleteButtonContainerStyle = {
  display: 'flex',
  paddingLeft: 1,
  alignItems: 'center',
};

const DeleteTaskButton = ({ index, task }) => {
  const dispatch = useContext(DispatchContext);

  return (
    <Box sx={deleteButtonContainerStyle}>
      <IconButton
        onClick={() => {
          dispatch({ type: 'deleteTask', payload: index });
        }}
      >
        <HighlightOffIcon />
      </IconButton>
    </Box>
  );
};

export default DeleteTaskButton;
