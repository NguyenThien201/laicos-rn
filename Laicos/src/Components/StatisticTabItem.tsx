import React, { FC, useEffect, useState } from "react"
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { TabRouter } from "react-navigation"
import { TitleHeader } from "../Screens/Title"
import { globalStyles, Variable } from "../styles/theme.style"
import { formatter } from "../Utils/format"
import { TransactionItem } from "./TransactionItem"

const DetailItem: FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const screenWidth = Dimensions.get("window").width
  const [data, setData] = useState<any[]>([])
  const [type, setType] = useState<string>("SPEND") //LOAN,EARN
  useEffect(() => {
    setData(route.params.data)
    setType(route.params.type)
  }, [route])

  return (
    <ScrollView style={{ marginBottom: 50 }}>
      <Text
        style={[
          globalStyles.fontSizeMedium,
          globalStyles.whiteText,
          { padding: 15 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={{ flex: 0 }}
        >
          <TitleHeader title={route.params.title} />
        </TouchableOpacity>
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

export default DetailItem
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
