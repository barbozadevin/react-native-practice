import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import AppButton from '../components/AppButton';

function WelcomeScreen(props) {
    return (
        <ImageBackground blurRadius={5} style={styles.background} source={require('../assets/login.jpg')}>
            <View style={styles.logoContainer}> 
            <Image style={styles.logo} source={require('../assets/app-icon.jpg')}/>
            <Text style={styles.tagline}>Where talent meets opportunity!</Text>
            </View>
            <View style={styles.buttonsContainer}>
            <AppButton title="Login" />
            <AppButton title="Register" color="secondary"/>
            </View>
        </ImageBackground>
        
    );
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonsContainer:{
        padding: 20,
        width: "100%"
    },
    logo:{
        width: 100,
        height: 100,
    },
    logoContainer:{
        position: 'absolute',
        top: 70,
        alignItems: 'center'
    },
    tagline:{
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 20
    }
})

export default WelcomeScreen;