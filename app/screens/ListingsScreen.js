import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Card from '../components/Card';
import Screen from '../components/Screen';
import colors from '../config/colors';

const listings=[
    {
        id: 1,
        title: "Band required",
        location: "Mumbai",
        image: require('../assets/jacket.jpg')
    },
    {
        id: 2,
        title: "Solo artists required",
        location: "Navi Mumbai",
        image: require('../assets/login.jpg')
    },
    {
        id: 3,
        title: "Guitarist required",
        location: "Pune",
        image: require('../assets/couch.jpg')
    },
];

function ListingsScreen(props) {
    return (
        <Screen style={styles.screen}>
            <FlatList 
            data={listings}
            keyExtractor={listing => listing.id.toString()}
            renderItem={({item}) => 
            <Card 
            title={item.title}
            location={item.location}
            image={item.image}
            />}/>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen:{
        padding: 20,
        backgroundColor: colors.light
    }
})

export default ListingsScreen;