import { Typography } from '@mui/material';

const idStyle = {
  wordBreak: 'normal',
};

const TaskId = ({ index, done }) => {
  return (
    <Typography sx={idStyle} color={done ? 'rgba(0,0,0,0.3)' : 'primary'}>
      {index + 1}.
    </Typography>
  );
};

export default TaskId;
