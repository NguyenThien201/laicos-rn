import { useNavigation } from "@react-navigation/native"
import React, { FC, useEffect, useState } from "react"
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { VictoryPie } from "victory-native"
import { Variable } from "../styles/theme.style"
import { formatter } from "../Utils/format"

const StatisticDetail: FC<{ data: any[]; month: string }> = ({
  data,
  month,
}) => {
  const screenWidth = Dimensions.get("window").width
  const [spendingSample, setSpendingSample] = useState<any[]>([])
  const [incomeSample, setIncomeSample] = useState<any[]>([])
  const [totalSpend, setTotalSpend] = useState<number>(0)
  const [totalEarn, setTotalEarn] = useState<number>(0)
  const processData = () => {
    const spendingData: any[] = []
    const earnData: any[] = []
    let sp: number = 0
    let ea: number = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "SPEND") {
        spendingData.push({ x: data[i].parentName, y: data[i].money })
        sp += data[i].money
      } else if (data[i].type === "EARN") {
        earnData.push({ x: data[i].parentName, y: data[i].money })
        ea += data[i].money
      }
    }

    setSpendingSample(reduceArr(spendingData, sp))
    setIncomeSample(reduceArr(earnData, ea))
    setTotalEarn(ea)
    setTotalSpend(sp)
  }

  const reduceArr = (arr: any[], total: number) => {
    if (arr.length <= 2) return arr
    const res: any[] = []
    const reduce: any[] = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].y / total <= 0.05) {
        reduce.push(arr[i])
      } else res.push(arr[i])
    }
    let t: number = 0
    reduce.map((item) => (t += item.y))
    res.push({ x: "Khác", y: t })
    return res
  }

  const loanSample = [{ x: "Vay", y: 5 }]

  const navigation = useNavigation<any>()

  useEffect(() => {
    processData()
  }, [])

  return (
    data && (
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.cardContainer]}>
          <Text style={[styles.titleCard]}>Khoản chi</Text>
          <View style={[styles.chartContainer]}>
            <VictoryPie
              colorScale={[
                "tomato",
                "lightblue",
                "orange",
                "navy",
                "green",
                "white",
              ]}
              height={screenWidth * 0.5}
              padding={{ top: 35, bottom: 35 }}
              innerRadius={screenWidth * 0.12}
              data={spendingSample}
              style={{ labels: { fill: "white" } }}
            />
          </View>
          <View
            style={[
              styles.cardFooterContainer,
              {
                backgroundColor: "#C04949",
              },
            ]}
          >
            <View style={[styles.totalMoneyContainer]}>
              <Text style={{ color: "white" }}>Tổng tiền</Text>
              <Text style={[styles.moneyCard]}>{formatter(totalSpend)}đ</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Chi tiết thống kê", {
                  title: "Chi tiêu trong " + month,
                  data: data,
                  type: "SPEND",
                })
              }}
              style={[
                styles.detailButton,
                {
                  backgroundColor: "#722626",
                },
              ]}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Chi tiết
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.cardContainer]}>
          <Text style={[styles.titleCard]}>Khoản thu</Text>
          <View style={[styles.chartContainer]}>
            <VictoryPie
              colorScale={[
                "tomato",
                "lightblue",
                "orange",
                "navy",
                "green",
                "white",
              ]}
              height={screenWidth * 0.5}
              padding={{ top: 35, bottom: 35 }}
              innerRadius={screenWidth * 0.12}
              data={incomeSample}
              style={{ labels: { fill: "white" } }}
            />
          </View>
          <View
            style={[
              styles.cardFooterContainer,
              {
                backgroundColor: "#49BBC0",
              },
            ]}
          >
            <View style={[styles.totalMoneyContainer]}>
              <Text style={{ color: "white" }}>Tổng tiền</Text>
              <Text style={[styles.moneyCard]}>{formatter(totalEarn)}đ</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Chi tiết thống kê", {
                  title: "Thu nhập trong " + month,
                  data: data,
                  type: "EARN",
                })
              }}
              style={[
                styles.detailButton,
                {
                  backgroundColor: "#379094",
                },
              ]}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Chi tiết
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.cardContainer]}>
          <Text style={[styles.titleCard]}>Khoản vay</Text>
          <View style={[styles.chartContainer]}>
            <VictoryPie
              colorScale={[
                "tomato",
                "lightblue",
                "orange",
                "navy",
                "green",
                "white",
              ]}
              height={screenWidth * 0.5}
              padding={{ top: 30, bottom: 35 }}
              innerRadius={screenWidth * 0.13}
              data={loanSample}
              style={{ labels: { fill: "white" } }}
            />
          </View>
          <View
            style={[
              styles.cardFooterContainer,
              {
                backgroundColor: "#DCDCDC",
              },
            ]}
          >
            <View style={[styles.totalMoneyContainer]}>
              <Text style={{ color: "#151321" }}>Tổng tiền</Text>
              <Text style={[styles.moneyCard, { color: "#151321" }]}>
                5,000,000đ
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Chi tiết thống kê", {
                  title: "Khoản vay trong " + month,
                  data: data,
                  type: "LOAN",
                })
              }}
              style={[
                styles.detailButton,
                {
                  backgroundColor: "#BBBBBB",
                },
              ]}
            >
              <Text style={{ color: "#151321", fontWeight: "bold" }}>
                Chi tiết
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  )
}
export default StatisticDetail
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
  cardContainer: {
    backgroundColor: "#212230",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 20,
  },
  titleCard: { color: "white", fontSize: 18, fontWeight: "700" },
  chartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardFooterContainer: {
    marginHorizontal: -15,
    marginBottom: -15,
    marginTop: 15,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalMoneyContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  moneyCard: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    paddingStart: 10,
  },
  detailButton: {
    padding: 15,
    margin: -15,
    borderBottomRightRadius: 20,
    display: "flex",
    justifyContent: "center",
  },
})
