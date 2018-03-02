import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Icon } from '@shoutem/ui';

export default class TaskInput extends Component {
  render() {
    const { onPress, ...props } = this.props;

    return (
      <View style={containerStyle}>
        <View style={textInputStyle}>
          <TextInput {...props} />
        </View>
        <Button styleName="clear" onPress={onPress}>
          <Icon name="plus-button" />
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  textInputStyle: {
    flex: 1
  }
});

const { containerStyle, textInputStyle } = styles;
