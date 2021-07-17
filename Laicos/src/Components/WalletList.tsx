import React from "react";
import { Text, View } from "react-native";
import { IWallet } from "../type";
import { WalletItem } from "./WalletItem";

export const WalletList = () => {
	const data: IWallet[] = [
		{
			name: "BAMEBANK",
			moneyIn: 600000,
			moneyOut: 500000,
		},
		{
			name: "NGUOIYEUBANK",
			moneyIn: 750000,
			moneyOut: 100000,
		},
		{
			name: "BODUONGBANK",
			moneyIn: 100000000,
			moneyOut: 5000000,
		},
	];

	return (
		<View>
			<View>
				<View>
					{data.map((wallet, idx) => (
						<WalletItem key={idx} wallet={wallet} />
					))}
				</View>
			</View>
		</View>
	);
};
