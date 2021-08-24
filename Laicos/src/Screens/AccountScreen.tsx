import moment from "moment";
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
import { WalletSelectionComponent } from "../Components/WalletSelectionComponent";

import { globalStyles, Variable } from "../styles/theme.style";
import { formatter } from "../Utils/format";

export const Account = ({ route, navigation }) => {
	return (
		<ScrollView style={[styles.container]}>
			<View style={styles.information}>
				<Text style={styles.text}>Tài khoản</Text>
				<Text style={styles.name}>Uzumaki Naruto</Text>
				<Text style={styles.mail}>cuuvyholy@gmail.com</Text>
			</View>
			<View style={[styles.section, { padding: 24}]}>
				<Text style={styles.name}>Chào mừng bạn tới Laicos</Text>
				<Text style={styles.text}>
					Ứng dụng quản lý chi tiêu dành cho sinh viên
				</Text>

				<View style={{marginTop: 16}}>
					<WalletSelectionComponent />
				</View>
			</View>

			<View style={styles.section}>
				<View
					style={[
						globalStyles.rowDisplay,
						styles.sectionItem,
						
					]}
				>
					<Image
						source={require("../Assets/Images/Icons/ic_view.png")}
						style={{ width: 24, height: 24 }}
					/>

					<View style={{ marginLeft: 8 }}>
						<Text style={{ color: "white" }}>Số dư</Text>
						<Text style={{ color: "white" }}>4.0*****</Text>
					</View>
				</View>
				<TouchableOpacity
					style={[
						globalStyles.rowDisplay,
						styles.sectionItem,
					
					]}
				>
					<Image
						source={require("../Assets/Images/Icons/ic_credit_card.png")}
						style={{ width: 24, height: 24 }}
					/>

					<View style={{ marginLeft: 8 }}>
						<Text style={{ color: "white" }}>
							Liên kết thẻ/ví điện tử
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						globalStyles.rowDisplay,
						styles.sectionItem,
					
					]}
				>
					<Image
						source={require("../Assets/Images/Icons/ic_bills.png")}
						style={{ width: 24, height: 24 }}
					/>

					<View style={{ marginLeft: 8 }}>
						<Text style={{ color: "white" }}>
							Hoá đơn cần thanh toán
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						globalStyles.rowDisplay,
						styles.sectionItem,
						
					]}
				>
					<Image
						source={require("../Assets/Images/Icons/ic_helper.png")}
						style={{ width: 24, height: 24 }}
					/>

					<View style={{ marginLeft: 8 }}>
						<Text style={{ color: "white" }}>
							Trung tâm trợ giúp
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={[globalStyles.rowDisplay, styles.sectionItem]}>
					<Image
						source={require("../Assets/Images/Icons/ic_setting.png")}
						style={{ width: 24, height: 24 }}
					/>

					<View style={{ marginLeft: 8 }}>
						<Text style={{ color: "white" }}>Cài đặt chung</Text>
					</View>
				</TouchableOpacity>
			</View>

			<View style={styles.section}>
				<TouchableOpacity
					style={[
						globalStyles.rowDisplay,
						styles.sectionItem,
						
					]}
				>
					<Image
						source={require("../Assets/Images/Icons/ic_tax.png")}
						style={{ width: 24, height: 24 }}
					/>

					<View style={{ marginLeft: 8 }}>
						<Text style={{ color: "white" }}>
							Tính thuế thu nhập cá nhân
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						globalStyles.rowDisplay,
						styles.sectionItem,
						
					]}
				>
					<Image
						source={require("../Assets/Images/Icons/ic_loan_managemet.png")}
						style={{ width: 24, height: 24 }}
					/>

					<View style={{ marginLeft: 8 }}>
						<Text style={{ color: "white" }}>
							Quản lý khoản vay
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						globalStyles.rowDisplay,
						styles.sectionItem,
					
					]}
				>
					<Image
						source={require("../Assets/Images/Icons/ic_rate.png")}
						style={{ width: 24, height: 24 }}
					/>

					<View style={{ marginLeft: 8 }}>
						<Text style={{ color: "white" }}>
							Tính lãi suất
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 16,
	},
	information: {
	
		marginTop: 16,
		flex: 0,
	},
	name: {
		textAlign: "center",
		color: "white",
		fontSize: Variable.FONT_SIZE_MEDIUM,
	},
	mail: {
		textAlign: "center",
		color: "white",
		fontSize: Variable.FONT_SIZE_SMALL,
	},
	text: {
		textAlign: "center",
		color: "white",
	},
	section: {
		marginVertical: 12,
		borderRadius: Variable.BORDER_RADIUS_SMALL,
		backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
		padding: 6,
	},
	sectionItem: {
		alignItems: "center",
		padding: 6,
	},

});
