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

export const MonthlyHistory = () => {
	const [monthsData, setMonthsData] = useState<Date[]>([]);
	const [active, setActive] = useState(0);
	useEffect(() => {
		return setMonthsData(months);
	}, []);
	const carouselRef = useRef(null);

	const _renderItem = ({ item, index }) => {
		return (
			<View
				style={[
					styles.item,
					index === active
						? { elevation: 12, shadowColor: Variable.GREEN_COLOR }
						: {},
				]}
			>
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
					<TouchableOpacity style={{ flex: 1 }}>
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
				<Carousel
					layout="default"
					ref={carouselRef}
					sliderWidth={screenWidth}
					sliderHeight={25}
					itemWidth={screenWidth - 80}
					data={monthsData}
					renderItem={_renderItem}
					firstItem={monthsData.length - 1}
					onSnapToItem={(index) => setActive(index)}
					inactiveSlideOpacity={1}
				/>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	pagerView: {
		flex: 2,
	},
	item: {
		flex:0,
		width: screenWidth - 80,
		height: 320,
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		borderRadius: Variable.BORDER_RADIUS_MEDIUM,
	},
	monthTitle: {
		textAlign: "center",
		marginTop: 16,
		backgroundColor: Variable.GREEN_LIGHT_COLOR,
		fontSize: Variable.FONT_SIZE_SMALL_16,
		paddingVertical: 8,
		paddingHorizontal: 60,
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
