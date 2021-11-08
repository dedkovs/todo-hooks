import { useContext } from 'react';
import { DispatchContext } from '../App';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const editButtonContainerStyle = {
  display: 'flex',
  paddingLeft: 1,
  alignItems: 'center',
};

const EditTaskButton = ({ index, task }) => {
  const dispatch = useContext(DispatchContext);

  return (
    <Box sx={editButtonContainerStyle}>
      <IconButton
        onClick={() => {
          dispatch({ type: 'setEditTask', payload: { index, task } });
        }}
      >
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default EditTaskButton;
