import React, { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { ITransaction, IWallet } from "../type";
import { globalStyles, Variable } from "../styles/theme.style";
import Carousel, {
	Pagination,
	ParallaxImage,
} from "react-native-snap-carousel";
import { transaction as data } from "../data";
import LinearGradient from "react-native-linear-gradient";
import { TransactionList } from "./TransactionList";
import { PaginationComponent } from "./PaginationCarousel";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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

export const MonthlyHistory = ({ navigation }) => {
	const [monthsData, setMonthsData] = useState<Date[]>([]);
	const [active, setActive] = useState(0);
	useEffect(() => {
		return setMonthsData(months);
	}, []);
	const carouselRef = useRef(null);
	navigation.addListener('focus', payload=>{
		return setMonthsData(months);
	})
	const _renderItem = ({ item, index }) => {
		return (
			<View style={[styles.item]}>
				<View
					style={{
						flex: 1,
						alignContent: "center",
						paddingHorizontal: 60,
					}}
				>
					<Text style={[globalStyles.whiteText, styles.monthTitle]}>
						{item.getMonth()}/{item.getFullYear()}
					</Text>
				</View>
				<View style={{ flex: 2 }}>
					<TransactionList date={item}></TransactionList>
				</View>
				<View style={styles.button}>
					<TouchableOpacity
						style={{ flex: 1 }}
						onPress={() =>
							navigation.navigate("Lịch sử", { selectedDay: item })
						}
					>
						<LinearGradient
							start={{ x: 1, y: 1 }}
							end={{ x: 0.25, y: 0.25 }}
							colors={Variable.BUTTON_PRIMARY}
							style={{
								borderRadius: Variable.BORDER_RADIUS_SMALL,
							}}
						>
							<Text style={styles.buttonText}>Xem chi tiết</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	return (
		<View style={styles.pagerView}>
			<View>
				{monthsData.length > 0 ? (
					<Carousel
						layout="default"
						ref={carouselRef}
						sliderWidth={screenWidth}
						sliderHeight={25}
						itemWidth={screenWidth - 80}
						data={monthsData}
						renderItem={_renderItem}
						firstItem={
							monthsData.length > 0 ? monthsData.length - 1 : 0
						}
						onSnapToItem={(index) => setActive(index)}
						inactiveSlideOpacity={1}
						enableMomentum={true}
						enableSnap={true}
						decelerationRate="fast"
					/>
				) : null}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	pagerView: {
		marginTop: 0,
		flex:3,
	},
	item: {
		flex: 0,
		width: screenWidth - 80,
		height: "95%",
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		borderRadius: Variable.BORDER_RADIUS_MEDIUM,
		marginBottom: 6,
	},
	monthTitle: {
		textAlign: "center",
		marginTop: 16,
		backgroundColor: Variable.GREEN_LIGHT_COLOR,
		fontSize: Variable.FONT_SIZE_MEDIUM,
		paddingVertical: 8,
		paddingHorizontal: "30%",
		borderRadius: 5,
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
});
