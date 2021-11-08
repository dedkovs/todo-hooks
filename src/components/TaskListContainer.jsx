import { useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from '../App';
import { Box } from '@mui/material';
import TaskContainer from './TaskContainer';

const tasksContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  maxWidth: 600,
  minWidth: 320,
  margin: '0 auto',
};

const TaskListContainer = () => {
  const { state } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(
    () => dispatch({ type: 'setGrowTimeout', payload: false }),
    [dispatch]
  );

  const todoTasks = state.todoList.filter((task) => task.done === false);

  const doneTasks = state.todoList.filter((task) => task.done === true);

  const todoTasksLength = todoTasks.length;

  return (
    <Box
      sx={{
        paddingLeft: { xs: 2, sm: 4 },
        paddingRight: { xs: 2, sm: 4 },
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Box sx={tasksContainerStyle}>
        {todoTasks.map((task, index) => (
          <TaskContainer
            timeout={state.growTimeout ? 100 * (index + 1) : 100}
            key={index}
            task={task}
            index={index}
          />
        ))}
        {doneTasks.map((task, index) => {
          return (
            <TaskContainer
              timeout={
                state.growTimeout ? 100 * (todoTasksLength + index + 1) : 0
              }
              key={todoTasksLength + index}
              task={task}
              index={todoTasksLength + index}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default TaskListContainer;
