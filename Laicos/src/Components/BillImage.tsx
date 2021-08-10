import React, {useEffect} from "react";
import {Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {Variable} from "../styles/theme.style";
import {SvgXml} from "react-native-svg";
import {cameraIcon} from "../Assets/Images/SvgIcon/CameraIcon";
import {ReviewImage} from "../Screens/ReviewImage";
import {IImage} from "../type";
import {penIcon} from "../Assets/Images/SvgIcon/PenIcon";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

// @ts-ignore
const months: Date[] = (): Date[] => {
	const d: Date[] = [new Date()];
	d[0].setMonth(d[0].getMonth() + 1);

	const numberOfMonths = 4;

	for (let i = 1; i <= numberOfMonths; i++) {
		const tempDate = new Date();
		tempDate.setMonth(d[0].getMonth() - i);
		d.push(tempDate);
	}
	d.reverse();
	return d;
};

export const BillImage = ({navigation, image, setImages}) => {
	useEffect(() => {
		setImages([...image]);
	}, []);
	return (
		<View style={styles.pagerView}>
			<View style={styles.row}>
				<View style={[styles.item]}>
					<TouchableOpacity
						style={styles.imageIcon}
						onPress={() =>
							navigation.navigate("Camera", {didCaptureImg: didCaptureImg})
						}
					>
						<SvgXml xml={cameraIcon} width={60} height={60}/>
					</TouchableOpacity>
				</View>
				<View style={[styles.item]}>
					<TouchableOpacity
						style={{flex: 1}}
						onPress={() => {
							const images = image as IImage[];
							if (images.length >= 1) {
								navigation.navigate("ReviewImage", {
									imageData: images[0],
									images: images,
									setImages: setImages,
									refresh: refresh,
								});
							}
						}}
					>
						{renderImage(0)}
					</TouchableOpacity>
				</View>
				<View style={[styles.item]}>
					<TouchableOpacity
						style={{flex: 1}}
						onPress={() => {
							const images = image as IImage[];
							if (images.length == 2) {
								navigation.navigate("ReviewImage", {
									imageData: images[1],
									images: images,
									setImages: setImages,
									refresh: refresh,
								});
							}
							if (images.length > 2) {
								navigation.navigate("ImageGallery", {
									images: images,
									setImages: setImages,
								});
							}
						}}
					>
						{renderImage(1)}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	function refresh() {
	}

	function renderImage(position: number) {
		const images = image as IImage[];
		if (images[position] != null) {
			return (
				<View style={styles.thumbnail}>
					<Image
						style={styles.thumbnail}
						blurRadius={position == 1 && 2 < images.length ? 5 : 0}
						source={{
							uri: images[position].image,
						}}
					/>
					{position == 1 && 2 < images.length && (
						<Text style={styles.headline}>+{images.length - 2}</Text>
					)}
					<View style={styles.imageTitle}>
						<TextInput
							style={[styles.input]}
							placeholderTextColor="white"
							onChangeText={(text) => {
								images[position].title = text;
							}}
						>
							{images[position].title}
						</TextInput>
						<SvgXml xml={penIcon} width={20} height={50}/>
					</View>
				</View>
			);
		}
		return <View/>;
	}

	function didCaptureImg(uri: string) {
		const copyImage = image as IImage[];
		console.log("Iu Khoa: " + uri);
		const newImg: IImage = {image: uri, title: ""};
		copyImage.push(newImg);
		setImages([...copyImage]);
	}
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "black",
	},
	headline: {
		fontWeight: "bold",
		fontSize: 32,
		padding: 10,
		alignContent: "center",
		alignSelf: "center",
		color: "white",
	},
	thumbnail: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "flex-end",
		borderRadius: Variable.BORDER_RADIUS_MEDIUM,
	},
	imageIcon: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	row: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	pagerView: {
		// marginLeft: -screenWidth / 2,a
		flex: 2,
		marginTop: 16,
	},
	item: {
		flex: 1,
		aspectRatio: 0.8,
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		borderRadius: Variable.BORDER_RADIUS_MEDIUM,
		margin: 6,
		marginBottom: 6,
	},
	button: {
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		marginHorizontal: 16,
	},
	buttonText: {
		textAlign: "center",
		paddingVertical: 10,
		borderRadius: Variable.BORDER_RADIUS_MEDIUM,
		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
	},
	imageTitle: {
		flexDirection: "row",
		alignContent: "stretch",
		marginLeft: 16,
		marginRight: 4,
		marginBottom: -4,
	},
	input: {
		flex: 1,
		textShadowRadius: 10,
		textShadowColor: "black",
		// backgroundColor: "red",
		textAlign: "right",
		borderColor: "white",
		color: "white",
		fontSize: Variable.FONT_SIZE_SMALL,
	},
});
