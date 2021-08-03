import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import Modal from "react-native-modalbox";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradButton } from "../Components/LinearGradButton";
import { ITransaction, ITransactionGroup, IWallet } from "../type";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { transaction, wallets } from "../data";
import { ChosenGroupView } from "../Components/ChosenGroupVIew";
import { BillImage } from "../Components/BillImage";
import LinearGradient from "react-native-linear-gradient";
import { MonthlyHistory } from "../Components/MonthlyHistory";
import { WalletList } from "../Components/WalletList";
import { globalStyles, Variable } from "../styles/theme.style";
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import * as Progress from "react-native-progress";
import GradientButton from "react-native-gradient-buttons";

const DetailPlanner = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView style={[styles.container]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ flex: 0 }}
        >
          <View style={[styles.title]}>
            <Image
              source={require("../Assets/Images/Icons/ic_back.png")}
              style={{ marginTop: 10, marginRight: 10 }}
            ></Image>
            <Text style={[styles.titleText]}>Kế hoạch chi tiêu</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.cont]}>
          <Image
            source={require("../Assets/Images/Icons/ic_travel_63x63.png")}
          />
          <View style={[styles.cont]}>
            <Text style={[styles.tText]}>Du lịch</Text>
            <Text style={[styles.zText]}>08/01-08/31</Text>

            <View style={{ marginLeft: -68, marginTop: 50 }}>
              <Progress.Bar
                progress={2.5 / 4}
                width={270}
                height={4}
                borderColor={"#3CD3AD"}
                unfilledColor={"#C4C4C4"}
                color={"#3CD3AD"}
              />
            </View>
            <Text style={[styles.sText]}>4.000.000 đ</Text>
          </View>
          <Text style={[styles.cText]}>Còn 25 ngày nữa</Text>
          <Text style={[styles.aText]}>2.500.000 đ</Text>
        </View>
        <View
          style={{
            borderBottomColor: Variable.GREEN_LIGHT_COLOR,
            borderBottomWidth: 1,
            marginVertical: 10,
            alignItems: "center",
          }}
        />
        <View style={[styles.cont]}>
          <Image
            source={require("../Assets/Images/Icons/ic_education_63x63.png")}
          />
          <View style={[styles.cont]}>
            <Text style={[styles.tText]}>Học phí</Text>
            <Text style={[styles.zzText]}>2018-2028</Text>

            <View style={{ marginLeft: -60, marginTop: 50 }}>
              <Progress.Bar
                progress={0.3}
                width={270}
                height={4}
                borderColor={"#3CD3AD"}
                unfilledColor={"#C4C4C4"}
                color={"#3CD3AD"}
              />
            </View>
            <Text style={[styles.sText]}>4.000.000 đ</Text>
          </View>
          <Text style={[styles.cText]}>Còn 7 năm nữa</Text>
          <Text style={[styles.aText]}>2.500.000 đ</Text>
        </View>
        <View
          style={{
            borderBottomColor: Variable.GREEN_LIGHT_COLOR,
            borderBottomWidth: 1,
            marginVertical: 10,
            alignItems: "center",
          }}
        />
        <View
          style={[
            { flex: 1, marginTop: 15, width: 166, height: 56, marginLeft: 120 },
          ]}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#4CB8C4", "#3CD3AD"]}
            style={styles.linearGradient}
          >
            <Text
              onPress={() => {
                navigation.navigate('Thêm');
              }}
              style={styles.buttonText}
            >
              Thêm
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
    marginLeft: 15,
  },
  cont: {
    marginTop: 15,
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
  },
  title: {
    flexDirection: "row",
    alignContent: "flex-start",
  },
  titleText: {
    color: "white",
    fontSize: Variable.FONT_SIZE_LARGE,
    fontWeight: "bold",
  },
  tText: {
    color: "white",
    fontSize: Variable.FONT_SIZE_MEDIUM,
    fontWeight: "bold",
    marginLeft: 10,
  },
  sText: {
    color: "white",
    fontSize: Variable.FONT_SIZE_SMALL_18,
    fontWeight: "900",
    marginLeft: -103,
  },
  zText: {
    color: "#8C8C8C",
    fontSize: Variable.FONT_SIZE_SMALL_12,
    fontWeight: "bold",
    marginLeft: -62,
    marginTop: 25,
  },
  zzText: {
    color: "#8C8C8C",
    fontSize: Variable.FONT_SIZE_SMALL_12,
    fontWeight: "bold",
    marginLeft: -70,
    marginTop: 25,
  },
  aText: {
    color: "#8C8C8C",
    fontSize: Variable.FONT_SIZE_SMALL_14,
    fontWeight: "bold",
    marginLeft: 113,
    marginTop: 75,
  },
  cText: {
    color: "#8C8C8C",
    fontSize: Variable.FONT_SIZE_SMALL_10,
    fontWeight: "bold",
    marginLeft: -264,
    marginTop: 73,
  },
  form: {
    backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
    paddingVertical: 20,
    marginTop: 20,
    marginHorizontal: 16,
  },
  input: {
    margin: 14,
    borderBottomWidth: 1,
    borderColor: "white",
    color: "white",
    fontSize: Variable.FONT_SIZE_MEDIUM,
    padding: 6,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    width: 119,
    marginLeft: 20
  },
  buttonText: {
    marginTop: 13,
    fontSize: Variable.FONT_SIZE_MEDIUM,
    fontWeight: "bold",
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});
export default DetailPlanner;
