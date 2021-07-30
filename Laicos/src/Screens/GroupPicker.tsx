import React, { useEffect, useMemo, useState } from "react";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { EarningGroup } from "../Components/EarningGroup";
import { SpendingGroup } from "../Components/SpendingGroup";
import { Variable } from "../styles/theme.style";
import { LogBox } from "react-native";
import ScrollableTabView, {
	DefaultTabBar,
	ScrollableTabBar,
} from "react-native-scrollable-tab-view";
LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

export const GroupPicker = ({ route, navigation }) => {
	const { chosenGroup, setChosenGroup } = route.params;
	return (
		<View style={[styles.container]}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={{ flex: 0 }}
			>
				<View style={[styles.title]}>
					<Image
						source={require("../Assets/Images/Icons/ic_back.png")}
						style={{ marginTop: 10, marginRight: 10 }}
					></Image>
					<Text style={[styles.titleText]}>Chọn nhóm</Text>
				</View>
			</TouchableOpacity>

			<ScrollableTabView
				tabBarPosition="top"
				tabBarInactiveTextColor="white"
				tabBarUnderlineStyle={{
					backgroundColor: Variable.GREEN_LIGHT_COLOR,
					elevation: 20,
				}}
				tabBarActiveTextColor={Variable.GREEN_LIGHT_COLOR}
				tabBarTextStyle={{ fontSize: 16 }}
				initialPage={1}
				renderTabBar={() => <DefaultTabBar />}
			>
				<View
					style={{ flex: 1, backgroundColor: "#ff4081" }}
					tabLabel="Khoản vay"
				/>
				<SpendingGroup
					tabLabel="Khoản chi"
					navigation={navigation}
					setChosenGroup={setChosenGroup}
					chosenGroup={chosenGroup}
				/>
				<EarningGroup
					tabLabel="Khoản thu"
					navigation={navigation}
					setChosenGroup={setChosenGroup}
					chosenGroup={chosenGroup}
				/>
			</ScrollableTabView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		marginTop: 16,
		marginHorizontal: 16,
		flexDirection: "row",
		alignContent: "flex-start",
	},
	titleText: {
		color: "white",
		fontSize: Variable.FONT_SIZE_LARGE,
		fontWeight: "bold",
	},
});
