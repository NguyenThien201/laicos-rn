import React, { useEffect, useState } from "react";
import {
	BackHandler,
	Image,
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
import { IImage, ITransaction, ITransactionGroup, IWallet } from "../type";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { transaction, wallets } from "../data";
import { ChosenGroupView } from "../Components/ChosenGroupVIew";
import { BillImage } from "../Components/BillImage";
import { TitleHeader } from "./Title";
import { formatter } from "../Utils/format";

export const EditTransaction = ({ navigation, route }) => {
	const { transaction } = route.params;
	console.log(transaction);
	const [chosenGroup, setChosenGroup] = useState<ITransactionGroup | null>(
		transaction.group ?? null
	);
	const [money, setMoney] = useState(transaction.money+"");
	const [image, setImages] = useState<IImage[]>(transaction.images?.length>0 ? transaction.images : [] );
	const [chosenDate, setChosenDate] = useState<Date>(transaction.date);
	const [isCalanderOpened, setOpen] = useState(false);
	const [description, setDescription] = useState(transaction.date);
	const [chosenWallet, setChosenWallet] = useState<IWallet>(wallets[0]);
	const getMarkedDate = () => {
		const markedDate: Record<string, any> = {};

		markedDate[moment(chosenDate).format("YYYY-MM-DD")] = {
			selected: true,
			selectedColor: Variable.GREEN_LIGHT_COLOR,
		};
		return markedDate;
	};
	useEffect(() => {
		for (const wallet of wallets) {
			if (wallet.name === transaction.wallet) {
				setChosenWallet(wallet);
				break;
			}
		}
	}, []);
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

	const predictGroup = () => {
		const toMoney = parseInt(money);
		console.log(money);
		if (toMoney >= 0 && chosenGroup == null) {
			const predict: Record<string, number> = {};
			let _max = 0;
			let _group: ITransactionGroup | null | undefined = null;
			for (const trans of transaction) {
				if (trans.money) {
					if (Math.abs(toMoney - trans.money) <= 1) {
						if (predict[trans.group!.name]) {
							predict[trans.group!.name]++;
						} else {
							predict[trans.group!.name] = 1;
						}
						if (predict[trans.group!.name] > _max) {
							_max = predict[trans.group!.name];
							_group = trans.group;
						}
					}
				}
			}
			if (_group && predict[_group!.name] >= 3) {
				setChosenGroup(_group);
			}
		}
	};

	const resetState = () => {
		setMoney("");
		setChosenDate(new Date());
		setDescription("");
		setChosenGroup(null);
		setChosenWallet(wallets[0]);
		setImages([]);
	};
	const createNewTransaction = () => {
		const toMoney = parseInt(money);
		if (image.length > 0 || (chosenGroup && toMoney >= 0)) {
			const newTransaction: ITransaction = {
				date: chosenDate,
				description: description,
				wallet: chosenWallet.name,
				money: toMoney,
				group: chosenGroup,
				images: image,
			};

			transaction.push(newTransaction);
			if (chosenGroup)
				for (const wallet of wallets) {
					if (wallet.name === chosenWallet.name) {
						if (chosenGroup.type === "EARN") {
							wallet.moneyIn += toMoney;
						} else {
							wallet.moneyOut += toMoney;
						}
						break;
					}
				}
			resetState();
			navigation.reset({
				index: 0,
				routes: [{ name: "Chi tiết giao dịch" }],
			});
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
			<ScrollView style={[styles.container]}>
				<TouchableOpacity
					onPress={() => {
						resetState();
						navigation.goBack();
					}}
					style={{ flex: 0 }}
				>

					<TitleHeader title={"Chỉnh sửa giao dịch"} />
				</TouchableOpacity>
				{/* Chụp ảnh */}
				<BillImage
					navigation={navigation}
					image={image}
					setImages={setImages}
				/>
				{/* Form input */}
				<View style={[styles.form]}>
					<TextInput
						style={[styles.input]}
						placeholder="0đ"
						onChangeText={(value) => setMoney(removeComma(value))}
						value={getFormattedMoney(money)}
						keyboardType="numeric"
						placeholderTextColor="white"
						onBlur={predictGroup}
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
							<ChosenGroupView chosenGroup={chosenGroup} />
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

					{/* Chọn ngày tháng */}
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
						action={createNewTransaction}
					/>
					<LinearGradButton
						color={Variable.BUTTON_CANCEL}
						text={"HỦY"}
						action={() => {
							resetState();
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
	title: {
		marginHorizontal: 16,
		flexDirection: "row",
		alignItems: "center",
	},
	titleText: {
		color: "white",
		fontSize: Variable.FONT_SIZE_LARGE,
		fontWeight: "bold",
	},
	form: {
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		borderRadius: Variable.BORDER_RADIUS_MEDIUM,
		paddingVertical: 8,
		marginTop: 16,
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
