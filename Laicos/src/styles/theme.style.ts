import { StyleSheet } from "react-native"

export const Variable = {
	FONT_SIZE_SMALL: 14,
	FONT_SIZE_MEDIUM: 24,
	FONT_SIZE_LARGE: 32,
	GREEN_LIGHT_COLOR: '#3CD3AD',
	WALLET_GRADIENT: 'linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)',
	BUTTON_PRIMARY: 'linear-gradient(90deg, #4CB8C4 0%, #3CD3AD 100%)',
	BUTTON_CANCEL: 'linear-gradient(to right, #f85032 0%, #e73827  51%, #f85032  100%)',
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
	}
})
