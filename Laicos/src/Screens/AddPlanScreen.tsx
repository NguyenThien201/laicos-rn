import React, { useEffect, useState } from "react";
import {
	BackHandler,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import Modal from "react-native-modalbox";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradButton } from "../Components/LinearGradButton";
import { Variable } from "../styles/theme.style";
import {
	IImage,
	IPlanner,
	ITransaction,
	ITransactionGroup,
	IWallet,
} from "../type";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { plans, transaction, wallets } from "../data";
import { ChosenGroupView } from "../Components/ChosenGroupVIew";
import { TitleHeader } from "./Title";
import { formatter } from "../Utils/format";
import { useNavigation } from "@react-navigation/native";

export const AddPlan = () => {
	const navigation = useNavigation();

	const [chosenGroup, setChosenGroup] = useState<ITransactionGroup | null>(
		null
	);
	const [name, setName] = useState("");
	const [money, setMoney] = useState("0");
	const [chosenStartDate, setChosenStartDate] = useState<Date>();
	const [chosenEndDate, setChosenEndDate] = useState<Date>();

	const [dateChosen, setDateChosen] = useState(false);
	const [isCalanderOpened, setOpen] = useState(false);
	const [description, setDescription] = useState("");
	const [chosenWallet, setChosenWallet] = useState<IWallet>(wallets[0]);

	const [error, setError] = useState(false);
	const getMarkedDate = () => {
		const markedDate: Record<string, any> = {};
		if (dateChosen) {
			const date = moment(chosenEndDate);
			markedDate[date.format("YYYY-MM-DD")] = {
				selected: true,
				selectedColor: Variable.GREEN_LIGHT_COLOR,
			};
		} else {
			markedDate[moment(chosenStartDate).format("YYYY-MM-DD")] = {
				selected: true,
				selectedColor: Variable.GREEN_LIGHT_COLOR,
			};
		}

		return markedDate;
	};

	useEffect(() => {
		const backAction = () => {
			resetState();
			navigation.goBack();
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);
	useEffect(() => {
		if (chosenStartDate && chosenEndDate) {
			if (moment(chosenEndDate).isBefore(moment(chosenStartDate))) {
				setError(true);
			} else {
				setError(false);
			}
		}
	}, [chosenStartDate, chosenEndDate]);
	const resetState = () => {
		setMoney("0");
		setName("");
		setChosenStartDate(undefined);
		setChosenEndDate(undefined);
		setDescription("");
		setChosenGroup(null);
		setChosenWallet(wallets[0]);
	};
	const createNewPlan = () => {
		const toMoney = parseInt(money);
		if (
			chosenGroup &&
			toMoney >= 0 &&
			error === false &&
			chosenEndDate &&
			chosenStartDate
		) {
			const newPlan: IPlanner = {
				dateEnd: chosenEndDate,
				dateStart: chosenStartDate,
				description: description,
				group: chosenGroup,
				money: toMoney,
				wallet: chosenWallet.name,
				name: name,
			};
            console.log('new plan', newPlan);
			plans.push(newPlan);
            navigation.reset({
				index: 0,
				routes: [{ name: "Detail Planner" }],
			});
			resetState();
			navigation.goBack();
		}
	};
	const getFormattedMoney = (value: string) => {
		return formatter(parseInt(removeComma(value)));
	};
	const removeComma = (value: string) => {
		const re = new RegExp(",", "g");
		return value.replace(re, "");
	};
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
			<ScrollView
				style={[styles.container]}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<TouchableOpacity
					onPress={() => {
						resetState();
						navigation.goBack();
					}}
					style={{ flex: 0 }}
				>
					<TitleHeader title={"Thêm kế hoạch mới"} />
				</TouchableOpacity>
				{/* Form input */}
				<View style={[styles.form]}>
					{/*Calculator*/}
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("Calculator", {
								money: money,
								setMoney: setMoney,
							})
						}
					>
						<Text style={[styles.input]}>
							{getFormattedMoney(money)}đ
						</Text>
					</TouchableOpacity>

					{/* Chọn tên */}

					<TextInput
						style={[styles.input]}
						placeholder="Nhập tên"
						value={name}
						onChangeText={setName}
						placeholderTextColor={Variable.GREY_COLOR}
					></TextInput>

					{/* Chọn nhóm */}
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("Chọn nhóm", {
								setChosenGroup: setChosenGroup,
								chosenGroup: chosenGroup,
							})
						}
					>
						{chosenGroup ? (
							<ChosenGroupView chosenGroup={chosenGroup} />
						) : (
							<Text style={[styles.placeholder]}>Chọn nhóm</Text>
						)}
					</TouchableOpacity>
					{/* Thêm ghi chú */}
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("Thêm ghi chú", {
								setDescription,
								description,
							})
						}
					>
						{description ? (
							<Text style={[styles.input]}>{description}</Text>
						) : (
							<Text style={[styles.placeholder]}>
								Thêm ghi chú
							</Text>
						)}
					</TouchableOpacity>

					{/* Chọn ngày bắt đầu */}
					<TouchableOpacity
						onPress={() => {
							setOpen(true);
							setDateChosen(false);
						}}
					>
						{chosenStartDate ? (
							new Date().toLocaleDateString() ===
							chosenStartDate.toLocaleDateString() ? (
								<Text style={[styles.input]}>Hôm nay</Text>
							) : (
								<Text style={[styles.input]}>
									{moment(chosenStartDate).format(
										"DD-MM-YYYY"
									)}
								</Text>
							)
						) : (
							<Text style={[styles.placeholder]}>
								Ngày bắt đầu
							</Text>
						)}
					</TouchableOpacity>

					{/* Chọn ngày kết thúc */}
					<TouchableOpacity
						onPress={() => {
							setOpen(true);
							setDateChosen(true);
						}}
					>
						{chosenEndDate ? (
							new Date().toLocaleDateString() ===
							chosenEndDate.toLocaleDateString() ? (
								<Text
									style={[
										styles.input,
										error
											? {
													borderBottomColor:
														Variable.RED_COLOR,
													marginBottom: 4,
											  }
											: null,
									]}
								>
									Hôm nay
								</Text>
							) : (
								<Text
									style={[
										styles.input,
										error
											? {
													borderBottomColor:
														Variable.RED_COLOR,
													marginBottom: 4,
											  }
											: null,
									]}
								>
									{moment(chosenEndDate).format("DD-MM-YYYY")}
								</Text>
							)
						) : (
							<Text style={[styles.placeholder]}>
								Ngày kết thúc
							</Text>
						)}
					</TouchableOpacity>
					{error ? (
						<Text style={styles.error}>
							Ngày kết thúc phải nhỏ hơn ngày bắt đầu
						</Text>
					) : null}
					{/* Chọn ví */}
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("Chọn ví", {
								chosenWallet: chosenWallet,
								setChosenWallet: setChosenWallet,
							})
						}
					>
						<Text style={[styles.input]}>{chosenWallet.name}</Text>
					</TouchableOpacity>
				</View>

				{/* Buttons */}
				<View style={[{ flex: 1, marginTop: 16 }]}>
					<LinearGradButton
						color={Variable.BUTTON_PRIMARY}
						text={"LƯU"}
						action={createNewPlan}
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
						if (dateChosen)
							setChosenEndDate(new Date(date.dateString));
						else setChosenStartDate(new Date(date.dateString));
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
		marginVertical: 16,
		marginHorizontal: 16,
	},
	form: {
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		borderRadius: Variable.BORDER_RADIUS_MEDIUM,
		paddingVertical: 8,
		marginTop: 32,
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
	placeholder: {
		margin: 14,
		borderBottomWidth: 1,
		borderColor: "white",
		color: Variable.GREY_COLOR,
		fontSize: Variable.FONT_SIZE_MEDIUM,
		padding: 6,
	},
	error: {
		color: Variable.RED_COLOR,
		fontSize: Variable.FONT_SIZE_SMALL,
		marginHorizontal: 14,
		marginBottom: 6,
		paddingHorizontal: 6,
	},
});
