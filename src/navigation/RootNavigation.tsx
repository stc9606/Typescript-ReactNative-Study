import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../component/Main';
import Weather from '../component/Weather';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootNavigation = () => {
    
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                    let iconName : any;
        
                    if (route.name === 'Main') {
                        iconName = focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline';
                    } else if (route.name === 'Weather') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    }
        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                
            >
                <Tab.Screen name="메인" component={Main} />
                <Tab.Screen name="날씨" component={Weather} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation;