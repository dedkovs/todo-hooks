import { Typography } from '@mui/material';

const TaskText = ({ task }) => {
  const { text, done } = task;

  const textStyle = {
    wordBreak: 'break-word',
    paddingLeft: 2,
    textDecoration: done ? 'line-through' : 'none',
    whiteSpace: 'break-spaces',
  };

  return <Typography sx={textStyle}>{text}</Typography>;
};

export default TaskText;
