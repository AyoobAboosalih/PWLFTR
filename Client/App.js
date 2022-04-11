import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Help from './screens/help';
import Home from './screens/home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (  
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home">
          {props => <Home {...props} options={{title: 'overview'}} />}
        </Stack.Screen>
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
