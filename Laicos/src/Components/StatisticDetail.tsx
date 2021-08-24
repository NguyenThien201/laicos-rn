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
import {StatisticData} from "../type";

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
    var statisticData = data as StatisticData[]
    for (let i = 0; i < statisticData.length; i++) {
      if (statisticData[i].type === "SPEND") {
        var groupMoney = statisticData[i].money!!
        for (let ci = 0; ci < statisticData[i].childs.length; ci++) {
          console.log("ci")
          console.log(statisticData[i].childs[ci])
          if (statisticData[i].childs[ci].group.type === "SPEND") {
            groupMoney += statisticData[i].childs[ci].money
          }
        }
        spendingData.push({ x: statisticData[i].parentName, y: groupMoney })
        sp += groupMoney
      } else if (statisticData[i].type === "EARN") {
        var groupMoney = statisticData[i].money!!

        for (let ci = 0; ci < statisticData[i].childs.length; ci++) {
          console.log("ci")
          console.log(statisticData[i].childs[ci])
          if (statisticData[i].childs[ci].group.type === "EARN") {
            groupMoney += statisticData[i].childs[ci].money
          }
        }
        earnData.push({ x: statisticData[i].parentName, y: groupMoney })
        ea += groupMoney
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
              <Text style={{ color: "white", fontSize:Variable.FONT_SIZE_SMALL }}>Tổng tiền</Text>
              <Text style={[styles.moneyCard]}>{formatter(totalSpend)}đ</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log(data)
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
              <Text style={{ color: "white", fontSize:Variable.FONT_SIZE_SMALL}}>
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
              <Text style={{ color: "white", fontSize:Variable.FONT_SIZE_SMALL }}>Tổng tiền</Text>
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
              <Text style={{ color: "white", fontSize:Variable.FONT_SIZE_SMALL }}>
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
              <Text style={{ color: "#151321" , fontSize:Variable.FONT_SIZE_SMALL}}>Tổng tiền</Text>
              <Text style={[styles.moneyCard, { color: "#151321" }]}>
                0đ
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
              <Text style={{ color: "#151321", fontSize:Variable.FONT_SIZE_SMALL }}>
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
    fontWeight: "700",
  },
  cardContainer: {
    backgroundColor: "#212230",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 20,
  },
  titleCard: { color: "white", fontSize: Variable.FONT_SIZE_MEDIUM, fontWeight: "700" },
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
    padding: 12,
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
    fontSize: Variable.FONT_SIZE_MEDIUM,
    paddingStart: 10,
  },
  detailButton: {
    padding: 12,
    margin: -12,
    borderBottomRightRadius: 20,
    display: "flex",
    justifyContent: "center",
  },
})
