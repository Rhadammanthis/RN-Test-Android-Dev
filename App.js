import React, {useState, useMemo} from 'react';
import Firebase from "./Firebase"
import GoogleAuth from "./Auth";
import {Button, SafeAreaView, StyleSheet, Text, View, BackHandler} from 'react-native';

import CustomModal from './CustomModal';

/**
 * 
 * This is the root component of the test. As you will see when you are able to run the app, it contains two sections: Android Test and RN Test.
 * For details on the Android test, re-check the README.md.
 * For details on the RN test, check the CustomModal.js file.
 *
 */

const doSignIn = (setUserInfo) => {
  GoogleAuth.signIn()
    .then(userInfo => setUserInfo(userInfo))
    .catch(_ => setUserInfo(null));
};

const doSignOut = (setUserInfo) => {
  GoogleAuth.signOut().then(_ => setUserInfo(null));
}

const greetingName = (userInfo) => {
  if (userInfo && userInfo.name) {
    return userInfo.name;
  }
  if (userInfo && !userInfo.name && userInfo.email) {
    return userInfo.email;
  }
  return "EMPTY_USERNAME";
}

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  let username = useMemo(() => greetingName(userInfo), [userInfo]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // BackHandler.addEventListener('hardwareBackPress', () => {
  
  //   if (!isModalVisible) {
  //     setIsModalVisible(false)
  //     return true;
  //   }
  //   return false;
  // });
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
      <Text style={styles.sectionHeaderText}>Android test:</Text>
      <Text style={styles.welcomeText}>{`Heey, ${username}!`}</Text>
      <View style={styles.buttonWrapper}>
        {userInfo
            ? <Button title={"Sign me out"} onPress={() => doSignOut(setUserInfo)}/>
            : <Button title={"Sign me in"} onPress={() => doSignIn(setUserInfo)}/>}
      </View>
      <View style={styles.buttonWrapper}>
        <Button title={"Test Crash"} onPress={() => Firebase.testCrash()}/>
      </View>
      </View>
      <View style={{flex: 1}}>
      <Text style={styles.sectionHeaderText}>RN test:</Text>
      <View style={styles.buttonWrapper}>
        <Button title={"Display Custom component"} onPress={() => setIsModalVisible(true)} />
      </View>
      <CustomModal onRequestClose={() => setIsModalVisible(false)} isVisible={isModalVisible} onDismiss={() => setIsModalVisible(false)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  sectionHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 22,
    marginHorizontal: 8,
    marginBottom: 18,
  },
  buttonWrapper: {
    margin: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modal: {
    flex: 1,
  }
});

export default App;
