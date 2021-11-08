export const initialState = {
  todoList: [],
  error: '',
  growTimeout: true,
  loading: true,
  backgroundImage: null,
  todoValues: new Set(),
  editTask: null,
  prevTaskText: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'setTodoList': {
      return { ...state, todoList: action.payload };
    }

    case 'setTodoValues': {
      return { ...state, todoValues: action.payload };
    }

    case 'setError': {
      return { ...state, error: action.payload };
    }

    case 'setLoading': {
      return { ...state, loading: action.payload };
    }

    case 'setBackgroundImage': {
      return { ...state, backgroundImage: action.payload };
    }

    case 'setGrowTimeout': {
      return { ...state, growTimeout: action.payload };
    }

    case 'setEditTask': {
      return {
        ...state,
        editTask: action.payload,
        prevTaskText: action.payload?.task.text || '',
      };
    }

    case 'removePrev': {
      const todoValues = state.todoValues;
      todoValues.delete(action.payload);

      return {
        ...state,
        todoValues,
      };
    }

    case 'addNewTask': {
      const { newTask, index } = action.payload;

      if (state.todoValues.has(newTask.text)) {
        const index = state.todoList.findIndex(
          (task) => task.text === newTask.text
        );
        return {
          ...state,
          error: `This task is already on the list at number ${index + 1}.`,
        };
      }

      const todoValues = state.todoValues;
      todoValues.add(newTask.text);

      let todoList;

      if (typeof index !== 'undefined') {
        todoList = [
          ...state.todoList.slice(0, index),
          newTask,
          ...state.todoList.slice(index + 1),
        ];
        todoValues.delete(state.prevTaskText);
      } else {
        todoList = [
          ...state.todoList.filter((task) => task.done === false),
          newTask,
          ...state.todoList.filter((task) => task.done === true),
        ];
      }

      localStorage.setItem('todoList', JSON.stringify(todoList));

      return {
        ...state,
        inputTask: '',
        todoList,
        editTask: null,
        prevTaskText: '',
      };
    }

    case 'deleteTask': {
      const index = action.payload;

      const todoList = [
        ...state.todoList.slice(0, index),
        ...state.todoList.slice(index + 1),
      ];

      const todoValues = state.todoValues;
      todoValues.delete(state.todoList[index].text);

      localStorage.setItem('todoList', JSON.stringify(todoList));

      if (todoList.length === 0) {
        localStorage.removeItem('todoList');
      }

      return { ...state, todoList, todoValues };
    }

    case 'toggleDone':
      {
        const { index, task } = action.payload;

        const todoListWithoutTogglingTask = [
          ...state.todoList.slice(0, index),
          ...state.todoList.slice(index + 1),
        ];

        if (task.done === false) {
          const todoList = [
            ...todoListWithoutTogglingTask,
            { ...task, done: true },
          ];

          localStorage.setItem('todoList', JSON.stringify(todoList));

          return {
            ...state,
            todoList,
          };
        }

        if (task.done === true) {
          const todoList = [
            ...todoListWithoutTogglingTask.filter(
              (task) => task.done === false
            ),
            { ...task, done: false },
            ...todoListWithoutTogglingTask.filter((task) => task.done === true),
          ];

          localStorage.setItem('todoList', JSON.stringify(todoList));

          return {
            ...state,
            todoList,
          };
        }
      }

      break;

    default:
      return state;
  }
};
