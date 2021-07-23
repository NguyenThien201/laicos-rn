import { Picker } from "@react-native-picker/picker"
import React, { useState } from "react"
import { Dimensions, Text, View } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { globalStyles } from "../styles/theme.style"
const Statistic = () => {
  const chartConfig = {
    backgroundGradientFrom: "#151321",
    backgroundGradientTo: "#151321",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  }
  const data = {
    labels: ["T3", "T4", "T5", "T6", "T7"],
    datasets: [
      {
        data: [0, 1, 1, 1, 0],
        color: () => `rgba(255, 255, 255, 1)`, // optional
        strokeWidth: 3, // optional
      },
      {
        data: [10, 10, 10, 15, 15],
        color: () => `rgba(60, 211, 173, 1)`, // optional
        strokeWidth: 3, // optional
      },
      {
        data: [8, 5, 6, 8, 4],
        color: () => `rgba(243, 74, 47, 1)`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: ["Vay", "Thu", "Chi"], // optional
  }
  const [dataFromChart, setDataFromChart] = useState({})
  const screenWidth = Dimensions.get("window").width
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "first", title: "Vay" },
    { key: "second", title: "Chi" },
    { key: "third", title: "Thu" },
  ])
  const [selectedChartType, setSelectedChartType] = useState<string>("month")
  return (
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
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 15,
          width: 125,
          alignSelf: "flex-end",
          marginEnd:10,
          marginBottom:10
        }}
      >
        <Picker
          selectedValue={selectedChartType}
          dropdownIconColor="white"
          style={{
            fontSize:10,
            height: 50,
            width: 130,
            color: "white",
            borderColor: "white",
          }}
          onValueChange={(itemValue) => setSelectedChartType(itemValue)}
        >
          <Picker.Item label="Ngày" value="day" />
          <Picker.Item label="Tuần" value="week" />
          <Picker.Item label="Tháng" value="month" />
          <Picker.Item label="Năm" value="year" />
        </Picker>
      </View>
      <LineChart
        data={data}
        width={screenWidth}
        height={200}
        verticalLabelRotation={0}
        chartConfig={chartConfig}
        bezier
        withShadow={false}
        withDots={false}
        yAxisSuffix=" tr"
        onDataPointClick={(data) => {
          console.log(data)
        }}
      />

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
            paddingTop: 20,
          }}
        >
          Thống kê trong tháng 7
        </Text>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: screenWidth }}
          style={{ backgroundColor: "black" }}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  )
}
export default Statistic

const renderScene = SceneMap({
  first: () => <View style={{ flex: 1, backgroundColor: "#ff4081" }} />,
  second: () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />,
  third: () => <View style={{ flex: 1, backgroundColor: "violet" }} />,
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
