import { Picker } from "@react-native-picker/picker"
import React, { FC, useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view"
import StatisticDetail from "../Components/StatisticDetail"
import { transaction, transactionGroup } from "../data"
import { globalStyles, Variable } from "../styles/theme.style"
import { ITransaction, StatisticData } from "../type"

const Statistic: FC<{}> = () => {
  const [selectedLabelChartType, setSelectedLabelChartType] =
    useState<string>("month")
  const [transactionData, setTransactionData] = useState<any[]>([])

  function groupBy(list, keyGetter) {
    const map = new Map()
    list.forEach((item) => {
      const key = keyGetter(item)
      const collection = map.get(key)
      if (!collection) {
        map.set(key, [item])
      } else {
        collection.push(item)
      }
    })
    return map
  }

  const [tracsactionByMonth, setTransactionByMonth] = useState<any[]>([])

  const mergeTransaction = () => {
    var group = transaction.filter((element) => {
      return element.date.getMonth() == 7
    })

    const returnArray = []
    for (let i = 0; i < 12; i++) {
      var monthTrans = transaction.filter((element) => {
        return element.date.getMonth() == i
      })
      var parentsInData: StatisticData[] = []
      for (let i = 0; i < monthTrans.length; i++) {
        if (monthTrans[i] && monthTrans[i].group)
          if (
            monthTrans[i]?.group?.parent === null &&
            parentsInData.find(
              (e) => e.parentId === monthTrans[i]?.group?.id
            ) === undefined
          ) {
            var statisticItem: StatisticData = {
              parentName: monthTrans[i]?.group?.name,
              parentId: monthTrans[i]?.group?.id,
              parentIcon: monthTrans[i]?.group?.icon,
              money: 0,
              type: monthTrans[i]?.group?.type,
              childs: [],
            }
            parentsInData.push(statisticItem)
          }
      }

      for (let i = 0; i < monthTrans.length; i++) {
        if (monthTrans[i] && monthTrans[i].group)
          if (monthTrans[i]?.group?.parent === null) {
            let idx = parentsInData.findIndex(
              (e) => e.parentId === monthTrans[i]?.group?.id
            )
            if (idx >= 0) parentsInData[idx].money += monthTrans[i].money
          } else {
            var idx = parentsInData.findIndex(
              (e) => e.parentId === monthTrans[i]?.group?.parent
            )
            if (idx < 0 || idx === undefined) {
              var parent = transactionGroup.filter(
                (e) => e.id == monthTrans[i]?.group?.parent!!
              )[0]

              var statisticItem: StatisticData = {
                parentName: parent.name,
                parentId: parent.id,
                parentIcon: parent.icon,
                money: 0,
                type: parent.type,
                childs: [],
              }
              parentsInData.push(statisticItem)
              idx = parentsInData.findIndex(
                (e) => e.parentId === monthTrans[i]?.group?.parent
              )
            }
            console.log("Index " + idx)

            if (idx >= 0) {
              parentsInData[idx].childs.push(monthTrans[i])
              console.log(parentsInData[idx].childs)
            }
          }
      }
      console.log("hjhihi")
      console.log(parentsInData)
      returnArray.push(parentsInData)
    }
    setTransactionByMonth([...returnArray])
    return returnArray
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
          <StatisticDetail
            key={idx}
            data={tracsactionByMonth[idx]}
            tabLabel={item}
            month={item}
          />
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
