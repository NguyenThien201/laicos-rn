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
import Modal from "react-native-modalbox";
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

const DetailPlanner = ({}) => {
	const navigation = useNavigation();

	const [plansData, setPlans] = useState<IPlanner[]>([]);

	useEffect(() => {
		return setPlans(plans);
	}, []);

	// useEffect(() => {

	// 	for (const plan of plansData) {
	// 		plan.days = moment(plan.dateEnd).diff(
	// 			moment(plan.dateStart),
	// 			"days"
	// 		);
	// 		plan.nowDays =
	// 			moment().diff(moment(plan.dateStart), "days") > 0
	// 				? moment().diff(moment(plan.dateStart), "days")
	// 				: 0;
	// 	}
	// }, [plansData]);

	const _renderItem: ListRenderItem<IPlanner> = ({ item }) => {
		item.days = moment(item.dateEnd).diff(moment(item.dateStart), "days");
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
						{moment(item.dateStart).format("DD/MM/YYYY")}{" "}-{" "}
						{moment(item.dateEnd).format("DD/MM/YYYY")}
					</Text>
				</View>

				<Progress.Bar
					progress={item.nowDays / item.days}
					width={null}
					height={5}
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
			<ScrollView
				style={[styles.container]}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
					style={{ flex: 0, marginBottom: 16 }}
				>
					<TitleHeader title="Kế hoạch chi tiêu" />
				</TouchableOpacity>
				<FlatList
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					data={plansData}
					renderItem={_renderItem}
					keyExtractor={(item) => item.id}
				></FlatList>

				<View style={[{ flex: 1, marginTop: 16 }]}>
					<LinearGradButton
						color={Variable.BUTTON_PRIMARY}
						text={"Thêm mới"}
						action={navigation.goBack}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 16,
		marginHorizontal: 15,
	},
	item: {
		marginVertical: 8,
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
