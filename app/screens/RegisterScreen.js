import React,{useState, useEffect} from "react";
import { StyleSheet, Platform, Image } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import * as ImagePicker from 'expo-image-picker';
import AppButton from '../components/Button';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();


const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  
});

function RegisterScreen({navigation}) {

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


  //Image Picker closed

  uploadImage = async(uri, UserEmail) =>{
    const response = await fetch(uri);
    const blob = await response.blob();
    // const { currentUser } = firebase.auth();
    var ref = firebase.storage().ref().child("profile/"+UserEmail+"/image");
    ref.put(blob);
  }
  const firebasework = async(values) =>{
    var docData = {
      email: values.email,
      name: values.name
    };
    await firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(user => console.log('register'))
    .catch(error => console.log(error));

    await db.collection('Authenticated').doc(values.email).set(docData).then(console.log("Collection added"))
    uploadImage(image, values.email)
    .then(console.log("Image Uploaded"))
    .catch(error => console.log(error))
  }
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ 
          name: "", 
          email: "", 
          password: "",
          images: []

        }}
        onSubmit={(values) => {
          firebasework(values);
          navigation.navigate("Login");

          
        }}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />

      <AppButton title="Profile Picture" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
