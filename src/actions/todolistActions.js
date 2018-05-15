import {
  SAVE_TODO,
  UPDATE_TODO,
  SHOW_COMPLETED,
  CLEAR_TODO,
} from "./types";

export const saveNewTask = todo =>
  ({
    type: SAVE_TODO,
    todo: { ...todo, id: uuidv4(), createdAt: new Date() }
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


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}