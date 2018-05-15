import {
  UPDATE_TODO,
  SHOW_COMPLETED,
  CLEAR_TODO,
  SAVE_TODO,
} from "../actions/types";

import { List } from 'immutable';

const initialState = {
  allTodos: List(),
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

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TODO: return { ...state, allTodos: state.allTodos.insert(0, action.todo) };
    case UPDATE_TODO: return { ...state, allTodos: updateItem(state.allTodos, action.todo) };
    case CLEAR_TODO: return { ...state, loading: false, allTodos: List() };
    case SHOW_COMPLETED: return { ...state, showCompleted: action.payload };
  }

  return state;
}