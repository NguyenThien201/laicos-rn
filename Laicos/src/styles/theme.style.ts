import { StyleSheet } from "react-native"

export const Variable = {
	FONT_SIZE_SMALL: 16,
	FONT_SIZE_MEDIUM: 20,
	FONT_SIZE_LARGE: 28,
	GREEN_LIGHT_COLOR: '#3CD3AD',
	WALLET_GRADIENT: ["#08AEEA", "#2AF598"],
	BUTTON_PRIMARY:  ["#4CB8C4", "#3CD3AD"],
	BUTTON_CANCEL: ["#f85032", "#e73827", "#f85032"],
	FONT_WEIGHT_LIGHT: 200,
	FONT_WEIGHT_MEDIUM: 600,
	FONT_WEIGHT_HEAVY: 800,
	BACKGROUND_COLOR: '#151321',
	BACKGROUND_ITEM_COLOR: '#212230',
	BORDER_RADIUS_SMALL: 10,
	BORDER_RADIUS_MEDIUM: 15,
}

export const globalStyles = StyleSheet.create({
	width100: {
		width: "100%"
	},
	height100:{
		height: "100%"
	},
	bgDark: {
		backgroundColor: Variable.BACKGROUND_COLOR,
	},
	fontSizeMedium:{
		fontSize: 24
	},
	fontSizeSmall:{
		fontSize: 20
	},
	fontSizeLarge:{
		fontSize: 32
	},
	whiteText:{
		color: "#fff"		
	},
	card: {
		borderRadius:Variable.BORDER_RADIUS_SMALL,
		height: 125,
		padding: 16
	},
	textAlign: {
		textAlign: "center"
	}
})
