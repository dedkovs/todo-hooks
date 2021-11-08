import { CircularProgress, Box } from '@mui/material';

const Spinner = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
