import React, { useEffect, useState } from "react";
import {
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacityBase,
	View,
} from "react-native";
import {
	FlatList,
	ScrollView,
	TouchableOpacity,
} from "react-native-gesture-handler";
import { transactionGroup } from "../data";
import { Variable } from "../styles/theme.style";
import { ITransactionGroup, TTransactionType } from "../type";

export const ParentGroupPicker = ({
	route, navigation,
}) => {
	const { chosenGroup, setChosenGroup, groupType } = route.params;
	const [parentGroup, setParentGroup] = useState<ITransactionGroup[]>([]);
	

	useEffect(() => {
		const type = groupType === "SPEND" ? "SPEND" : "EARN";
		if (parentGroup.length === 0) {
			const data: ITransactionGroup[] = [];
			for (const group of transactionGroup) {
				if (!group.parent && group.type === type) {
					data.push(group);
				}
			}
			setParentGroup(data);
		}
	}, []);

	const renderItem = ({ item }) => (
		<View style={{ flex: 1 }}>
			<TouchableOpacity
				onPress={() => {
					setChosenGroup(item);
					navigation.goBack();
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between",
						marginVertical: 12,
					}}
				>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "flex-start",
						}}
					>
						<Image
							source={item.icon}
							style={{ width: 32, height: 32 }}
							resizeMode="contain"
						></Image>
						{/* Kiểm tra xem group đã được chọn ở lần trước chưa */}
						{chosenGroup?.id === item.id ? (
							<Text
								style={[
									styles.text,
									{ color: Variable.GREEN_LIGHT_COLOR },
								]}
							>
								{item.name}
							</Text>
						) : (
							<Text style={[styles.text]}>{item.name}</Text>
						)}
					</View>

					{chosenGroup?.id === item.id ? (
						<Image
							style={{ alignSelf: "center" }}
							source={require("./../Assets/Images/Icons/ic_checked.png")}
						/>
					) : null}
				</View>
			</TouchableOpacity>

			{/* Đường line, bỏ qua nếu item là cuối cùng*/}
			{item !== parentGroup[parentGroup.length - 1] ? (
				<View
					style={{
						borderBottomColor: "gray",
						borderBottomWidth: 0.5,
						width: "100%",
						marginLeft: 48,
						marginVertical: 4,
					}}
				/>
			) : null}
		</View>
	);
	return (
		<View style={[styles.containter]}>
			<TouchableOpacity
				onPress={() => {
					navigation.goBack();
				}}
				style={{ flex: 0 }}
			>
				<View style={[styles.title]}>
					<Image
						source={require("../Assets/Images/Icons/ic_back.png")}
						style={{ marginTop: 10, marginRight: 10 }}
					></Image>
					<Text style={[styles.titleText]}>Chọn nhóm cha</Text>	
				</View>
			</TouchableOpacity>
			<FlatList
				data={parentGroup}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			></FlatList>	
		</View>
	);
};

const styles = StyleSheet.create({
	containter: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		margin: 16,
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
	text: {
		textAlign: "left",
		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
		marginLeft: 16,
		fontWeight: "900",
	},
	subText: {
		textAlign: "left",
		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
		marginLeft: 10,
		fontWeight: "900",
	},
});
