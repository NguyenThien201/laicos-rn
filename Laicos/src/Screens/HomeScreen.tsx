import React, { useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableOpacityBase,
	View,
} from "react-native";
import { MonthlyHistory } from "../Components/MonthlyHistory";
import { WalletList } from "../Components/WalletList";
import { globalStyles, Variable } from "../styles/theme.style";
import { TouchableRipple } from "react-native-paper";
const HomeScreen = ({ navigation }) => {
	const [hideMoney, setHideMoney] = useState(false);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View>
					<TouchableOpacity
						onPress={() => setHideMoney(!hideMoney)}
						style={{}}
					>
						<View
							style={{
								flex: 0,
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Text
								style={[
									globalStyles.fontSizeMedium,
									globalStyles.whiteText,
									{ paddingRight: 12 },
								]}
							>
								Tổng tiền
							</Text>
							<Image
								source={
									!hideMoney
										? require("../Assets/Images/Icons/ic_view.png")
										: require("../Assets/Images/Icons/ic_hide.png")
								}
								style={{ width: 24, height: 24 }}
							></Image>
						</View>
					</TouchableOpacity>
					{!hideMoney ? (
						<Text
							style={[
								styles.whiteText,
								globalStyles.fontSizeMedium,
								globalStyles.fontBold,
							]}
						>
							24,000,000
						</Text>
					) : 				<Text
					style={[
						styles.whiteText,
						globalStyles.fontSizeMedium,
						globalStyles.fontBold,
					]}
				>
					*****
				</Text>}
				</View>

				<TouchableOpacity onPress={()=>navigation.navigate('Thông báo')}>
					<Image
						source={require("../Assets/Images/Icons/ic_notification.png")}
						style={{ width: 24, height: 24 }}
					></Image>
				</TouchableOpacity>
			</View>

			<WalletList />
			<MonthlyHistory navigation={navigation} />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		color: "#fff",
		flex:1,
	},
	whiteText: {
		color: "#fff",
	},
	header:{
		display: "flex",
		justifyContent: "space-between",
		padding: 16,
		flexDirection:"row",
		alignItems: "center"
	}
});
export default HomeScreen;
