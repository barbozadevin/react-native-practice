import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import MessagesScreen from '../screens/MessagesScreen';
import CreateBand from '../screens/CreateBand';
import MyListingScreen from '../screens/MyListingScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator >
        <Stack.Screen name="Account" component={AccountScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "CreateBand" component={CreateBand} options={{headerShown: false}}/>
        <Stack.Screen name = "MyListingScreen" component={MyListingScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
)

export default AccountNavigator;