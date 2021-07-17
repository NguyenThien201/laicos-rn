import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WalletList } from "../Components/WalletList";
import { globalStyles } from "../styles/theme.style";
const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<View style={{ padding: 16 }}>
				<Text
					style={[globalStyles.fontSizeSmall, globalStyles.whiteText]}
				>
					Tổng tiền
				</Text>
				<Text style={[styles.whiteText, globalStyles.fontSizeMedium]}>
					12,000,000
				</Text>
			</View>

			<WalletList />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		color: "#fff",
		flex: 1,
	},
	whiteText: {
		color: "#fff",
	},
});
export default HomeScreen;
