import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import HomeScreen from "../Screens/HomeScreen";
import { Variable } from "../styles/theme.style";

const Tab = createBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				activeTintColor: "#3CD3AD",
				style: {
					position: "absolute",
					backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
					height: 70,
					borderRadius: Variable.BORDER_RADIUS_MEDIUM,
					left: 10,
					right: 10,
					bottom: 20,
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
				component={HomeScreen}
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
				component={HomeScreen}
				options={{
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
