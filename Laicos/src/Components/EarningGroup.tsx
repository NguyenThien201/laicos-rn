import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { transactionGroup } from "../data";
import { Variable } from "../styles/theme.style";
import { ITransactionGroup } from "../type";

export const EarningGroup = ({ navigation }) => {
	const [parentGroup, setParentGroup] = useState<ITransactionGroup[]>([]);
	useEffect(() => {
		const data: ITransactionGroup[] = [];
		for (const group of transactionGroup) {
			if (!group.parent && group.type == "EARN") {
				data.push(group);
			}
		}
		setParentGroup(data);
	}, []);

	const renderItem = ({ item }) => (
		<View
			style={{
				flex: 1,
				flexDirection: "row",
				justifyContent: "flex-start",
			}}
		>
			<Image
				source={item.icon}
				style={{ width: 32, height: 32 }}
				resizeMode="contain"
			></Image>

			<Text style={styles.text}>{item.name}</Text>
		</View>
	);
	return (
		<View style={[styles.containter]}>
			<FlatList
				data={parentGroup}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}            
			></FlatList>
		</View>
	);
};


const styles = StyleSheet.create({
	containter: {
		flex: 1,    
		flexDirection: "column",
		justifyContent: "space-between",
        margin: 16
	},
	text: {
		textAlign: "left",
		color: "white",
        fontSize: Variable.FONT_SIZE_MEDIUM,
        marginLeft: 16
	},
});
