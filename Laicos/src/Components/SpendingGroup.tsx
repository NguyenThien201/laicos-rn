import React, { useEffect, useState } from "react";
import {
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacityBase,
	View,
} from "react-native";
import {
	FlatList,
	ScrollView,
	TouchableOpacity,
} from "react-native-gesture-handler";
import { transactionGroup } from "../data";
import { Variable } from "../styles/theme.style";
import { ITransactionGroup } from "../type";

export const SpendingGroup = ({ navigation, setChosenGroup, chosenGroup }) => {
	const [parentGroup, setParentGroup] = useState<ITransactionGroup[]>([]);
	useEffect(() => {
        if(parentGroup.length===0)
        {
            const data: ITransactionGroup[] = [];
            for (const group of transactionGroup) {
                if (!group.parent && group.type == "SPEND") {
                    data.push(group);
                }
            }
            setParentGroup(data);
          
        }
		
	}, []);

	const renderItem = ({ item }) => (
		<View style={{ flex: 1 }}>
			<TouchableOpacity
				onPress={() => {
					setChosenGroup(item);
					navigation.goBack();
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between",
						marginVertical: 12,
					}}
				>
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

						{chosenGroup?.id === item.id ? (
							<Text
								style={[
									styles.text,
									{ color: Variable.GREEN_LIGHT_COLOR },
								]}
							>
								{item.name}
							</Text>
						) : (
							<Text style={[styles.text]}>{item.name}</Text>
						)}
					</View>

					{chosenGroup?.id === item.id ? (
						<Image
							style={{ alignSelf: "center" }}
							source={require("./../Assets/Images/Icons/ic_checked.png")}
						/>
					) : null}
				</View>
			</TouchableOpacity>
		</View>
	);
	return (
		<View style={[styles.containter]}>
			<FlatList
				data={parentGroup}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			></FlatList>
			<Button title="ADD"></Button>
		</View>
	);
};

const styles = StyleSheet.create({
	containter: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		margin: 16,
	},
	text: {
		textAlign: "left",
		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
		marginLeft: 16,
		fontWeight: "900",
	},
});
