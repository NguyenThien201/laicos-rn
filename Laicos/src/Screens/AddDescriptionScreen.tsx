import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
	Dimensions,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { LinearGradButton } from "../Components/LinearGradButton";
import { Variable } from "../styles/theme.style";
import { TitleHeader } from "./Title";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
export const AddDescription = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const { description, setDescription } = route.params;
	const [des, setDes] = useState<string>(description);
	const saveDescription = () => {
		setDescription(des);

		navigation.goBack();
	};
    const inputRef = useRef();
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
			<ScrollView style={[styles.container]} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
					style={{ flex: 0 }}
				>
					<TitleHeader title={"Thêm ghi chú"} />
				</TouchableOpacity>
				<View style={styles.form} onTouchStart={()=>{inputRef?.current.focus(); console.log("ok")}}>
					<TextInput
                        ref ={inputRef}
						style={[styles.input]}
						placeholder="Thêm ghi chú"
						placeholderTextColor="white"
						onChangeText={setDes}
						value={des}
                       
					/>
				</View>

				{/* Buttons */}
				<View style={[{ flex: 1, marginTop: 16 }]}>
					<LinearGradButton
						color={Variable.BUTTON_PRIMARY}
						text={"LƯU"}
						action={saveDescription}
					/>
					<LinearGradButton
						color={Variable.BUTTON_CANCEL}
						text={"HỦY"}
						action={navigation.goBack}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 16,
		marginHorizontal: 16,
	},
	form: {
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		borderRadius: Variable.BORDER_RADIUS_MEDIUM,
		paddingVertical: 8,
		marginTop: 16,
		minHeight: screenHeight * 0.6,
	},
	input: {
		margin: 14,

		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
		padding: 6,
	},
});
