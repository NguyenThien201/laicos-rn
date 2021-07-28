import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { Variable } from "../styles/theme.style"
import { formatter } from "../Utils/format"

export const TransactionItem = ({ transaction }) => {
  return (
    <View style={styles.containter}>
      <View
        style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }}
      >
        {transaction.group.icon? <Image
          source={transaction.group.icon}
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        ></Image> : null}

        <Text style={styles.text}>{transaction.group.name}</Text>
      </View>
      <View>
        <Text
          style={[
            styles.text,
            transaction.group.type === "EARN"
              ? { color: Variable.GREEN_COLOR }
              : { color: Variable.RED_COLOR },
          ]}
        >
          {transaction.group.type === "EARN" ? "+" : "-"}{" "}
          {formatter(transaction.money)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

  },
  text: {
    marginLeft: 8,
    textAlign: "left",
    color: "white",
    fontSize: Variable.FONT_SIZE_SMALL_16,
    fontWeight: "900",
  },
})
