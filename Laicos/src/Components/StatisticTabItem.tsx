import React, { FC } from "react"
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native"
import { chartConfig, incomeData, loanData, spendingData } from "../data"
import { globalStyles, Variable } from "../styles/theme.style"
import { formatter } from "../Utils/format"
import { TransactionItem } from "./TransactionItem"

const StatisticTabItem: FC<{ type: string; data: any[] }> = ({
  type,
  data,
}) => {
  const screenWidth = Dimensions.get("window").width

  return (
    data && (
      <ScrollView style={{ marginBottom: 50 }}>
        {/* <PieChart
          data={
            type === "SPEND"
              ? spendingData
              : type === "EARN"
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
        /> */}
        <Text
          style={[
            globalStyles.fontSizeMedium,
            globalStyles.whiteText,
            { padding: 15 },
          ]}
        >
          Chi tiết
        </Text>
        <View style={{ padding: 15 }}>
          {data.map(
            (item, id) =>
              item.type === type && (
                <View key={id} style={{ marginBottom: 15 }}>
                  <ParentItem item={item} />

                  <View style={{ paddingLeft: 0 }}>
                    {item.childs.length > 0 &&
                      item.childs.map(
                        (i: any, idx: React.Key | null | undefined) => (
                          <View
                            key={idx}
                            style={{
                              borderLeftColor: "white",
                              borderLeftWidth: 0.5,
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Text
                              style={{
                                backgroundColor: "white",
                                width: 13,
                                height: 0.5,
                                alignSelf: "center",
                                marginRight: 15,
                              }}
                            ></Text>
                            <TransactionItem transaction={i} />
                          </View>
                        )
                      )}
                  </View>
                </View>
              )
          )}
        </View>
      </ScrollView>
    )
  )
}
const ParentItem = ({ item }) => {
  return (
    <View style={styles.containter}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        {item.parentIcon ? (
          <Image
            source={item.parentIcon}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          ></Image>
        ) : null}

        {/* Hiện tên giao dịch và ghi chú */}
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>{item.parentName}</Text>
        </View>
      </View>

      <View>
        <Text
          style={[
            styles.money,
            item.type === "EARN"
              ? { color: Variable.GREEN_COLOR }
              : { color: Variable.RED_COLOR },
          ]}
        >
          {formatter(item.money)}
        </Text>
      </View>
    </View>
  )
}

export default StatisticTabItem
const styles = StyleSheet.create({
  containter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  text: {
    marginLeft: 8,
    textAlign: "left",
    color: "white",
    fontSize: Variable.FONT_SIZE_SMALL_16,
    fontWeight: "900",
  },
  money: {
    textAlign: "right",
    color: "white",
    fontSize: Variable.FONT_SIZE_SMALL_16,
    fontWeight: "900",
  },
  description: {
    marginLeft: 8,
    textAlign: "left",
    color: "white",
    fontSize: Variable.FONT_SIZE_SMALL_14,
    fontWeight: "400",
  },
})
