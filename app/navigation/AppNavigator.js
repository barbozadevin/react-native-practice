import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons'; 

import AccountNavigator from './AccountNavigator';
import FeedNavigator from './FeedNavigator';
import ListingEditScreen from '../screens/ListingEditScreen';
import NewListingButton from './NewListingButton';
import BandListingScreen from '../screens/BandListingScreen';
import AllAccountsScreen from '../screens/AllAccountsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen 
        name="Events" 
        component={FeedNavigator}
        options={{
            tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="wunderlist" size={size} color={color}/>
        }}/>
        <Tab.Screen 
        name="Bands" 
        component={BandListingScreen}
        options={{
            tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="search-web" size={size} color={color}/>
        }}/>
        <Tab.Screen 
        name="ListingEdit" 
        component={ListingEditScreen}
        options={({navigation}) => ({
            tabBarButton: () => <NewListingButton onPress={() => navigation.navigate("ListingEdit")}/>,
            tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="plus-circle" size={size} color={color}/>
        })}/>
        <Tab.Screen 
        name="All Users" 
        component={AllAccountsScreen}
        options={{
            tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="account-group" size={size} color={color}/>
        }}/>
        <Tab.Screen 
        name="Account" 
        component={AccountNavigator}
        options={{
            tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="account" size={size} color={color}/>
        }}/>
    </Tab.Navigator>
)

export default AppNavigator;