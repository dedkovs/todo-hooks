import { useContext } from 'react';
import { DispatchContext } from '../App';
import { IconButton, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddTaskButton = ({ text }) => {
  const dispatch = useContext(DispatchContext);

  const handleAddTask = () => {
    if (text.trim() !== '') {
      const newTask = { text, done: false };
      dispatch({ type: 'addNewTask', payload: { newTask } });
    }
  };

  return (
    <InputAdornment position="end" sx={{ paddingLeft: 2 }}>
      <IconButton onClick={handleAddTask} edge="start">
        <AddIcon />
      </IconButton>
    </InputAdornment>
  );
};

export default AddTaskButton;
