import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NotesScreen from '../screens/NotesScreen';
import RemindersScreen from '../screens/RemindersScreen';
import TabBar from '../components/TabBar';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => {
        return <TabBar {...props} />;
      }}
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: 'white'},
      }}>
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Reminders" component={RemindersScreen} />
    </Tab.Navigator>
  );
};

export default TopTabNavigation;

const styles = StyleSheet.create({});
