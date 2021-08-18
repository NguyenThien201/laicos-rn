import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Variable } from "../styles/theme.style";

export const TitleHeader: FC<{ title: string }> = ({title}) => {
	return (
		<View style={[styles.title]}>
			<Image
				source={require("../Assets/Images/Icons/ic_back.png")}
				style={{					
					marginRight: 12,
			
				}}
			></Image>
			<Text style={[styles.titleText]}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		flexDirection: "row",
		alignItems: "center",
		elevation: 15,
	},
	titleText: {
		color: "white",
		fontSize: Variable.FONT_SIZE_LARGE,
		fontWeight: "bold",
	},
});
