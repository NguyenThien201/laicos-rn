import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import HomeScreen from "../Screens/HomeScreen";
import { Variable } from "../styles/theme.style";
import Statistic from "../Screens/Statistic"
import { AddTransaction } from "../Screens/AddTransaction";

const Tab = createBottomTabNavigator();


const tempAdd = ({navigation}) =>{
	
	return (
		navigation.navigate('Thêm')
	)
}
// @refresh reset
export const MainNavigator = ({navigation, routes}) => {
	console.log('navigation', navigation.state);
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				activeTintColor: "#3CD3AD",
				style: {
					marginTop:0,
					
					
					backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
					height: 70,				
					elevation: 10,
					shadowColor: Variable.BACKGROUND_ITEM_COLOR
					
				},
			}}
		>
			<Tab.Screen
				name="Trang chủ"
				component={HomeScreen}
				options={{
					tabBarLabel: "Trang chủ",
					tabBarIcon: ({ focused }) => (
						<View>
							<Image
								source={
									focused
										? require("../Assets/Images/homeActive.png")
										: require("../Assets/Images/home.png")
								}
								resizeMode="contain"
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Thống kê"
				component={Statistic}
				options={{
					tabBarLabel: "Thống kê",
					tabBarIcon: ({ focused }) => (
						<View>
							<Image
								source={
									focused
										? require("../Assets/Images/statisticActive.png")
										: require("../Assets/Images/statistic.png")
								}
								resizeMode="contain"
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Thêm"
				component={AddTransaction}
				options={{
					tabBarVisible:false	,
					tabBarLabel: "Thêm",
					tabBarIcon: () => (
						<View>
							<Image
								source={require("../Assets/Images/add.png")}
								resizeMode="contain"
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Kế hoạch"
				component={HomeScreen}
				options={{
					tabBarLabel: "Kế hoạch",
					tabBarIcon: ({ focused }) => (
						<View>
							<Image
								source={
									focused
										? require("../Assets/Images/planActive.png")
										: require("../Assets/Images/plan.png")
								}
								resizeMode="contain"
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Cá nhân"
				component={HomeScreen}
				options={{
					tabBarLabel: "Cá nhân",
					tabBarIcon: ({ focused }) => (
						<View>
							<Image
								source={
									focused
										? require("../Assets/Images/accountActive.png")
										: require("../Assets/Images/account.png")
								}
								resizeMode="contain"
							/>
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
};
