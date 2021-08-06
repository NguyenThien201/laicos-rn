import React, { FC, useEffect, useMemo, useState } from "react";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { Variable } from "../styles/theme.style";
import { LogBox } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { INotification, IWallet } from "../type";
import { notifications, wallets } from "../data";
import { formatter } from "../Utils/format";
import { LinearGradButton } from "../Components/LinearGradButton";
import { TitleHeader } from "./Title";
import moment from "moment";

LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

export const Notification = ({ route, navigation }) => {
	const [notificationData, setNotificationData] = useState<INotification[]>(
		[]
	);

	useEffect(() => {
		setNotificationData(notifications);
	}, []);

	const getNumOfDaysFromNow = (date: Date)=>{
		const now = moment()
		const days = now.diff(moment(date),'days')
		if (days > 30)
		{
			return moment(date).format('DD/MM/YYYY')
		}
		else{
			return `${days} ngày trước`
		}
	}
	const renderItem: FC<{ item: INotification }> = ({ item }) => {
		return (
			<View style={styles.notificationItemView}>
				<View>
					<Image
						source={require("../Assets/Images/Icons/ic_notification.png")}
						style= {{width:24,height:24, marginRight: 8}}
					></Image>
				</View>
				<View>
					<Text style={styles.content}>{item.content}</Text>
					<Text style={styles.date}>{getNumOfDaysFromNow(item.date)}</Text>
				</View>
			</View>
		);
	};
	return (
		<View style={[styles.container]}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={{ flex: 0, marginBottom: 24 }}
			>
				<TitleHeader title="Thông báo" />
			</TouchableOpacity>
			<FlatList
				data={notificationData}
				renderItem={renderItem}
				keyExtractor={(item) => item.name}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 16,
		marginHorizontal: 16,
	},
	notificationItemView: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		alignItems:"flex-start",
		paddingVertical: 12,
		paddingHorizontal: 18,
		margin: 4,
		marginBottom: 12,
		borderRadius: 5
	},
	content:{
		color: 'white',
		fontSize: Variable.FONT_SIZE_SMALL
	},
	date:{
		color: "#929292",
		fontSize: 12
	}
});
