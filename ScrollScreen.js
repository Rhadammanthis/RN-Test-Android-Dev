import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
  ScrollView
} from 'react-native';
const ScrollScreen = props => {

  const [dataArray, setDataArray] = useState([])
  const scrollRef = React.createRef();

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

  const getNewItem = (key) => {

    let fade = new Animated.Value(0)
    let translate = new Animated.Value(-100)

    const character = characters[Math.floor(Math.random() * characters.length)]

    Animated.parallel([
      Animated.spring(translate, {
        toValue: 0,
        duration: 400
      }),
      Animated.timing(fade,
        {
          toValue: 1,
          duration: 400,
        }),
    ]).start()

    return (<Animated.View key={key} style={[styles.itemContainer, { transform: [{ translateX: translate }], opacity: fade }]}>
      <View style={{ flex: 1 }}>
        <Image source={character.pic} style={styles.itemBadge} />
      </View>
      <View style={{ flex: 4, paddingLeft: 5 }}>
        <Text style={{ fontSize: 17 }}>{character.name}</Text>
        <Text>{character.bio}</Text>
      </View>
    </Animated.View>)
  }

  const addNewItem = () => {

    let newItem = getNewItem(dataArray.length)
    let temArray = [...dataArray]
    temArray.push(newItem)

    setDataArray(temArray)
  }

  const MyScrollView = React.forwardRef((props, ref) => (
    <ScrollView ref={ref} contentContainerStyle={{ paddingBottom: 100 }} onContentSizeChange={(width, height) => ref.current.scrollTo({ y: height })}>
      {dataArray}
    </ScrollView>
  ));

  return <View style={{ flex: 1 }}>
    <MyScrollView ref={scrollRef} />
    <Animated.View style={styles.fixedItem}>
      <View style={{ flex: 1 }}>
        <Image source={require("./img/ow_logo.png")} style={styles.fixedItemBadge} />
      </View>
      <View style={styles.fixedItemContainer}>
        <Button title="Add Hero" onPress={addNewItem} />
      </View>
    </Animated.View>
  </View>
}

const styles = StyleSheet.create({
  fixedItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    borderRadius: 15,
    marginVertical: 5,
    position: 'absolute',
    bottom: 0
  },
  fixedItemBadge: {
    height: 70,
    width: 70,
    borderRadius: 35,
    resizeMode: 'cover'
  },
  fixedItemContainer: {
    flex: 4,
    justifyContent: 'center',
    paddingHorizontal: 70
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

export default ScrollScreen;