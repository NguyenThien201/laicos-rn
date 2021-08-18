import React, { FC, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
	Button,
	ListRenderItem,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { LinearGradButton } from "../Components/LinearGradButton";
import { IPlanner, ITransaction, ITransactionGroup, IWallet } from "../type";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { plans, transaction, wallets } from "../data";
import { ChosenGroupView } from "../Components/ChosenGroupVIew";
import { BillImage } from "../Components/BillImage";
import LinearGradient from "react-native-linear-gradient";
import { MonthlyHistory } from "../Components/MonthlyHistory";
import { WalletList } from "../Components/WalletList";
import { globalStyles, Variable } from "../styles/theme.style";
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import * as Progress from "react-native-progress";
import GradientButton from "react-native-gradient-buttons";
import { TitleHeader } from "./Title";
import { useNavigation } from "@react-navigation/native";
import { formatter } from "../Utils/format";

import ScrollableTabView, {DefaultTabBar,} from "react-native-scrollable-tab-view";
const DetailPlanner = ({}) => {
	const navigation = useNavigation();

	const [plansData, setPlans] = useState<IPlanner[]>([]);
	const [resfresh, setRefresh] = useState(false);
	useEffect(() => {
		return setPlans(plans);
	}, []);

	navigation.addListener("focus", (payload) => {
		console.log('payload', payload);
		setRefresh(true);
		setPlans(plans);
		
	});
	useEffect(()=>{
		if (resfresh) setRefresh(false)
	}, [resfresh])

	const _renderItem: ListRenderItem<IPlanner> = ({ item }) => {
		// Số ngày để hoàn thành kế hoạch
		item.days = moment(item.dateEnd).diff(moment(item.dateStart), "days");

		// Số ngày còn lại từ hiện tại => ngày kết thúc
		item.nowDays =
			moment().diff(moment(item.dateStart), "days") > 0
				? moment().diff(moment(item.dateStart), "days")
				: 0;
		return (
			<View style={[styles.item]}>
				<View>
					<View
						style={[
							globalStyles.rowDisplay,
							{ justifyContent: "space-between" },
						]}
					>
						<Text style={[styles.name]}>{item.name}</Text>
						<Text style={[styles.name]}>
							{formatter(item.money)}
						</Text>
					</View>

					<Text style={[styles.text]}>
						{moment(item.dateStart).format("DD/MM/YYYY")} -{" "}
						{moment(item.dateEnd).format("DD/MM/YYYY")}
					</Text>
				</View>

				<Progress.Bar
					progress={item.nowDays / item.days}
					width={null}
					height={8}
					borderColor={Variable.GREY_COLOR}
					unfilledColor={Variable.GREY_COLOR}
					color={Variable.GREEN_LIGHT_COLOR}
				/>

				<Text style={[styles.text]}>
					Còn {item.days - item.nowDays} ngày
				</Text>
			</View>
		);
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
			<View
				style={[styles.container]}
			>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
					style={{ flex: 0, marginHorizontal: 16}}
				>
					<TitleHeader title="Kế hoạch chi tiêu" />
				</TouchableOpacity>


				<ScrollableTabView
				tabBarPosition="top"
				tabBarInactiveTextColor="white"
				tabBarUnderlineStyle={{
					backgroundColor: Variable.GREEN_LIGHT_COLOR,
					elevation: 20,
					height:3,
				}}
				tabBarActiveTextColor={Variable.GREEN_LIGHT_COLOR}
				tabBarTextStyle={{fontSize: Variable.FONT_SIZE_SMALL}}
				initialPage={0}
				renderTabBar={() => <DefaultTabBar/>}

				
			>
				<FlatList
					tabLabel="Chưa hoàn thành"
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					data={plansData}
					renderItem={_renderItem}
					keyExtractor={(item) => item.id}
					extraData={resfresh}
				

				></FlatList>

				<View
					tabLabel="Hoàn thành"
					style={{flex: 1, backgroundColor: "#ff4081"}}
				>
					
				</View>
			</ScrollableTabView>
				

				<View style={[{ flex: 0, marginBottom: 8, marginHorizontal:16 }]}>
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
		marginHorizontal:16,
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		padding: 16,
		borderRadius: Variable.BORDER_RADIUS_SMALL
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
});
export default DetailPlanner;
