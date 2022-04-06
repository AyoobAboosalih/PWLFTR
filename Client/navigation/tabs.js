import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Help from '../screens/help'
import React from 'react'

const Tab = createBottomTabNavigator()
function tabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Help" component={Help}/>
    </Tab.Navigator>
  )
}

export default tabs