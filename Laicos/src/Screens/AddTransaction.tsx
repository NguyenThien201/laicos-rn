import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TextInput,
	Button,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { color } from "react-native-reanimated";
import { LinearGradButton } from "../Components/LinearGradButton";
import { Variable } from "../styles/theme.style";
import HomeScreen from "./HomeScreen";

export const AddTransaction = ({ navigation }) => {
	navigation.setOptions({ tabBarVisible: false });
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
			<ScrollView style={[styles.container]}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={{ flex: 0 }}
				>
					<View style={[styles.title]}>
						<Image
							source={require("../Assets/Images/Icons/ic_back.png")}
							style={{ marginTop: 10, marginRight: 10 }}
						></Image>
						<Text style={[styles.titleText]}>
							Thêm chi tiêu mới
						</Text>
					</View>
				</TouchableOpacity              >
				{/* Chụp ảnh */}
				<View style={[]}></View>
				{/* Form input */}
				<View style={[styles.form]}>
					<TextInput style={[styles.input]}>0đ</TextInput>
					<TouchableOpacity
						onPress={() => navigation.navigate("Chọn nhóm")}
					>
						<Text style={[styles.input]}>
							Chọn nhóm
						</Text>
					</TouchableOpacity>

					<Text style={[styles.input]}>Thêm ghi chú</Text>
					<Text style={[styles.input]}>Hôm nay</Text>
					<Text style={[styles.input]}>Ví chính</Text>
				</View>

				{/* Buttons */}
				<View style={[{ flex: 1, marginTop: 26 }]}>
					<LinearGradButton
						color={Variable.BUTTON_PRIMARY}
						text={"LƯU"}
                        action={() => navigation.goBack()}
					/>
					<LinearGradButton
						color={Variable.BUTTON_CANCEL}
						text={"HỦY"}
                        action={() => navigation.goBack()}
					/>
				</View>
			</ScrollView    >
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 16,
	},
	title: {
		flexDirection: "row",
		alignContent: "flex-start",
	},
	titleText: {
		color: "white",
		fontSize: Variable.FONT_SIZE_LARGE,
		fontWeight: "bold",
	},
	form: {
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		borderRadius: Variable.BORDER_RADIUS_MEDIUM,
		height: 400,
		marginTop: 20,
	},
	input: {
		margin: 14,
		borderBottomWidth: 1,
		borderColor: "white",
		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
        padding: 6
	},
});
