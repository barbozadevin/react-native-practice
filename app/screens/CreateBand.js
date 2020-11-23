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
  var ref = firebase.storage().ref().child("bands/"+UserEmail+"/image"+Math.random()+values.bandname);
  await ref.put(blob);
  const url = await ref.getDownloadURL().catch((error)=>console.log(error));
  
  return url;
}


const collectionwork = async(values, currentUser, url) =>{
    var arr = [];
    arr = values.members.split(",");
    var docData = {
    bandname: values.bandname,
    location: values.location,
    description: values.description,
    url: url,
    members: arr,
    lookingfor: values.lookingfor,
    creator: currentUser
  };
  
  await db.collection('Bands').add(docData).catch(err=>console.log(err));
}

const firebasework = async(values, currentUser, image) =>{
  
  const url = await uploadImage(image, currentUser, values)
  .catch(error => console.log(error))

  await collectionwork(values, currentUser, url);  
  
}
const validationSchema = Yup.object().shape({
  bandname: Yup.string().required().min(1).label("Title"),
  location: Yup.string().required().min(1).label("Location"),
  description: Yup.string().required().label("Description"),
  lookingfor: Yup.string().required().label("LookingFor"),
  members: Yup.string().required().label("Members"),
});

function CreateBand({navigation}) {

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
            bandname: "",
            location: "",
            description: "",
            lookingfor: "",
            members: "",
        }}
        onSubmit={async(values) => {
          

          const {currentUser} = await firebase.auth();
          await firebasework(values, currentUser.email,image);
          navigation.navigate("Account");

        }}
        validationSchema={validationSchema}
      >

      <AppButton title="Band Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: "center" }} />}

        <FormField maxLength={255} name="bandname" placeholder="Band Name" />
        <FormField maxLength={30} name="location" placeholder="Location" />
        

        <FormField
          maxLength={300}
          multiline
          name="description"
          numberOfLines={5}
          placeholder="Description"
        />
        <FormField
          maxLength={140}
          multiline
          name="lookingfor"
          numberOfLines={2}
          placeholder="Roles to be filled..."
        />
        <FormField
          maxLength={140}
          multiline
          name="members"
          numberOfLines={5}
          placeholder="Enter Member Names sperated by a ' , '"
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
export default CreateBand;
