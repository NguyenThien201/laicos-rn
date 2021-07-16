import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles, Variable } from "../styles/theme.style";
const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={[globalStyles.fontSizeSmall, globalStyles.whiteText]}>Tổng tiền</Text>
			<Text style={[styles.whiteText, globalStyles.fontSizeMedium]}>12,000,000</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		color: "#ffffff",
		margin: 16,
	},
	whiteText:{
		color: "#fff"
		
	}
});
export default HomeScreen;
