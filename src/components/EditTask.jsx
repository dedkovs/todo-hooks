import { useState, useContext, useEffect, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { DispatchContext, StateContext } from '../App';

const EditTask = () => {
  const { state } = useContext(StateContext);

  const dispatch = useContext(DispatchContext);

  const prevText = state.editTask?.task.text || '';

  const [open, setOpen] = useState(Boolean(state.editTask));

  const [text, setText] = useState(prevText);

  const [textAreaElement, setTextAreaElement] = useState(null);

  useEffect(() => setOpen(Boolean(state.editTask)), [state.editTask]);

  useEffect(() => setText(prevText), [prevText]);

  const [taskNumber, setTaskNumber] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => dispatch({ type: 'setEditTask', payload: null }), 300);
  };

  const handleSave = () => {
    setTaskNumber(state.editTask.index + 1);
    const index = state.editTask.index;
    if (text.trim() === prevText) {
      handleClose();
    } else {
      if (text.trim() !== '') {
        const newTask = { ...state.editTask.task, text };
        dispatch({
          type: 'addNewTask',
          payload: { newTask, index },
        });
      }
    }
  };

  const handleChangeTaskText = (e) => {
    setText(e.target.value);
  };

  const dialogRef = useRef();

  useEffect(() => {
    textAreaElement?.focus();
    const textLength = textAreaElement?.value.length;
    textAreaElement?.setSelectionRange(textLength, textLength);
  }, [textAreaElement]);

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: 300 } }}
      open={open}
      onClose={handleClose}
      ref={(node) => {
        dialogRef.current = node;
        const textAreaElement =
          dialogRef.current?.getElementsByTagName('textarea')[0];
        setTextAreaElement(textAreaElement);
      }}
    >
      <DialogTitle>{`Edit task #${
        Number.isNaN(state.editTask?.index + 1)
          ? taskNumber
          : state.editTask?.index + 1
      }`}</DialogTitle>
      <DialogContent>
        <TextField
          ref={dialogRef}
          multiline
          rows={4}
          value={text}
          onChange={handleChangeTaskText}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              top: 0,
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTask;
