import React, { useState, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import ListScreen from "./ListScreen"
import ScrollScreen from "./ScrollScreen"
import GraphScreen from "./GraphScreen"

/**
 * INSTRUCTIONS:
 *
 * We expect to test your RN skills in this component.
 * 
 * Implement in this same component one of the three options proposed (you can erase all current content, but not the dismiss button).
 * There are no specific rules: you can create the components and tools yourself, use libraries, etc. In other words, do whatever you want.
 * We expect proper explanations of the decisions you made.
 *
 * Extras:
 * - You can, of course, implement more than one options. In that case, you'll have to figure out a way to display more than one, maybe using some navigation library?
 */

const RNModal = props => {
  const data = [
    {
      id: 'list',
      title: 'Draggable list',
      body: 'List with several items. The user can drag and drop items and change their position in the list.',
    },
    {
      id: 'scrollview',
      title: 'Growing Vertical ScrollView with an item fixed at the bottom',
      body: 'This component shouldn\'t be scrollable if its content doesn\'t reach the available height screen, but it should if it surpasses it'
    },
    {
      id: 'graph',
      title: 'Line chart',
      body: 'Try to create a line chart displaying coronavirus infections. Add reported cases in the Y axis, and days in the X axis. You can use hardcoded values here.'
    },
  ];

  const Tab = createBottomTabNavigator();

  return <Modal {...props} visible={props.isVisible} animationType="slide">
    <SafeAreaView style={styles.modal}>
      <Button title={"Dismiss RN component"} onPress={props.onDismiss} />
      <Tab.Navigator>
        <Tab.Screen name="List" component={ListScreen} />
        <Tab.Screen name="Scroll" component={ScrollScreen} />
        <Tab.Screen name="Graph" component={GraphScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  </Modal>
}


const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
});

export default RNModal;
