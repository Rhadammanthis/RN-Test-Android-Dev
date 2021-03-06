import React from 'react';
import SortableListView from 'react-native-sortable-listview'
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image
} from 'react-native';
const ListScreen = props => {

  const characters = [
    {
      name: "Ashe",
      role: "Damage",
      bio: "Ashe is the ambitious and calculating leader of the Deadlock Gang and a respected figure in the criminal underworld.",
      pic: require("./img/ashe_portrait.png")
    },
    {
      name: "McCree",
      role: "Damage",
      bio: "Armed with his Peacekeeper revolver, the outlaw Jesse McCree doles out justice on his own terms.",
      pic: require("./img/mccree_portrait.png")
    },
    {
      name: "Ana",
      role: "Support",
      bio: "One of the founding members of Overwatch, Ana uses her skills and expertise to defend her home and the people she cares for.",
      pic: require("./img/ana_portrait.png")
    },
    {
      name: "Sigma",
      role: "Tank",
      bio: "Brilliant astrophysicist Dr. Siebren de Kuiper's life changed forever when an experiment gone wrong gave him the ability to control gravity; now, Talon manipulates him to their own ends.",
      pic: require("./img/sigma_portrait.png")
    },
    {
      name: "Doomfist",
      role: "Damage",
      bio: "Recently freed from imprisonment, Doomfist is determined to plunge the world into a new conflict that he believes will make humanity stronger.",
      pic: require("./img/doomfist_portrait.png")
    },
    {
      name: "Brigitte",
      role: "Support",
      bio: "No longer sitting on the sidelines, Brigitte Lindholm has taken up arms to defend those in need of protection.",
      pic: require("./img/brigitte_portrait.png")
    },
    {
      name: "Reinhardt",
      role: "Tank",
      bio: "Reinhardt Wilhelm styles himself as a champion of a bygone age, who lives by the knightly codes of valor, justice, and courage.",
      pic: require("./img/reinhardt_portrait.png")
    }
  ]

  const getCharacter = (name) => {
    let character = characters.filter(obj => {
        return obj.name === name
    })
    return character[0]
}

  let data = {
    ana: getCharacter("Ana"),
    ashe: getCharacter("Ashe"),
    brig: getCharacter("Brigitte"),
    doom: getCharacter("Doomfist"),
    cree: getCharacter("McCree"),
    sig: getCharacter("Sigma")
  }

  let ListItem = ({key, character, sortHandlers}) => <TouchableNativeFeedback {...sortHandlers}>
  <View key={key} style={[styles.itemContainer]}>
      <View style={{ flex: 1 }}>
          <Image source={character.pic} style={styles.itemBadge} />
      </View>
      <View style={{ flex: 4, paddingLeft: 5 }}>
          <Text style={{ fontSize: 17 }}>{character.name}</Text>
          <Text>{character.bio}</Text>
      </View>
  </View>
</TouchableNativeFeedback>

  return <View style={{ flex: 1 }}>
    <Text style={styles.title}> Who is the best Overwatch hero?</Text>
    <SortableListView
      style={{ flex: 1 }}
      data={data}
      renderRow={row => <ListItem key={row.name} character={row} animatable={false}/>}
    />
  </View>
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center', 
    paddingHorizontal: 20, 
    fontSize: 20
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    borderRadius: 15,
    marginVertical: 5
},
itemBadge: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'grey',
    resizeMode: 'cover'
}
});

export default ListScreen;