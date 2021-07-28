import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { transaction } from "../data";
import { globalStyles, Variable } from "../styles/theme.style";
import { ITransaction } from "../type";
import { formatter } from "../Utils/format";
import { TransactionItem } from "./TransactionItem";
import { TransactionList } from "./TransactionList";
import "moment/locale/vi";
export const HistoryTransactionItem = (props) => {
	// Giao dịch chung 1 ngày
	const { transactionByDay, date } = props;

	return (
		<ScrollView style={styles.containter}>
			{/* Từng giao dịch theo ngày */}
			{transactionByDay.map((groupTransaction,indx) => (
				<View style={styles.item}>
					<View style={styles.day}>
						<Text style={styles.dayTitle}>
							{moment(groupTransaction.date).format("DD")}
						</Text>
						<View>
							<Text style={styles.dayFull}>
								{moment(groupTransaction.date).format("dddd")}
							</Text>
							<Text style={styles.dayFull}>
								tháng{" "}
								{moment(groupTransaction.date).format(
									"MM/YYYY"
								)}
							</Text>
						</View>
					</View>
                    	{/* Line ngang */}
					<View
						style={{
							borderBottomColor: "white",
							borderBottomWidth: 1,
							
							marginVertical: 3,
						}}
					/>
                    {/* Hiện các giao dịch */}
                    {groupTransaction.transactionItems.map((transaction)=>  <TransactionItem transaction={transaction}/>)}
                   
				</View>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	containter: {
		flex: 1,
        marginHorizontal:16
	},
	day: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	dayTitle: {
		color: "white",
		fontSize: 32,
		marginRight: 8,
		fontWeight: "bold",
	},
	dayFull: {
		color: "white",
		fontSize: Variable.FONT_SIZE_SMALL_14,
		fontWeight: "bold",
	},
    item:{
        flex:1,
        marginVertical: 16
    }
});
