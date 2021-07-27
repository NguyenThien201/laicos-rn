import { Picker } from "@react-native-picker/picker"
import React, { useState } from "react"
import { Dimensions, ScrollView, Text, View } from "react-native"
import { LineChart, StackedBarChart } from "react-native-chart-kit"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import StatisticTabItem from "../Components/StatisticTabItem"
import { chartConfig, lineChartData, stackedBarChartData } from "../data"
import { globalStyles } from "../styles/theme.style"
const Statistic = () => {
  const screenWidth = Dimensions.get("window").width
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "first", title: "Vay" },
    { key: "second", title: "Chi" },
    { key: "third", title: "Thu" },
  ])
  const [selectedLabelChartType, setSelectedLabelChartType] =
    useState<string>("month")
  const [selectedChartType, setSelectedChartType] = useState<string>("line")
  const [isShowHeader, setIsShowHeader] = useState(true)
  return (
    <View>
      {isShowHeader && (
        <View>
          <Text
            style={[
              globalStyles.fontSizeLarge,
              globalStyles.whiteText,
              { fontWeight: "bold", paddingTop: 10, paddingLeft: 15 },
            ]}
          >
            Thống kê
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 15,
                marginEnd: 10,
                marginBottom: 10,
              }}
            >
              <Picker
                selectedValue={selectedLabelChartType}
                dropdownIconColor="white"
                style={{
                  color: "white",
                  width: 130,
                }}
                onValueChange={(itemValue) =>
                  setSelectedLabelChartType(itemValue)
                }
              >
                <Picker.Item label="Ngày" value="day" />
                <Picker.Item label="Tuần" value="week" />
                <Picker.Item label="Tháng" value="month" />
                <Picker.Item label="Năm" value="year" />
              </Picker>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 15,
                marginEnd: 10,
                marginBottom: 10,
              }}
            >
              <Picker
                selectedValue={selectedChartType}
                dropdownIconColor="white"
                style={{
                  width: 130,
                  color: "white",
                }}
                onValueChange={(itemValue) => setSelectedChartType(itemValue)}
              >
                <Picker.Item label="Đường" value="line" />
                <Picker.Item label="Cột" value="bar" />
              </Picker>
            </View>
          </View>
          {selectedChartType === "line" ? (
            <LineChart
              data={lineChartData}
              width={screenWidth}
              height={200}
              verticalLabelRotation={0}
              chartConfig={chartConfig}
              bezier
              withShadow={false}
              withDots={false}
              yAxisSuffix=" tr"
            />
          ) : (
            <StackedBarChart
              style={{ marginLeft: 10 }}
              data={stackedBarChartData}
              width={screenWidth - 10}
              height={200}
              chartConfig={chartConfig}
              yAxisSuffix=" tr"
            />
          )}
        </View>
      )}
      <View
        style={{
          backgroundColor: "#212230",
          width: 70,
          height: 25,
          paddingTop: 8,
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
              borderLeftWidth: 10,
              borderRightWidth: 10,
              borderBottomWidth: 10,
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
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: screenWidth }}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  )
}
export default Statistic

const renderScene = SceneMap({
  first: () => <StatisticTabItem type="vay" />,
  second: () => <StatisticTabItem type="spending" />,
  third: () => <StatisticTabItem type="income" />,
})

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#3CD3AD" }}
    style={{ backgroundColor: "#212230" }}
    renderLabel={({ route, focused }) =>
      focused ? (
        <Text style={{ color: "#3CD3AD" }}>{route.title}</Text>
      ) : (
        <Text style={{ color: "gray" }}>{route.title}</Text>
      )
    }
  />
)
