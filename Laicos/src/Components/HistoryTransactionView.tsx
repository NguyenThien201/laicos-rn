import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { transaction } from "../data";
import { globalStyles, Variable } from "../styles/theme.style";
import { ITransaction } from "../type";
import { formatter } from "../Utils/format";
import { HistoryTransactionItem } from "./HistoryTransactionItem";

export const HistoryTransactionView = (props) => {
	const [transactionHistory, setTransactionHistory] = useState<
		ITransaction[]
	>([]);
	const [transactionByDay, setTransactionByDay] =
		useState<{ date: string; transactionItems: ITransaction[] }>();

	useEffect(() => {
		const temp = [];
		for (const trans of transaction) {
			if (trans.date.getMonth() === props.date.getMonth()) {
				temp.push(trans);
			}
		}
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
						{formatter(1000000)}
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
						{formatter(1000000)}
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
						{formatter(0)}
					</Text>
				</View>
			</View>

			<View style={[styles.history]}>
				{transactionByDay ? (
					<HistoryTransactionItem
						transactionByDay={transactionByDay}
						date={props.date}
					/>
				) : (
					<Text style={{ color: "#fff", alignSelf: "center" }}>
						Tháng này không có giao dịch
					</Text>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	containter: {
		flex: 1,
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
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 16,
		marginVertical: 12,
	},
	history: {
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,

		flex: 1,
		borderTopEndRadius: Variable.BORDER_RADIUS_MEDIUM,
		borderTopStartRadius: Variable.BORDER_RADIUS_MEDIUM,
	},
});
