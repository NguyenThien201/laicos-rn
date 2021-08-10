import React, {useEffect, useRef, useState} from "react";
import {
	BackHandler,
	Dimensions,
	FlatList,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {Variable} from "../styles/theme.style";
import {TitleHeader} from "./Title";

import {formatter, toCommas} from "../Utils/format";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

export const CalculatorScreen = ({navigation, route}) => {
	const {money, setMoney} = route.params;
	const currentStr = useRef("");
	const currentInt = useRef<number>(0.0);
	const total = useRef<number>(Number(money));
	const currentOpt = useRef<string>("");
	const [isFetching, setIsFetching] = useState(false);
	const [optList, setOptList] = useState<string[]>((money == "0" ? [] : [money]));
	const evalString = useRef<string>((money == "0" ? "" : money));
	const [current, setCurrent] = useState("");

	useEffect(() => {
		const backAction = () => {
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
		console.log(money)
		return;
	}, []);

	const getFormattedMoney = (value: string) => {
		return formatter(parseInt(removeComma(value)));
	};

	const removeComma = (value: string) => {
		const re = new RegExp(",", "g");
		return value.replace(re, "");
	};

	const onOperation = (opt: string) => {
		if (optList.length == 0 && ["+", "-"].includes(currentStr.current)) {
			currentOpt.current = opt;
			currentStr.current = opt;
		}
		if (currentStr.current.length == 0 || ["+", "-", "*", "/"].includes(currentStr.current)) {
			currentOpt.current = opt;
			currentStr.current = opt;

		} else {
			onEqualsPress(opt)
		}

		setIsFetching(true);
		updateRes();
	};


	const onEqualsPress = (opt: string) => {
		if (currentStr.current.length == 0 && currentOpt.current.length == 0) {
			setMoney(total.current.toString())
			navigation.goBack()
		}
		if (currentStr.current.length == 0) {
			return
		}

		total.current = currentInt.current
		var list = optList
		list.push(currentStr.current.toString())

		console.log("." + currentStr.current + ".")
		// evalString.current += currentStr.current
		var res = eval(evalString.current + currentStr.current)
		console.log("-" + total.current.toString() + currentStr.current + ".")
		total.current = Number(res)
		evalString.current = res
		// evalString.current += " " + opt
		if (opt != "=") {
			currentOpt.current = opt;
			currentStr.current = opt;
		} else {
			currentOpt.current = ""
			currentStr.current = ""
		}
		setIsFetching(true);
		updateRes();

	};

	const onClearPress = () => {
		setOptList([])
		total.current = 0
		currentOpt.current = ""
		currentStr.current = ""
		currentInt.current = 0
		updateRes()
	};

	const onBackspacePress = () => {
		currentStr.current = currentStr.current.slice(0, -1);
		updateRes();
	};

	const addNumber = (num: string) => {
		if (currentOpt.current == "/" && currentStr.current.length >= 1 && (num == "0" || num == "000")) {
			return
		}
		if (currentStr.current.includes(".")) {
			if (num == ".") {
				return;
			}
			// 2 số sau dấu .
			var afterDash = currentStr.current.split(".").pop();
			if (afterDash != null && afterDash.length >= 2) {
				return;
			}
		}
		if (currentOpt.current == "" || currentStr.current == "") {
			currentOpt.current = "+"
			currentStr.current = "+" + num;
		} else {
			currentStr.current = currentStr.current + num;
		}


		updateRes();
	};

	const replaceNumber = (num: string) => {
		currentStr.current = currentOpt.current + num;
		updateRes();
	};

	function updateSuggestion() {
		formatter(Number(currentStr.current));
	}

	function updateRes() {
		var displayString = "";
		//fucking stupid ts
		if (["+", "-", "*", "/"].includes(currentStr.current)) {
			displayString += currentStr.current;
		} else if (["*", "/"].includes(currentStr.current[0])) {
			currentInt.current = Number(currentStr.current.substring(1, currentStr.current.length));
			displayString += currentStr.current[0]
			// currentStr.current.substring(1,currentStr.current.length))
			displayString += toCommas(currentInt.current)
			if (currentStr.current.endsWith(".")) {
				displayString += ".";
			}
		} else {
			currentInt.current = Number(currentStr.current);
			displayString += toCommas(currentInt.current);
			if (currentStr.current.endsWith(".")) {
				displayString += ".";
			}
		}
		setCurrent(displayString);
	}

	function renderPortrait() {
		return (
			<View style={keyboardStyles.calculatorContainer}>
				{/* Danh sách các phép tính */}
				<FlatList
					inverted
					contentContainerStyle={{flexDirection: 'column-reverse'}}
					data={optList}
					refreshing={isFetching}
					renderItem={({item}) =>
						item.startsWith("+") || Number(item) > 0 ? (
							<Text style={resultStyles.add}> +{toCommas(Number(item))} </Text>
						) : item.startsWith("-") ? (
							<Text style={resultStyles.sub}> {toCommas(Number(item))} </Text>
						) : (
							<Text style={resultStyles.nor}> {item} </Text>
						)
					}
					keyExtractor={(item, index) => index.toString()}
				/>
				{/* Số đang nhập */}
				{currentStr.current.startsWith("+") ? (
					currentStr.current == "+" ? (
						<Text style={resultStyles.add}> {current} </Text>
					) : (
						<Text style={resultStyles.add}> +{current} </Text>
					)
				) : currentStr.current.startsWith("-") ? (
					<Text style={resultStyles.sub}> {current} </Text>
				) : (
					<Text style={resultStyles.nor}> {(current == "0" ? "" : current)} </Text>
				)}
				{/*<Text style={resultStyles.nor}> {current} </Text>*/}
				<View style={resultStyles.separateLine}></View>
				{/* Tổng */}
				<Text style={resultStyles.numberText}>VND {toCommas(Number(total.current.toFixed(2)))}</Text>
				<View
					style={{
						flexDirection: "column",
						backgroundColor: "#212230",
						height: screenHeight / 2,
					}}
				>
					{/* Gợi ý */}
					<View style={suggestStyles.container}>
						{/*Trăm Triệu*/}
						<TouchableOpacity style={suggestStyles.box} onPress={() =>
							replaceNumber(
								Math.abs(currentInt.current * 100).toFixed().toString()
							)
						}>
							{currentInt.current.toString().length < 8 &&
							currentInt.current != 0 &&
							!Number.isNaN(currentInt.current) && (
								<Text
									style={suggestStyles.numberText}
									numberOfLines={1}
									ellipsizeMode="tail"

								>
									{toCommas(Number(Math.abs(currentInt.current * 100).toFixed()))}
								</Text>
							)}
						</TouchableOpacity>
						{/*Chục Triệu*/}
						<TouchableOpacity style={suggestStyles.box} onPress={() =>
							replaceNumber(Math.abs(currentInt.current * 1000).toFixed())
						}>
							{currentInt.current.toString().length < 7 &&
							currentInt.current != 0 &&
							!Number.isNaN(currentInt.current) && (
								<Text
									style={suggestStyles.numberText}
									numberOfLines={1}
									ellipsizeMode="tail"

								>
									{toCommas(Number(Math.abs(currentInt.current * 1000).toFixed()))}
								</Text>
							)}
						</TouchableOpacity>
						{/*Triệu*/}
						<TouchableOpacity style={suggestStyles.box} onPress={() =>
							replaceNumber(Math.abs(currentInt.current * 10000).toFixed())
						}>
							{currentInt.current.toString().length < 6 &&
							currentInt.current != 0 &&
							!Number.isNaN(currentInt.current) && (
								<Text
									style={suggestStyles.numberText}
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{toCommas(Number(Math.abs(currentInt.current * 10000).toFixed()))}
								</Text>
							)}
						</TouchableOpacity>
					</View>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							flex: 1,
						}}
					>
						<TouchableOpacity style={keyboardStyles.actionButton} onPress={() => onClearPress()}>
							<Text style={keyboardStyles.actionText}>C</Text>
						</TouchableOpacity>
						<TouchableOpacity style={keyboardStyles.actionButton} onPress={() => onOperation("/")}>
							<Text style={keyboardStyles.actionText}>÷</Text>
						</TouchableOpacity>
						<TouchableOpacity style={keyboardStyles.actionButton} onPress={() => onOperation("*")}>
							<Text style={keyboardStyles.actionText}>x</Text>
						</TouchableOpacity>
						<TouchableOpacity style={keyboardStyles.actionButtonLastCol} onPress={() => onBackspacePress()}>
							<Text
								style={keyboardStyles.actionText}

							>
								⌫
							</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							flex: 1,
						}}
					>
						<TouchableOpacity
							style={keyboardStyles.actionButton}
							onPress={() => addNumber("7")}
						>
							<Text style={keyboardStyles.numberText}>7</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={keyboardStyles.actionButton}
							onPress={() => addNumber("8")}
						>
							<Text style={keyboardStyles.numberText}>8</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={keyboardStyles.actionButton}
							onPress={() => addNumber("9")}
						>
							<Text style={keyboardStyles.numberText}>9</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={keyboardStyles.actionButtonLastCol}
							onPress={() => onOperation("-")}
						>
							<Text style={keyboardStyles.actionText}>-</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							flex: 1,
						}}
					>
						<TouchableOpacity
							style={keyboardStyles.actionButton}
							onPress={() => addNumber("4")}
						>
							<Text style={keyboardStyles.numberText}>4</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={keyboardStyles.actionButton}
							onPress={() => addNumber("5")}
						>
							<Text style={keyboardStyles.numberText}>5</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={keyboardStyles.actionButton}
							onPress={() => addNumber("6")}
						>
							<Text style={keyboardStyles.numberText}>6</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={keyboardStyles.actionButtonLastCol}
							onPress={() => onOperation("+")}
						>
							<Text style={keyboardStyles.actionText}>+</Text>
						</TouchableOpacity>
					</View>

					<View style={{flexDirection: "row", flex: 2}}>
						<View style={{flexDirection: "column", flex: 3}}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									flex: 1,
								}}
							>
								<TouchableOpacity
									style={keyboardStyles.actionButton}
									onPress={() => addNumber("1")}
								>
									<Text style={keyboardStyles.numberText}>1</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={keyboardStyles.actionButton}
									onPress={() => addNumber("2")}
								>
									<Text style={keyboardStyles.numberText}>2</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={keyboardStyles.actionButton}
									onPress={() => addNumber("3")}
								>
									<Text style={keyboardStyles.numberText}>3</Text>
								</TouchableOpacity>

							</View>

							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									flex: 1,
								}}
							>
								<TouchableOpacity
									style={keyboardStyles.actionButton}
									onPress={() => addNumber("0")}
								>
									<Text style={keyboardStyles.numberText}>0</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={keyboardStyles.actionButton}
									onPress={() => addNumber("000")}
								>
									<Text style={keyboardStyles.numberText}>000</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={keyboardStyles.actionButton}
									onPress={() => addNumber(".")}
								>
									<Text style={keyboardStyles.numberText}>,</Text>
								</TouchableOpacity>
							</View>
						</View>
						<TouchableOpacity style={keyboardStyles.equalBtn} onPress={() => onEqualsPress("=")}>
							<Text style={keyboardStyles.equalText}>=</Text>
						</TouchableOpacity>
						{/*<View style={{flex: 1}}></View>*/}
					</View>
				</View>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView style={{flex: 1}} behavior="height">
			{/*<ScrollView style={[styles.container]}>*/}
			<TouchableOpacity
				onPress={() => {
					navigation.goBack();
				}}
				style={keyboardStyles.title}
			>
				<TitleHeader title={"Nhập số tiền"}/>
			</TouchableOpacity>
			{/*</ScrollView>*/}
			{renderPortrait()}
		</KeyboardAvoidingView>
	);
};

const keyboardStyles = StyleSheet.create({
	container: {
		backgroundColor: "blue",
		flex: 1,
		marginVertical: 16,
		marginHorizontal: 16,
	},
	calculatorContainer: {
		flexDirection: "column",
		backgroundColor: "#151321",
		flex: 1,
		justifyContent: "flex-end",
		marginTop: 16,
		// marginHorizontal: 16
	},
	title: {
		flex: 0,
		margin: 16,
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
	actionButton: {
		flex: 1,
		width: screenWidth / 4,
		// aspectRatio: 1.4,
		alignItems: "center",
		// backgroundColor: "red",
		justifyContent: "center",
		// margin: 5,
	},
	actionText: {
		// backgroundColor:"red",
		color: "#3CD3AD",
		fontWeight: "bold",
		fontSize: 30,
	},
	numberText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 30,
	},
	equalText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 60,
	},
	actionButtonLastCol: {
		flex: 1.2,
		// aspectRatio: 1.4,
		alignItems: "center",
		// backgroundColor: "red",
		justifyContent: "center",
	},
	equalBtn: {
		flex: 1.2,
		// aspectRatio: 1,
		alignItems: "center",
		backgroundColor: "#3CD3AD",
		justifyContent: "center",
	},
});

const suggestStyles = StyleSheet.create({
	container: {
		backgroundColor: "#151321",
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 0.8,
	},
	box: {
		flex: 1,
		// aspectRatio: 2.6,
		margin: 8,
		alignItems: "center",
		backgroundColor: "#C4C4C4",
		justifyContent: "center",
		borderRadius: 4,
	},
	numberText: {
		color: "#151321",
		overflow: "hidden",
		fontWeight: "bold",
		fontSize: 20,
	},
});

const resultStyles = StyleSheet.create({
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
	add: {
		fontWeight: "900",
		marginVertical: 12,
		marginRight: 12,
		textAlign: "right",
		fontSize: 26,
		color: "#4DD97C",
	},
	sub: {
		fontWeight: "900",
		marginVertical: 12,
		marginRight: 12,
		textAlign: "right",
		fontSize: 26,
		color: "#D83B57",
	},
	nor: {
		fontWeight: "900",
		marginVertical: 12,
		marginRight: 12,
		textAlign: "right",
		fontSize: 26,
		color: "white",
	},
	container: {
		backgroundColor: "#151321",
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 0.8,
	},
	separateLine: {
		height: 1,
		backgroundColor: "white",
		margin: 8,
	},
	box: {
		flex: 1,
		// aspectRatio: 2.6,
		margin: 8,
		alignItems: "center",
		backgroundColor: "#C4C4C4",
		justifyContent: "center",
		borderRadius: 4,
	},
	numberText: {
		color: "white",
		margin: 6,
		marginRight: 12,
		textAlign: "right",
		overflow: "hidden",
		fontWeight: "bold",
		fontSize: 32,
	},
	resultText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 35,
	},
});
