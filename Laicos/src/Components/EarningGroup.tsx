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
import LinearGradient from "react-native-linear-gradient";
import { transactionGroup } from "../data";
import { Variable } from "../styles/theme.style";
import { ITransactionGroup } from "../type";
import { LinearGradButton } from "./LinearGradButton";

export const EarningGroup = ({ navigation, setChosenGroup, chosenGroup }) => {
	const [parentGroup, setParentGroup] = useState<ITransactionGroup[]>([]);
	const [childrenGroup, setChildrenGroup] = useState<
		Record<string, ITransactionGroup[]>
	>({});
	useEffect(() => {
		if (parentGroup.length === 0) {
			const data: ITransactionGroup[] = [];
			for (const group of transactionGroup) {
				if (!group.parent && group.type == "EARN") {
					data.push(group);
				}
			}
			setParentGroup(data);
		}
	}, []);

	useEffect(() => {
		if (parentGroup.length > 0) {
			const cG: Record<string, ITransactionGroup[]> = {};
			for (const pg of parentGroup) {
				const data: ITransactionGroup[] = [];
				for (const group of transactionGroup) {
					if (group.parent === pg.id && group.type == "EARN") {
						data.push(group);
					}
				}
				if (data.length > 0) cG[pg.id] = data;
			}
			setChildrenGroup(cG);
		}
	}, [parentGroup]);

	const renderSubItem = ({ item }) => (
		<View style={{ flex: 1, flexDirection: "row" }}>
			<View
				style={{
					borderStyle: "dotted",
					backgroundColor: "gray",
					width: 1,
					height: "100%",
				}}
			/>
			<View
				style={{
					borderRadius: 1,
					borderStyle: "dotted",
					borderBottomColor: "gray",
					borderBottomWidth: 1,
					width: 11,
					alignSelf: "center",
				}}
			/>
			<View style={{ flex: 2 }}>
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
								style={{ width: 24, height: 24 }}
								resizeMode="contain"
							></Image>
							{/* Kiểm tra xem group đã được chọn chưa */}
							{chosenGroup?.id === item.id ? (
								<Text
									style={[
										styles.subText,
										{ color: Variable.GREEN_LIGHT_COLOR },
									]}
								>
									{item.name}
								</Text>
							) : (
								<Text style={[styles.subText]}>
									{item.name}
								</Text>
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
				{childrenGroup[item.id] ? (
					<FlatList
						data={childrenGroup[item.id]}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					></FlatList>
				) : null}
			</View>
		</View>
	);
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
			{childrenGroup[item.id] ? (
				<FlatList
					data={childrenGroup[item.id]}
					renderItem={renderSubItem}
					keyExtractor={(item) => item.id}
				></FlatList>
			) : null}
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
			<FlatList
				data={parentGroup}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			></FlatList>
			<LinearGradButton
				color={Variable.BUTTON_PRIMARY}
				text={"Thêm mới"}
				action={() =>
					navigation.navigate("Thêm nhóm", {
						type: "EARN",
						setChosenGroup: setChosenGroup,
					
					})
				}
			/>
			
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
	},buttonText: {
		textAlign: "center",
		paddingVertical: 10,
		borderRadius: Variable.BORDER_RADIUS_MEDIUM,
		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
	},
});
