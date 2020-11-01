import React from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import colors from '../config/colors';
import Screen from '../components/Screen';
import {AppForm, AppFormField, SubmitButton} from '../components/forms/index'; 

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})

function LoginScreen(props) {
    return (
        <Screen style={styles.container}>
            <Image 
             style={styles.logo}
             source={require('../assets/logo.png')}/>
                
            <AppForm
             initialValues={{email: '', password: ''}}
             onSubmit={values => console.log(values)}
             validationSchema={validationSchema}>
                <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        keyboardType="email-address"
                        name="email"
                        placeholder="Email"/>
                        <AppFormField 
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="lock"
                        name="password"
                        placeholder="Password"
                        secureTextEntry/>
                        <SubmitButton title="Login"/>
            </AppForm>

             
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.medium,
        padding: 10

    },
    logo:{
        width: 200,
        height: 130,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20
    }
})

export default LoginScreen;