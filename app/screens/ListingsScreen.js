import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();

const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/couch.jpg"),
  },
];

const li = [];
var obj;
const firebasework = async()=>{
  await db.collection("Events").get().then(async function(querySnapshot) {
    await querySnapshot.forEach(async function(doc) {
        obj ={
          id: doc.id,
          compensation: doc.data().compensation,
          description: doc.data().description,
          title: doc.data().title,
          uri: doc.data().url,
          email: doc.data().email
        }
        await li.push(obj);
        
    });
    console.log(li);
});

}

function ListingsScreen({navigation}) {
  const [events,setEvents] = useState([]);




  useEffect(()=>{
    firebasework();

  },[]);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            image={item.image}
            onPress={() => navigation.navigate("ListingDetails", item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
