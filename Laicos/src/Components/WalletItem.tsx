import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { globalStyles, Variable } from "../styles/theme.style";
import { formatter } from "../Utils/format";

export const WalletItem = ({  wallet }) => {
	const moneyLeft = wallet.moneyIn - wallet.moneyOut;
	return (
		<LinearGradient
			start={{ x: 1, y: 1 }}
			end={{ x: 0.25, y: 0.25 }}
			colors={Variable.WALLET_GRADIENT}
			style={[globalStyles.card]}
		>
			<View style={{ flex:1	, padding: 2 }}>
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
							globalStyles.fontBold,
						]}
					>
						VNĐ {formatter(moneyLeft)}
					</Text>
				</View>
				<View style={[style.moneyContainer]}>
					<View>
						<Text
							style={[
								globalStyles.whiteText,
								globalStyles.fontSizeSmall,
								globalStyles.fontMedium,
							]}
						>
							Tiền vào
						</Text>
						<Text
							style={[
								globalStyles.whiteText,
								globalStyles.fontSizeSmall,
								globalStyles.fontMedium,
							]}
						>
							Tiền ra
						</Text>
						
					</View>

					<View>
						{/* Tiền vào */}
						<Text
							style={[
								globalStyles.greenText,
								globalStyles.fontBold,
								globalStyles.fontSizeSmall,
								{ alignSelf: "flex-end" },
							]}
						>
							{formatter(wallet.moneyIn)}
						</Text>
						{/* Tiền ra */}
						<Text
							style={[
								globalStyles.redText,
								globalStyles.fontSizeSmall,
								globalStyles.fontBold,
								{ alignSelf: "flex-end" },
							]}
						>
							{formatter(wallet.moneyOut)}
						</Text>
						{/* Line ngang */}
						<View
							style={{
								borderBottomColor: "white",
								borderBottomWidth: 1,
								width: 100,
								marginVertical: 3,

							}}
						/>
						<Text
							style={[
								globalStyles.redText,
								globalStyles.fontSizeSmall,
								globalStyles.fontBold,
								{ alignSelf: "flex-end", color: "#fff" },
							]}
						>
							{formatter(moneyLeft)}
						</Text>
					</View>
				</View>
			</View>
		</LinearGradient>
	);
};

const style = StyleSheet.create({
	title: {
		flex: 2,
		fontWeight: "900",
		flexDirection: "row",
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
	moneyContainer: {
		flex: 3,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 1
	},
});
