import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AllAccountsScreen from '../screens/AllAccountsScreen';
import PersonDetailsScreen from "../screens/PersonDetailsScreen";

const Stack = createStackNavigator();

function AllUsersNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={AllAccountsScreen}/>
            <Stack.Screen name="PersonDetails" component={PersonDetailsScreen}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container:{}
})

export default AllUsersNavigator;