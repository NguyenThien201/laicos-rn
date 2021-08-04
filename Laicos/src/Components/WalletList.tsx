import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { IWallet } from "../type";
import { WalletItem } from "./WalletItem";
import Carousel from "react-native-snap-carousel";
import { PaginationComponent } from "./PaginationCarousel";

import { wallets as walletsData } from "../data";

const { width: screenWidth } = Dimensions.get("window");

export const WalletList = () => {
	const [wallets, setWallet] = useState<IWallet[]>([]);
	const [active, setActive] = useState(0);
	useEffect(() => {
		return setWallet(walletsData);
	}, []);
	const carouselRef = useRef(null);

	const _renderItem = ({ item, index }) => {
		return (
			<View style={{margin:4}}>
				<WalletItem wallet={item} />
			</View>
		);
	};

	return (
		<View style={styles.pagerView}>
			<Carousel
				layout="default"
				ref={carouselRef}
				sliderWidth={screenWidth}
				sliderHeight={80}
				itemWidth={screenWidth - 80}
				data={wallets}
				renderItem={_renderItem}
				onSnapToItem={(index) => setActive(index)}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	pagerView: {
		margin: 0,
		padding: 0,
		flexDirection: "column",
		alignContent: "flex-start",
		justifyContent: "flex-start",
		marginBottom: 26,
	},
	item: {
		width: screenWidth - 80,
	},
});
