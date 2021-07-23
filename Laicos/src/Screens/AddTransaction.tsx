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
import { ITransaction, ITransactionGroup, IWallet } from "../type";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { transaction, wallets } from "../data";

export const AddTransaction = ({ navigation, route }) => {

	navigation.setOptions({ tabBarVisibile: false });

	const [chosenGroup, setChosenGroup] = useState<ITransactionGroup | null>(
		null
	);
	const [money, setMoney] = useState("");
	const [chosenDate, setChosenDate] = useState<Date>(new Date());
	const [isCalanderOpened, setOpen] = useState(false);
	const [description, setDescription] = useState("");
	const [chosenWallet, setChosenWallet] = useState<IWallet>(wallets[0]);
	const getMarkedDate = () => {
		const markedDate: Record<string, any> = {};

		markedDate[moment(chosenDate).format("YYYY-MM-DD")] = {
			selected: true,
			selectedColor: Variable.GREEN_LIGHT_COLOR,
		};
		return markedDate;
	};
	
	const resetState= () =>{
		setMoney("")
		setChosenDate(new Date())
		setDescription("")
		setChosenGroup(null)
		setChosenWallet(wallets[0])
	}
	const createNewTransaction = () => {
		if (chosenGroup && parseInt(money) > 0) {
			const newTransaction: ITransaction = {
				date: chosenDate,
				description: description,
				wallet: chosenWallet.name,
				money: parseInt(money),
				group: chosenGroup!,
			};
			transaction.push(newTransaction)
			resetState()
			navigation.reset({
				index: 0,
				routes: [{ name: "Trang chủ" }],
			  });
			
		}
		
	};
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
			<ScrollView style={[styles.container]}>
				<TouchableOpacity
					onPress={() => {					
						resetState()
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
					<TextInput
						style={[styles.input]}
						placeholder="0đ"
						onChangeText={setMoney}
						value={money}
						keyboardType="numeric"
						placeholderTextColor="white"
					></TextInput>
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
						onChangeText={setDescription}
						value={description}
					></TextInput>
					<TouchableOpacity onPress={() => setOpen(true)}>
						{new Date().toLocaleDateString() ===
						chosenDate.toLocaleDateString() ? (
							<Text style={[styles.input]}>Hôm nay</Text>
						) : (
							<Text style={[styles.input]}>
								{moment(chosenDate).format("DD-MM-YYYY")}
							</Text>
						)}
					</TouchableOpacity>
					<Text style={[styles.input]}>{chosenWallet.name}</Text>
				</View>

				{/* Buttons */}
				<View style={[{ flex: 1, marginTop: 26 }]}>
					<LinearGradButton
						color={Variable.BUTTON_PRIMARY}
						text={"LƯU"}
						action={createNewTransaction}
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
					enableSwipeMonths={true}
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
