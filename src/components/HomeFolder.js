import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import React from 'react';
import {useState} from 'react';

const windowHeight = Dimensions.get('window').height;

const HomeFolder = props => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          marginHorizontal: 10,
        },
      ]}>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Pressable
            style={({pressed}) => [
              {
                opacity: pressed ? 0.8 : 1,
                marginHorizontal: 20,
                marginVertical: 15,
              },
            ]}>
            <TextInput
              placeholder="My personal notes"
              style={styles.folderName}
              placeholderTextColor="#aaaaaab4"
              value={props.folderName}
              caretHidden={true}
            />
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: pressed ? 'white' : null,
              },
              styles.rightButtonContainer,
            ]}>
            <Text style={styles.rightButton}>{'>'}</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default HomeFolder;

const styles = StyleSheet.create({
  container: {
    height: windowHeight / 5,
    backgroundColor: '#1a1d21f9',
    borderRadius: 20,
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  folderName: {
    color: '#aaaaaab4',
    fontWeight: 'bold',
    height: 50,
  },
  rightButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
  },
  rightButton: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
