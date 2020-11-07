import React from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from "./../config/firebaseConfig";
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});


function LoginScreen({navigation}) {
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={async(values) => {
          console.log(values)
        firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(() => navigation.navigate("AppNavigator"))
        .catch(error => console.log(error))
        }}
        validationSchema={validationSchema}
      >
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
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
