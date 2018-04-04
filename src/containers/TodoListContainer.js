import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Screen,
  NavigationBar,
  Title,
  Divider,
  Switch,
  Button
} from '@shoutem/ui';
import _ from 'lodash';

import { TaskInput, TaskList } from '../component';
import * as actions from '../actions/todolistActions';

class TodoListContainer extends Component<Props> {
  state = {
    taskContent: ''
  };

  propTypes = {
    toggleTodoStatus: PropTypes.func,
    saveNewTask: PropTypes.func,
    toggleShowCompleted: PropTypes.func
  };

  handleTextChange = taskContent => {
    this.setState({ taskContent });
  };

  handleNewTask = () => {
    const { taskContent } = this.state;

    if (taskContent === '') return;

    const id = this.uuidv4();
    const newTask = { title: taskContent, id, createdAt: new Date() } ;

    this.props.saveNewTask(newTask);

    this.setState({
      taskContent: ''
    })
  };

  renderSwitch() {
    const { showCompleted } = this.props;

    return (
      <View style={switchContainer}>
        <Switch value={showCompleted} onValueChange={this.props.toggleShowCompleted} />
        <Text>Show All</Text>
      </View>
    );
  }

  renderList() {
    if (_.isEmpty(this.props.todoList))
      return (
        <View style={emptyStyle}>
          <Text>All Done!</Text>
        </View>
      );

    return (
      <TaskList
        data={this.props.todoList}
        onItemPressed={this.props.toggleTodoStatus}
        extraData={this.props.todoList}
      />
    );
  }

  render() {
    if(!this.props.todoList) return <Text>Loading...</Text>;

    return (
      <Screen>
        <NavigationBar
          centerComponent={<Title>Tasks</Title>}
          leftComponent={this.renderSwitch()}
          rightComponent={
            <Button onPress={this.props.clearData}>
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
      const r = (Math.random() * 16) | 0,
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

function mapStateToProps(state) {
  console.log({ state })
  return {
    todoList: state.todos.todoList,
    showCompleted: state.todos.showCompleted,
  }
}

export default connect(mapStateToProps, actions)(TodoListContainer);
