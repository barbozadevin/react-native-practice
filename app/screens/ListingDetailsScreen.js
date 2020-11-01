import React from 'react';
import { Image, View, StyleSheet} from 'react-native';
import colors from '../config/colors';
import AppText from '../components/AppText'
import ListItem from '../components/ListItem'

function ListingDetailsScreen(props) {
    return (
        <View>
            <Image style={styles.image} source={require('../assets/jacket.jpg')}/>
            <View style={styles.detailsContainer}>
                <AppText style={styles.message}>Looking for a gig</AppText>
                <AppText style={styles.band}>Solo</AppText>
                <View style={styles.userContainer}>
                <ListItem image={require('../assets/mosh.jpg')} title="Devin Barboza" subTitle="5 Listings"/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    band:{
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10
    },
    detailsContainer:{
        padding: 20
    },
    image:{
        width: '100%',
        height: 300
    },
    message:{
        fontSize: 24,
        fontWeight: "500"
    },
    userContainer:{
        marginVertical: 30
    }
})

export default ListingDetailsScreen;