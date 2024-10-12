import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const TabBar = ({state, navigation, position}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const label = route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{
              height: 50,
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                fontSize: isFocused ? 40 : 20,
                color: 'black',
                fontWeight: 'bold',
                padding: isFocused ? 0 : 5,
                includeFontPadding: false,
              }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
      {/*<Text
        style={{
          fontSize: state.index == 0 ? 40 : 20,
          color: 'black',
          fontWeight: 'bold',
        }}>
        {state.routeNames[0]}
      </Text>
      <Text
        style={{
          fontSize: state.index == 1 ? 40 : 20,
          color: 'black',
          fontWeight: 'bold',
        }}>
        {state.routeNames[1]}
      </Text> */}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
