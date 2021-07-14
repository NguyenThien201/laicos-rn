import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IndexExampleContainer, IndexStartupContainer } from '@/Containers'
import { Image } from 'react-native'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#3CD3AD',
        style: {
          backgroundColor: '#212230',
          height: 60,
          borderRadius: 10,
          margin: 5,
        },
      }}
    >
      <Tab.Screen
        name="Trang chủ"
        component={IndexExampleContainer}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({}) => (
            <Image source={require('@/Assets/Images/home.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Thống kê"
        component={IndexStartupContainer}
        options={{
          tabBarLabel: 'Thống kê',
          tabBarIcon: ({}) => (
            <Image source={require('@/Assets/Images/statistic.png')} />
          ),
        }}
      />
        <Tab.Screen
        name="Thêm"
        component={IndexExampleContainer}
        options={{
          tabBarLabel: 'Thêm Giao Dịch',
          tabBarIcon: ({}) => (
            <Image source={require('@/Assets/Images/add.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Kế hoạch"
        component={IndexExampleContainer}
        options={{
          tabBarLabel: 'Kế hoạch',
          tabBarIcon: ({}) => (
            <Image source={require('@/Assets/Images/plan.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Cá nhân"
        component={IndexStartupContainer}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({}) => (
            <Image source={require('@/Assets/Images/account.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
