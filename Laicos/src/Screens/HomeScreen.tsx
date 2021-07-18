import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MonthlyHistory } from "../Components/MonthlyHistory";
import { WalletList } from "../Components/WalletList";
import { globalStyles } from "../styles/theme.style";
const HomeScreen = () => {

	return (
		<View style={styles.container}>
			<View style={{ padding: 16 }}>
				<Text
					style={[globalStyles.fontSizeSmall, globalStyles.whiteText, globalStyles.fontBold]}
				>
					Tổng tiền
				</Text>
				<Text style={[styles.whiteText, globalStyles.fontSizeMedium, globalStyles.fontBold]}>
					12,000,000
				</Text>
			</View>

			<WalletList />
			<MonthlyHistory/>
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
