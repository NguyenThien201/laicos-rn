import React, { useEffect } from "react";
import { useState } from "react";
import { ITransaction } from "../type";
import { transaction as transactionHistory } from "../data";
import { Text, View } from "react-native";
import { TransactionItem } from "./TransactionItem";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';
export const TransactionList = ({ date }) => {
    const navigation = useNavigation();
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    useEffect(() => {
 
        let temp: ITransaction[] = [];
        for (let t of transactionHistory) {
            if (
                t.date.getMonth() + 1 === date.getMonth() &&
                t.date.getFullYear() === date.getFullYear()
            ) {
                temp.push(t);
            }
       
        }
        temp.sort((a,b)=>{
            return moment(a.date).isBefore(b.date) ? 1 : -1
        })
        return setTransactions(temp.slice(0,4));
    }, [transactionHistory.length]);

    return (
        <View style={{ flex: 1 , alignItems:"flex-start", justifyContent:"flex-start", paddingHorizontal:16}}>
            {transactions.length > 0 ?  transactions.map((item, indx) => (
                <TransactionItem transaction={item} key={indx} navigation={navigation} />
            )) : <Text style={{color:"#fff", alignSelf:"center"}}>
                    Tháng này không có giao dịch
                </Text>}
        </View>
    );
};
