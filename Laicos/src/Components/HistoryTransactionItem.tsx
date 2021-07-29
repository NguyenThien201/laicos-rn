import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { transaction } from "../data";
import { globalStyles, Variable } from "../styles/theme.style";
import { ITransaction, ITransactionByDay } from "../type";
import { formatter } from "../Utils/format";
import { TransactionItem } from "./TransactionItem";
import "moment/locale/vi";
export const HistoryTransactionItem = (props) => {
	// Các giao dịch trong 1 ngày
	const { transactionByDay, date } = props;

	const reducerMoney = (groupTransaction: ITransactionByDay) => {
		let totalMoney = 0;
		for (const trans of groupTransaction.transactionItems) {
			if (trans.group.type === "EARN") {
				totalMoney += trans.money;
			} else {
				totalMoney -= trans.money;
			}
		}
		return totalMoney;
	};
	return (
		<View style={styles.containter}>
			{/* Từng giao dịch theo ngày */}
			{transactionByDay.map(
				(groupTransaction: ITransactionByDay, indx: number) => (
					<View style={styles.item}>
						<View style={styles.dayHeader}>
							<View style={styles.day}>
								<Text style={styles.dayTitle}>
									{moment(groupTransaction.date).format("DD")}
								</Text>
								<View>
									<Text style={styles.dayFull}>
										{moment(groupTransaction.date).format(
											"dddd"
										)}
									</Text>
									<Text style={styles.dayFull}>
										tháng{" "}
										{moment(groupTransaction.date).format(
											"MM/YYYY"
										)}
									</Text>
								</View>
							</View>

							<Text style={styles.dayFull}>
								{formatter(reducerMoney(groupTransaction))}
							</Text>
						</View>
						{/* Line ngang */}
						<View
							style={{
								borderBottomColor: Variable.GREEN_LIGHT_COLOR,
								borderBottomWidth: 1,
								marginVertical: 3,
							}}
						/>
						{/* Hiện các giao dịch */}
						{groupTransaction.transactionItems.map(
							(transaction: ITransaction, indx: number) => (
								<TransactionItem
									key={indx}
									transaction={transaction}
									showDescription={true}
								/>
							)
						)}
					</View>
				)
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	containter: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		borderTopLeftRadius: Variable.BORDER_RADIUS_MEDIUM,
		borderTopRightRadius: Variable.BORDER_RADIUS_MEDIUM,
		paddingBottom: 90,
	},
	dayHeader: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	day: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	dayTitle: {
		color: "white",
		fontSize: 36,
		marginRight: 8,
		fontWeight: "bold",
	},
	dayFull: {
		color: "white",
		fontSize: Variable.FONT_SIZE_SMALL_16,
		fontWeight: "bold",
	},
	item: {
		flex: 1,
		marginVertical: 16,
	},
});
