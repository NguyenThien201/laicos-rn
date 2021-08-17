import { StyleSheet } from "react-native"

export const Variable = {
	FONT_SIZE_MEDIUM: 16,
	FONT_SIZE_SMALL: 14,
	FONT_SIZE_LARGE: 24,
	GREEN_LIGHT_COLOR: '#3CD3AD',
	RED_COLOR: '#D83B57',
	GREEN_COLOR: '#00FF57',
	GREY_COLOR: '#929292',
	WALLET_GRADIENT: [ "#3A6073","#00BF8F"],
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
	title:{
		color: "white",
		fontSize: Variable.FONT_SIZE_LARGE,
		fontWeight: "bold"
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
		fontSize: Variable.FONT_SIZE_SMALL
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
	textAlign: {
		textAlign: "center"
	},
	fontBold: {
		fontWeight:"bold"
	},
	fontMedium:{
		fontWeight:"900"
	},
	rowDisplay:{
		display:"flex",
		flexDirection:"row"
	}
})
