import { useContext, useEffect, useRef, useState } from 'react';
import { StateContext } from '../App';
import { Box, OutlinedInput } from '@mui/material';
import AddTaskButton from './AddTaskButton';

const inputTaskContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: { xs: 4, sm: 2 },
  maxWidth: 600,
  minWidth: 320,
  margin: '0 auto',
};

const inputTask = {
  width: '100%',
  backgroundColor: 'rgba(255,255,255,0.95)',
  boxShadow: '0px 0px 20px rgba(0,0,0,0.5)',
};

const InputTaskContainer = () => {
  const { state } = useContext(StateContext);

  const [task, setTask] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.children[0].focus();
  }, [state.todoList.length, state.editTask, state.error]);

  useEffect(() => {
    setTask('');
  }, [state.todoList.length]);

  const appBarStyle = {
    width: '100%',
    backgroundColor: 'common.white',
    backgroundImage: `url(${state.backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    paddingLeft: { xs: 2, sm: 4 },
    paddingRight: { xs: 2, sm: 4 },
    paddingTop: { xs: 2, sm: 4 },
    paddingBottom: { xs: 2, sm: 4 },
    position: 'sticky',
    top: 0,
    zIndex: 1,
    boxShadow: '0px 0px 20px rgba(0,0,0,1)',
    overflow: 'hidden',
  };

  return (
    <Box sx={appBarStyle}>
      <Box sx={inputTaskContainerStyle}>
        <OutlinedInput
          ref={inputRef}
          multiline
          maxRows={5}
          sx={inputTask}
          autoFocus
          type={'text'}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task"
          endAdornment={<AddTaskButton text={task} />}
        />
      </Box>
    </Box>
  );
};

export default InputTaskContainer;
