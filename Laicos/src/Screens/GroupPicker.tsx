import React from "react";
import {LogBox, StyleSheet, TouchableOpacity, View,} from "react-native";

import {EarningGroup} from "../Components/EarningGroup";
import {SpendingGroup} from "../Components/SpendingGroup";
import {Variable} from "../styles/theme.style";
import ScrollableTabView, {DefaultTabBar,} from "react-native-scrollable-tab-view";
import {TitleHeader} from "./Title";

LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

export const GroupPicker = ({route, navigation}) => {
	const {chosenGroup, setChosenGroup} = route.params;
	return (
		<View style={[styles.container]}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={{flex: 0, marginHorizontal: 16,}}
			>
				<TitleHeader title={"Chọn nhóm"}/>
			</TouchableOpacity>

			<ScrollableTabView
				tabBarPosition="top"
				tabBarInactiveTextColor="white"
				tabBarUnderlineStyle={{
					backgroundColor: Variable.GREEN_LIGHT_COLOR,
					elevation: 20,
				}}
				tabBarActiveTextColor={Variable.GREEN_LIGHT_COLOR}
				tabBarTextStyle={{fontSize: Variable.FONT_SIZE_SMALL}}
				initialPage={1}
				renderTabBar={() => <DefaultTabBar/>}
			>
				<View
					style={{flex: 1, backgroundColor: "#ff4081"}}
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

		marginVertical: 16,

	},

});
