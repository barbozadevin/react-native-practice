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
  location: Yup.string().required().label("Location"),
  specialization: Yup.string().required().label("Specialization")
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
    var ref = await firebase.storage().ref().child("profile/"+UserEmail+"/image");
    await ref.put(blob);
    return ref.getDownloadURL().then(console.log("Got the URL")).catch((error)=>console.log(error));
  }
  const firebasework = async(values) =>{
    
    await firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(user => console.log('register'))
    .catch(error => console.log(error));

    const uri = await uploadImage(image, values.email)
    .then(console.log("Image Uploaded"))
    .catch(error => console.log(error))

    var docData = {
      email: values.email,
      name: values.name,
      uri: uri,
      location: values.location,
      specialization: values.specialization
    };

    await db.collection('Authenticated').doc(values.email).set(docData).then(console.log("Collection added"))
    


  }



  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ 
          name: "", 
          email: "", 
          password: "",
          location: "",
          specialization: "",

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
          <FormField
          autoCorrect={false}
          icon="google-maps"
          name="location"
          placeholder="Location"
        />
        <FormField
          autoCorrect={false}
          icon="star-circle-outline"
          name="specialization"
          placeholder="Specialization"
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
