import { Picker } from "@react-native-picker/picker"
import React, { useEffect, useState } from "react"
import { Dimensions, Text, View } from "react-native"
import { LineChart, StackedBarChart } from "react-native-chart-kit"
import ScrollableTabView, {
	DefaultTabBar
} from "react-native-scrollable-tab-view"
import StatisticTabItem from "../Components/StatisticTabItem"
import {
	chartConfig,
	lineChartData,
	stackedBarChartData,
	transaction
} from "../data"
import { globalStyles, Variable } from "../styles/theme.style"
import {VictoryPie, VictoryTheme} from "victory-native"

const Statistic = () => {
	const screenWidth = Dimensions.get("window").width;
	const [index, setIndex] = useState(0);

	const [selectedLabelChartType, setSelectedLabelChartType] =
		useState<string>("month");
	const [selectedChartType, setSelectedChartType] = useState<string>("line");
	const [isShowHeader, setIsShowHeader] = useState(true);

	const [transactionData, setTransactionData] = useState<any[]>([]);

	const mergeTransaction = () => {
		const parentsInData: any[] = [];
		for (let i = 0; i < transaction.length; i++) {
			if (transaction[i].group.parent === null) {
				parentsInData.find(
					(e) => e.parentId === transaction[i].group.id
				) === undefined &&
					parentsInData.push({
						parentName: transaction[i].group.name,
						parentId: transaction[i].group.id,
						parentIcon: transaction[i].group.icon,
						money: 0,
						type: transaction[i].group.type,
						childs: [],
					});
			}
		}
		for (let i = 0; i < transaction.length; i++) {
			if (transaction[i].group.parent === null) {
				let idx = parentsInData.findIndex(
					(e) => e.parentId === transaction[i].group.id
				);
				if (idx >= 0) parentsInData[idx].money += transaction[i].money;
			} else {
				let idx = parentsInData.findIndex(
					(e) => e.parentId === transaction[i].group.parent
				);
				if (idx >= 0) parentsInData[idx].childs.push(transaction[i]);
			}
		}
		console.log(parentsInData);

		return parentsInData;
	};

	useEffect(() => {
		setTransactionData(mergeTransaction());
	}, []);

	const data = [
		{ quarter: 1, earnings: 13000 },
		{ quarter: 2, earnings: 16500 },
		{ quarter: 3, earnings: 14250 },
		{ quarter: 4, earnings: 19000 }
	];

	return (
		<View>
			{isShowHeader && (
				<View>
					<Text
						style={[
							globalStyles.fontSizeLarge,
							globalStyles.whiteText,
							{
								fontWeight: "bold",
								paddingTop: 10,
								paddingLeft: 15,
							},
						]}
					>
						Thống kê
					</Text>
					<View
						style={{
							display: "flex",
							flexDirection: "row-reverse",
							alignItems: "flex-end",
						}}
					>
						<View
							style={{
								borderWidth: 1,
								borderColor: "white",
								borderRadius: 15,
								marginEnd: 10,
								marginBottom: 10,
							}}
						>
							<Picker
								selectedValue={selectedLabelChartType}
								dropdownIconColor="white"
								style={{
									color: "white",
									width: 130,
								}}
								onValueChange={(itemValue) =>
									setSelectedLabelChartType(itemValue)
								}
							>
								<Picker.Item label="Ngày" value="day" />
								<Picker.Item label="Tuần" value="week" />
								<Picker.Item label="Tháng" value="month" />
								<Picker.Item label="Năm" value="year" />
							</Picker>
						</View>
						<View
							style={{
								borderWidth: 1,
								borderColor: "white",
								borderRadius: 15,
								marginEnd: 10,
								marginBottom: 10,
							}}
						>
							<Picker
								selectedValue={selectedChartType}
								dropdownIconColor="white"
								style={{
									width: 130,
									color: "white",
								}}
								onValueChange={(itemValue) =>
									setSelectedChartType(itemValue)
								}
							>
								<Picker.Item label="Đường" value="line" />
								<Picker.Item label="Cột" value="bar" />
							</Picker>
						</View>
					</View>
					{selectedChartType === "line" ? (
						<VictoryPie
						data={[
							{ x: "Cats", y: 35 },
							{ x: "Dogs", y: 40 },
							{ x: "Birds", y: 55 }
						]}
					/>
					) : (
						<StackedBarChart
							style={{ marginLeft: 10 }}
							data={stackedBarChartData}
							width={screenWidth - 10}
							height={200}
							chartConfig={chartConfig}
							yAxisSuffix=" tr"
						/>
					)}
				</View>
			)}
			<View
				style={{
					backgroundColor: "#212230",
					width: 70,
					height: 25,
					paddingTop: 8,
					alignSelf: "center",
					alignItems: "center",
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
				}}
			>
				<Text
					onPress={() => setIsShowHeader(!isShowHeader)}
					style={[
						{
							width: 0,
							height: 0,
							backgroundColor: "transparent",
							borderStyle: "solid",
							borderLeftWidth: 10,
							borderRightWidth: 10,
							borderBottomWidth: 10,
							borderLeftColor: "transparent",
							borderRightColor: "transparent",
							borderBottomColor: "white",
						},
						!isShowHeader && {
							transform: [{ rotate: "180deg" }],
						},
					]}
				/>
			</View>
			<View
				style={{
					backgroundColor: "#212230",
					height: "100%",
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
				}}
			>
				<Text
					style={{
						color: "white",
						fontWeight: "bold",
						fontSize: 16,
						textAlign: "center",
						paddingTop: 10,
					}}
				>
					Thống kê trong tháng 7
				</Text>
				<ScrollableTabView
					tabBarPosition="top"
					tabBarInactiveTextColor="white"
					tabBarUnderlineStyle={{
						backgroundColor: Variable.GREEN_LIGHT_COLOR,
						elevation: 20,
					}}
					tabBarActiveTextColor={Variable.GREEN_LIGHT_COLOR}
					tabBarTextStyle={{ fontSize: 16 }}
					renderTabBar={() => (
						<DefaultTabBar
							tabs={["Khoản vay", "Khoản chi", "Khoản thu"]}
						/>
					)}
				>
					<StatisticTabItem
						type="LOAN"
						data={transactionData}
						tabLabel="Khoản vay"
					/>
					<StatisticTabItem
						type="SPEND"
						data={transactionData}
						tabLabel="Khoản chi"
					/>

					<StatisticTabItem
						type="EARN"
						data={transactionData}
						tabLabel="Khoản thu"
					/>
				</ScrollableTabView>
			</View>
		</View>
	);
};
export default Statistic;
