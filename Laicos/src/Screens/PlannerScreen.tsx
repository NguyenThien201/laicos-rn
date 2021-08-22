import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	KeyboardAvoidingView,
	Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles, Variable } from "../styles/theme.style";
const PlannerScreen = ({}) => {
	const navigation = useNavigation();
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
			<ScrollView
				style={[styles.container]}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<Text style={globalStyles.title}>Kế hoạch</Text>

				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Detail Planner");
					}}
					style={{ flex: 0 }}
				>
					<View style={[styles.item]}>
						<View style={{width: "90%"}}>
							<Text style={[styles.itemTitle]}>Ngân sách</Text>

							<Text style={[styles.itemHelperText]}>
								Một kế hoạch tài chính giúp bạn cân bằng được
								khoản thu và khoản chi của mình
							</Text>
						</View>
						<Image
							source={require("../Assets/Images/Icons/ic_arrow_right.png")}
						></Image>
					</View>
				</TouchableOpacity>

				<TouchableOpacity>
					<View style={[styles.item]}>
						<View style={{width: "90%"}}>
							<Text style={[styles.itemTitle]}>Sự kiện</Text>

							<Text style={[styles.itemHelperText]}>
								Tạo một sự kiện trong ứng dụng để hteo dõi việc
								chi tiêu trong một sự kiện có thực nào đó, ví dụ
								như đi du lịch cuối tuần
							</Text>
						</View>
						<Image
							source={require("../Assets/Images/Icons/ic_arrow_right.png")}
						></Image>
					</View>
				</TouchableOpacity>

				<TouchableOpacity>
					<View style={[styles.item]}>
						<View style={{width: "90%"}}>
							<Text style={[styles.itemTitle]}>
								Giao dịch định kì
							</Text>

							<Text style={[styles.itemHelperText]}>
								Tạo ra định kỳ các giao dịch sẽ được tự động
								thêm vào tương lai
							</Text>
						</View>
						<Image
							source={require("../Assets/Images/Icons/ic_arrow_right.png")}
						></Image>
					</View>
				</TouchableOpacity>

				<TouchableOpacity>
					<View style={[styles.item]}>
						<View style={{width: "90%"}}>
							<Text style={[styles.itemTitle]}>Hóa đơn</Text>

							<Text style={[styles.itemHelperText]}>
								Theo dõi hóa đơn như điện, nước, thuê bao, hóa đơn Internet...
							</Text>
						</View>
						<Image
							source={require("../Assets/Images/Icons/ic_arrow_right.png")}
						></Image>
					</View>
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 16,
		marginHorizontal: 15,
	},
	text: {
		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
		fontWeight: "bold",
	},
	item: {
		marginTop: 24,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",	
		justifyContent: "space-between",
		

	},
	itemTitle: {
		color: Variable.GREEN_LIGHT_COLOR,
		fontSize: Variable.FONT_SIZE_MEDIUM,
		fontWeight: "bold"
	},
	itemHelperText: {
		color: "white",
		textAlign: "justify"
	},
});
export default PlannerScreen;
