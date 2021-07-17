import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { globalStyles, Variable } from "../styles/theme.style";
import { formatter } from "../Utils/format";

export const WalletItem = ({ key, wallet }) => {
	return (
		<LinearGradient
			start={{ x: 1, y: 1 }}
			end={{ x: 0.25, y: 0.25 }}
			colors={Variable.WALLET_GRADIENT}
			style={[globalStyles.card]}
		>
			<View style={{ flex: 1 }}>
				<View style={[style.title]}>
					<View style={style.box}>
						<Text style={globalStyles.whiteText}>
							{wallet.name}
						</Text>
					</View>
					<View style={style.box}>
						<Text style={globalStyles.whiteText}>...</Text>
					</View>
				</View>
				<View style={[style.total]}>
					<Text
						style={[
							globalStyles.whiteText,
							globalStyles.fontSizeMedium,
							globalStyles.textAlign,
						]}
					>
						VNĐ {formatter(wallet.moneyIn - wallet.moneyOut)}
					</Text>
				</View>
				<View style={[style.total]}>
					<Text
						style={[
							globalStyles.whiteText,
							globalStyles.fontSizeMedium,
							globalStyles.textAlign,
						]}
					>
					
					</Text>
				</View>
			</View>
		</LinearGradient>
	);
};

const style = StyleSheet.create({
	title: {
		flex: 1,
		fontWeight: "900",
		backgroundColor: "#000",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	box: {
		height: 50,
	},
	total: {
		flex: 2,
		alignContent: "center",
		justifyContent: "center",
	},
});
