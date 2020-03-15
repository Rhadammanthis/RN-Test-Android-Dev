import React, { useState, useMemo } from 'react';
import SortableListView from 'react-native-sortable-listview'
import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  SafeAreaView,
  TouchableHighlight
} from 'react-native';

const ListScreen = props => {

  let data = {
    hello: { text: 'world' },
    how: { text: 'are you' },
    test: { text: 123 },
    this: { text: 'is' },
    a: { text: 'a' },
    real: { text: 'real' },
    drag: { text: 'drag and drop' },
    bb: { text: 'bb' },
    cc: { text: 'cc' },
    dd: { text: 'dd' },
    ee: { text: 'ee' },
    ff: { text: 'ff' },
    gg: { text: 'gg' },
    hh: { text: 'hh' },
    ii: { text: 'ii' },
    jj: { text: 'jj' },
    kk: { text: 'kk' },
  }

  let order = Object.keys(data) //Array of keys

  renderItem = (row) => {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          margin: 5,
          padding: 25,
          borderRadius: 10,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
      >
        <Text>{row.text}</Text>
      </TouchableHighlight>
    );
  };

  return <View style={{ flex: 1, backgroundColor: 'gray' }}>
    <SortableListView
      style={{ flex: 1 }}
      data={data}
      order={order}
      onRowMoved={e => {
        order.splice(e.to, 0, order.splice(e.from, 1)[0])
      }}
      renderRow={row => this.renderItem(row)}
    />
  </View>
}

export default ListScreen;