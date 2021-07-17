import React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { globalStyles } from "../styles/theme.style"
const HomeScreen = () => {
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  }
  const data = {
    labels: ["T3", "T4", "T5", "T6", "T7"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: [20, 1, 2, 8, 29, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Rainy Days", "ok"], // optional
  }
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
      <LineChart
        data={data}
        width={Dimensions.get("window").width}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  )
}
export default HomeScreen
