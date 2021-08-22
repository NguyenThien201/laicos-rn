import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
	ListRenderItem,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradButton } from "../Components/LinearGradButton";
import { IPlanner } from "../type";
import moment from "moment";
import { plans, transaction } from "../data";
import { Variable } from "../styles/theme.style";
import * as Progress from "react-native-progress";
import { TitleHeader } from "./Title";
import { useNavigation } from "@react-navigation/native";
import { formatter } from "../Utils/format";

import ScrollableTabView, {
	DefaultTabBar,
} from "react-native-scrollable-tab-view";
const DetailPlanner = ({}) => {
	const navigation = useNavigation();

	const [finishedPlans, setFinishedPlans] = useState<IPlanner[]>([]);
	const [unfinishedPlans, setUnfinishedPlans] = useState<IPlanner[]>([]);
	const [resfresh, setRefresh] = useState(false);

	useEffect(() => {
		const now = moment();
		const unfPlans: IPlanner[] = [];
		const fPlans: IPlanner[] = [];
		for (const plan of plans) {
			// Đã hoàn thành
			if (moment(plan.dateEnd).isBefore(now)) {
				fPlans.push(plan);
			} else {
				unfPlans.push(plan);
			}
		}
		setFinishedPlans(fPlans);
		setUnfinishedPlans(unfPlans);
	}, []);

	navigation.addListener("focus", (payload) => {
		setRefresh(true);
		const now = moment();
		const unfPlans: IPlanner[] = [];
		const fPlans: IPlanner[] = [];
		for (const plan of plans) {
			// Đã hoàn thành
			if (moment(plan.dateEnd).isBefore(now)) {
				fPlans.push(plan);
			} else {
				unfPlans.push(plan);
			}
		}
		setFinishedPlans(fPlans);
		setUnfinishedPlans(unfPlans);
	});
	useEffect(() => {
		if (resfresh) setRefresh(false);
	}, [resfresh]);

	const _renderUnfinishedItem: ListRenderItem<IPlanner> = ({ item }) => {
		const dateStart = moment(item.dateStart);
		const dateEnd = moment(item.dateEnd);
		const now = moment();
		// Số ngày để hoàn thành kế hoạch
		item.days = dateEnd.diff(dateStart, "days");

		// Số ngày còn lại từ hiện tại => ngày kết thúc
		if (now.isBetween(dateStart, dateEnd)) {
			item.nowDays = now.diff(dateStart, "days");
		}
		item.spentMoney = 0;
		// Số tiền đã bỏ ra cho ngân sách này
		for (const trans of transaction) {
			const transactionDate = moment(trans.date);
			if (
				trans.group?.id === item.group.id &&
				transactionDate.isAfter(dateStart) &&
				transactionDate.isBefore(dateEnd)
			) {
				item.spentMoney += trans.money;
			}
		}
		item.moneyLeft = item.money - item.spentMoney;
		return (
			// Thông tin ngân sách
			<View style={[styles.item]}>
				<View style={styles.rowDisplay}>
					<Text style={[styles.name]}>{item.name}</Text>
					<Text style={[styles.name]}>{formatter(item.money)}</Text>
				</View>

				{/* Hiện số tiền còn lại */}
				<View style={styles.rowDisplay}>
					<Text style={[styles.text]}>
						Tên nhóm: {item.group.name}
					</Text>
					{item.moneyLeft > 0 ? (
						<Text style={[styles.text]}>
							Còn lại: {formatter(item.money - item.spentMoney)}
						</Text>
					) : (
						<Text style={[styles.text]}>Đã vượt qua chỉ tiêu</Text>
					)}
				</View>

				<View style={styles.rowDisplay}>
					{item?.group?.icon ? (
						<Image
							source={item.group.icon}
							style={{ width: 24, height: 24, marginRight: 4 }}
							resizeMode="contain"
						></Image>
					) : null}
					<View style={{ flex: 1 }}>
						<Progress.Bar
							progress={item.spentMoney / item.money}
							width={null}
							height={8}
							borderColor={Variable.BACKGROUND_ITEM_COLOR}
							unfilledColor={Variable.GREY_COLOR}
							color={Variable.GREEN_LIGHT_COLOR}
						/>
					</View>
				</View>
				<View style={styles.rowDisplay}>
					<Text style={[styles.text]}>
						{moment(item.dateStart).format("DD/MM/YYYY")} -{" "}
						{moment(item.dateEnd).format("DD/MM/YYYY")}
					</Text>
					{item.nowDays >= 0 ? (
						<Text style={[styles.text]}>
							Còn {item.days - item.nowDays} ngày
						</Text>
					) : (
						<Text style={[styles.text]}>Chưa bắt đầu kế hoạch</Text>
					)}
				</View>
			</View>
		);
	};

	const _renderFinishedItem: ListRenderItem<IPlanner> = ({ item }) => {
		const dateStart = moment(item.dateStart);
		const dateEnd = moment(item.dateEnd);
		const now = moment();
		// Số ngày để hoàn thành kế hoạch
		item.days = dateEnd.diff(dateStart, "days");

		// Số ngày còn lại từ hiện tại => ngày kết thúc
		if (now.isBetween(dateStart, dateEnd)) {
			item.nowDays = now.diff(dateStart, "days");
		}
		item.spentMoney = 0;
		// Số tiền đã bỏ ra cho ngân sách này
		for (const trans of transaction) {
			const transactionDate = moment(trans.date);
			if (
				trans.group?.id === item.group.id &&
				transactionDate.isAfter(dateStart) &&
				transactionDate.isBefore(dateEnd)
			) {
				item.spentMoney += trans.money;
			}
		}
		item.moneyLeft = item.money - item.spentMoney;
		return (
			<View style={[styles.item]}>
				<View style={styles.rowDisplay}>
					<Text style={[styles.name]}>{item.name}</Text>
					<Text style={[styles.name]}>{formatter(item.money)}</Text>
				</View>

				{/* Hiện số tiền còn lại */}
				<View style={styles.rowDisplay}>
					<Text style={[styles.text]}>
						Tên nhóm: {item.group.name}
					</Text>
					{item.moneyLeft > 0 ? (
						<Text style={[styles.text]}>
							Còn lại: {formatter(item.money - item.spentMoney)}
						</Text>
					) : (
						<Text style={[styles.text]}>Đã vượt qua chỉ tiêu</Text>
					)}
				</View>

				<View style={styles.rowDisplay}>
					{item?.group?.icon ? (
						<Image
							source={item.group.icon}
							style={{ width: 24, height: 24, marginRight: 4 }}
							resizeMode="contain"
						></Image>
					) : null}
					<View style={{ flex: 1 }}>
						<Progress.Bar
							progress={item.spentMoney / item.money}
							width={null}
							height={8}
							borderColor={Variable.BACKGROUND_ITEM_COLOR}
							unfilledColor={Variable.GREY_COLOR}
							color={Variable.GREEN_LIGHT_COLOR}
						/>
					</View>
				</View>
				<Text style={[styles.text]}>Đã hoàn thành</Text>
			</View>
		);
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
			<View style={[styles.container]}>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
					style={{ flex: 0, marginHorizontal: 16 }}
				>
					<TitleHeader title="Ngân sách chi tiêu" />
				</TouchableOpacity>

				<ScrollableTabView
					tabBarPosition="top"
					tabBarInactiveTextColor="white"
					tabBarUnderlineStyle={{
						backgroundColor: Variable.GREEN_LIGHT_COLOR,
						elevation: 20,
						height: 3,
					}}
					tabBarActiveTextColor={Variable.GREEN_LIGHT_COLOR}
					tabBarTextStyle={{ fontSize: Variable.FONT_SIZE_SMALL }}
					initialPage={0}
					renderTabBar={() => <DefaultTabBar />}
				>
					<FlatList
						tabLabel="Chưa hoàn thành"
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						data={unfinishedPlans}
						renderItem={_renderUnfinishedItem}
						keyExtractor={(item) => item.id}
						extraData={resfresh}
					></FlatList>

					<FlatList
						tabLabel="Đã hoàn thành"
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						data={finishedPlans}
						renderItem={_renderFinishedItem}
						keyExtractor={(item) => item.id}
						extraData={resfresh}
					></FlatList>
				</ScrollableTabView>

				<View
					style={[{ flex: 0, marginBottom: 8, marginHorizontal: 16 }]}
				>
					<LinearGradButton
						color={Variable.BUTTON_PRIMARY}
						text={"Thêm mới"}
						action={() => navigation.navigate("Thêm kế hoạch")}
					/>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 16,
	},
	item: {
		marginVertical: 8,
		marginHorizontal: 16,
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		padding: 16,
		borderRadius: Variable.BORDER_RADIUS_SMALL,
	},
	name: {
		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
	},
	text: {
		color: "white",
		fontSize: Variable.FONT_SIZE_SMALL,
		marginVertical: 2,
	},
	rowDisplay: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
export default DetailPlanner;
