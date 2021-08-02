import moment from "moment";
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
import { formatter } from "../Utils/format";

export const DetailTransaction = ({ route, navigation }) => {
	const { transaction } = route.params;
	return (
		<View style={[styles.container]}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={{ flex: 0 }}
				>
					<View style={[styles.title]}>
						<Image
							source={require("../Assets/Images/Icons/ic_back.png")}
							style={{ marginTop: 10, marginRight: 10 }}
						></Image>
						<Text style={[styles.titleText]}>
							Chi tiết giao dịch
						</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.action}>
					<TouchableOpacity>
						<Image
							source={require("../Assets/Images/Icons/ic_edit.png")}
							style={{ width: 24, height: 24 }}
							resizeMode="contain"
						></Image>
					</TouchableOpacity>
					<TouchableOpacity>
						<Image
							source={require("../Assets/Images/Icons/ic_delete.png")}
							style={{ width: 24, height: 24 }}
							resizeMode="contain"
						></Image>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.item}>
				{transaction?.group.icon ? (
					<Image
						source={transaction.group.icon}
						style={{ width: 32, height: 32 }}
						resizeMode="contain"
					></Image>
				) : null}
				<Text style={styles.itemText}>{transaction.group.name}</Text>
				<Text
					style={[
						styles.itemText,
						transaction.group.type === "EARN"
							? { color: Variable.GREEN_COLOR }
							: { color: Variable.RED_COLOR },
					]}
				>
					{formatter(transaction.money)} VNĐ
				</Text>

				<View style={styles.info}>
					<View style={styles.infoItem}>
						<Image
							source={require("../Assets/Images/Icons/ic_wallet.png")}
							style={{ width: 24, height: 24 }}
							resizeMode="contain"
						/>
						<Text style={styles.infoText}>
							{transaction.wallet}
						</Text>
					</View>
					<View style={styles.infoItem}>
						<Image
							source={require("../Assets/Images/Icons/ic_calendar.png")}
							style={{ width: 24, height: 24 }}
							resizeMode="contain"
						/>
						<Text style={styles.infoText}>
							{moment(transaction.date).format("DD/MM/YYYY")}
						</Text>
					</View>

					{transaction.description.length > 0 ? (
						<View style={styles.infoItem}>
							<Image
								source={require("../Assets/Images/Icons/ic_description.png")}
								style={{ width: 24, height: 24 }}
								resizeMode="contain"
							/>
							<Text style={styles.infoText}>
								{transaction.description}
							</Text>
						</View>
					) : null}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		marginHorizontal: 16,
		marginTop: 16,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	action: {
		width: "20%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	title: {
		flexDirection: "row",
		alignContent: "flex-start",
	},
	titleText: {
		color: "white",
		fontSize: Variable.FONT_SIZE_LARGE,
		fontWeight: "bold",
	},
	item: {
		display: "flex",
		marginVertical: 24,
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		borderRadius: Variable.BORDER_RADIUS_MEDIUM,
		borderWidth: 1,
		borderColor: Variable.GREEN_LIGHT_COLOR,
		padding: 16,
		alignSelf: "center",
		width: "80%",
		alignItems: "center",
	},
	itemText: {
		color: "white",
		fontSize: Variable.FONT_SIZE_LARGE,
		marginVertical: 2,
	},
	infoText: {
		marginLeft: 8,
		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
	},
	info: {
		marginTop: 16,
		alignSelf: "flex-start",
	},
	infoItem: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		marginVertical: 3,
	},
});
