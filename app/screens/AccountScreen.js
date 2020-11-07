import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from "./../config/firebaseConfig";
// firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
import 'firebase/storage';  

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Messages"
  },
];


function AccountScreen({navigation}) {
  const { currentUser } = firebase.auth()
   
  var pathReference = firebase.storage().ref('profile/IMG_20170724_120038.jpg');
  var img = pathReference.getDownloadURL();

  console.log(img);
  console.log(currentUser.email)
  
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={currentUser.email}
          subTitle="ftaghdj"
          image={require("../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
