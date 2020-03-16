import React from 'react';
import SortableListView from 'react-native-sortable-listview'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ListItem, { getCharacter} from "./ListItem"

const ListScreen = props => {

  let data = {
    ana: getCharacter("Ana"),
    ashe: getCharacter("Ashe"),
    brig: getCharacter("Brigitte"),
    doom: getCharacter("Doomfist"),
    cree: getCharacter("McCree"),
    sig: getCharacter("Sigma")
  }

  let order = Object.keys(data) //Array of keys

  return <View style={{ flex: 1 }}>
    <Text style={styles.title}> Who is the best Overwatch hero?</Text>
    <SortableListView
      style={{ flex: 1 }}
      data={data}
      order={order}
      onRowMoved={e => {
        order.splice(e.to, 0, order.splice(e.from, 1)[0])
      }}
      renderRow={row => <ListItem key={row.name} character={row} animatable={false}/>}
    />
  </View>
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center', 
    paddingHorizontal: 20, 
    fontSize: 20
  }
});

export default ListScreen;