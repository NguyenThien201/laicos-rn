import React, { useEffect, useMemo, useState } from "react";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { Variable } from "../styles/theme.style";
import { LogBox } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { IWallet } from "../type";
import { wallets } from "../data";
import { formatter } from "../Utils/format";
import { LinearGradButton } from "../Components/LinearGradButton";

LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

export const WalletPicker = ({ route, navigation }) => {
	const { chosenWallet, setChosenWallet } = route.params;
	const [walletsData, setWalletsData] = useState<IWallet[]>([]);

	useEffect(() => {
		setWalletsData(wallets);
	}, []);

	const chooseWallet = (item) => {
		setChosenWallet(item);
		navigation.pop();
	};
	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => chooseWallet(item)}>
				<View style={styles.walletItemView}>
					<View>
						<Text
							style={{
								color: "white",
								fontSize: Variable.FONT_SIZE_SMALL_16,
							}}
						>
							{item.name}
						</Text>
						<Text
							style={{
								color: "white",
								fontSize: Variable.FONT_SIZE_SMALL_14,
							}}
						>
							{formatter(item.moneyIn - item.moneyOut)} VNĐ
						</Text>
					</View>
					{chosenWallet.name === item.name ? (
						<Image
							style={{ alignSelf: "center" }}
							source={require("./../Assets/Images/Icons/ic_checked.png")}
						/>
					) : null}
				</View>
			</TouchableOpacity>
		);
	};
	return (
		<View style={[styles.container]}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={{ flex: 0 }}
			>
				<View style={[styles.title]}>
					<Image
						source={require("../Assets/Images/Icons/ic_back.png")}
						style={{ marginTop: 10, marginRight: 10 }}
					></Image>
					<Text style={[styles.titleText]}>Chọn nhóm</Text>
				</View>
			</TouchableOpacity>
			<FlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={walletsData}
				renderItem={renderItem}
				keyExtractor={(item) => item.name}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		marginTop: 16,
		marginHorizontal: 16,
		flexDirection: "row",
		alignContent: "flex-start",
	},
	titleText: {
		color: "white",
		fontSize: Variable.FONT_SIZE_LARGE,
		fontWeight: "bold",
	},
	walletItemView: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		paddingVertical: 12,
		paddingHorizontal: 18,
		margin: 16,
		borderRadius: 5,
		justifyContent: "space-between",
	},
});
