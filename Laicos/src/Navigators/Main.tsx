import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IndexExampleContainer, IndexStartupContainer } from '@/Containers'
import { Image, View } from 'react-native'

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
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={focused ? require('@/Assets/Images/homeActive.png') : require('@/Assets/Images/home.png')} resizeMode="contain" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Thống kê"
        component={IndexExampleContainer}
        options={{
          tabBarLabel: 'Thống kê',
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={focused ? require('@/Assets/Images/statisticActive.png') : require('@/Assets/Images/statistic.png')}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Thêm"
        component={IndexExampleContainer}
        options={{
          tabBarLabel: 'Thêm',
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={require('@/Assets/Images/add.png')} resizeMode="contain" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Kế hoạch"
        component={IndexExampleContainer}
        options={{
          tabBarLabel: 'Kế hoạch',
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={focused ? require('@/Assets/Images/planActive.png') : require('@/Assets/Images/plan.png')} resizeMode="contain" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cá nhân"
        component={IndexExampleContainer}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={focused ? require('@/Assets/Images/accountActive.png') : require('@/Assets/Images/account.png')} resizeMode="contain" />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
