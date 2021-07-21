import React, { useEffect, useMemo, useState } from "react";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
	SceneMap,
	SceneRendererProps,
	TabBar,
	TabView,
} from "react-native-tab-view";
import { EarningGroup } from "../Components/EarningGroup";
import { SpendingGroup } from "../Components/SpendingGroup";
import { Variable } from "../styles/theme.style";
const renderTabBar = (props: any) => (
	<TabBar
		{...props}
		indicatorStyle={{ backgroundColor: Variable.GREEN_LIGHT_COLOR }}
		style={{ backgroundColor: Variable.BACKGROUND_COLOR }}
		renderLabel={({ route, focused }) =>
			focused ? (
				<Text style={{ color: Variable.GREEN_LIGHT_COLOR }}>
					{route.title}
				</Text>
			) : (
				<Text style={{ color: "white" }}>{route.title}</Text>
			)
		}
	/>
);

export const GroupPicker = ({ route, navigation }) => {
	const { chosenGroup, setChosenGroup } = route.params;

	const [index, setIndex] = useState(1);
	const screenWidth = Dimensions.get("window").width;

	const [routes] = useState([
		{ key: "loan", title: "Khoản vay" },
		{ key: "spend", title: "Khoản chi" },
		{ key: "earn", title: "Khoản thu" },
	]);

	const renderScene = ({ route }) => {
		switch (route.key) {
			case "loan":
				return <View style={{ flex: 1, backgroundColor: "#ff4081" }} />;
			case "spend":
				return (
					<SpendingGroup
						navigation={navigation}
						setChosenGroup={setChosenGroup}
						chosenGroup={chosenGroup}
					/>
				);
			case "earn":
				return <EarningGroup navigation={navigation} />;
			default:
				return null;
		}
	};

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
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: screenWidth }}
				style={{ backgroundColor: "black" }}
				renderTabBar={renderTabBar}
			/>
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
