import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TextInput,
  PanResponder,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {storage} from '../../index';
import {useMMKVString} from 'react-native-mmkv';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeFolder = props => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isSwiped, setIsSwiped] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },
      onMoveShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        setIsSwiped(true);
        if (gestureState.dx < -50) {
          Animated.spring(translateX, {
            toValue: -100,
            useNativeDriver: true,
          }).start();
        } else {
          setIsSwiped(false);
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={{flexDirection: 'row'}}>
      <Animated.View style={{flex: 1, transform: [{translateX: translateX}]}}>
        <View {...panResponder.panHandlers}>
          <Pressable
            onPress={props.onPress}
            disabled={isSwiped}
            style={({pressed}) => [
              {
                opacity: pressed ? 0.9 : 1,
                marginHorizontal: 10,
                marginBottom: 25,
                height: windowHeight / 5,
                backgroundColor: '#2a2f36ff',
                borderRadius: 20,
              },
            ]}>
            <View style={styles.upperContainer}>
              <TextInput
                editable={!isSwiped}
                placeholder="My personal notes"
                style={styles.folderName}
                placeholderTextColor="#aaaaaab4"
                value={props.folderName}
                caretHidden={true}
                onChangeText={props.onChangeText}
              />
              {/* <Pressable
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    backgroundColor: pressed ? 'white' : null,
                  },
                  styles.rightButtonContainer,
                ]}>
                <Text style={styles.rightButton}>{'>'}</Text>
              </Pressable>*/}
            </View>
          </Pressable>
          <Pressable
            style={styles.deleteButton}
            onPress={() => {
              props.onDelete();
              Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            }}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

export default HomeFolder;

const styles = StyleSheet.create({
  container: {
    height: windowHeight / 5,
    backgroundColor: '#2a2f36ff',
    borderRadius: 20,
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  folderName: {
    color: '#aaaaaab4',
    fontWeight: 'bold',
    height: 50,
    width: windowWidth / 1.5,
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
  deleteButton: {
    height: windowHeight / 5,
    width: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -100,
    borderRadius: 20,
  },
  deleteText: {fontWeight: 'bold', color: 'white', fontSize: 17},
});
