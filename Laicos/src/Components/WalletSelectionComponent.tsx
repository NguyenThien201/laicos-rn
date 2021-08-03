import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { wallets } from "../data";
import { WalletPicker } from "../Screens/WalletPicker";
import { globalStyles, Variable } from "../styles/theme.style";

export const WalletSelectionComponent = () => {
	const navigation = useNavigation();
	const [chosenWallet, setChosenWallet] = useState(wallets[0]);
	return (
		<TouchableOpacity
			style={[styles.walletSelection]}
			onPress={() =>
				navigation.navigate("Chọn ví", {
					chosenWallet,
					setChosenWallet,
				})
			}
		>
			<Text
				style={{
					color: Variable.GREEN_LIGHT_COLOR,
					marginRight: 16,
					fontSize: Variable.FONT_SIZE_SMALL_16,
				}}
			>
				{chosenWallet.name}
			</Text>
			<Image
				source={require("../Assets/Images/Icons/ic_arrow_right.png")}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	walletSelection: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderColor: Variable.GREEN_LIGHT_COLOR,
		borderWidth: 1,
		borderRadius: Variable.BORDER_RADIUS_SMALL,
		width: 160,
		padding: 8,
		height: 45,
	},
});
