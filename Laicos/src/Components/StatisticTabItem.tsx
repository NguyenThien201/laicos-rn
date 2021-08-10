import React, { FC } from "react"
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { VictoryPie } from "victory-native"
import { globalStyles, Variable } from "../styles/theme.style"
import { formatter } from "../Utils/format"
import { TransactionItem } from "./TransactionItem"

const StatisticTabItem: FC<{ type: string; data: any[] }> = ({
  type,
  data,
}) => {
  const screenWidth = Dimensions.get("window").width
  const spendingSample = [
    { x: "Ăn uống", y: 3 },
    { x: "Giải trí", y: 3 },
    { x: "Mua sắm", y: 8 },
    { x: "Giáo dục", y: 4 },
  ]
  const incomeSample = [
    { x: "Lương", y: 5 },
    { x: "Được tặng", y: 20 },
  ]
  const loanSample = [{ x: "Vay", y: 5 }]

  return (
    data && (
      <ScrollView style={{ marginBottom: 50 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <VictoryPie
            colorScale={[
              "tomato",
              "lightblue",
              "orange",
              "navy",
              "green",
              "white",
            ]}
            height={screenWidth*0.8}
            padding={{ top: 50, bottom: 50 }}
            innerRadius={screenWidth * 0.22}
            data={
              type === "SPEND"
                ? spendingSample
                : type === "EARN"
                ? incomeSample
                : loanSample
            }
            style={{ labels: { fill: "white" } }}
          />
        </View>
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
const ParentItem: FC<{ item: any }> = ({ item }) => {
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
    fontSize: Variable.FONT_SIZE_SMALL,
    fontWeight: "900",
  },
  money: {
    textAlign: "right",
    color: "white",
    fontSize: Variable.FONT_SIZE_SMALL,
    fontWeight: "900",
  },
  description: {
    marginLeft: 8,
    textAlign: "left",
    color: "white",
    fontSize: Variable.FONT_SIZE_SMALL,
    fontWeight: "400",
  },
})
