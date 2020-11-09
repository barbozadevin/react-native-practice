import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";

import BandCard from "../components/BandCard";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { LogBox } from 'react-native';


import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();




function BandListingsScreen({navigation}) {
  const [bands,setBands] = useState([]);


  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

  const li = [];
  var obj;
  const firebasework = async()=>{
    await db.collection("Bands").get().then(async function(querySnapshot) {
      await querySnapshot.forEach(async function(doc) {
          obj ={
            id: doc.id,
            description: doc.data().description,
            bandname: doc.data().bandname,
            uri: doc.data().url,
            location: doc.data().location,
            lookingfor: doc.data().lookingfor,
            members: doc.data().members,
          }
          await li.push(obj);
          setBands(li);
          
      });
      console.log(li);
  });
  
  }
  

  useEffect(()=>{
    firebasework();
  },[]);

  return (
    <ScrollView>
    <Screen style={styles.screen}>
      <FlatList
        data={bands}
        keyExtractor={(bands) => bands.id.toString()}
        renderItem={({ item }) => (
          <BandCard
            title={item.bandname}
            location={item.location}
            image={{uri:item.uri}}
            lookingfor = {item.lookingfor}
            onPress={() => navigation.navigate("BandDetails", item)}
          />
        )}
      />
    </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
    flex: 1,
  },
});

export default BandListingsScreen;
