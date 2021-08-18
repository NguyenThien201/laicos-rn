import React, { FC } from "react"
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

const StatisticDetail: FC<{ data: any[] }> = ({ data }) => {
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
              padding={{ top: 30, bottom: 30 }}
              innerRadius={screenWidth * 0.13}
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
              <Text style={[styles.moneyCard]}>18,000,000đ</Text>
            </View>
            <TouchableOpacity
              onPress={() => {}}
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
              padding={{ top: 30, bottom: 30 }}
              innerRadius={screenWidth * 0.13}
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
              <Text style={[styles.moneyCard]}>25,000,000đ</Text>
            </View>
            <TouchableOpacity
              onPress={() => {}}
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
              onPress={() => {}}
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
