import React, { FC } from "react"
import { Dimensions, ScrollView, Text } from "react-native"
import { PieChart } from "react-native-chart-kit"
import { chartConfig, spendingData, transaction } from "../data"
import { TransactionItem } from "./TransactionItem"

const StatisticTabItem: FC<{ type: string }> = ({ type }) => {
  const screenWidth = Dimensions.get("window").width
  return (
    <ScrollView style={{ marginBottom: 50 }}>
      <PieChart
        data={spendingData}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor={"money"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        // absolute
      />
      {transaction.map((item, id) => (
        <TransactionItem key={id} transaction={item} />
      ))}
    </ScrollView>
  )
}

export default StatisticTabItem
