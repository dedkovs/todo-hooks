import { useState, useContext, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { DispatchContext, StateContext } from '../App';

const ErrorAlert = () => {
  const { state } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [open, setOpen] = useState(Boolean(state.error));

  useEffect(() => setOpen(Boolean(state.error)), [state.error]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => dispatch({ type: 'setError', payload: null }), 100);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{state.error}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorAlert;
