import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Variable } from "../styles/theme.style";
import { formatter } from "../Utils/format";

export const TransactionItem = ({ transaction }) => {

	return (
		<View style={styles.containter}>
			<View style={{flex:1, flexDirection:"row", justifyContent:"flex-start"}}>
				<Image
					source={(transaction.group.icon)}
                    style={
                        {width: 25, height:25}
                    }
					resizeMode="contain"
				></Image>
                
				<Text style={styles.text}>{transaction.group.name}</Text>
               
			</View>
            <View>
                <Text style={[styles.text, transaction.group.type==="EARN"? {color: Variable.GREEN_COLOR} : {color:Variable.RED_COLOR}]}>{transaction.group.type==="EARN"? "+" : "-"} {formatter(transaction.money)}</Text>
			</View>
			
		</View>
	);
};

const styles = StyleSheet.create({
	containter: {
		flex: 1,    
		flexDirection: "row",
		justifyContent: "space-between",
        marginBottom: 16,
        paddingHorizontal:16
	},
	text: {
		textAlign: "left",
		color: "white",
        fontSize: Variable.FONT_SIZE_SMALL_16
	},
});
