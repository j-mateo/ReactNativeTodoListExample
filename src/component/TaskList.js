import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ onItemPressed, ...otherProps }) => (
  <FlatList
    {...otherProps}
    keyExtractor={ (item, index) => item.id }
    renderItem={({ item, index }) => (
      <TaskItem taskItem={item} onPress={() => onItemPressed(item)} />
    )}
  />
);

export default TaskList;
