import React, {useEffect, useState} from "react";
import { StyleSheet, Platform, Image, ScrollView } from "react-native";
import * as Yup from "yup";
import * as ImagePicker from 'expo-image-picker';
import AppButton from '../components/Button';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';


const db = firebase.firestore();

uploadImage = async(uri, UserEmail, values) =>{
  const response = await fetch(uri);
  const blob = await response.blob();
  // const { currentUser } = firebase.auth();
  var ref = firebase.storage().ref().child("events/"+UserEmail+"/image"+values.title);
  await ref.put(blob);

  const url = await ref.getDownloadURL().then(console.log("Got the URL")).catch((error)=>console.log(error));
  
  return url;
}


const collectionwork = async(values, currentUser, url) =>{
  var docData = {
    title: values.title,
    compensation: values.compensation,
    description: values.description,
    url: url,
    email: currentUser,
    location: values.location,
  };
  
  await db.collection('Events').add(docData).then()
}

const firebasework = async(values, currentUser, image) =>{
  
  const url = await uploadImage(image, currentUser, values)
  .then()
  .catch(error => console.log(error))

  await collectionwork(values, currentUser, url);  
  
}
const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  compensation: Yup.number().required().min(1).max(10000).label("Compensation"),
  description: Yup.string().label("Description"),
  location: Yup.string().required().label("String")
});



function ListingEditScreen({navigation}) {

  //This is picker
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  let result;
  const pickImage = async () => {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  //This is end

  return (
    <ScrollView>
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "",
          compensation: "",
          description: "",
          location: "",
          
        }}
        onSubmit={async(values) => {
          
          const {currentUser} = await firebase.auth();
          await firebasework(values, currentUser.email,image);
          navigation.navigate("Events");

        }}
        validationSchema={validationSchema}
      >

      <AppButton title="Event Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <FormField maxLength={255} name="title" placeholder="Title" />

        <FormField maxLength={30} name="location" placeholder="Location" />

        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="compensation"
          placeholder="Compensation"
          width={200}
        />

        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
