import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const AddButton = ({...props}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.addButton,
      ]}
      {...props}>
      <Text
        style={{
          fontSize: windowHeight / 23,
        }}>
        +
      </Text>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'red',
    height: windowHeight / 15,
    width: windowHeight / 15,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
});
