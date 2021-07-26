import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { globalStyles, Variable } from "../styles/theme.style";


// Component hiện nhóm chi tiêu đã chọn
export const ChosenGroupView = ({ chosenGroup }) => {
	return (
		<View style={[styles.input]}>
			<View
				style={{
					flex: 0,
					flexDirection: "row",
					justifyContent: "flex-start",
				}}
			>
				<Image
					source={chosenGroup.icon}
					style={{ width: 24, height: 24 }}
					resizeMode="contain"
				></Image>

				<Text
					style={[
						globalStyles.whiteText,
						globalStyles.fontSizeMedium,
						{ marginLeft: 4 },
					]}
				>
					{chosenGroup.name}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		margin: 14,
		borderBottomWidth: 1,
		borderColor: "white",
		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
		padding: 6,
	},
});
