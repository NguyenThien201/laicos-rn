import React from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { globalStyles, Variable } from "../styles/theme.style";

export const LinearGradButton = ({ color, text, action }) => {
	return (
		<View>
			<TouchableOpacity
          
				onPress={() => action()}
		
			>
				<LinearGradient
					colors={color}
					style={[
						{ borderRadius: Variable.BORDER_RADIUS_SMALL },
						styles.button,
					]}
				>
					<Text
						style={[
							globalStyles.whiteText,
							globalStyles.fontBold,
							globalStyles.fontSizeSmall,
							globalStyles.textAlign,
						]}
					>
						{text}
					</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		marginTop: 12,
		paddingVertical: 10,
	},
});
