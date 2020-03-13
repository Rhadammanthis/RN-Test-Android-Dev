import React, {useState, useMemo} from 'react';
import Firebase from "./Firebase"
import GoogleAuth from "./Auth";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
} from 'react-native';

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

  return <Modal visible={props.isVisible}>
        <View style={styles.modal}>
            <Button title={"Dismiss RN component"} onPress={props.onDismiss} />
                <Text style={{}}>RN test: </Text>
                <Text style={{}}>Implement one of the following options in this very same component:</Text>
                <FlatList
                    data={data}
                    renderItem={({item}) => (
                        <View style={{width: '100%', margin: 10, }}>
                            <Text style={{ fontWeight: 'bold' }}>{`${item.title}`}</Text>
                            <Text>{item.body}</Text>
                        </View>)
                    }
                    keyExtractor={item => item.id}
                />
        </View>
    </Modal>
}
  

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
});

export default RNModal;
