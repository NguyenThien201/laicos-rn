import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Dimensions,
	Animated,
	PanResponder,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { transaction } from "../data";
import { globalStyles, Variable } from "../styles/theme.style";
import { ITransaction } from "../type";
import { formatter } from "../Utils/format";
import { HistoryTransactionItem } from "./HistoryTransactionItem";
import GestureRecognizer from "react-native-swipe-gestures";
const windowHeight = Dimensions.get("window").height;
export const HistoryTransactionView = (props) => {
	const [transactionHistory, setTransactionHistory] = useState<
		ITransaction[]
	>([]);
	const [transactionByDay, setTransactionByDay] =
		useState<{ date: string; transactionItems: ITransaction[] }>();
	const [moneyIn,setMoneyIn] = useState(0);
	const [moneyOut,setMoneyOut] = useState(0);
	const scrollY = new Animated.Value(0);

	const diffClamp = Animated.diffClamp(scrollY, 0, 200);
	const translateY = diffClamp.interpolate({
		inputRange: [0, 200],
		outputRange: [0, -200],
	});
	useEffect(() => {
		const temp = [];
		let mIn = 0;
		let mOut = 0;
		for (const trans of transaction) {
			if (trans.date.getMonth() === props.date.getMonth()) {
				temp.push(trans);
				if (trans?.group) {
					if (trans?.group?.type==="EARN")
					{
						mIn+= trans.money
					}
					else{
						mOut += trans.money
					}
				}

			}
		}
		setMoneyIn(mIn)
		setMoneyOut(mOut)
		temp.sort((a, b) => {
			return moment(a.date).isBefore(b.date) ? 1 : -1;
		});
		return setTransactionHistory(temp);
	}, []);

	useEffect(() => {
		const groups = transactionHistory.reduce((groups, trans) => {
			const date = moment(trans.date).format("MM/DD/YYYY");
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(trans);
			return groups;
		}, {} as Record<string, ITransaction[]>);

		// Edit: to add it in the array format instead
		const groupArrays = Object.keys(groups).map((date) => {
			return {
				date,
				transactionItems: groups[date],
			};
		});
		setTransactionByDay(groupArrays);
	}, [transactionHistory]);


	return (
		<View style={[styles.containter]}>
			<Animated.View
				style={{ transform: [{ translateY: translateY }], zIndex: 100}}
			>
				<View style={[styles.moneyContainer]}>
					<View>
						<Text
							style={[
								globalStyles.whiteText,
								globalStyles.fontSizeSmall,
								globalStyles.fontMedium,
							]}
						>
							Tiền vào
						</Text>
						<Text
							style={[
								globalStyles.whiteText,
								globalStyles.fontSizeSmall,
								globalStyles.fontMedium,
							]}
						>
							Tiền ra
						</Text>
					</View>

					<View>
						{/* Tiền vào */}
						<Text
							style={[
								globalStyles.greenText,
								globalStyles.fontBold,
								globalStyles.fontSizeSmall,
								{ alignSelf: "flex-end" },
							]}
						>
							{formatter(moneyIn)}
						</Text>
						{/* Tiền ra */}
						<Text
							style={[
								globalStyles.redText,
								globalStyles.fontSizeSmall,
								globalStyles.fontBold,
								{ alignSelf: "flex-end" },
							]}
						>
							{formatter(moneyOut)}
						</Text>
						{/* Line ngang */}
						<View
							style={{
								borderBottomColor: "white",
								borderBottomWidth: 1,
								width: 100,
								marginVertical: 3,
							}}
						/>
						<Text
							style={[
								globalStyles.redText,
								globalStyles.fontSizeSmall,
								globalStyles.fontBold,
								{ alignSelf: "flex-end", color: "#fff" },
							]}
						>
							{formatter(moneyIn - moneyOut)}
						</Text>
					</View>
				</View>
			</Animated.View>

				<Animated.ScrollView

					style={styles.history}
					scrollEventThrottle={16}
					onScroll={(e) => {
						scrollY.setValue(e.nativeEvent.contentOffset.y);
					}}
				>
					{transactionHistory.length >0 ? (
						<HistoryTransactionItem
							key={transactionByDay}
							transactionByDay={transactionByDay}
							date={props.date}
						/>
					) : (
						<Text style={{ color: "#fff", alignSelf: "center", paddingTop: 50 }}>
							Tháng này không có giao dịch
						</Text>
					)}
				</Animated.ScrollView>

		</View>
	);
};

const styles = StyleSheet.create({
	containter: {
		flex: 1,
		position: "relative",
	},
	box: {
		height: 50,
	},
	total: {
		flex: 2,
		alignContent: "center",
		justifyContent: "center",
	},
	moneyContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: Variable.BACKGROUND_COLOR,
	},
	history: {
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		height: "100%",
		paddingTop: 90,
		flex:2,
		paddingBottom:180
	},
});
