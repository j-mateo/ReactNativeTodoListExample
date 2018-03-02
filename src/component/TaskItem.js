import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Divider, Icon, Button } from '@shoutem/ui';

export default ({ taskItem: { title, checked }, index, onPress }) => (
  <View style={containerStyle}>
    <View style={titleContainer}>
      <Button onPress={onPress}>
        <Icon name={checked ? 'checkbox-on' : 'checkbox-off'} />
      </Button>
      <Text style={checked ? doneStyle : titleStyle}>{title}</Text>
    </View>
    <Divider styleName="line" />
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff'
  },
  titleStyle: {
    fontSize: 16
  },
  doneStyle: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#666'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  }
});

const { containerStyle, titleStyle, titleContainer, doneStyle } = styles;
