import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Variable } from "../styles/theme.style";
import { formatter } from "../Utils/format";

export const TransactionItem = ({ transaction, showDescription = false }) => {
	return (
		<View style={styles.containter}>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "flex-start",
				}}
			>
				{transaction.group.icon ? (
					<Image
						source={transaction.group.icon}
						style={{ width: 24, height: 24 }}
						resizeMode="contain"
					></Image>
				) : null}

        {/* Hiện tên giao dịch và ghi chú */}
				<View style={{flex:1}}>
					<Text style={styles.text}>{transaction.group.name}</Text>
					{showDescription === true ? (
						<Text style={styles.description}>
							{transaction.description}
						</Text>
					) : null}
				</View>
			</View>

			<View>
				<Text
					style={[
						styles.money,
						transaction.group.type === "EARN"
							? { color: Variable.GREEN_COLOR }
							: { color: Variable.RED_COLOR },
					]}
				>
					{formatter(transaction.money)}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	containter: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
    marginVertical: 4,
	},
	text: {
		marginLeft: 8,
		textAlign: "left",
		color: "white",
		fontSize: Variable.FONT_SIZE_SMALL_16,
		fontWeight: "900",
    
	},
  money:{
		textAlign: "right",
		color: "white",
		fontSize: Variable.FONT_SIZE_SMALL_16,
		fontWeight: "900",
  },
  description: {
		marginLeft: 8,
		textAlign: "left",
		color: "white",
		fontSize: Variable.FONT_SIZE_SMALL_14,
		fontWeight: "400",

	},
});
