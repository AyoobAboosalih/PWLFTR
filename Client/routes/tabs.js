import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Help from '../screens/help'
import React from 'react'

const Tab = createBottomTabNavigator()
function Tabs() {
  return (
    <Tab.Navigator
    >
        <Tab.Screen name="Help" component={Help} options={{ tabBarBadge: 3 }}/>
        <Tab.Screen name="2nd help" component={Help}/>
    </Tab.Navigator>
  )
}

export default Tabs