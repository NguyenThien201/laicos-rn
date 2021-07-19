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
	DefaultTheme,
	NavigationContainer,
	Theme,
	ThemeProvider,
} from "@react-navigation/native";
import React from "react";
import {
	Button,
	Image,
	KeyboardAvoidingView,
	KeyboardAvoidingViewBase,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { Variable } from "./styles/theme.style";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainNavigator } from "./Navigators/MainBottomNavigator";

export default function App() {
	const CustomDarkTheme: Theme = {
		colors: {
			background: Variable.BACKGROUND_COLOR,
			text: "#fff",
		},
	};
	return (
	
		<NavigationContainer theme={CustomDarkTheme}>
			<MainNavigator />
		</NavigationContainer>
	
	);
}
