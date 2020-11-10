import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ListingEditScreen from "../screens/ListingEditScreen";

const Stack = createStackNavigator();

function ListingEditNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListingEdit" component={ListingEditScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Reload" component={ListingEditScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default ListingEditNavigator;