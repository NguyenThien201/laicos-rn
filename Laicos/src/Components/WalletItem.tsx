import React from "react";
import { Text, View } from "react-native";

export const WalletItem = (name, total, moneyIn, moneyOut) => {
	return (
		<View>
			<View style={{ flex: 1, justifyContent: "space-between" }}>
				<Text>{name}</Text>
                <Text>...</Text>
			</View>
		</View>
	);
};
