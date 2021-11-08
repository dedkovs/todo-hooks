import { useContext } from 'react';
import { DispatchContext } from '../App';
import { Box, Grow, Paper } from '@mui/material';
import TaskId from './TaskId';
import TaskText from './TaskText';
import DeleteTaskButton from './DeleteTaskButton';
import EditTaskButton from './EditTaskButton';

const TaskContainer = ({ task, index, timeout }) => {
  const dispatch = useContext(DispatchContext);

  const { done } = task;

  const taskContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    padding: 1,
    paddingLeft: 2,
    paddingRight: 2,
    transition: 'background-color 0.3s',
    backgroundColor: done ? 'rgba(0,0,0,0.2)' : '#fff',
    '&:hover': {
      backgroundColor: done ? 'rgba(0,0,0,0.3)' : 'rgba(25,118,210,0.2)',
      cursor: 'pointer',
    },
  };

  return (
    <Grow in appear timeout={timeout}>
      <Box sx={{ display: 'flex' }}>
        <Paper
          onClick={() => {
            dispatch({ type: 'toggleDone', payload: { index, task } });
          }}
          variant="outlined"
          sx={taskContainerStyle}
        >
          <TaskId index={index} done={done} />
          <TaskText task={task} />
        </Paper>
        <EditTaskButton index={index} task={task} />
        <DeleteTaskButton index={index} task={task} />
      </Box>
    </Grow>
  );
};

export default TaskContainer;
