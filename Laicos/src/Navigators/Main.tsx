import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IndexExampleContainer, IndexStartupContainer } from '@/Containers'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={IndexExampleContainer} />
      <Tab.Screen name="Startup" component={IndexStartupContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator
