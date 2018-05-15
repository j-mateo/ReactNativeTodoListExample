import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.todos.showCompleted

const getTodos = (state) => state.todos.allTodos

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (showCompleted, todos) => {
    return showCompleted ? todos : todos.filter(t => !t.checked)
  }
)