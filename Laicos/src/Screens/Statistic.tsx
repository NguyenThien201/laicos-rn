import { Picker } from "@react-native-picker/picker"
import React, { FC, useEffect, useState } from "react"
import {
  Dimensions,
  processColor,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { FlatList } from "react-native-gesture-handler"
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view"
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
} from "victory-native"
import StatisticDetail from "../Components/StatisticDetail"
import StatisticTabItem from "../Components/StatisticTabItem"
import { transaction } from "../data"
import { globalStyles, Variable } from "../styles/theme.style"

const Statistic: FC<{}> = () => {
  const [selectedLabelChartType, setSelectedLabelChartType] =
    useState<string>("month")
  const [transactionData, setTransactionData] = useState<any[]>([])

  const mergeTransaction = () => {
    const parentsInData: any[] = []
    for (let i = 0; i < transaction.length; i++) {
      if (transaction[i] && transaction[i].group)
        if (transaction[i]?.group?.parent === null) {
          parentsInData.find(
            (e) => e.parentId === transaction[i]?.group?.id
          ) === undefined &&
            parentsInData.push({
              parentName: transaction[i]?.group?.name,
              parentId: transaction[i]?.group?.id,
              parentIcon: transaction[i]?.group?.icon,
              money: 0,
              type: transaction[i]?.group?.type,
              childs: [],
            })
        }
    }
    for (let i = 0; i < transaction.length; i++) {
      if (transaction[i] && transaction[i].group)
        if (transaction[i]?.group?.parent === null) {
          let idx = parentsInData.findIndex(
            (e) => e.parentId === transaction[i]?.group?.id
          )
          if (idx >= 0) parentsInData[idx].money += transaction[i].money
        } else {
          let idx = parentsInData.findIndex(
            (e) => e.parentId === transaction[i]?.group?.parent
          )
          if (idx >= 0) parentsInData[idx].childs.push(transaction[i])
        }
    }

    return parentsInData
  }

  useEffect(() => {
    setTransactionData(mergeTransaction())
  }, [])

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
  ]

  return (
    <View style={[styles.container]}>
      <View>
        <Text
          style={[
            globalStyles.fontSizeLarge,
            globalStyles.whiteText,
            styles.title,
          ]}
        >
          Thống kê
        </Text>
        <View style={[styles.pickerContainer]}>
          <Picker
            selectedValue={selectedLabelChartType}
            dropdownIconColor="white"
            style={[styles.picker]}
            onValueChange={(itemValue) => setSelectedLabelChartType(itemValue)}
          >
            <Picker.Item label="Ngày" value="day" />
            <Picker.Item label="Tuần" value="week" />
            <Picker.Item label="Tháng" value="month" />
            <Picker.Item label="Năm" value="year" />
          </Picker>
        </View>
      </View>

      <ScrollableTabView
        tabBarPosition="top"
        tabBarInactiveTextColor="white"
        tabBarUnderlineStyle={{
          backgroundColor: Variable.GREEN_LIGHT_COLOR,
          elevation: 20,
        }}
        tabBarActiveTextColor={Variable.GREEN_LIGHT_COLOR}
        tabBarTextStyle={{ fontSize: 16 }}
        initialPage={months.length}
        renderTabBar={() => <ScrollableTabBar />}
      >
        {months.map((item, idx) => (
          <StatisticDetail key={idx} data={transactionData} tabLabel={item} month={item}/>
        ))}
      </ScrollableTabView>
      {/* <View
        style={{
          backgroundColor: "#212230",
          width: 70,
          height: 25,
          paddingTop: 10,
          alignSelf: "center",
          alignItems: "center",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text
          onPress={() => setIsShowHeader(!isShowHeader)}
          style={[
            {
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 12,
              borderRightWidth: 12,
              borderBottomWidth: 8,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "white",
            },
            !isShowHeader && {
              transform: [{ rotate: "180deg" }],
            },
          ]}
        />
      </View>
      <View
        style={{
          backgroundColor: "#212230",
          height: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
            paddingTop: 10,
          }}
        >
          Thống kê trong tháng 7
        </Text>
        <ScrollableTabView
          tabBarPosition="top"
          tabBarInactiveTextColor="white"
          tabBarUnderlineStyle={{
            backgroundColor: Variable.GREEN_LIGHT_COLOR,
            elevation: 20,
          }}
          tabBarActiveTextColor={Variable.GREEN_LIGHT_COLOR}
          tabBarTextStyle={{ fontSize: 16 }}
        >
          <StatisticTabItem
            type="LOAN"
            data={transactionData}
            tabLabel="Khoản vay"
          />
          <StatisticTabItem
            type="SPEND"
            data={transactionData}
            tabLabel="Khoản chi"
          />

          <StatisticTabItem
            type="EARN"
            data={transactionData}
            tabLabel="Khoản thu"
          />
        </ScrollableTabView>
      </View> */}
    </View>
  )
}
export default Statistic
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
  },
  title: {
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    marginEnd: 10,
    marginBottom: 10,
    width: 115,
    alignSelf: "flex-end",
  },
  picker: {
    color: "white",
    width: 125,
  },
})
