import React, { useEffect, useState } from "react";
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
	Animated,
} from "react-native";

import Modal from "react-native-modalbox";
import { ScrollView, TapGestureHandler } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { LinearGradButton } from "../Components/LinearGradButton";
import { globalStyles, Variable } from "../styles/theme.style";
import { ITransactionGroup } from "../type";
import { Calendar } from "react-native-calendars";
import moment from "moment";
export const AddTransaction = ({ navigation }) => {
	navigation.setOptions({ tabBarVisibile: false });
	const [chosenGroup, setChosenGroup] = useState<ITransactionGroup | null>(
		null
	);
	const [chosenDate, setChosenDate] = useState<Date>(new Date());
	const [isCalanderOpened, setOpen] = useState(false);

	const getMarkedDate = () => {
		const markedDate: Record<string, any> = {};

		markedDate[moment(chosenDate).format("YYYY-MM-DD")] = {
			selected: true,
			selectedColor: Variable.GREEN_LIGHT_COLOR,
		};
		return markedDate;
	};
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
			<ScrollView style={[styles.container]}>
				<TouchableOpacity
					onPress={() => {
						setChosenGroup(null);
						navigation.goBack();
					}}
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
				</TouchableOpacity>
				{/* Chụp ảnh */}
				<View style={[]}></View>
				{/* Form input */}
				<View style={[styles.form]}>
					<TextInput style={[styles.input]}>0đ</TextInput>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("Chọn nhóm", {
								setChosenGroup: setChosenGroup,
								chosenGroup: chosenGroup,
							})
						}
					>
						{chosenGroup ? (
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
						) : (
							<Text style={[styles.input]}>Chọn nhóm</Text>
						)}
					</TouchableOpacity>

					<TextInput
						style={[styles.input]}
						placeholder="Thêm ghi chú"
						placeholderTextColor="white"
					></TextInput>
					<TouchableOpacity onPress={() => setOpen(true)}>
						<Text style={[styles.input]}>Hôm nay</Text>
					</TouchableOpacity>
					<Text style={[styles.input]}>Ví chính</Text>
				</View>

				{/* Buttons */}
				<View style={[{ flex: 1, marginTop: 26 }]}>
					<LinearGradButton
						color={Variable.BUTTON_PRIMARY}
						text={"LƯU"}
						action={() => {
							setChosenGroup(null);
							navigation.goBack();
						}}
					/>
					<LinearGradButton
						color={Variable.BUTTON_CANCEL}
						text={"HỦY"}
						action={() => {
							setChosenGroup(null);
							navigation.goBack();
						}}
					/>
				</View>
			</ScrollView>
			<Modal
				entry="bottom"
				position="bottom"
				style={styles.modalView}
				isOpen={isCalanderOpened}
				backdrop={true}
				backdropColor={Variable.BACKGROUND_COLOR}
				coverScreen={true}
				onClosed={() => setOpen(false)}
		
				backButtonClose={true}
			>
				<Calendar
					enableSwipeMonths={TapGestureHandler}
					markedDates={getMarkedDate()}
					onDayPress={(date) => {
						setChosenDate(new Date(date.dateString));
						setOpen(false);
					}}
					theme={{
						backgroundColor: Variable.BACKGROUND_COLOR,
						calendarBackground: Variable.BACKGROUND_COLOR,
						selectedDayBackgroundColor: Variable.GREEN_LIGHT_COLOR,
						selectedDayTextColor: "white",
						todayTextColor: "#00adf5",
						dayTextColor: "white",
						textDisabledColor: "#B1B1B1",
						arrowColor: "white",
						disabledArrowColor: "#d9e1e8",
						monthTextColor: "white",
						indicatorColor: "white",
					}}
				/>
			</Modal>
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
		padding: 6,
	},
	modalView: {
		margin: 0,

		justifyContent: "flex-end",
		height: 300,
	},
	calendarView: {},
});
