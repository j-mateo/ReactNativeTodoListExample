import {
  SAVE_TODO,
  UPDATE_TODO,
  SHOW_COMPLETED,
  CLEAR_TODO,
} from "./types";

export const saveNewTask = todo =>
  ({
    type: SAVE_TODO,
    todo
  });

export const toggleTodoStatus = (todo) => {
  const updatedTodo = { ...todo, checked: !todo.checked };
  return {
    type: UPDATE_TODO,
    todo: updatedTodo,
  };
};

export const toggleShowCompleted = showCompleted =>
  ({
    type: SHOW_COMPLETED,
    payload: showCompleted,
  });


export const clearData = () => ({ type: CLEAR_TODO });
