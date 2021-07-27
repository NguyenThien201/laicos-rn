import React, { FC } from "react"
import { Dimensions, ScrollView, Text } from "react-native"
import { PieChart } from "react-native-chart-kit"
import {
  chartConfig,
  incomeData,
  incomeTransactions,
  loanData,
  spendingData,
  spendingTransactions
} from "../data"
import { globalStyles } from "../styles/theme.style"
import { TransactionItem } from "./TransactionItem"

const StatisticTabItem: FC<{ type: string }> = ({ type }) => {
  const screenWidth = Dimensions.get("window").width

  return (
    <ScrollView style={{ marginBottom: 50 }}>
      <PieChart
        data={
          type === "spending"
            ? spendingData
            : type === "income"
            ? incomeData
            : loanData
        }
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor={"money"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        // absolute
      />
      <Text
        style={[
          globalStyles.fontSizeMedium,
          globalStyles.whiteText,
          { padding: 15 },
        ]}
      >
        Chi tiết
      </Text>
      {type === "spending"
        ? spendingTransactions.map((item, id) => (
            <TransactionItem key={id} transaction={item} />
          ))
        : type === "income"
        ? incomeTransactions.map((item, id) => (
            <TransactionItem key={id} transaction={item} />
          ))
        : null}
    </ScrollView>
  )
}

export default StatisticTabItem
