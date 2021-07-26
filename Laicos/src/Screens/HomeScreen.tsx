import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MonthlyHistory } from "../Components/MonthlyHistory";
import { WalletList } from "../Components/WalletList";
import { globalStyles, Variable } from "../styles/theme.style";
import {  TouchableRipple } from "react-native-paper";
const HomeScreen = () => {
	const [hideMoney, setHideMoney] = useState(false);

	return (
		<View style={styles.container}>
			<View style={{ padding: 16 }}>
				<TouchableRipple
					onPress={() => setHideMoney(!hideMoney)}
					style={{ width: "50%" }}
					rippleColor="rgba(255, 255, 255, .32)"
				>
					<View style={{flex:0, flexDirection:'row', alignItems:"center" }}>
						<Text
							style={[
								globalStyles.fontSizeMedium,
								globalStyles.whiteText,
								{paddingRight:12}
							]}
						>
							Tổng tiền
						</Text>
						<Image
							source={!hideMoney? require("../Assets/Images/Icons/ic_view.png") : require("../Assets/Images/Icons/ic_hide.png")}
							style={{ width: 24, height: 24 }}
						></Image>
					</View>
				</TouchableRipple>
				{!hideMoney? 	<Text
					style={[
						styles.whiteText,
						globalStyles.fontSizeMedium,
						globalStyles.fontBold,
					]}
				>
					12,000,000
				</Text>:null}
			
			</View>

			<WalletList />
			<MonthlyHistory />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		color: "#fff",
		flex: 1,
	},
	whiteText: {
		color: "#fff",
	},
});
export default HomeScreen;
