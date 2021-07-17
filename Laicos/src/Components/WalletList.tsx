import React, { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { IWallet } from "../type";
import { WalletItem } from "./WalletItem";
import PagerView from "react-native-pager-view";
import { globalStyles, Variable } from "../styles/theme.style";
import Carousel, { Pagination, ParallaxImage } from "react-native-snap-carousel";

const { width: screenWidth } = Dimensions.get("window");
const data: IWallet[] = [
	{
		name: "BAMEBANK",
		moneyIn: 600000,
		moneyOut: 500000,
	},
	{
		name: "NGUOIYEUBANK",
		moneyIn: 750000,
		moneyOut: 100000,
	},
	{
		name: "BODUONGBANK",
		moneyIn: 100000000,
		moneyOut: 5000000,
	},
];
const PaginationComponent = ({wallets, active}) => {
    return (
        <Pagination
            dotsLength={wallets.length}
            activeDotIndex={active}
            containerStyle={{ backgroundColor: Variable.BACKGROUND_COLOR}}
            dotStyle={{
                width: 5,
                height: 5,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: Variable.GREEN_LIGHT_COLOR,
            }}
            inactiveDotStyle={
                {
                    // Define styles for inactive dots here
                }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
        />
    );
};
export const WalletList = () => {
	const [wallets, setWallet] = useState<IWallet[]>([]);
    const [active, setActive] = useState(0)
	useEffect(() => {
		return setWallet(data);
	}, []);
	const carouselRef = useRef(null);


	const _renderItem = ({ item, index }) => {
		return (
			<View style={styles.item}>
				<WalletItem wallet={item} />
			</View>
		);
	};


	return (
		<View style={{ flex: 1 }}>
            <View>
            <Carousel
				layout="default"
				ref={carouselRef}
				sliderWidth={screenWidth}
				sliderHeight={100}
				itemWidth={screenWidth - 60}
				data={wallets}
				renderItem={_renderItem}
                onSnapToItem={(index)=>setActive(index)}
			/>
            <PaginationComponent 
                wallets={wallets}
                active={active}
            />
            </View>
			
		</View>
	);
};
const styles = StyleSheet.create({
	pagerView: {
		flex: 1,
	},
	item: {
		width: screenWidth - 60,
		
	},
});
