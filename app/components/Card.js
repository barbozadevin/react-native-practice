import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from './AppText'
import colors from '../config/colors'

function Card({title, location, image}) {
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={image}/>
        <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.location}>{location}</AppText>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    location:{
        color: colors.secondary,
        fontWeight: "bold"
    },
    card:{
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: "hidden",
        margin: 5
    },
    detailsContainer:{
        padding: 20
    },
    image:{
        width: "100%",
        height: 200,
        padding: 10
    },
    title:{
        marginBottom: 7
    }
})
export default Card;