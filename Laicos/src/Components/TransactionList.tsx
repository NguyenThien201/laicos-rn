import React, { useEffect } from "react";
import { useState } from "react";
import { ITransaction } from "../type";
import { transaction as transactionHistory } from "../data";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TransactionItem } from "./TransactionItem";
import moment from "moment";
export const TransactionList = ({ date }) => {
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
            if (temp.length>3) break
        }
        temp.sort((a,b)=>{
            console.log(moment(a.date).isBefore(b.date));
            
            return moment(a.date).isBefore(b.date) ? 1 : -1
        })
        return setTransactions(temp);
    }, []);

    return (
        <View style={{ flex: 1 , alignItems:"flex-start", justifyContent:"flex-start"}}>
            {transactions.length > 0 ?  transactions.map((item, indx) => (
                <TransactionItem transaction={item} key={indx} />
            )) : <Text style={{color:"#fff", alignSelf:"center"}}>
                    Tháng này không có giao dịch
                </Text>}
        </View>
    );
};
