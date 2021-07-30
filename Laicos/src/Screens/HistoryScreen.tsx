import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { globalStyles, Variable } from "../styles/theme.style";

import ScrollableTabView, {
	DefaultTabBar,
	ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import { HistoryTransactionView } from "../Components/HistoryTransactionView";
import { IWallet } from "../type";
import { wallets } from "../data";
import { formatter } from "../Utils/format";

export const HistoryScreen = ({ route, navigation }) => {
	// Lấy ra ngày được chọn từ home screen
	const { selectedDay } = route.params;
	const numberOfMonths = 4;
	const [index, setIndex] = useState(numberOfMonths);
	const [monthsData, setMonthsData] = useState<Date[]>([]);
	const [chosenWallet, setChosenWallet] = useState<IWallet>(wallets[0]);
	const screenWidth = Dimensions.get("window").width;
	const months: Date[] = (): Date[] => {
		const d: Date[] = [new Date()];
		d[0].setMonth(d[0].getMonth());

		for (let i = 1; i <= numberOfMonths; i++) {
			const tempDate = new Date();
			tempDate.setMonth(d[0].getMonth() - i);
			d.push(tempDate);
			if (
				tempDate.getMonth() + 1 === selectedDay.getMonth() &&
				tempDate.getFullYear() === selectedDay.getFullYear()
			) {
				setIndex(numberOfMonths - i);
			}
		}
		d.reverse();
	
		// Thêm vài tháng cho tương lai
		for (let i = 1; i <= 3; i++) {
			const tempDate = new Date();
			tempDate.setMonth(d[numberOfMonths].getMonth() + i);
			d.push(tempDate);

		}
		return d;
	};

	useEffect(() => {
		return setMonthsData(months);
	}, [index]);

	return (
		<View style={[styles.container]}>
			<View style={[styles.topNav]}>
				<View style={[styles.walletSelection]}>
					<Text
						style={{
							color: Variable.GREEN_LIGHT_COLOR,
							marginRight: 16,
							fontSize: Variable.FONT_SIZE_SMALL_16,
						}}
					>
						Ví chính
					</Text>
					<Image
						source={require("../Assets/Images/Icons/ic_arrow_right.png")}
					/>
				</View>
				{monthsData.length > 0 ? (
					<ScrollableTabView
						tabBarPosition="top"
						tabBarInactiveTextColor="white"
						tabBarUnderlineStyle={{
							backgroundColor: Variable.GREEN_LIGHT_COLOR,
							elevation: 20,
						}}
						tabBarActiveTextColor={Variable.GREEN_LIGHT_COLOR}
						tabBarTextStyle={{ fontSize: 16 }}
						initialPage={index}
						renderTabBar={() => <ScrollableTabBar />}
					>
						{monthsData
							? monthsData.map((month) => (
									<HistoryTransactionView
										key={month}
										tabLabel={
											new Date().toLocaleDateString() ===
											month.toLocaleDateString()
												? "Tháng này"
												: moment(month).format(
														"MM/YYYY"
												  )
										}
										date={month}
									/>
							  ))
							: null}
					</ScrollableTabView>
				) : null}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	topNav: {
		flex: 1,

		marginTop: 16,
	},
	walletSelection: {
		marginHorizontal: 16,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderColor: Variable.GREEN_LIGHT_COLOR,
		borderWidth: 1,
		borderRadius: Variable.BORDER_RADIUS_SMALL,
		width: 120,
		padding: 8,
		height: 45,
	},
});
