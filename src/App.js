/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Text } from 'react-native';
import {
  Screen,
  NavigationBar,
  Title,
  Divider,
  Switch,
  Button
} from '@shoutem/ui';
import _ from 'lodash';

import { TaskInput, TaskList } from './component';

type Props = {};
export default class App extends Component<Props> {
  state = {
    taskContent: '',
    taskList: {},
    visibleTasks: [],
    showCompleted: false
  };

  handleTextChange = taskContent => {
    this.setState({ taskContent });
  };

  persistData(data) {
    AsyncStorage.setItem('@tasklistStore:taskList', JSON.stringify(data));
  }

  componentDidMount() {
    const { showCompleted } = this.state;

    AsyncStorage.getItem('@tasklistStore:taskList')
      .then(taskJson => {
        if (taskJson !== null) {
          const taskList = JSON.parse(taskJson);
          const visibleTasks = this.generateVisibleTasks(taskList);
          this.setState({
            taskList,
            visibleTasks
          });
        }
      })
      .catch(error => console.log(error));
  }

  generateVisibleTasks(data, showCompleted = this.state.showCompleted) {
    let result = showCompleted ? data : _.filter(data, task => !task.checked);

    return _.map(result, task => task);
  }

  handleNewTask = () => {
    const { taskContent, taskList, showCompleted } = this.state;

    if (taskContent === '') return;

    const id = this.uuidv4();
    const newTask = { [id]: { title: taskContent, id, createdAt: new Date() } };
    const newData = _.assign(newTask, taskList);

    const visibleTasks = this.generateVisibleTasks(newData);

    this.persistData(newData);

    this.setState({
      taskContent: '',
      taskList: newData,
      visibleTasks
    });
  };

  handleItemPress = index => {
    const { taskList } = this.state;
    const task = taskList[index];
    task.checked = !task.checked;
    taskList[index] = task;
    this.persistData(taskList);
    this.setState({
      taskList,
      visibleTasks: this.generateVisibleTasks(taskList)
    });
  };

  handleSwitch = showCompleted => {
    const { taskList } = this.state;

    const visibleTasks = this.generateVisibleTasks(taskList, showCompleted);

    this.setState({
      showCompleted,
      visibleTasks
    });
  };

  renderSwitch() {
    const { showCompleted } = this.state;

    return (
      <View style={switchContainer}>
        <Switch value={showCompleted} onValueChange={this.handleSwitch} />
        <Text>Show All</Text>
      </View>
    );
  }

  getData() {
    return this.state.visibleTasks;
  }

  clearData = () => {
    AsyncStorage.removeItem('@tasklistStore:taskList');
    this.setState({
      visibleTasks: {},
      taskList: {}
    });
  };

  renderList() {
    if (_.isEmpty(this.getData()))
      return (
        <View style={emptyStyle}>
          <Text>All Done!</Text>
        </View>
      );

    return (
      <TaskList
        data={this.getData()}
        onItemPressed={this.handleItemPress}
        extraData={this.state}
      />
    );
  }

  render() {
    return (
      <Screen>
        <NavigationBar
          centerComponent={<Title>Tasks</Title>}
          leftComponent={this.renderSwitch()}
          rightComponent={
            <Button onPress={this.clearData}>
              <Text>Clear</Text>
            </Button>
          }
          styleName="inline"
        />
        <TaskInput
          placeholder="Enter task..."
          value={this.state.taskContent}
          onChangeText={this.handleTextChange}
          onSubmitEditing={this.handleNewTask}
          onPress={this.handleNewTask}
        />
        <Divider styleName="line" />
        {this.renderList()}
      </Screen>
    );
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  },
  switchContainer: {
    marginLeft: 15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  emptyStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const { emptyStyle, switchContainer } = styles;
