import React from 'react';
import { VirtualizedList } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ onItemPressed, ...otherProps }) => (
  <VirtualizedList
    {...otherProps}
    keyExtractor={ (item, index) => item.id }
    getItem={(data, index) => data.get(index)}
    getItemCount={(data) => data.size}
    renderItem={({ item, index }) => (
      <TaskItem taskItem={item} onPress={() => onItemPressed(item)} />
    )}
  />
);

export default TaskList;
