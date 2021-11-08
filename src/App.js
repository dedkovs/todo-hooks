import {
  useReducer,
  createContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { Box } from '@mui/material';
import { reducer, initialState } from './reducer/reducer';
import TaskListContainer from './components/TaskListContainer';
import InputTaskContainer from './components/InputTaskContainer';
import Spinner from './components/Spinner';
import ErrorAlert from './components/ErrorAlert';
import EditTask from './components/EditTask';
import backgroundImage from './assets/donald-giannatti-HWTXldFPVKM-unsplash.jpg';

const hiddenImageStyle = {
  width: 0,
  height: 0,
  position: 'absolute',
  visibility: 'hidden',
};

export const DispatchContext = createContext();
export const StateContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (localStorage.getItem('todoList')) {
      dispatch({
        type: 'setTodoList',
        payload: JSON.parse(localStorage.getItem('todoList')),
      });
      dispatch({
        type: 'setTodoValues',
        payload: new Set(
          JSON.parse(localStorage.getItem('todoList')).reduce(
            (acc, cur) => [...acc, cur.text],
            []
          )
        ),
      });
    }
  }, []);

  const combineDispatch =
    (...dispatches) =>
    (action) =>
      dispatches.forEach((dispatch) => dispatch(action));

  const combinedDispatch = useCallback(combineDispatch(dispatch), [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const combinedState = useMemo(() => ({ state }), [state]);

  const handleBackgroundImageLoaded = () => {
    dispatch({ type: 'setBackgroundImage', payload: backgroundImage });
    dispatch({ type: 'setLoading', payload: false });
    const deleteAfterLoad = document.getElementById('deleteAfterLoad');
    if (deleteAfterLoad) {
      deleteAfterLoad.parentNode?.removeChild(deleteAfterLoad);
    }
  };

  return (
    <DispatchContext.Provider value={combinedDispatch}>
      <StateContext.Provider value={combinedState}>
        <Box
          id="deleteAfterLoad"
          component="img"
          src={backgroundImage}
          sx={hiddenImageStyle}
          onLoad={handleBackgroundImageLoaded}
        />
        {state.loading ? (
          <Spinner />
        ) : (
          <>
            <InputTaskContainer />
            <TaskListContainer />
            <EditTask />
            <ErrorAlert />
          </>
        )}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
