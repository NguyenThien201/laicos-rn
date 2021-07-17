import { StyleSheet } from "react-native"

export const Variable = {
	FONT_SIZE_SMALL_16: 16,
	FONT_SIZE_SMALL_14: 14,
	FONT_SIZE_MEDIUM: 20,
	FONT_SIZE_LARGE: 28,
	GREEN_LIGHT_COLOR: '#3CD3AD',
	RED_COLOR: '#D83B57',
	GREEN_COLOR: '#00FF57',
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
		fontSize: Variable.FONT_SIZE_MEDIUM
	},
	fontSizeSmall:{
		fontSize: Variable.FONT_SIZE_SMALL_16
	},
	fontSizeLarge:{
		fontSize: Variable.FONT_SIZE_LARGE
	},
	whiteText:{
		color: "#fff"		
	},
	redText:{
		color: Variable.RED_COLOR
	},
	greenText:{
		color: Variable.GREEN_COLOR
	},
	card: {
	
		borderRadius:Variable.BORDER_RADIUS_SMALL,
		height: 150,
		padding: 16
	},
	textAlign: {
		textAlign: "center"
	},
	fontBold: {
		fontWeight:"bold"
	},
	fontMedium:{
		fontWeight:"900"
	}
})
