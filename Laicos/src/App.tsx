/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import "react-native-gesture-handler";
import {
	NavigationContainer,
	Theme,
} from "@react-navigation/native";
import React from "react";

import { Variable } from "./styles/theme.style";
import { MainNavigator } from "./Navigators/MainBottomNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { GroupPicker } from "./Screens/GroupPicker";
import {NavigationActions, StackActions} from 'react-navigation';
const Stack = createStackNavigator()

const Index = ({navigation}) =>{
	
	return (
		<MainNavigator />
	)
}
export default function App() {
	
	const CustomDarkTheme: Theme = {
		colors: {
			background: Variable.BACKGROUND_COLOR,
			text: "#fff",
		},
	};

	return (
	
		<NavigationContainer theme={CustomDarkTheme}>
			{/* <MainNavigator /> */}
			<Stack.Navigator headerMode="none" initialRouteName="Index">
				<Stack.Screen name="Index" component={Index}></Stack.Screen>
				<Stack.Screen name="Chọn nhóm" component={GroupPicker}></Stack.Screen>
				
			</Stack.Navigator>
		</NavigationContainer>
	
	);
}
