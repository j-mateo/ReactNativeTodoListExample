import {
  UPDATE_TODO,
  SHOW_COMPLETED,
  CLEAR_TODO,
  SAVE_TODO,
} from "../actions/types";

const initialState = {
  todoList: [],
  allTodos: [],
  showCompleted: false,
};

const updateItem = (list, item) => {
  return list.map(todo => {
    if(item.id !== todo.id) return todo;

    return {
      ...todo,
      ...item,
    }
  })
};

export const filteredTodo = (list, showCompleted) => {
  if(showCompleted) return list;

  return list.filter(item => !item.checked);
};

export default (state = initialState, action) => {
  console.log({ state, action })
  switch (action.type) {
    case SAVE_TODO: return { ...state, todoList: filteredTodo([action.todo].concat(state.todoList), state.showCompleted), allTodos: [action.todo].concat(state.todoList) };
    case UPDATE_TODO: return { ...state, todoList: filteredTodo(updateItem(state.todoList, action.todo), state.showCompleted), allTodos: updateItem(state.todoList, action.todo) };
    case CLEAR_TODO: return { ...state, todoList: [], loading: false };
    case SHOW_COMPLETED: return { ...state, showCompleted: action.payload, todoList: filteredTodo(state.allTodos, action.payload)  };
  }

  return state;
}